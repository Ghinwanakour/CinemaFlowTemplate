import React from 'react'

function MainTitle({ title, title1,title2,title3, description,description1,description2 }) {
  return (
   <div className='ml-auto mr-auto' style={{opacity: '1', filter: 'blur(0)'}}>
    <div className="text-center">
      <h2 className="text-[21px] sm:text-[25px] md:text-5xl/15 font-medium max-w-lg mx-auto mt-0 mb-0 text-text-white tracking-tight">
        {title}
      </h2>
      <h2 className="text-[21px] sm:text-[25px] md:text-5xl/15 font-medium max-w-196.5 mx-auto mt-0 mb-0 text-text-white tracking-tight">
        {title1}
      </h2>
      <h2 className="text-[21px] sm:text-[25px] md:text-5xl/15 font-medium max-w-196.5 mx-auto mt-0 mb-0 text-text-white tracking-tight">
        {title2}
      </h2>
      {description && (
        <p className="mb-0 mt-3 text-[14px] md:text-[18px] mx-auto max-w-162.5 text-text-gray font-medium tracking-tight">
          {description}
        </p>
      )}
      {description1 && (
        <p className="mb-0 mt-3 text-[14px] md:text-[18px] mx-auto max-w-112.5 text-text-gray font-medium tracking-tight">
          {description1}
        </p>
      )}
    </div>
   </div>
  )
}

export default MainTitle