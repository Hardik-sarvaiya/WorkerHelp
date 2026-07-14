import React from 'react';
import CTAButton from "../HomePage/Button";
import HighlightText from './HighlightText';
import { GoArrowRight } from "react-icons/go";

const CodeBlocks = ({
  position, heading, subheading, ctabtn1, ctabtn2,img
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      
      {/*Section 1*/}
      <div className='w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='text-gray-300 font-bold'>
          {subheading}
        </div>

        <div className='flex gap-7 mt-7'>

          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
              {ctabtn1.btnText}
              <GoArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              {ctabtn2.btnText}
          </CTAButton>

        </div>

      </div>
      {/*Section 2*/}
      <div className='h-fit flex flex-row'>
        {img}
      </div>  

    </div>
  )
}

export default CodeBlocks
