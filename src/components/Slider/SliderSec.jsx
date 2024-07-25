import React from 'react'
import Slider from './Slider';
import {  fetchSlidesSec } from '@/lib/data';

async function SliderSec() {
    
  const q = "";
  const page = 1;

  const  slide  = await fetchSlidesSec(q, page);
  const SlideData =await JSON.parse(JSON.stringify(slide));

  return (
    <div>

        <Slider slideData={SlideData}/>
      
    </div>
  )
}

export default SliderSec
