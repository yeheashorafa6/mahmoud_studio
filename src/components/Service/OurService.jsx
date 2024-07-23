import { fetchServicesSec } from '@/lib/data';
import React from 'react'
import Service from './Service';

async function OurService() {
    const initialData = await fetchServicesSec("",1);
    const services = JSON.parse(JSON.stringify(initialData));

    // console.log(services)
  
  return (
    <div>
      <Service services={services}/>
    </div>
  )
}

export default OurService
