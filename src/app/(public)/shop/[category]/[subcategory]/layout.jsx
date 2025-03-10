import React from 'react'

export async function generateMetadata({ params }) {
  return {
    title:`Shop ${decodeURIComponent(params.subcategory)}`,
    
  }
}
const layout = ({children}) => {
  return (
    <div className=''>{children}</div>
  )
}

export default layout