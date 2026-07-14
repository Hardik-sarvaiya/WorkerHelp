import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Leadership.png";
import Logo2 from "../../../assets/TimeLineLogo/Responsibility.png";
import Logo3 from "../../../assets/TimeLineLogo/Flexibility.png";
import Logo4 from "../../../assets/TimeLineLogo/Solve_the_problem.png";
import MainLogo from "../../../assets/workerhelp-logo.jpg"

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Inspiring direction, driving growth",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Committed to trust and reliability",
  },{
    Logo: Logo3,
    heading: "Flexibility",
    Description: "Adapting to every challenge",
  },{
    Logo: Logo4,
    heading: "Solve The Problem",
    Description: "Turning challenges into solutions",
  }
]

const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-row gap-15 items-center'>
        <div className='w-[45%] flex flex-col gap-5 translate-x-[-25%]'>
          {
            timeline.map( (element, index) => {
              return (
                <div className='flex flex-row  gap-7 ' key={index}>
                  <div className='w-[50px] h-[50px] bg-white flex items-center'>
                    <img src={element.Logo} />
                  </div>

                  <div>
                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                    <p className='text-base'>{element.Description}</p>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className='relative'>
          <img 
          src={MainLogo} 
          alt="MainLogo_image"
          className='object-cover h-fit rounded-xl shadow-lg shadow-blue-400/50 transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/70'
          />
        </div>






      </div>
    </div>
  )
}

export default TimelineSection
