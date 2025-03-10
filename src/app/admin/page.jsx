import React from 'react'
import { auth } from '@/auth'

const page = async() => {
const session = await auth()

  return (
    <div>
      <p className="text-2xl font-bold">
        Hello {session?.user?.name}!
      </p>
      <p className='text-sm'>
        Hope You're Having A Productive Day
      </p>
    </div>
  )
}

export default page