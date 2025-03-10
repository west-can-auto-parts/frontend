"use client"
import React from 'react';
import { FaPhone } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const page = () => {
    const router = useRouter()
    const locations = [
        {
            id: 1,
            name: 'West Can Auto Parts - Abbotsford',
            address: '33406 South Fraser Way Abbotsford, BC V2S 2B5',
            phone: '(604) 853-2218',
            position: [49.048, -122.300],
            description: 'Our auto parts Abbotsford store features an exclusive range of quality industrial equipment, safety supplies, accessories, tools, and car parts that you can access anytime.',
            imgUrl: 'https://westcanauto.com/wp-content/uploads/2023/05/Screenshot-6.png'
        },
        {
            id: 2,
            name: 'West Can Auto Parts - Langley',
            address: '20529 62 Ave Langley, BC V3A 8R4',
            phone: '(604) 530-7278',
            position: [49.1025, -122.6604],
            description: 'Our Langley store is equipped with an extensive range of car parts, fluid & chemicals, tools & equipment and other industrial and safety supply needs.',
            imgUrl: "https://westcanauto.com/wp-content/uploads/2023/05/image-006.png"
        },
        {
            id: 3,
            name: 'West Can Auto Parts - White Rock',
            address: '15515 24 Ave Surrey, BC V4A 2J4',
            phone: '(604) 531 8254',
            position: [49.0433, -122.793],
            description: 'Looking for an auto parts supplier might seem like hard work. Don’t hesitate to stop by our White Rock location. An auto parts supplier that has a good record of keeping the most essential and easily worn-down parts in stock.',
            imgUrl: "https://westcanauto.com/wp-content/uploads/2023/05/image-009.png"
        },
        {
            id: 4,
            name: 'West Can Auto Parts - Surrey',
            address: '8565 132 St Surrey, BC V3W 4N8',
            phone: '(604) 594 8800',
            position: [49.158, -122.842],
            description: 'We have carved a niche in delivering quality car parts. Our outstanding auto parts store at Surrey has years of trusted experience and the ability to keep pace with the constantly changing business environment.',
            imgUrl: "https://westcanauto.com/wp-content/uploads/2023/05/thumbnail-e1707221726587.jpeg"
        },
        {
            id: 5,
            name: 'West Can Auto Parts - Port Coquitlam',
            address: '2549 Kingsway Ave, Port Coquitlam, BC V3C 1T5',
            phone: '(604) 464-6677',
            position: [49.255, -122.765],
            description: 'Whether you are looking for metric fasteners, eco-friendly hydraulic oil, brakes for your 1 ton truck, or oil and filters for family runabouts, Westcan Auto Parts is a one stop shop for all your automotive needs.',
            imgUrl: "https://westcanauto.com/wp-content/uploads/2023/05/image-007.png"
        },
        {
            id: 6,
            name: 'West Can Auto Parts - Coquitlam',
            address: '820 Henderson Avenue Coquitlam, BC V3K 1P2',
            phone: '(604) 936-1466',
            position: [49.237, -122.856],
            description: 'Our car parts Coquitlam store meets everyone’s demands presenting all our best quality automotive, and industrial supply needs all under a single roof.',
            imgUrl: "https://westcanauto.com/wp-content/uploads/2023/05/image-004.png"
        },
        {
            id: 7,
            name: 'West Can Auto Parts - Burnaby, Imperial Street',
            address: '5140 Imperial Street Burnaby, BC V5J 1E2',
            phone: '(604) 434-7707',
            position: [49.221, -123.003],
            description: 'West Can Auto Parts Burnaby store features extensive inventory offering premium quality auto part brands that are popular for providing excellence.',
            imgUrl: "https://westcanauto.com/wp-content/uploads/2023/05/image-003.png"
        },
        {
            id: 8,
            name: 'West Can Auto Parts (Warehouse) - Coquitlam',
            address: '91 Glacier St, Coquitlam, BC V3K 5Z1',
            position: [49.236, -122.816],
            description: 'Our comprehensive inventory flooded with a line of quality products encompasses a quality assured brand that every client searches for in the market.',
            imgUrl: "https://westcanauto.com/wp-content/uploads/2023/05/image-005.png"
        },
        {
            id: 9,
            name: 'West Can Auto Parts - Burnaby',
            address: '7788 Edmonds Street Burnaby, BC V3N 1B9',
            phone: '(604) 630-7722',
            position: [49.214, -122.950],
            description: 'Our Home Hardware store in Burnaby catches everyone’s attention at a single glance as it features hundreds of top-line accessories that set a perfect example of prioritizing the customer\'s needs.',
            imgUrl: "https://westcanauto.com/wp-content/uploads/2023/05/image-002.png"
        },
        {
            id: 10,
            name: 'West Can Auto Parts - Richmond',
            address: '11211 Bridgeport Rd Richmond, V6X 1T3',
            phone: '(604) 276 2999',
            position: [49.190, -123.131],
            description: 'Our comprehensive inventory flooded with a line of quality products encompasses a quality assured brand that every client searches for in the market.',
            imgUrl: "https://westcanauto.com/wp-content/uploads/2023/05/image-008.png"
        }
    ];

    return (
        <main className='bg-gray-100 py-12'>
            <section className=''>
                <p className="w-10/12 mx-auto text-2xl mb-6 font-bold">Our Stores</p>
                <div className="flex flex-wrap md:flex-nowrap gap-8 w-10/12 mx-auto items-start">
                    <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {locations.map(blog => (
                            <div key={blog.id} className="mb-6 h-full group" onClick={()=>router.push(`/store/${blog.id}`)}>
                                <div className='bg-white shadow-md rounded-lg flex flex-col h-full'>
                                    <img src={blog.imgUrl} alt={blog.name} className="w-full h-[25vh] object-cover mb-4 rounded-t" />
                                    <p className="font-semibold text-xs bg-white w-fit text-[#b12b29] px-4 py-1 rounded-md mt-[-30px]">{blog.address}</p>
                                    <div className='p-4 flex flex-1 flex-col'>
                                        {/* <p className="text-xs text-gray-500 mb-4"> {blog.address} </p> */}
                                        <button className='w-fit'><h4 className="text-lg font-semibold mb-2 group-hover:underline">{blog.name}</h4></button>
                                        <p className="text-sm text-gray-600 mb-2">{blog.description}</p>
                                        <Link href={`/store/${blog.id}`}>
                                        <p className="text-[#b12b29] hover:underline mt-auto">Know More</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-1/4 top-3 bg-[#b12b29] text-white sticky shadow-md p-4 rounded-lg h-auto">
                        <h2 className="text-lg font-semibold mb-4">Locations & Contact</h2>
                        <ul className="space-y-4">
                            {locations.map(location => (
                                <li key={location.id} className="text-sm mb-3">
                                    <p className="font-semibold">{location.name}</p>
                                    <p className='mb-3'>{location.address}</p>
                                    {/* <p>{location.phone}</p> */}
                                    <button className='bg-white text-[#b12b29] px-4 py-1 mb-3'>
                                    <a href={`tel:${location.phone}`} className=" hover:underline flex justify-between items-center gap-1">Call Store <FaPhone className='h-3 w-3'/></a>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default page;
