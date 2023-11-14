import React from 'react'
import { Link } from 'react-router-dom'
import Address from './components/CartPage/Address'
import { GlobalState, imageUrl } from './components/Context'
import StatusDial from './components/CartPage/StatusDial'

const Cart = () => {
  const { Cart, Payment, toIndianCurrency, HandleDec, HandleInc, removeCart, makePayment, statusDial, statusDialMsg } = GlobalState()
  return (
    <div className='container m-auto overflow-hidden'>
      {Cart.CartItem.length === 0
        ?
        <div className='flex flex-col items-center'>
          <img className=" mt-8 w-4/5 md:w-1/2" src="https://sarivillafashion.com/img/images/listing-5/empty-cart.gif" alt="" />
          <Link to="/"><button className=' m-4 text-white bg-indigo-500 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded'>See Resturents Near You</button></Link>
        </div>
        :
        <>
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              <Address />
<<<<<<< HEAD
              <div className='w-fit m-auto'>
=======
              <div className='w-fit m-auto hidden md:block'>
>>>>>>> master
                <button className="mt-6 w-full rounded-md cursor-pointer bg-blue-500 py-1.5 px-4 font-medium text-blue-50 hover:bg-blue-600" onClick={() => makePayment()}>Make Payment</button>
              </div>
            </div>
            {/* <!-- Sub total --> */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-2/5">
              <div className='flex mb-4'>
                <div className='w-24 h-20 mr-4'>
                  <img src={`${imageUrl}${Cart.ImageId}`} className='h-full rounded border object-cover w-full' alt="" />
                </div>
                <div>
                  <h1 className=' text-base text-black font-medium'>{Cart.Name}</h1>
                  <h1 className='text-xs text-gray-700'>{Cart.area}</h1>
                </div>
              </div>
              <div className="rounded-lg">
                {Cart?.CartItem.map((i) => (
                  <div key={i.id} className="flex my-4 items-center">
                    <div className="w-1/2 pr-[5%]">
                      <h2 className="font-normal text-sm text-gray-900 hover:underline">{i.name}</h2>
                    </div>
                    <div className="flex w-1/2">
                      <div className='w-16 flex border h-8 px-1 justify-between items-center'>
                        <span className="cursor-pointer font-semibold text-2xl hover:text-red-500" onClick={() => HandleDec(i.id)}> - </span>
                        <span className="bg-white outline-none font-semibold">{i.Qty}</span>
                        <span className="cursor-pointer text-[120%]  font-semibold hover:text-green-400" onClick={() => HandleInc(i.id)}> + </span>
                      </div>
                      <div className="flex items-center ml-4 w-1/2 justify-between">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={() => { removeCart(i.id) }}>
                          <path strokeLinecap="round" strokeinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p className="text-sm">{toIndianCurrency(i.price)} </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <h1 className='font-bold'>Bill Details</h1>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Item Total</p>
                <p className="text-gray-700">{toIndianCurrency(Payment.itemTotal)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Delivery Fee</p>
                <p className="text-gray-700">{toIndianCurrency(Payment.deliveryFee)}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-gray-700">Platform fee</p>
                <p className="text-gray-700">{toIndianCurrency(Payment.platformFee)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">GST and Restaurant Charges</p>
                <p className="text-gray-700">{toIndianCurrency(Payment.gstFee)}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">{toIndianCurrency(Payment.Total)}</p>
                </div>
              </div>
            </div>
<<<<<<< HEAD
=======
            <div className='w-fit m-auto block md:hidden'>
                <button className="mt-6 w-full rounded-md cursor-pointer bg-blue-500 py-1.5 px-4 font-medium text-blue-50 hover:bg-blue-600" onClick={() => makePayment()}>Make Payment</button>
              </div>
>>>>>>> master
          </div>
        </>}
        {statusDial && <StatusDial status={statusDial} statusType={statusDialMsg} />}
    </div>
  )
}

export default Cart