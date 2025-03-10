import React from 'react'

export const ImageGallery = ({ myProduct }) => {
  return (
    <div className="w-full md:w-1/2 md:flex md:flex-nowrap md:flex-row-reverse gap-4">
      <div className="w-full">
        <img src={myProduct.imageUrl1} alt="" srcSet
="" className='w-full h-[30vh] md:h-[40vh] object-cover object-center' />
      </div>
      <div className=" w-full md:w-24 xs:mt-0 sm:mt-2 md:mt-0">
        <div className="flex flex-wrap md:flex-col gap-2">
          <img src={myProduct.imageUrl1} alt="" srcSet
="" className='h-24 w-24 rounded-md object-cover' />
          <img src={myProduct.imageUrl2} alt="" srcSet
="" className='h-24 w-24 rounded-md object-cover' />
          <img src={myProduct.imageUrl3} alt="" srcSet
="" className='h-24 w-24 rounded-md object-cover' />
        </div>
      </div>
    </div>
  )
}
