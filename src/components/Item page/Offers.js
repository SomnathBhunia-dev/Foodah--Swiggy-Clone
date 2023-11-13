import React from 'react'
import { GlobalState } from '../Context'

const Offers = () => {
  const { Resturent: { Offers } } = GlobalState()

  return (
    <div className='flex flex-wrap content-start flex-col h-20 overflow-auto mb-4'>
      {Offers.map((i, index) => (
        <div key={index} className='flex w-fit rounded-lg border-2 border-red-500 mr-3 p-2'>
          <OfferTicket offer={i.info} />
        </div>
      ))}
    </div>
  )
}
// {/* <p>Veg Only <input type="radio" /></p> */}

export default Offers;

export const OfferTicket = ({ offer }) => {
  const { header, offerTag, offerTagColor, couponCode, description, descriptionTextColor } = offer
  // offerIds,
  return (
    <>
      <div className='-rotate-90'>
        <p className={`text-[${offerTagColor}] font-bold text-[0.65rem] mb-1`}>{offerTag}</p>
        <hr className='w-11/12 border-2 mx-auto' />
      </div>
      <div className='flex flex-col items-center font-semibold'>
        <div className='flex items-center'>
          <img className='w-5 h-5 mr-2' src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/Store_Assets/Icons/OfferIconCart" alt="" />
          <p className='text-[1.07rem]'>{header}</p>
        </div>
        <div>
          <p className={`text-[${descriptionTextColor}] text-[.86rem]`}>{couponCode}|{description}</p>
        </div>
      </div>
    </>
  )
}
