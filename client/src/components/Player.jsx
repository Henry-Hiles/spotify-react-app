import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"
const Player = ({ accessToken, trackUri }) => (
    <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        autoPlay
        uris={trackUri ? [trackUri] : []}
    />
)

export default Player
