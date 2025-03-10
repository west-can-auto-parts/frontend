import React from 'react'
import StillHaveQuestions from '@/app/(public)/faqs/_components/StillHaveQuestions'
import { PageHeading } from '@/components/page-heading'

const layout = ({children}) => {
  return (
    <main className='py-2 md:py-4 bg-gray-100'>
        <PageHeading siteTitle={"Privacy Policy"}/>
        <section className='w-10/12 mx-auto'>{children}
        <StillHaveQuestions/></section>
    </main>
  )
}

export default layout