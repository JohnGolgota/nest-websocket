import { useState } from 'react'
import './App.css'
import WebSocketClient from "./components/WebSocketClient"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WebSocketClient />
    </>
  )
}

export default App
