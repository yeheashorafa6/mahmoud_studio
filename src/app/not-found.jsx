import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function notFound() {
  return (
<div className="grid h-screen place-content-center bg-white px-4 dark:bg-gray-900">
  <div className="text-center">
    <div className='mx-auto h-56 w-auto rounded-3xl text-black sm:h-64 dark:text-gray-100 relative'>
        <Image src={"/assets/not-found.jpg"} className='rounded-3xl absolute w-full h-full' fill alt='not-found' priority/>
   </div>
    <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
      Uh-oh!
    </h1>

    <p className="mt-4 text-gray-500 dark:text-gray-400">We can&apos;t find that page.</p>

    <Link href="/" className='mt-10 text-primary hover:text-primary-dark transition duration-300'>
        Go back home
    </Link>
  </div>
</div>
  )
}

export default notFound
