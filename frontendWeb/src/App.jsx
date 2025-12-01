import { Route, Routes } from "react-router-dom"
import LogInPage from "./pages/LogInPage/LogInPage"
import ProtectedRoute from "./components/ProtectedRoute"
import RegisterPage from "./pages/RegisterPage/RegisterPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LogInPage />}/>
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<ProtectedRoute><h1>Hola , etas dentro</h1></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
