import React from 'react'

import { PageHeading } from '@/components/page-heading'

const layout = ({ children }) => {
  return (
    <div className='bg-gray-100'>
      <PageHeading siteTitle={"Blogs"} />
      {children}
    </div>
  )
}

export default layout