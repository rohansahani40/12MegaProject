import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'

const Logoutbtn = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        authService.logout().then(() => {
          dispatch(logout())
        })
        
    }


  return (
   <button
    className='inline-block bg-red-500 text-white px-4 py-2  hover:bg-red-600 transition duration-300 ease-in-out rounded-full'
   >Logout</button>
  )
}

export default Logoutbtn
