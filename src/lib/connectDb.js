import mongoose from "mongoose";

const connectDb = async() => {
    try{
        await mongoose.connect("mongodb+srv://ronit:database_0@west-can-auto-0.oajmn.mongodb.net/?retryWrites=true&w=majority&appName=west-can-auto-0"
        )
        console.log("Mongodb Connected Successfully")
    }
    catch (error){
        console.error('Error connect to Database', error.message)
    }
}

export default connectDb