import { Link } from "react-router-dom"
import AppRouter from "./routes/router"
import LogoutButton from "./components/logoutBtn"

function App() {
  return (
    <div>
      <nav className="bg-gray-200 p-4 flex justify-center gap-4 text-center">
        <Link to="/" className="text-indigo-600 hover:underline">Login</Link>
        <Link to="/dashboard" className="text-indigo-600 hover:underline">Dashboard</Link>
        <LogoutButton  />
      </nav>
      <AppRouter />
    </div>
  )
}

export default App
