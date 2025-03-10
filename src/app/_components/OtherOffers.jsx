import React from 'react';

const OtherOffers = () => {
    return (
        <section className='py-12'>
            <div className='flex flex-wrap lg:flex-nowrap w-10/12 mx-auto gap-5'>
                {/* Brake Parts Section */}
                <div className="w-full lg:w-1/2 rounded-md overflow-hidden bg-center" style={{ backgroundImage: 'url(https://res.cloudinary.com/dpeocx0yy/image/upload/v1724925037/wx81nzf3dzmepyevdpmf.jpg)', backgroundSize: "cover" }}>
                    <div className="overlay p-10 bg-[#00000095] flex flex-col justify-end text-white h-auto lg:min-h-[75vh]">
                        <p className="text-xl font-semibold mb-5">
                            West Can Auto Parts
                        </p>
                        <p className="text-3xl font-semibold">
                            Brake Parts
                        </p>
                        <p className='text-lg mb-5'>
                            Precision and Safety with Premium Brake Parts.
                        </p>
                        <button className='bg-[#b12b29] rounded-md font-semibold w-fit text-white px-4 py-2'> MORE DETAILS</button>
                    </div>
                </div>

                {/* Other Offers Section */}
                <div className="w-full lg:w-1/2 flex flex-col gap-5 rounded-md overflow-hidden " >
                    {/* Batteries Section */}
                    <div className='h-full bg-center' style={{ backgroundImage: 'url(https://res.cloudinary.com/dpeocx0yy/image/upload/v1724925490/kypmn4m1y6ioufzmnnjo.jpg)', backgroundSize: "cover" }}>
                        <div className='w-full h-full bg-[#00000095] flex flex-col justify-end text-white p-10'>
                            <p className="text-lg font-semibold mb-5">
                                Best Price
                            </p>
                            <p className="text-2xl font-semibold">
                                Reliable Car Batteries
                            </p>
                            <p className='text-lg mb-5'>
                                Power Your Drive with Durable Batteries.
                            </p>
                            <button className='bg-[#b12b29] rounded-md font-semibold w-fit text-white px-4 py-2'> MORE DETAILS</button>
                        </div>
                    </div>

                    {/* Engine Oils Section */}
                    <div className='h-full bg-center' style={{ backgroundImage: 'url(https://res.cloudinary.com/dpeocx0yy/image/upload/v1725353619/welke-motorolie-heb-ik-nodig-5w30-5w40-of-10w40_fcdurn.jpg)', backgroundSize: "cover" }}>
                        <div className='w-full h-full bg-[#00000095] flex flex-col justify-end text-white p-10'>
                            <p className="text-lg font-semibold mb-5">
                                Mega Sale Offer
                            </p>
                            <p className="text-2xl font-semibold">
                                High-Performance Engine Oils
                            </p>
                            <p className='text-lg mb-5'>
                                Keep Your Engine Running Smoothly with Our Premium Oils.
                            </p>
                            <button className='bg-[#b12b29] rounded-md font-semibold w-fit text-white px-4 py-2'> MORE DETAILS</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OtherOffers;
