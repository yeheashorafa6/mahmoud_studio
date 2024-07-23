import React from 'react'

function Title({title}) {
  return (
    <div className="justify-center items-center flex mt-20 mb-6">
        {/* <div className="shapeImg bg-dot w-5 h-5 bg-center bg-no-repeat rounded-full " /> */}
        <h1 className="text-3xl font-semibold ml-2 text-primary dark:text-[#FED000]">{title}</h1>
    </div>
  )
}

export default Title
