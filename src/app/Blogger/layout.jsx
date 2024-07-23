import React from 'react'
import BloggerTabs from './Tabs/BloggerTabs'

function layout({children}) {
  return (
    <div>
        <main className='flex-1'>
         {children}      
        </main>
    </div>
  )
}

export default layout
