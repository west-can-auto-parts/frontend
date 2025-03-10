import { NextResponse, NextRequest } from "next/server";
import FeaturedProducts from "@/models/FeaturedProducts";
import connectDb from '@/lib/connectDb'

export const GET = async (req, res) => {
    try {
        await connectDb()
        const featuredProducts = await FeaturedProducts.find()
        return NextResponse.json({ featuredProducts }, { status: 200 })
    } catch (error) {
        console.error('Internal server error: ', error)
        return NextResponse.json({ message: 'Internal Server error' }, { status: 500 })
    }
}

export const POST = async (req, res) => {
    try {

        const {
            description,
            extendedDescription,
            imageUrls,
            tags,
            category,
            subCategory,
        } = await req.json()
        
        await connectDb({
            description,
            extendedDescription,
            imageUrls,
            tags,
            category,
            subCategory,
        })

        await FeaturedProducts.create({
            description,
            extendedDescription,
            imageUrls,
            tags,
            category,
            subCategory,
        })
        return NextResponse.json({ message: "Featured Product Added" }, { status: 200 })

    } catch (error) {
        console.error('Internal server error: ', error)
        return NextResponse.json({ message: 'Internal Server error' }, { status: 500 })
    }
}