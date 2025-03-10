import React from 'react'


import { ImageGallery } from './_components/image-gallery'
import { ProductDescription } from './_components/product-description'
import { RelatedParts } from './_components/related-parts'
import { BreadCrumbs } from './_components/head-links'
import { PartSupplier } from './_components/part-supplier';


import suppliers from '@/datas/suppliers'

const page = ({ params }) => {
  const slug = params.slug;
  function stringToSlug(str) {
    return str
      .toLowerCase()                  // Convert the string to lowercase
      .trim()                         // Remove any leading or trailing whitespace
      .replace(/[^a-z0-9 -]/g, '')    // Remove all non-alphanumeric characters except for spaces and hyphens
      .replace(/\s+/g, '-')           // Replace spaces and consecutive spaces with a single hyphen
      .replace(/--+/g, '-');          // Replace multiple hyphens with a single hyphen
  }

  // Find the part by matching the slug
  const findPartBySlug = () => {
    for (const category of parts) {
      for (const subPart of category.subParts) {
        for (const part of subPart.parts) {
          const partSlug = stringToSlug(part.listing);
          if (partSlug === slug) {
            return {part, subPart, category};
          }
        }
      }
    }
    return null; // Return null if no match is found
  }

  const myProduct = findPartBySlug();

  return (
    <div className='w-10/12 mx-auto flex flex-wrap gap-2 md:gap-4 '>
      <div className="w-full">
        <div className="w-full flex flex-wrap md:flex-nowrap gap-2 md:gap-8">
          <ImageGallery myProduct={myProduct.part} />
          <ProductDescription myProduct={myProduct.part} />
        </div>
        <RelatedParts mySubPart={myProduct.subPart} />
      </div>
      <div className="w-full">
        <PartSupplier mySubPart={myProduct.subPart} suppliers={suppliers} />
      </div>
    </div>
  )
}

export default page