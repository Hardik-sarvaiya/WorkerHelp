import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 lg:p-14 flex flex-col gap-5 shadow-lg hover:shadow-2xl transition-shadow"'>
      <h1 className="text-3xl lg:text-4xl font-extrabold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-700">
        Get in Touch
      </h1>
      <p className="text-base lg:text-lg font-edu-sa font-bold
              italic text-gray-400">
        We'd love to here for you, Please fill this form.
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
