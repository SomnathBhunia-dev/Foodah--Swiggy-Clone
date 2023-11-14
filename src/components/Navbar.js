import React from 'react'
import { GlobalState, imageUrl } from './Context'
import logo from './logo.jfif'
import cartLogo from './cart.jfif'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { Cart, Payment, toIndianCurrency } = GlobalState()
  return (
    <>
      <nav className='flex h-20 justify-between items-center p-2 sm:p-4 shadow-md'>
        <div className='w-1/5 flex items-center sm:p-4'>
          <Link to={'/'} className='flex items-center'>
            <img src={logo} alt="logo" className='w-20' />
            <h1 className='font-bold text-purple-800 text-3xl'>Foodah</h1>
          </Link>
        </div>
        <div className='w-1/2 flex justify-end sm:justify-evenly items-center'>
          <ul className='hidden sm:flex w-1/2 justify-between text-base font-medium'>
            <li>Services</li>
            <li>offers</li>
            <li>Help</li>
          </ul>
          <div className='flex sm:p-4 group mb-4'>
            <Link to={'/Cart'}>
              {Cart?.CartItem.length !== 0 && <div className="relative inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full
              left-8 top-4 dark:border-gray-900">{Cart.CartItem.length}</div>}
              <img src={cartLogo} alt="Cart" className='w-12' />
            </Link>
<<<<<<< HEAD
            <div className="group-hover:block absolute right-0 top-20 min-w-[18rem] min-h-[10rem] md:min-h-[10rem] md:min-w-[22rem] md:right-4 bg-purple-300 border pt-10 md:p-10 z-10 rounded-lg mx-4 transition duration-1000 ease-in-out transform hidden shadow-lg">
=======
            <div className="lg:group-hover:block absolute right-0 top-20 min-w-[18rem] min-h-[10rem] md:min-h-[10rem] md:min-w-[22rem] md:right-4 bg-purple-300 border pt-10 md:p-10 z-10 rounded-lg mx-4 transition duration-1000 ease-in-out transform hidden shadow-lg">
>>>>>>> master
              {Cart?.CartItem.length !== 0 ?
                <div>
                  <div className='flex mb-4'>
                    <div className='w-28 h-24 mr-4'>
                      <img src={`${imageUrl}${Cart.ImageId}`} className='h-full rounded border object-cover w-full' alt="" />
                    </div>
                    <div>
                      <h1>{Cart.Name}</h1>
                      <h1>{Cart.area}</h1>
                    </div>
                  </div>
                  <hr />
                  <div className='my-4'>
                    {Cart.CartItem.map((i, index) => (
                      <div key={index} className='flex justify-between'>
                        <p>{i.name.slice(0, 15)}... X {i.Qty}</p>
                        <p>{toIndianCurrency(i.price)}</p>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <div className='flex justify-between'>
                    <p>Subtotal :</p>
                    <p>{toIndianCurrency(Payment.Total)}</p>
                  </div>
                  <p className='text-sm text-[#7e808c] font-light'>inclusive all taxes...</p>
                  <Link to={'/Cart'}>
                    <button className='py-2 px-4 w-4/5 rounded-lg text-purple-700 bg-white hover:bg-purple-700 hover:text-white my-4 mx-auto'>CheckOut</button>
                  </Link>
                </div> : 'Cart Empty'}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Navbar;