import React from "react";
import Worker from "../../../assets/Worker.jpg";
import HighlightText from "./HighlightText";
import { GoArrowRight } from "react-icons/go";
import CTAButton from "../HomePage/Button"

const WorkerSection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-row gap-20 items-center">


        <div className="w-[70%] flex justify-center">
          <img
            src={Worker}
            alt="Worker Photo"
            className="rounded-2xl shadow-2xl shadow-indigo-500/40 hover:scale-105 hover:shadow-indigo-400/60 transition-all duration-500 ease-in-out"
          />
        </div>

        <div className="w-[50%] flex flex-col gap-4">

          <div className="text-4xl font-semibold w-[50%]">
            Become an
            <HighlightText text={"Worker"} />
          </div>

          <p className="font-medium text-[16px] w-[80%] text-gray-300">
            Our skilled workers are verified professionals, ready to provide reliable services and connect with customers seamlessly, ensuring quality, trust, and satisfaction every time.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Connect with Customers
                <GoArrowRight />
              </div>
            

            </CTAButton>

          </div>

          

        </div>


      </div>
    </div>
  );
};

export default WorkerSection;
