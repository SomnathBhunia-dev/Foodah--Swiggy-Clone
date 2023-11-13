import React, { useState, useRef } from 'react'
import { GlobalState } from './components/Context'
import ResturantCard from './components/HomePage/ResturantCard'
import LoadingState from './components/loading'
import { Link } from 'react-router-dom'
import FilterBy from './components/HomePage/FilterBy'
import { Footer } from './components/Footer'

const Home = () => {
    const { Data, TopDish, Filtered, TopChain, Loading, SortByValue, SortBy } = GlobalState()

    return (
        <>
            {Loading ?
                <LoadingState />
                :
                <div className='container m-auto overflow-hidden'>
                    <div className='flex overflow-x-scroll'>
                        <div className='space-x-4 mb-4 flex justify-start'>
                            {Data.data.cards[0].card.card.imageGridCards?.info.map((i) => (
                                <div key={i.id} className='w-[25rem] h-fit p-4 cursor-pointer' >
                                    <div>
                                        <img src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/${i.imageId}`} alt={i.accessibility.altText} className='w-full h-full block' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h1 className='m-8 font-extrabold text-2xl'>{Data.data.cards[1].card.card.header?.title}</h1>
                    <div className='w-full flex overflow-x-auto'>
                        <div className='flex'>
                            {TopDish && TopDish.map((i) => (
                                <div key={i.id} className='w-36' >
                                    <Link to={`/Collection/${i.action.text}`} >
                                        <img src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/${i.imageId}`} alt={i.accessibility.altText} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h1 className='m-8 font-extrabold text-2xl'>{Data.data.cards[2].card.card.header?.title}</h1>
                    <div className='container flex overflow-x-scroll'>
                        {TopChain && TopChain.map((i, index) => (
                            <div key={index} className='mr-4'>
                                <ResturantCard item={i.info} />
                            </div>
                        ))}
                    </div>
                    <h1 className='m-8 font-extrabold text-2xl'>{Data.data.cards[3].card.card.title}</h1>
                    <div className='flex justify-between m-8 mb-2'>
                        {Data.data.cards[4].card.card.facetList &&
                            <FilterBy Data={Data.data.cards[4].card.card.facetList} />
                        }
                        <div className='lg:flex min-w-fit justify-around items-center hidden'>
                            {Data.data.cards[4].card.card.sortConfigs?.map((i) => (
                                <div key={i.key} className={`cursor-pointer p-2 ${SortBy === i.key ? 'font-bold text-white bg-orange-600 rounded-full' : ''}`} onClick={() => SortByValue(i.key)}>
                                    {i.title}
                                </div>
                            ))}
                        </div>
                        <div className=' block lg:hidden'>
                            <Sort sortingValue={Data.data.cards[4].card.card.sortConfigs} />
                        </div>
                    </div>
                    <hr className='mb-8 border-2' />
                    <div className='flex flex-wrap justify-center'>
                        {Filtered && Filtered.map((i, index) => (
                            <div key={index} className='mx-2 xl:mx-8 '>
                                <ResturantCard item={i.info} />
                            </div>
                        ))}
                    </div>
                <Footer />
                </div>
            }
        </>
    )
}

export default Home;


export const Sort = ({ sortingValue }) => {
    const { toggleBtn, SortByValue, SortBy } = GlobalState()
    const [open, setopen] = useState(true)

    const toggleSortBtn = () => {
        setopen((prevState) => !prevState);
    };

    const sortBtn = useRef()

    return (
        <>
            <div className="flex items-baseline justify-between py-4 sticky top-20 bg-white z-[5]">
                <div className="flex items-center">
                    <div className="relative inline-block text-left">
                        <div>
                            <button type="button" className="border-none group items-center inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="false" onClick={() => { toggleBtn(sortBtn); toggleSortBtn() }}>
                                Sort {SortBy && <span className='bg-orange-600 rounded-full w-2 h-2 mx-1'></span>}
                                <svg className={`${!open ? "transform rotate-180" : ""} -mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="absolute hidden right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1" ref={sortBtn}>
                            <div className="py-1" role="none">
                                {sortingValue?.map((i) => {
                                    return <div key={i.key} className={`${SortBy === i.key ? 'bg-orange-600 font-medium text-white block px-4 py-2 text-sm cursor-pointer hover:bg-orange-600 hover:text-white outline-none' : 'text-gray-500 block px-4 py-2 text-sm cursor-pointer hover:bg-orange-600 hover:text-white'}`} role="menuitem" tabIndex="-1" id="menu-item-0" onClick={() => SortByValue(i.key)}>{i.title}</div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
