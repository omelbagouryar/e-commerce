import React from 'react'
import Products from '../Products/Products'
import Categories from '../Categories/Categories'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
  return (
    <div>
      <MainSlider/>
  <Categories/>
  <Products/>
    </div>
  )
}
