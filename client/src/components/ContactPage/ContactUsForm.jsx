

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoints } from "../../services/api";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Form Data:", data);
    try {
      setLoading(true);
      // Call backend API
      // const response = await apiConnector("POST", contactusEndpoints.CONTACT_US_API, data);
      const response = { status: "OK" }; // Mock response for now
      console.log("API Response:", response);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
        countrycode: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-4">
        {/* Name Fields */}
        <div className="flex gap-2">
          <div className="flex flex-col flex-1">
            <label htmlFor="firstname">First Name</label>
            <input
              id="firstname"
              placeholder="Enter first name"
              {...register("firstname", { required: "Please enter your first name" })}
              className="bg-gray-800 rounded-md p-2 mt-1"
            />
            {errors.firstname && <span className="text-red-500">{errors.firstname.message}</span>}
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              placeholder="Enter last name"
              {...register("lastname")}
              className="bg-gray-800 rounded-md p-2 mt-1"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            {...register("email", { required: "Please enter your email address" })}
            className="bg-gray-800 rounded-md p-2 mt-1"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phoneNo">Phone Number</label>
          <div className="flex gap-2">
            <select
              {...register("countrycode", { required: "Country code required" })}
              className="bg-gray-800 rounded-md p-2 mt-1 w-[80px]"
            >
              {CountryCode.map((el, idx) => (
                <option key={idx} value={el.code}>
                  {el.code} - {el.country}
                </option>
              ))}
            </select>

            <input
              id="phoneNo"
              type="tel"
              placeholder="12345 67890"
              {...register("phoneNo", {
                required: "Please enter phone number",
                minLength: { value: 8, message: "Phone number too short" },
                maxLength: { value: 15, message: "Phone number too long" },
              })}
              className="bg-gray-800 rounded-md p-2 mt-1 flex-1"
            />
          </div>
          {errors.phoneNo && <span className="text-red-500">{errors.phoneNo.message}</span>}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows={6}
            placeholder="Enter your message"
            {...register("message", { required: "Please enter your message" })}
            className="bg-gray-800 rounded-md p-2 mt-1"
          />
          {errors.message && <span className="text-red-500">{errors.message.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-sky-400 px-6 py-2 text-black font-medium mt-2 hover:bg-sky-500 transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
