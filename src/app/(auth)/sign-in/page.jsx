import React from 'react'
// import { getServerSession } from 'next-auth'
// import { authConfig } from '@/lib/auth'

import {SignInForm} from '../_components/sign-in-form'

const page = async () => {
    // const session = await getServerSession(authConfig)
    // console.log("Session :", session)
    return (
        <div className='w-10/12 mx-auto'>
            <SignInForm/>
           
        </div>
    )
}

export default page