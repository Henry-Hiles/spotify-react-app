import config from "config"
import styles from "styles/Login.module.css"
import { FaSpotify } from "react-icons/fa"

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${
    config.clientId
}&response_type=code&redirect_uri=http://localhost:3000&scope=${encodeURIComponent(
    "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state"
)}`
const Login = () => (
    <div className={styles.Container}>
        <a className={styles.LoginButton} href={AUTH_URL}>
            <FaSpotify />
            Login with Spotify
        </a>
    </div>
)

export default Login
