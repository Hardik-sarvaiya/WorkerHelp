import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/AboutImg/plumber.jpg";
import BannerImage2 from "../assets/AboutImg/carpenter.jpg";
import BannerImage3 from "../assets/AboutImg/blacksmith.jpg";
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from "../assets/AboutImg/FoundingStoryImg.jpg";
import StatsComponent from "../components/core/AboutPage/Stats";
import WorkerGrid from "../components/core/AboutPage/WorkerGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/footer";

const About = () => {
  return (
    <div className="mx-auto mt-[60px] text-white">
      <div className="mx-auto w-11/12 max-w-maxContent">
        {/* Section 1 */}
        <section>
          <div className="flex flex-col">
            <header>
              <div className="text-center text-4xl font-semibold">
                WorkerHelp connects skilled workers with <br /> customers for
                <HighlightText text={"fast, easy, and reliable services."} />
              </div>

              <p className="mt-4 w-11/12 text-center text-lg ml-7 font-bold text-gray-300">
                Workers can showcase their skills, experience, and contact
                information, while customers can quickly find trusted
                professionals for any task. The platform ensures smooth, secure,
                and efficient communication, creating a seamless experience for
                everyone. WorkerHelp simplifies the way services are discovered
                and delivered, empowering workers and providing customers with
                reliable solutions in today’s digital world
              </p>
              {/* <div className="flex flex-row gap-x-3 mx-auto items-center ">
                <img src={BannerImage1} />
                <img src={BannerImage2} />
                <img src={BannerImage3} />
              </div> */}
              <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">  
                <img
                  src={BannerImage1}
                  alt="Banner 1"
                  className="w-95 h-98 object-contain"
                />
                <img
                  src={BannerImage2}
                  alt="Banner 2"
                  className="w-100 h-100 object-contain"
                />
                <img
                  src={BannerImage3}
                  alt="Banner 3"
                  className="w-100 h-100 object-contain"
                />
              </div>
            </header>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <div>
            <Quote />
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <div className="flex flex-col w-11/12 max-w-maxContent mx-auto">
            {/* Founding Story wala div */}
            <div className="flex flex-row m-10">
              {/* Fouding Story left box */}
              <div className="flex flex-col w-11/12 max-w-maxContent mx-auto">
                <h1 className="text-2xl lg:text-3xl font-extrabold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-900">
                  ---: Our Founding Story :---
                </h1>
                <p className="font-normal text-[16px] w-[80%] text-gray-500">
                  In today's digital era, finding skilled and trustworthy
                  workers for household and professional tasks remains a
                  challenge. Many workers lack effective platforms to showcase
                  their expertise, while customers often struggle to identify
                  reliable service providers. To bridge this gap, WorkerHelp was
                  created — a seamless platform built using the MERN stack that
                  connects talent with opportunity. Our goal is to empower
                  workers to highlight their skills and experience while making
                  it easy for customers to find trusted professionals quickly
                  and efficiently.
                </p>
                <br />
                <p className="font-normal text-[16px] w-[80%] text-gray-500">
                  By providing detailed worker profiles, secure communication,
                  and a user-friendly interface, WorkerHelp eliminates
                  intermediaries and simplifies the service discovery process.
                  Since its inception, the platform has been dedicated to
                  fostering trust, generating employment opportunities, and
                  enabling reliable access to services. WorkerHelp is not just a
                  platform — it's a smarter, faster, and more connected way to
                  bring workers and customers together.
                </p>
              </div>

              {/* Fouding Story rght box */}
              <div className="w-250 h-100 mt-7">
                <img src={FoundingStory} />
              </div>
            </div>

            {/* Vision and mission wala parent div */}
            <div className="flex flex-row max-w-maxContent mx-auto mt-10">
              {/* left box */}
              <div className="flex flex-col ml-10">
                <h1
                  className="text-2xl lg:text-3xl font-extrabold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300
"
                >
                  Our Vision
                </h1>
                <p className="font-normal text-[16px] w-[80%] text-gray-500">
                  To become the most trusted and accessible digital platform
                  that bridges the gap between skilled workers and customers,
                  empowering communities with reliable services, fostering
                  economic growth, and driving digital inclusion in the modern
                  workforce.
                </p>
              </div>
              {/* right box */}

              <div className="flex flex-col">
                <h1
                  className="text-2xl lg:text-3xl font-extrabold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300
"
                >
                  Our Mission
                </h1>
                <p className="font-normal text-[16px] w-[80%] text-gray-500">
                  Our mission is to empower skilled workers by showcasing their expertise and creating sustainable livelihoods, while helping customers easily connect with trusted professionals through a secure, seamless, and user-friendly platform.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
        {/* Section 4 */}
        <div className="mt-15 w-full">
          <StatsComponent />
        </div>
        

        {/* Section 5 */}
        <section className="mx-auto w-11/12 max-x-maxContent flex flex-col items-center justify-between gap-5 mb-[140px]">
          <WorkerGrid />
          <ContactFormSection />
        </section>
      

      <h2 className="text-center text-4xl font-semibold mt-30">
        Review From Other Customers
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

      <div className="bg-gray-800 border-t border-gray-700 py-8 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default About;



