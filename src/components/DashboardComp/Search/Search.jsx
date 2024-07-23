"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { MdSearch } from 'react-icons/md'
import { useDebouncedCallback } from 'use-debounce';

function Search({placeholder}) {

  const pathname = usePathname();
  const {replace} = useRouter();
  const searchParams=useSearchParams();

  
  const handleSearch = useDebouncedCallback((e)=>{
    const params = new URLSearchParams(searchParams);
  
    params.set("page",1);
    
    if(e.target.value){
      
      params.set('q',e.target.value)
    }else{
      params.delete('q')
    }
    replace(`${pathname}?${params}`)

  })
  return (
        <div className='flex items-center gap-3 bg-[#2e374a] p-3 rounded-xl'>
          <MdSearch/>
          <input type="text" placeholder={placeholder} className='bg-transparent border-none text-[#b7bac1]' onChange={handleSearch}/>
        </div>
  )
}

export default Search
