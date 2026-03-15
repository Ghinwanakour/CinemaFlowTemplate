import React from 'react'

const SectionText = ({ title, description, description1 }) => {
  return (
    <div className="max-w-113.5">
      <h3 className="text-[15px] md:text-[30px] font-extrabold text-text-white mb-4 leading-tight tracking-[-0.03em]">
        {title}
      </h3>

      <p className="text-gray-400 text-[14px] md:text-[18px] leading-relaxed">
        {description}
      </p>

      <p className="text-gray-400 text-[14px] md:text-[18px] leading-relaxed">
        {description1}
      </p>
    </div>
  )
}

export default SectionText