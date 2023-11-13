/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from './components/Context'
import ResturantCard from './components/HomePage/ResturantCard'
import { Footer } from './components/Footer'

const Collection = () => {
    const { collectionId } = useParams()
    const { fetchCollection, Collection } = GlobalState()
    useEffect(() => {
        fetchCollection(collectionId)
    }, [collectionId])
    return (
        <>
            <div className='text-2xl text-center space-y-8 my-4 font-bold'>
                <h1>Your Favourite {collectionId} Food's Resturent List:</h1>
                <div className='container m-auto justify-center flex flex-wrap min-h-[65vh]'>
                    {Collection?.length !== 0 ?
                        Collection.map((i, index) => (
                            <div key={index} className='mx-8'>
                                <ResturantCard item={i.info} />
                            </div>
                        ))
                        :
                        <div>We Cant Find Any Resturent in Your Area</div>}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Collection