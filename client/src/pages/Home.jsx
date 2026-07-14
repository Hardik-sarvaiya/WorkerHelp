import React from "react";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import plumber from "../assets/AboutImg/plumber.jpg";
import bghome from "../assets/bghome_svg.png";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import WorkerSection from "../components/core/HomePage/WorkerSection";
import Footer from "../components/common/footer";

const Home = () => {
  return (
    <div>
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to="/signup">
          <div className=" group mt-16 p-1 mx-auto rounded-full bg-gray-800 font-bold text-gray-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center gap-2 rounded-full px-5 py-[2px] transition-all duration-200 group-hover:bg-gray-900">
              <p>Become a Worker</p>
              <GoArrowRight size={22} />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Skills"} />
        </div>

        <div className="mt-4 w-[90%] text-center text-lg font-bold text-gray-300">
          “With WorkerHelp, you can showcase your skills and connect with
          customers from anywhere in the world. Access a wide range of tasks,
          manage your work seamlessly, and receive real-time updates and
          feedback. Fast, secure, and user-friendly, WorkerHelp empowers workers
          to grow, build trust, and unlock new opportunities.”
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Join WorkerHelp
          </CTAButton>

          <CTAButton active={false} linkto={"/catalog"}>
            Workers
          </CTAButton>
        </div>

        <div className="mx-3 my-12 rounded-2xl shadow-lg shadow-blue-400/60 hover:shadow-blue-500/80 transition-shadow duration-300">
          <video muted loop autoPlay className="rounded-xl">
            <source src={Banner} type="Video/mp4" />
          </video>
        </div>
      </div>

      {/*Section 2 */}
      <div className=" homepage_bg bg-pure-greys-5 text-gray-700">
        {/* <div className="homepage_bg h-[250px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 max-auto">
            <div className="h-[70px]"></div>
            <div className="flex flex-row gap-7 text-white translate-x-[5%]">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <GoArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex items-center gap-3">Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div> */}

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 translate-x-[6%]">
          <div className="flex flex-row gap-5 mb-10 mt-10">
            <div className="text-4xl font-semibold w-[45%]">
              Your reliable platform for
              <HighlightText text={"quality work and services."} />
            </div>

            <div className="flex flex-col gap-10 w-[40%] items-start ml-10">
              <div className="text-[16px]">
                WorkerHelp defines the future of work. Today, success requires
                more than skills — it's about trust, opportunity, and real
                connections.
              </div>
              <CTAButton active={true} linkto={"/catalog"}>
                <div>Find Worker</div>
              </CTAButton>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>

      {/*Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent  flex-col items-center justify-between gap-8 first-letter bg-gray-900 text-white mb-20">
        <WorkerSection />

        <h2 className="text-center text-4xl font-semibold mt-30">
          Review From Other Persons
        </h2>


        {/* Rating Star Pattern */}
        <div className="mx-auto w-max flex items-center bg-gray-900 pl-11 pr-4 py-2 min-h-[42px] rounded-full relative mt-6">
          <div className="absolute -left-6 w-14 h-14 rounded-full flex items-center justify-center bg-[#facc15] text-gray-800 text-xl font-bold">
            4.0
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-[#ffc107]"
              viewBox="0 0 24 24"
            >
              <path
                d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"
                data-original="#ffc107"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-[#ffc107]"
              viewBox="0 0 24 24"
            >
              <path
                d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"
                data-original="#ffc107"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-[#ffc107]"
              viewBox="0 0 24 24"
            >
              <path
                d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"
                data-original="#ffc107"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-[#ffc107]"
              viewBox="0 0 24 24"
            >
              <path
                d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"
                data-original="#ffc107"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-[#CED5D8]"
              viewBox="0 0 24 24"
            >
              <path
                d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"
                data-original="#ffc107"
              />
            </svg>
          </div>
        </div>

        {/* Review Slider here */}
        {/* <p className="text-center font-semibold mt-5">Comming soon.....</p> */}
        
      </div>

       {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 py-8 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
