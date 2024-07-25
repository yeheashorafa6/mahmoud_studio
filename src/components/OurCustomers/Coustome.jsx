import { fetchCustomesSec } from '@/lib/data';
import React from 'react'
import OurCustomers from './OurCustomers';

async function Coustome() {
    const initialData = await fetchCustomesSec("",1);
    const coustome = initialData ? JSON.parse(JSON.stringify(initialData)) : null;

  return (
    <div>
      <OurCustomers coustome={coustome}/>
    </div>
  )
}

export default Coustome
