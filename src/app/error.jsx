"use client"
import Link from 'next/link'
import React from 'react'

function error() {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
  <div className="text-center">
    <h1 className="text-9xl font-black text-black">404</h1>

    <p className="text-2xl font-bold tracking-tight text-red-900 sm:text-4xl">Uh-oh!</p>

    <p className="mt-4 text-red-600">Something Error.</p>

    <Link
      href="/"
      className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
    >
      Go Back Home
    </Link>
  </div>
</div>
  )
}

export default error
