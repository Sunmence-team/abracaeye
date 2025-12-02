import React from 'react'
import { Link } from "react-router-dom"

const AccessDeniedScreen: React.FC = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center text-center'>
      <h3 className='text-2xl font-bold'>Unfortunately, You can't add any post at this time</h3>
      <p>You have to <Link to={"/dashboard/profile"} className='text-light-red underline underline-offset-3'> be a blogger</Link></p>
    </div>
  )
}

export default AccessDeniedScreen