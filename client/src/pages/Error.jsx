
import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 text-center px-4">
      <h1 className="text-[120px] font-extrabold text-red-500 drop-shadow-lg">404</h1>
      <h2 className="mt-2 text-3xl font-bold text-white">Page Not Found</h2>
      <p className="mt-3 max-w-md text-gray-400">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-4 inline-block rounded-lg bg-red-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default Error