import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <FaSpinner className='animate-spin' size={35} />
        </div>
  )
}

export default loading