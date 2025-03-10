"use client"

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { ImageGallery } from './_components/image-gallery'
import { ProductDescription } from './_components/product-description'
import { RelatedParts } from './_components/related-parts'
import { BreadCrumbs } from './_components/head-links'
import { PartSupplier } from '../_components/part-supplier';
import suppliers from '@/datas/suppliers';

const Page = ({ params }) => {
  const router = useRouter()
  const mainCat = decodeURIComponent(params.part)
  const cat = decodeURIComponent(params.category)
  const product = decodeURIComponent(params.subcategory)
  const myPart = parts.find(p => p.title === mainCat)
  const mySubPart = myPart.subParts.find(cate => cate.listing === cat)
  const myProduct = mySubPart.parts.find(par => par.listing === product)



  return (
    <section>
      <BreadCrumbs mainCat={mainCat} cat={cat} product={product} />
      <div className='w-10/12 mx-auto flex flex-wrap gap-2 md:gap-4 '>
        <div className="w-full">
          <div className="w-full flex flex-wrap md:flex-nowrap gap-2 md:gap-4">
            <ImageGallery myProduct={myProduct} />
            <ProductDescription myProduct={myProduct} />
          </div>
          <RelatedParts mySubPart={mySubPart} />
        </div>
        <div className="w-full">
          <PartSupplier mySubPart={mySubPart} suppliers={suppliers}/>
        </div>
      </div>

    </section>
  );
}

export default Page;
