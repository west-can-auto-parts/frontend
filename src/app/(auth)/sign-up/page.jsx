import React from 'react'
// import { getServerSession } from 'next-auth'
// import { authConfig } from '@/lib/auth'

import {SignUpForm} from '../_components/sign-up-form'

const page = async () => {
    // const session = await getServerSession(authConfig)
    // console.log("Session :", session)
    return (
        <div className='w-10/12 mx-auto'>
            <SignUpForm/>
           
        </div>
    )
}

export default page