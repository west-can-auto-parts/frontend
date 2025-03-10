import React from 'react'
import Image from 'next/image'

import loaderGif from '../assets/globals/wcg2.gif'

const loading = () => {
  return (
    <main className='min-h-[100vh] flex w-full items-center justify-center'>
      <Image src={loaderGif} alt='loader' className='w-full' />
    </main>
  )
}

export default loading