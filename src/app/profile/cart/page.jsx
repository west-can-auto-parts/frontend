import React from 'react'

const page = () => {
    const cartItems = [
        {
            id: 1,
            name: 'Car Headlight',
            quantity: 2,
            price: 49.99,
            image: 'https://example.com/images/headlight.jpg'
        },
        {
            id: 2,
            name: 'Car Tire',
            quantity: 4,
            price: 79.99,
            image: 'https://example.com/images/tire.jpg'
        },
        {
            id: 3,
            name: 'Engine Oil',
            quantity: 1,
            price: 29.99,
            image: 'https://example.com/images/engine-oil.jpg'
        }
    ];

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <main className='bg-gray-100 py-12'>
            <div className='w-10/12 mx-auto'>
                <h1 className='text-2xl font-semibold mb-8'>My Cart</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3">
                        {cartItems.map(item => (
                            <div key={item.id} className="bg-white shadow-md rounded-lg flex mb-4 p-4">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                <div className="ml-4 flex-1">
                                    <h4 className="text-lg font-semibold">{item.name}</h4>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    <p className="text-sm font-semibold text-[#b12b29]">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button className="text-red-600 hover:text-red-800">
                                    {/* <FaTrashAlt /> */}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between text-sm mb-2">
                            <p>Subtotal</p>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                            <p>Shipping</p>
                            <p>Free</p>
                        </div>
                        <div className="flex justify-between text-sm font-semibold border-t pt-2">
                            <p>Total</p>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <button className="mt-6 w-full bg-[#b12b29] text-white py-2 rounded-md hover:bg-[#9e2326]">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page