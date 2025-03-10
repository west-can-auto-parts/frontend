import React from 'react'
import Hero from './_components/Hero'
import AboutWestCan from './_components/AboutWestCan'
import Counter from './_components/Counter'
import HowAreWeDifferent from './_components/HowAreWeDifferent'
import Culture from './_components/Culture'
import Strategy from './_components/Strategy'
const page = () => {
    return (
        <main>
            <Hero />
            <div className='w-10/12 mx-auto flex flex-wrap md:flex-nowrap md:flex-row-reverse items-center pb-12'>
                <AboutWestCan />
                <Counter />
            </div>
            <Strategy/>
            <HowAreWeDifferent/>
            {/* <Culture/> */}
        </main>
    )
}

export default page