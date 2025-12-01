import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"

import LogInPage from "./pages/LogInPage"
import RegisterPage from "./pages/RegisterPage"

import { ThemeProvider } from "./context/theme/ThemePrivider"

function App() {

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={<LogInPage />}/>
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<ProtectedRoute><h1>Hola , etas dentro</h1></ProtectedRoute>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
