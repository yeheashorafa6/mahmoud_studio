import Image from 'next/image'
import React from 'react'

function FooterDashboard() {
  return (
    <div className='container mx-auto'>
      <div className='flex justify-between py-12 w-full'>
        <div>
          <Image src={"/assets/footerLogo.png"} width={120} height={70} alt='footerlogo' priority/>
        </div>
        <div>
          <p className='text-xs'>Copyright © 2024. All rights reserved. </p>
        </div>
      </div>
    </div>
  )
}

export default FooterDashboard
