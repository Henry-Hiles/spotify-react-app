import { useState } from "react"
import useAuth from "hooks/useAuth"
import config from "config"
import SpotifyWebApi from "spotify-web-api-node"
import { useEffect } from "react"
import styles from "styles/Dashboard.module.css"
import TrackSearchResult from "components/TrackSearchResult"
import Player from "components/Player"

const spotifyApi = new SpotifyWebApi({ clientId: config.clientId })

const Dashboard = ({ code }) => {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")

    const [accessToken] = useAuth(code)
    const chooseTrack = (track) => {
        setPlayingTrack(track)
        setSearch("")
        setLyrics("")
    }

    useEffect(() => {
        if (!playingTrack) return
        const run = async () => {
            const params = new URLSearchParams()
            params.append("artist", playingTrack.artist)
            params.append("track", playingTrack.title)
            const response = await fetch(
                `http://localhost:3001/lyrics?${params}`
            )
            const json = await response.json()
            setLyrics(json.lyrics)
        }

        run()
    }, [playingTrack])

    useEffect(() => {
        accessToken && spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return setSearchResults([])
        let cancel
        const run = async () => {
            const response = await spotifyApi.searchTracks(search)
            if (cancel) return
            setSearchResults(
                response.body.tracks.items.map((track) => ({
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: track.album.images.reduce(
                        (smallest, image) =>
                            image.height < smallest.height ? image : smallest,
                        track.album.images[0]
                    ).url,
                }))
            )
        }
        run()

        return () => (cancel = true)
    }, [search, accessToken])

    return (
        <div className={`${styles.Container} ${search ? "" : styles.Center}`}>
            <input
                type="text"
                placeholder="Search Songs/Artists"
                className={styles.Search}
                value={search}
                onChange={({ target }) => setSearch(target.value)}
            />
            <div className={styles.Tracks}>
                {searchResults.map((track) => (
                    <TrackSearchResult
                        chooseTrack={chooseTrack}
                        track={track}
                        key={track.uri}
                    />
                ))}
                {!searchResults.length && (
                    <div className={styles.Lyrics}>{lyrics}</div>
                )}
            </div>
            <div className={styles.Player}>
                {accessToken && (
                    <Player
                        accessToken={accessToken}
                        trackUri={playingTrack?.uri}
                    />
                )}
            </div>
        </div>
    )
}

export default Dashboard
