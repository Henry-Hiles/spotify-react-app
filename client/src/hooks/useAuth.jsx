import { useEffect, useState } from "react"
const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
    useEffect(() => {
        const run = async () => {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            })
            const json = await response.json()
            setAccessToken(json.accessToken)
            setRefreshToken(json.refreshToken)
            setExpiresIn(json.expiresIn)
            window.history.pushState({}, null, "/")
        }
        run().catch(() => (window.location = "/"))
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const timeout = setInterval(() => {
            const run = async () => {
                const response = await fetch("http://localhost:3001/refresh", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ refreshToken }),
                })
                const json = await response.json()
                setAccessToken(json.accessToken)
                setExpiresIn(json.expiresIn)
                window.history.pushState({}, null, "/")
            }
            run().catch((error) => console.error(error))
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(timeout)
    }, [refreshToken, expiresIn])

    return [accessToken, refreshToken, expiresIn]
}

export default useAuth
