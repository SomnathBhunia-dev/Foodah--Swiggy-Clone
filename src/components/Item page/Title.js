import React from 'react'
import { GlobalState } from '../Context'

const Title = () => {
  const { Resturent: { Status } } = GlobalState()

  const { name, cuisines, areaName, totalRatingsString, avgRating, costForTwoMessage, availability } = Status

  return (
    <>
      <div className='flex justify-between p-4'>
        <div>
          <p className='text-3xl'>{name}</p>
          <p className='text-sm'>{cuisines}</p>
          <p className='text-sm'>{areaName}</p>
        </div>
        <div className='flex flex-col items-center justify-around p-2 border-2 border-green-600 rounded-lg w-[4.9rem]'>
          <div className='flex text-green-600 font-bold'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-6">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            {avgRating}
          </div>
          <hr className='w-11/12 border-2' />
          <div className='text-[0.7rem] text-center'>
            {totalRatingsString}
          </div>
        </div>
      </div>
      <hr className='w-11/12 border-2 mx-auto' />
      <div className='p-2 flex justify-around w-80'>
        <div className='flex items-center'>
          <svg className='mr-3' width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none"><circle r="8.35" transform="matrix(-1 0 0 1 9 9)" stroke="#3E4152" strokeWidth="1.3"></circle><path d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z" fill="#3E4152"></path></svg>
          {availability && availability.opened && 'Opened'}
        </div>
        <div className='flex items-center'>
          <svg className="mr-3" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none"><circle cx="9" cy="9" r="8.25" stroke="#3E4152" strokeWidth="1.5"></circle><path d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z" fill="#3E4152"></path></svg> {costForTwoMessage}
        </div>
      </div>
    </>
  )
}

export default Title