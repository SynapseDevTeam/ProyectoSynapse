import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import "./styles/mainStyle.css"

import { ThemeProvider } from "./context/theme/ThemePrivider"
import { UserProvider } from "./context/user/UserProvider"

createRoot(document.getElementById('root')).render(
  <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ThemeProvider>
    </UserProvider>
);
