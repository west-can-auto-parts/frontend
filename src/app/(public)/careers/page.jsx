import React from 'react'
import Hero from './_components/Hero'
import AboutWestCan from './_components/AboutWestCan'
import Counter from './_components/Counter'
import VisionMissionCoreValues from './_components/VisionMissionCoreValues'
import Culture from './_components/Culture'
import Strategy from './_components/Strategy'
import AvailableJobs from './_components/AvailableJobs'
import StillHaveQuestions from './_components/StillHaveQuestions'
import JobApplicationForm from './_components/JobApplicationForm'
const page = () => {
  return (
    <main className='bg-gray-100 min-h-[100vh] pb-12'>
        <Hero/>
        <div className='w-10/12 mx-auto flex flex-wrap md:flex-nowrap items-center pb-12'>
                <AboutWestCan />
                <VisionMissionCoreValues/>
            </div>
        <AvailableJobs/>
        <StillHaveQuestions/>
    </main>
  )
}

export default page