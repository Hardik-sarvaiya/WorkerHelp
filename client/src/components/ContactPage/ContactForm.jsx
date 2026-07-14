import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactForm = () => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 lg:p-14 flex flex-col gap-5 shadow-lg hover:shadow-2xl transition-shadow">
      
      {/* Heading */}
      <h1 className="text-3xl lg:text-4xl font-extrabold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-700">
        Got an Idea? <br /> We've got the skills. <br /> Let's team up 🚀
      </h1>  

      {/* Subtext */}
      <p className=" text-base lg:text-lg font-edu-sa font-bold
              italic text-gray-400">
        Tell us more about yourself and what you've got in mind. 
        We'd love to bring your vision to life!
      </p>

      {/* Form */}
      <div className="mt-6">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactForm

