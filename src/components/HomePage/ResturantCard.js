import React from 'react'
import { Link } from 'react-router-dom'

const ResturantCard = ({item}) => {
    return (
        <>
            <div className='w-80 h-72 p-2 rounded-2xl mb-8 hover:shadow-2xl font-display'>
                <Link to={`/Resturent/${item.id}`}>
                    <div className='h-[72%]'>
                        <img src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/${item.cloudinaryImageId}`} className='object-cover object-center rounded-2xl w-full h-full block' alt="" />
                    </div>
                    <div className='flex flex-col justify-between pt-2'>
                        <div className='flex flex-row justify-between'>
                            <h1 className='text-xl font-bold'>{(item.name).slice(0, 21)}</h1>
                            <div className='w-10 flex justify-center text-center rounded-lg bg-green-600 text-[0.9rem] h-fit  text-white'>
                                <span>{item.avgRating}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-6">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between text-[0.9rem] h-6'>
                            <p className='font-light w-3/5 overflow-hidden'>{(item.cuisines).slice(0, 5).join(", ")}</p>
                            <p className='font-light'>{item.costForTwo}</p>
                        </div>
                        <div className='flex justify-end'>
                            <p className='font-bold text-[0.8rem]'>{item.sla.slaString}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default ResturantCard;
