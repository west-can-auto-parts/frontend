import React from 'react';
import Link from 'next/link';
import { FaHome, FaBriefcase, FaUserCog, FaClipboardList, FaWrench, FaBars   } from 'react-icons/fa';
import { AiTwotoneShop } from "react-icons/ai";
import { FaRegPenToSquare } from "react-icons/fa6";
import { GiFountainPen } from 'react-icons/gi';
import { FaPerson, FaUser } from 'react-icons/fa6';

const Navigation = () => {
  const navItems = [
    { icon: FaHome, label: 'Home', href: '/admin' },
    { icon: FaBriefcase, label: 'Jobs', href: '/admin/jobs' },
    { icon: FaClipboardList, label: ' Applications', href: '/admin/job-applications' },
    { icon: FaRegPenToSquare,label:'Product-Enquiry',href:'/admin/product-enquiry'},
    { icon: FaUserCog, label: 'Contacts', href: '/admin/contacts' },
    { icon: GiFountainPen, label: "Blogs", href: '/admin/blogs' },
    // { icon: FaWrench, label: " Products", href: '/admin/products' },
    { icon: FaBars, label:  "Categories", href: '/admin/categories' },
    { icon: FaBars, label:  "Sub-Categories", href: '/admin/subcategories' },
    { icon: FaBars, label:  "Product-Categories", href: '/admin/productcategories' },
    { icon: FaUser, label:  "Users", href: '/admin/user' },
    { icon: FaUser, label:  "AdminProfile", href: '/admin/admin-profile' },
    { icon: AiTwotoneShop, label:  "Suppliers", href: '/admin/suppliers' },
  ];
  return (
    <nav className="w-full p-6 bg-gray-100 h-full shadow-md">
      <ul className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="flex items-center text-gray-700 hover:text-blue-500 text-lg">
              <item.icon className="mr-2" /> {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
