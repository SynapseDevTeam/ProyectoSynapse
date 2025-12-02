import { Route, Routes, useLocation} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Nav from "./components/Nav"

import LogInPage from "./pages/LogInPage"
import RegisterPage from "./pages/RegisterPage"

import { useUser } from "./context/user/UserContext"

function App() {
  const { user, loading} = useUser();
  const location = useLocation();

  if (loading) return <p>Cargando...</p>

  const noNavRoutes = ["/login", "/register"];
  const showNav = !noNavRoutes.includes(location.pathname);

  return (
    <>
      {showNav && <Nav />}

      <Routes>
        <Route path="/login" element={<LogInPage />}/>
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<ProtectedRoute><h1>Hola , {user?.userName}</h1></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
