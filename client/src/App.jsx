import "./App.css"
import Dashboard from "components/Dashboard"
import Login from "components/Login"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
    return (
        <div className="App">
            {code ? <Dashboard code={code} /> : <Login />}
        </div>
    )
}

export default App
