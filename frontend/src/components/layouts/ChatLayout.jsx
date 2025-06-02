import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const ChatLayout = () => {
  return (
    <div className='p-2'>
        <Header />
        <Outlet />
    </div>
  )
}

export default ChatLayout