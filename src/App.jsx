import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/Login.jsx'
import GlobalStyles from './globalStyles/GlobalStyles.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <GlobalStyles>
    <Login />
    </GlobalStyles>
  )
}

export default App
