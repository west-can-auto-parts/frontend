import React from 'react'
import { PageHeading } from '@/components/page-heading'
import StillHaveQuestions from '../faqs/_components/StillHaveQuestions'

const layout = ({ children }) => {
    return (
        <main className='bg-gray-100 py-2 md:py-4'>
            <PageHeading siteTitle={"Terms & Conditions"} />
            <section className='w-10/12 mx-auto'>
                {children}
                <StillHaveQuestions/>
            </section>
        </main>
    )
}

export default layout