import './App.css'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'

// const socket = io(location.origin.replace(/^http/, 'ws') + "/socket.io")
const socket = io('http://localhost:3000')
// const socket = io('/socket.io')

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', message)
    setMessages([{ from: 'you', body: message }, ...messages])
    setMessage('')
  }

  useEffect(() => {

    const receiveMessage = (data) => {
      setMessages([data, ...messages])
    }

    socket.on('message', receiveMessage)

    return () => {
      socket.off('message', receiveMessage)
    }
  }, [messages])

  return (
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-10'>
        <h1 className='text-2xl font-bold my-2'>Chat App</h1>
        <input type='text' onChange={(e) => setMessage(e.target.value)} value={message} className='border-2 border-zinc-500 p-2 text-black w-full' />
        <button className='bg-blue-500 p-2 text-white'>Send</button>

        <ul className='h-80 overflow-y-auto'>
          {messages.map((message, index) => (
            <li key={index} className={`p-2 my-2 table text-sm rounded-md ${message.from === 'you' ? 'bg-sky-700' : 'bg-black'}`}>
              {message.body}: {message.from}
            </li>
          ))}
        </ul>

      </form>

    </div>
  )
}

export default App