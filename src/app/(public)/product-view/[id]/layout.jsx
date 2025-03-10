import CurrentDeals from '@/app/_components/CurrentDeals'
import FeaturedProducts from '@/app/_components/FeaturedProducts'
import OtherOffers from '@/app/_components/OtherOffers'
import React from 'react'

const layout = ({children}) => {
  return (
    <main>
        {children}
        <FeaturedProducts/>
        <OtherOffers/>

    </main>
  )
}

export default layout