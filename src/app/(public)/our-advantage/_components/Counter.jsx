import React from 'react'

const Counter = () => {
    const companyStats = [
        {
          label: "Years Experience",
          value: 40
        },
        {
          label: "SKUs",
          value: "1M+"
        },
        {
          label: "Locations",
          value: 11
        },
        {
          label: "Brands",
          value: "1,500+"
        }
      ];
  return (
    <div className='w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 py-6'>
        {companyStats.map((stat, index)=>(
            <div key={index} className='w-full text-center'>
                <p className='text-3xl lg:text-4xl font-bold mb-3'>
                    {stat.value}
                </p>
                <p className='text-gray-500'>
                    {stat.label}
                </p>
            </div>
        ))}
    </div>
  )
}

export default Counter