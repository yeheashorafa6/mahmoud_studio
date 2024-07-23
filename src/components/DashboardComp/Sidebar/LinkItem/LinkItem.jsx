"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function LinkItem({list}) {
    const path = usePathname();
  return (
    <Link href={list.path} className={`${path === list.path && 'bg-[#2e374a]'} flex gap-x-3 items-center hover:bg-[#7d828d] transition-all duration-300 rounded-lg p-5`}>
    <span>{list.icon}</span>
    {list.title}
    </Link>
  )
}

export default LinkItem
