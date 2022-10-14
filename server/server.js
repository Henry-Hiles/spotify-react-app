import express from "express"
import SpotifyWebApi from "spotify-web-api-node"
import config from "../config.json" assert { type: "json" }
import cors from "cors"
import bodyParser from "body-parser"
import lyricsFinder from "lyrics-finder"
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post("/refresh", (request, response) => {
    const refreshToken = request.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: config.clientId,
        clientSecret: config.secret,
        refreshToken,
    })

    spotifyApi
        .refreshAccessToken()
        .then((data) => {
            response.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch((error) => {
            console.error(error)
            response.sendStatus(400)
        })
})

app.post("/login", (request, response) => {
    const code = request.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: config.clientId,
        clientSecret: config.secret,
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
            response.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch((error) => {
            console.error(error)
            response.sendStatus(400)
        })
})

app.get("/lyrics", async (request, response) => {
    const lyrics =
        (await lyricsFinder(request.query.artist, request.query.track)) ||
        "No lyrics found."

    response.json({ lyrics })
})

app.listen(3001)
