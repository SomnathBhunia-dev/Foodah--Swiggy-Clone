import React, { useEffect, useRef, useState } from 'react'
import { GlobalState } from '../Context'
import FilterBar from './FilterBar'

const FilterBy = ({ Data }) => {
    const [Index, setIndex] = useState({ index: 0, Label: 'deliveryTime' })
    const filterBtn = useRef()
    const { toggleBtn, FilterByValue, FilterBy, clearFilterValue, filterCheck } = GlobalState()
    const [prevFilter, setprevFilter] = useState({ ...FilterBy })

    const filterOnChange = (e) => {
        let update = filterCheck(e, prevFilter)
        setprevFilter(update);
    }

    useEffect(() => {
        setprevFilter(FilterBy)
    }, [FilterBy])
    return (
        <>
            <div className='flex w-3/5 lg:max-xl:w-1/3 xl:w-1/2'>
                <div onClick={() => toggleBtn(filterBtn)} className='flex w-24 h-fit rounded-3xl items-center justify-evenly p-2 border-gray-400 border-2 cursor-pointer'>
                    Filter <svg width="16" height="17" viewBox="0 0 16 17" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><path fillRule="evenodd" clipRule="evenodd" d="M13.3996 5.99897C13.3996 6.66172 12.8623 7.19897 12.1996 7.19897C11.5368 7.19897 10.9996 6.66172 10.9996 5.99897C10.9996 5.33623 11.5368 4.79897 12.1996 4.79897C12.8623 4.79897 13.3996 5.33623 13.3996 5.99897ZM14.9996 5.99897C14.9996 7.54537 13.746 8.79897 12.1996 8.79897C10.9311 8.79897 9.85962 7.95547 9.51546 6.79878L1.80875 6.79878C1.36692 6.79878 1.00875 6.44061 1.00875 5.99878C1.00875 5.55695 1.36692 5.19878 1.80875 5.19878L9.51558 5.19878C9.85986 4.04228 10.9312 3.19897 12.1996 3.19897C13.746 3.19897 14.9996 4.45258 14.9996 5.99897ZM3.8 13.4527C3.13726 13.4527 2.6 12.9154 2.6 12.2527C2.6 11.59 3.13726 11.0527 3.8 11.0527C4.46274 11.0527 5 11.59 5 12.2527C5 12.9154 4.46274 13.4527 3.8 13.4527ZM3.8 15.0527C2.2536 15.0527 1 13.7991 1 12.2527C1 10.7063 2.2536 9.45271 3.8 9.45271C5.0683 9.45271 6.13964 10.296 6.48396 11.4524H14.1953C14.6372 11.4524 14.9953 11.8106 14.9953 12.2524C14.9953 12.6942 14.6372 13.0524 14.1953 13.0524H6.48414C6.14001 14.2092 5.06852 15.0527 3.8 15.0527Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92"></path></svg>
                    {Object.keys(FilterBy).length > 0 && ( <span className='bg-orange-600 rounded-full w-4 h-4 text-white text-center font-bold text-xs mx-1'> {Object.keys(FilterBy).reduce((total, key) => total + FilterBy[key].length, 0)} </span> )}
                </div>
                <div className='overflow-x-scroll'>
                    {Object.keys(FilterBy).length > 0 && <FilterBar data={FilterBy} handleClick={filterOnChange} />}
                </div>
            </div>
            <div className='w-[85%] lg:w-2/3 h-fit bg-white hidden fixed shadow-2xl rounded-2xl left-[8%] lg:left-[15%] z-50 top-1/4' ref={filterBtn}>
                <div onClick={() => toggleBtn(filterBtn)} className='w-fit p-2 rounded-2xl cursor-pointer bg-white absolute top-4 right-6'>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.75729 1.75736L5.99993 6M10.2426 10.2426L5.99993 6M5.99993 6L10.2426 1.75736M5.99993 6L1.75729 10.2426" stroke="#02060C" strokeOpacity="0.6" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                <div className='flex pt-4'>
                    <div className='w-52 border-r-2 border-red-500'>
                        {Data.map((option, index) => (
                            <div key={index} className={`cursor-pointer py-2  ${Index.index === index ? 'border-l-4 border-red-500' : ''}`} onClick={() => setIndex({ index, Label: option.id })}>
                                <p className='pl-4'>{option.label}</p>
                            </div>
                        ))}
                    </div>
                    <div className='overflow-y-scroll w-full h-64 ml-4 py-2 space-y-2 container-snap'>
                        {Data[Index.index].facetInfo?.map((i) => (
                            <div key={i.id} className='cursor-pointer space-x-2 flex'>
                                <input type="checkbox" name={Index.Label} value={i.label} onChange={filterOnChange} checked={prevFilter[Index.Label]?.includes(i.label)} />
                                <label>{i.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='h-16 space-x-4 flex justify-end items-center mx-4'>
                    <button className='px-4 py-2 bg-white text-purple-600 rounded-md' onClick={() => { clearFilterValue(); toggleBtn(filterBtn); setprevFilter({}) }}>Clear Filters</button>
                    <button className='px-4 py-2 bg-purple-600 text-white rounded-md' onClick={() => { FilterByValue(prevFilter); toggleBtn(filterBtn) }}>Apply</button>
                </div>
            </div>
        </>
    )
}

export default FilterBy;