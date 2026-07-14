import React from "react";
import HighlightText from "./HighlightText";
import all_workers from "../../../assets/all_workers.png";
import CTAButton from "../HomePage/Button"

const LearningLanguageSection = () => {
  return (
    <div className="mt-[50px] mb-7">
      <div className="flex flex-col gap-3 mr-[15%] items-center">
        <div className="text-4xl font-semibold text-center ">
          Your trusted partner for finding the
          <HighlightText text={"right worker fast"} />
        </div>
        <div className="text-center text-gray-600 mx-auto text-base font-medium w-[70%]">
          Easily connect with verified workers across multiple services, with
          real-time updates, secure bookings, and customer support that keeps
          you stress-free.
        </div>

        <div className="flex items-center justify-center min-h-screen  mt-[-15%]">
          <img
            src={all_workers}
            alt="all_workersImg"
            className="object-contain rounded-2xl border border-gray-200 
               w-[70%] h-[70%] shadow-2xl 
               hover:shadow-pink-400/60 
               transition-transform duration-500 ease-in-out"
          />
        </div>

        <div className="w-fit mt-[-15%] mb-4">
          <CTAButton active={true} linkto={"/catalog"}>
            <div>
              Find Worker
            </div>

          </CTAButton>
        </div>


      </div>
    </div>
  );
};

export default LearningLanguageSection;
