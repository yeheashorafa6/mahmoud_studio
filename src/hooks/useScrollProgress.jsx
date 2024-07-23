"use client"
import React, { useEffect, useState } from 'react'

function useScrollProgress() {
    const [completion , setCompletion]=useState();

    useEffect(()=>{
        const updateScrollCompletion=()=>{
            const currentProgress= window.scrollY;
            const scrollHeight =document.body.scrollHeight - window.innerHeight;
            
            if (scrollHeight) {
                setCompletion(Number(currentProgress / scrollHeight).toFixed(2) * 100);
            }
        }

        // EVENT
        addEventListener('scroll', updateScrollCompletion);

        // cleanup
        return ()=>window.removeEventListener('scroll', updateScrollCompletion);
    },[])
  return completion
}

export default useScrollProgress
