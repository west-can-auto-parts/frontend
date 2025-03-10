import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { NewsletterForm } from './news-letter-form';
const Footer = () => {
  const quickLinks = [
    { name: 'Shop All', href: '/categories' },
    { name: 'Our Advantage', href: '/our-advantage' },
    { name: 'Suppliers', href: '/suppliers' },
    { name: 'Locations', href: '/store' },
    { name: 'Careers', href: '/careers' },
    // { name: 'News & Flyers', href: '#' },
    { name: 'WhatsApp Chat', href: 'https://wa.me/16045948800' },
  ];

  const discoverLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about-us' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
    { name: 'FAQs', href: '/faqs' },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/westcanauto' },
    { icon: FaInstagram, href: 'https://instagram.com/westcanautoparts' },
    { icon: FaWhatsapp, href: 'https://wa.me/16045948800' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/company/westcan-auto-parts/?originalSubdomain=ca' },
  ];

  return (
    <div className='bg-[#020202] text-white pt-6 pb-2'>
      <div className='w-10/12 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <div className='col-span-1 mb-4 flex items-center'>
           <Link href={`/`}>
           <img
              src="https://westcanauto.com/wp-content/uploads/2023/05/WestCanAP_logoNOUSI-300x156.png"
              alt="WestCan Auto Logo"
              className='w-full md:w-1/2 pb-4'
            />
           </Link>
            
          </div>

          <div className='col-span-1 mb-4'>
            <h4 className=' font-bold pb-1 mb-1'>Quick Links</h4>
            <ul className='list-none p-0'>
              {quickLinks.map(({ name, href }, index) => (
                <li key={index} className='py-1 text-xs'>
                  <a href={href}>{name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className='col-span-1 mb-4'>
            <h4 className=' font-bold pb-1 mb-1' >Discover</h4>
            <ul className='list-none p-0'>
              {discoverLinks.map(({ name, href }, index) => (
                <li key={index} className='py-1 text-xs'>
                  <a href={href}>{name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className='col-span-1 mb-4'>
              <NewsletterForm/>
          </div>
        </div>
      </div>
      <div className="border-b w-10/12 mx-auto border-[#ffffff50]"></div>
      <div className="w-10/12 mx-auto flex flex-wrap md:flex-nowrap justify-between py-2">
        <p className='text-xs'>Contact Us : info@westcanauto.com</p>
        <p className='text-xs'>
          © 2024 Copyright West Can Auto Parts | All Rights Reserved
        </p>
        <p className='text-xs flex gap-2 list-none'>
          Follow Us
          {socialLinks.map(({ icon: Icon, href }, index) => (
            <span key={index}>
              <a href={href} target='_blank' rel='noopener noreferrer'>
                <Icon size={12} />
              </a>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default Footer;
