
import React from "react";
import ContactForm from "../components/ContactPage/ContactForm";
import ContactDetails from "../components/ContactPage/ContactDetails";
import Footer from "../components/common/footer";

const Contact = () => {
  return (
    <div className="bg-gray-900 text-gray-100">
      {/* Contact Section */}
      
      <div className="max-w-7xl mx-auto px-6 py-16">  
        <div className="flex flex-row lg:flex-row gap-12">
          {/* Left - Contact Details */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md">
              <ContactDetails />
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="flex-1 flex justify-center">
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div> 

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

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 py-8 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
