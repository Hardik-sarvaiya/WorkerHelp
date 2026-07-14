
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updatePassword } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";
import { toast } from "react-hot-toast";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitPasswordForm = async (data) => {
    try {
      await dispatch(updatePassword(token, data));
      toast.success("Password updated successfully");
      reset(); // clear form
    } catch (error) {
      console.error("ERROR MESSAGE -", error.message);
      toast.error(error?.message || "Could not update password");
    }
  };

  return (
    <div className="my-10 rounded-md border border-gray-700 bg-gray-800 p-8 text-white max-w-md mx-auto">
      <h2 className="mb-6 text-xl font-semibold">Update Password</h2>

      <form
        onSubmit={handleSubmit(submitPasswordForm)}
        className="flex flex-col gap-6"
      >
        {/* Old Password */}
        <div>
          <label className="block text-sm mb-1">Old Password</label>
          <div className="block">
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter old password"
              {...register("oldPassword", { required: true })}
              className="w-full rounded-md border border-gray-600 bg-gray-900 p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {/* {showOldPassword ? <AiFillEyeInvisible /> : <BsFillEyeFill />} */}
            </button>
          </div>
          {errors.oldPassword && (
            <span className="text-sm text-red-400">
              Old password is required
            </span>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm mb-1">New Password</label>
          <div className="block">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              {...register("newPassword", { required: true, minLength: 6 })}
              className="w-full rounded-md border border-gray-600 bg-gray-900 p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {/* {showNewPassword ? <AiFillEyeInvisible /> : <BsFillEyeFill />} */}
            </button>
          </div>
          {errors.newPassword && (
            <span className="text-sm text-red-400">
              New password must be at least 6 characters
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <IconBtn type="submit" text="Update Password" />
        </div>
      </form>
    </div>
  );
}
