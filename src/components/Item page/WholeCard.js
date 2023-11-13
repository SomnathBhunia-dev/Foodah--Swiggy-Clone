import React, { useRef, useState } from 'react'
import { GlobalState, imageUrl } from '../Context';

export const WholeCard = ( {FinalItem} ) => {
    const [arrowOpen, setarrowOpen] = useState(true);
    const { toggleBtn, Resturent: { Status } } = GlobalState()
    const arrow = useRef()

    const toggleCategory = () => {
        setarrowOpen((prevState) => !prevState);
    }

    return (
        <>
            {(FinalItem?.length !== 0 && FinalItem.itemCards?.length !==0 )&& <div className='font-bold flex justify-between cursor-pointer' onClick={() => { toggleBtn(arrow); toggleCategory() }}>
                {FinalItem.title} {FinalItem.itemCards ? `(${FinalItem.itemCards.length})` : ''}
                {FinalItem.itemCards ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${arrowOpen ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg> : ''}
            </div>}
            <div className='block' ref={arrow}>
                {FinalItem?.itemCards?.map((item, index) => (
                    <div key={item.card.info.name} >
                        <ItemCard i={item.card.info} Status={Status} />
                        {index !== (FinalItem.itemCards.length - 1) && <hr className='w-full border-2' />}
                    </div>
                ))}
            </div>
        </>
    )
}

export default WholeCard;

export const ItemCard = ({ i, Status }) => {
    const { addToCart, toIndianCurrency } = GlobalState()

    const addedItem = {
        Id: Status.id,
        Name: Status.name,
        area: Status.areaName,
        ImageId: Status.cloudinaryImageId,
        deliveryFee: Status.feeDetails.totalFee,
        Distance: Status.sla.lastMileTravelString,
        CartItem: {
            id: i.id,
            name: i.name,
            price: i.price ? i.price : i.defaultPrice,
            Qty: 1,
            varients: '',
            addOn: ''
        }
    }

    return (
        <div className='flex justify-between py-6 px-4'>
            <div className='w-5/6'>
                {i?.itemAttribute?.vegClassifier !== 'VEG' || i?.isVeg !== 1 ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#BF4C43" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="w-4 h-4"><g clipPath="url(#clip0_835:69870)"><path d="M20 4V16C20 18.26 18.26 20 16 20H4C1.76 20 0 18.26 0 16V4C0 1.74 1.76 0 4 0H16C18.26 0 20 1.74 20 4ZM18.34 4C18.34 2.74 17.26 1.66 16 1.66H4C2.76 1.66 1.66 2.74 1.66 4V16C1.66 17.26 2.76 18.34 4 18.34H16C17.26 18.34 18.34 17.26 18.34 16V4Z"></path><path d="M9.99996 3.75L15.8333 14.5833H4.16663L9.99996 3.75Z"></path></g></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#3AB757" width="13" height="13" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="sc-rbbb40-0 khXxzt"><g clipPath="url(#clip0_835:69868)"><path d="M15 10C15 12.74 12.76 15 10 15C7.24 15 5 12.74 5 10C5 7.26 7.26 5 10 5C12.74 5 15 7.24 15 10ZM20 4V16C20 18.26 18.26 20 16 20H4C1.76 20 0 18.26 0 16V4C0 1.74 1.76 0 4 0H16C18.26 0 20 1.74 20 4V4ZM18.34 4C18.34 2.74 17.26 1.66 16 1.66H4C2.76 1.66 1.66 2.74 1.66 4V16C1.66 17.26 2.76 18.34 4 18.34H16C17.26 18.34 18.34 17.26 18.34 16V4V4Z"></path></g><defs><clipPath id="clip0_835:69868"><rect width="20" height="20"></rect></clipPath></defs></svg>
                }
                <p className='font-bold'>{i.name}</p>
                <p className='font-semibold'>{i.price ? toIndianCurrency(i.price) : toIndianCurrency(i.defaultPrice)}</p>
                <p className='text-sm'>{i.description}</p>
            </div>
            <div className='w-28 h-24'>
                <img src={`${imageUrl}${i.imageId}`} className='h-full rounded border object-cover w-full' alt="" />
                <button className='py-2 px-6 border rounded-lg bg-purple-500 relative left-4 bottom-6 text-white' onClick={() => addToCart(addedItem)}>ADD</button>
            </div>
        </div>
    )
}