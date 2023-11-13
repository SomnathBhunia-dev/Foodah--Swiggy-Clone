/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { GlobalState, imageUrl } from '../Context';
import WholeCard from './WholeCard';

const ItemList = () => {
  const [Veg, setVeg] = useState(false)
  const { Resturent: { ItemList }, notConfirm, confirm, popDial } = GlobalState()
  const vegOnly = ItemList?.slice(0, 1)
  const onlyItem = ItemList?.slice(1, ItemList.length - 2)
  const onlyDetails = ItemList?.slice(-2)
  const [FinalItem, setFinalItem] = useState([])
// console.log(onlyDetails)

  const vegFilter = (i, stat) => {
    if (stat) {
      return i.filter((item) => {
        return item.card.info.itemAttribute?.vegClassifier === "VEG" || item.card.info.isVeg === 1
      })
    }
    else {
      return i
    }
  }


  useEffect(() => {
    const sliceItelList = onlyItem.map((item) => {
      if (Veg !== undefined) {
        if (item.card.card.itemCards) {
          const modifiedItem = vegFilter(item.card.card.itemCards, Veg)
          return { ...item.card.card, itemCards: modifiedItem };
        }
        if (item.card.card.categories) {
          const catList = item.card.card.categories.map((cat) => {
            let catItem = vegFilter(cat.itemCards, Veg)
            return { ...cat, itemCards: catItem }
          })
          return { ...item.card.card, categories: catList }
        }
      }
      return item
    })
    setFinalItem(sliceItelList);
  }, [Veg])

  // if (catItem.length === 0) {
  //   return null; // If itemCards in a category is empty, return null
  // }
  // console.log([FinalItem])
  return (
    <>
      <div>
        <div className='flex w-40 h-10 p-1 justify-around'>
          {Veg && (vegOnly && vegOnly.length > 0 && <img src={`${imageUrl}${vegOnly[0].card.card.vegOnlyDetails.imageId}`} className=' h-8 w-10' alt="" />)}
          <p className='font-bold'>Veg Only</p>
          <label className="flex items-center space-x-2 cursor-pointer">
            <span className="relative">
              <input
                type="checkbox"
                className="sr-only"
                id="toggle-switch"
                onChange={() => setVeg(!Veg)}
              />
              <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
            </span>
          </label>
        </div>
        <hr className='w-11/12 border-2' />
        <div>
          {FinalItem?.map((i, index) => (
            <>
              {i.itemCards?.length !== 0 &&
                <div key={i.title} className='p-4'>
                  <WholeCard FinalItem={i} />
                  {i.categories?.map((item, index) => (
                    item.itemCards?.length !== 0 &&
                    <div key={item.title} className='ml-4 my-4'>
                      <WholeCard FinalItem={item} />
                      {i.categories.length > 1 && (index !== i.categories.length - 1 && <hr className='w-full border-2' />)}
                    </div>
                  ))}
                  {index !== onlyItem.length - 1 && <hr className='w-full h-4 bg-[#f1f1f6] mx-auto mt-8' />}
                </div>
              }
            </>
          ))}
        </div>
        {popDial &&
          <div className='w-80 h-fit fixed bottom-0 p-4 bg-purple-400 text-green-700 transform -translate-x-1/2 left-1/2 animate-slide-up'>
            <p className='text-white'>In Cart already have some other item. Do you want to Reset Cart and Add this item?</p>
            <div className='flex w-4/5 justify-around'>
              <button className='px-4 py-2 text-white bg-green-500 hover:bg-yellow-400' onClick={confirm}>Yes</button>
              <button className='px-4 py-2 text-black bg-white hover:bg-red-600' onClick={notConfirm}>No</button>
            </div>
          </div>}
        {onlyDetails && onlyDetails.length !== 0 && onlyDetails[0].card.card &&
          <div className='h-60 bg-[#f1f1f6] p-4'>
            {onlyDetails[0]?.card.card.imageId && 
            <div className='flex items-center mb-4'>
              <img src={`${imageUrl}${onlyDetails[0]?.card.card.imageId}`} className=' h-8 w-14 mr-4' alt="" />
              <p className='text-[#93959f] text-sm'>{onlyDetails[0]?.card.card.text[0]}</p>
            </div>}
            <hr className=' border-2' />
            <div className='text-[#93959f]'>
              <p className='font-bold mb-2'>{onlyDetails[1].card.card.name}</p>
              <div className='flex items-center'>
              <img src="https://cdn-icons-png.flaticon.com/512/64/64113.png" className='w-4 mr-2' alt="" />
              <p className='text-sm'>{onlyDetails[1].card.card.completeAddress}</p>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default ItemList;
