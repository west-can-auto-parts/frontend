import React from 'react'
import WestCanAutoPartsInfo from './_components/WestCanAutoPartsInfo'
import StillHaveQuestions from './_components/StillHaveQuestions'

const page = () => {
  return (
    <main className='py-12 bg-gray-100'>
       <section className="w-10/12 mx-auto">
        <p className="text-2xl font-bold">
            Frequenty Asked Question
        </p>
        <WestCanAutoPartsInfo/>
        <StillHaveQuestions/>
       </section>
    </main>
  )
}

export default page