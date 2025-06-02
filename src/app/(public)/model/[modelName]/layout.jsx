import React from 'react'

export async function generateMetadata({ params }) {
  return {
    title:`Shop ${decodeURIComponent(params.category)}`,
  }
}
const layout = ({children}) => {
  return (
    <div className=''>{children}</div>
  )
}

export default layout