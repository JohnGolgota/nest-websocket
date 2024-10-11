import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

export default function SocketIOClient() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = io('/')

    socket.on('connect', () => {
      console.log('SocketIO connection established')
      setIsConnected(true)
    })

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    socket.on('disconnect', () => {
      console.log('SocketIO disconnected')
      setIsConnected(false)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const sendMessage = () => {
    const socket = io('/')
    socket.emit('message', inputMessage)
    setInputMessage('')
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SocketIO Client</h1>
      <div className="mb-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter a message"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={!isConnected}
        >
          Send
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Messages:</h2>
        <ul className="list-disc pl-5">
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        Connection status: {isConnected ? 'Connected' : 'Disconnected'}
      </div>
    </div>
  )
}
