

import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";
import { useEffect } from "react";

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     firstName: user?.firstName || "",
  //     lastName: user?.lastName || "",
  //     email: user?.email || "",
  //     skills: user?.additionalDetails?.skills || "",
  //     city: user?.additionalDetails?.city || "",
  //     location: user?.additionalDetails?.location || "",
  //     experienceYears: user?.additionalDetails?.experienceYears || "",
  //     contactNumber: user?.additionalDetails?.contactNumber || "",
  //     about: user?.additionalDetails?.about || "",
  //   },
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      skills: "",
      city: "",
      location: "",
      experienceYears: "",
      contactNumber: "",
      about: "",
    },
  });

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        skills: user.additionalDetails?.skills || "",
        city: user.additionalDetails?.city || "",
        location: user.additionalDetails?.location || "",
        experienceYears: user.additionalDetails?.experienceYears || "",
        contactNumber: user.additionalDetails?.contactNumber || "",
        about: user.additionalDetails?.about || "",
      });
    }
  }, [user, reset]);

  // ✅ Fixed version
  const submitProfileForm = async (data) => {
    try {
      const payload = {
        ...data,
        experienceYears:
          data.experienceYears !== "" ? Number(data.experienceYears) : 0,
        contactNumber: data.contactNumber || "",
      };

      await dispatch(updateProfile(token, payload));
      navigate("/catalog");
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    <div className="my-10 rounded-md border border-gray-700 bg-gray-800 p-8 text-white">
      <h2 className="mb-6 text-xl font-semibold">Edit Profile</h2>
      <form
        onSubmit={handleSubmit(submitProfileForm)}
        className="flex flex-col gap-6"
      >
        {/* First Name */}
        <div>
          <label className="block text-sm mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
            {...register("firstName", { required: true })}
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2"
          />
          {errors.firstName && (
            <span className="text-sm text-red-400">First name is required</span>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            {...register("lastName")}
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="text"
            placeholder="Enter your Email"
            {...register("email")}
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm mb-1">Skills</label>
          <input
            type="text"
            placeholder="Enter your Skills"
            {...register("skills")}
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm mb-1">City</label>
          <input
            type="text"
            placeholder="Enter your City"
            {...register("city")}
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm mb-1">Location (Address)</label>
          <input
            type="text"
            placeholder="Enter your Location"
            {...register("location")}
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2"
          />
        </div>

        {/* Experience Years */}
        <div>
          <label className="block text-sm mb-1">Experience Years</label>
          <input
            type="number"
            placeholder="Enter your Experience"
            {...register("experienceYears", { required: true, min: 0 })}
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2"
          />
          {errors.experienceYears && (
            <span className="text-sm text-red-400">Experience is required</span>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm mb-1">Contact Number</label>
          <input
            type="tel"
            placeholder="Enter contact number"
            {...register("contactNumber", {
              required: true,
              minLength: 10,
              maxLength: 15,
            })}
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2"
          />
          {errors.contactNumber && (
            <span className="text-sm text-red-400">
              Contact number must be valid
            </span>
          )}
        </div>

        {/* About */}
        <div>
          <label className="block text-sm mb-1">About</label>
          <textarea
            rows="3"
            placeholder="Tell us about yourself"
            {...register("about")}
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2"
          ></textarea>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <IconBtn type="submit" text="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
