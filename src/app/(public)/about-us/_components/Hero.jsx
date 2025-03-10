import React from 'react'

const Hero = () => {
  return (
    <div className='w-full bg-cover bg-no-repeat bg-center' style={{backgroundImage:`url(https://res.cloudinary.com/dpeocx0yy/image/upload/v1726728770/pikaso_texttoimage_images-of-an-auto-parts-store-with-red-white-black_1_glnff3.jpg)`}}>
        <div className="overlay bg-[#00000080] h-[30vh] md:h-[50vh] w-full"></div>
    </div>
  )
}

export default Hero