import { NextResponse } from "next/server";
import ProductCategory from "@/models/ProductCategory";
import connectDb from '@/lib/connectDb'

export const GET = async (req, res) => {
    try {
        await connectDb()
        const productCategories = await ProductCategory.find()
        return NextResponse.json({ productCategories }, { status: 200 })
    } catch (error) {
        console.error("Error getting categories:", error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}

export const POST = async (req, res) => {
    try {
        const {
            title,
            description,
            imageUrls,
            tags,
            category,
            isFeatured,
            isBestSeller,
        } = await req.json()
        await connectDb()

        await ProductCategory.create({
            title,
            description,
            imageUrls,
            tags,
            category,
            isFeatured,
            isBestSeller,
        })

        return NextResponse.json({ message: "Product Category created successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error creating category:", error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}