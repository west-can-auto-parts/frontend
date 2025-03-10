import { NextRequest, NextResponse } from "next/server";
import connectDb from '@/lib/connectDb'
import FeaturedProducts from "@/models/FeaturedProducts";

export const GET = async (req, { params }) => {
    try {
        const { id } = params
        await connectDb()
        const job = await FeaturedProducts.findOne({ _id: id })
        return NextResponse.json({
            job
        }, { status: 200 })
    }
    catch (error) {
        console.log('Error finding a blog: ', error.message)
        return NextResponse.json({ message: "Blog Not Found" }, { status: 404 })
    }


}

export const PATCH = async (req, { params }) => {
    try {
        const { id } = params
        const {
            description,
            extendedDescription,
            imageUrls,
            tags,
            category,
            subCategory,
        } = await req.json()

        const updatedProduct = await FeaturedProducts.findByIdAndUpdate(
            id,
            {
                description,
                extendedDescription,
                imageUrls,
                tags,
                category,
                subCategory,
            },
            {
                new: true,
                runValidators: true,
            }

        )
        if (!updatedProduct) {
            return NextResponse.json({ message: "Error : Product not update" }, { status: 404 })
        }
        return NextResponse.json({ updatedProduct }, { status: 200 })

    } catch (error) {
        console.log('Error finding the product: ', error.message)
        return NextResponse.json({ message: "Product Not Found" }, { status: 404 })

    }
}

export const DELETE = async (req, { params }) => {
    try {
        const { id } = params
        const deletedProduct = await FeaturedProducts.findByIdAndDelete(id)
        if (!deletedProduct) {
            return NextResponse.json({
                message: "error deleting product"
            }, { status: 404 })
        }
        return NextResponse.json({ deletedProduct }, { status: 200 })
    } catch (error) {
        console.error("Error deleting Job: ", error)
        return NextResponse({ message: "error deleting job" }, { status: 500 })
    }
}