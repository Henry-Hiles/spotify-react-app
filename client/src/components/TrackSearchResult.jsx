import styles from "styles/TrackSearchResult.module.css"

const TrackSearchResult = ({ track, chooseTrack }) => {
    const handlePlay = () => chooseTrack(track)

    return (
        <div className={styles.Container}>
            <img
                src={track.albumUrl}
                className={styles.Thumb}
                onClick={handlePlay}
            />
            <div className={styles.Right}>
                <p className={styles.Title}>{track.title}</p>
                <p className={styles.Artist}>{track.artist}</p>
            </div>
        </div>
    )
}

export default TrackSearchResult
