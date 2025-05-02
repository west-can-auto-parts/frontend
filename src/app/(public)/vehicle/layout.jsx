import React from 'react'

import { PageHeading } from '@/components/page-heading'

const layout = ({ children }) => {
  return (
    <main >
      {/* <PageHeading siteTitle={"Suppliers"} /> */}
      {children}
    </main>
  )
}

export default layout