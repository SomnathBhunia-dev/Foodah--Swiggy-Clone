/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from './components/Context'
import Title from './components/Item page/Title'
import Offers from './components/Item page/Offers'
import ItemList from './components/Item page/ItemList'
import LoadingState from './components/loading'

const ItemPage = () => {
  const { fetchResturant, Resturent, Loading } = GlobalState()
  const { productId } = useParams()
  useEffect(() => {
    fetchResturant(productId)
  }, [productId])
  return (
    <>
      {Loading ?
        <LoadingState />
        :
        <div className='container mx-auto max-w-[1024px]'>
          {Resturent.name}
          <Title />
          <Offers />
          <ItemList />
        </div>
      }
    </>
  )
}

export default ItemPage