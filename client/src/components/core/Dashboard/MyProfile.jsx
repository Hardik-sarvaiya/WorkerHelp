
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {
  const { user: reduxUser } = useSelector((state) => state.profile);
  const [user, setUser] = useState(reduxUser || null);
  const navigate = useNavigate();

  // Load from localStorage if Redux user is null
  useEffect(() => {
    if (!reduxUser) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } else {
      setUser(reduxUser);
      // Save to localStorage whenever Redux state updates
      localStorage.setItem("user", JSON.stringify(reduxUser));
    }
  }, [reduxUser]);

  if (!user) return <p className="text-white mt-5 text-center">Loading...</p>;

  return (
    <div className="text-white mt-1 gap-5">
      <h1 className="text-3xl lg:text-4xl font-extrabold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300 ml-4">
        My Profile
      </h1>

      {/* Section 1: Profile Card */}
      <div className="flex items-center justify-between bg-richblack-800 p-6 rounded-md border border-richblack-700 m-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div>
            <p className="text-xl font-bold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn text="Edit" onClick={() => navigate("/dashboard/settings")} />
      </div>

      {/* Section 2: About */}
      <div className="flex items-center justify-between bg-richblack-800 p-6 rounded-md border border-richblack-700 m-4">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">About</p>
            <IconBtn
              text="Edit"
              onClick={() => navigate("/dashboard/settings")}
            />
          </div>
          <p className="text-sm text-richblack-300">
            {user?.additionalDetails?.about ?? "Write Something About Yourself"}
          </p>
        </div>
      </div>

      {/* Section 3: Personal Details */}
      <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700 m-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold">Personal Details</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
            className={"text-bold"}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-400">First Name</p>
            <p>{user?.firstName}</p>
          </div>
          <div>
            <p className="text-gray-400">Last Name</p>
            <p>{user?.lastName}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p>{user?.email}</p>
          </div>
           <div>
            <p className="text-gray-400">Skiils</p>
            <p>{user?.additionalDetails?.skills ?? "Add Your Skills"}</p>
          </div>
           <div>
            <p className="text-gray-400">City</p>
            <p>{user?.additionalDetails?.city ?? "Add Your City"}</p>
          </div>
           <div>
            <p className="text-gray-400">Location(Address)</p>
            <p>{user?.additionalDetails?.location ?? "Add Your Location"}</p>
          </div>
           <div>
            <p className="text-gray-400">ExperienceYear</p>
            <p>{user?.additionalDetails?.experienceYear ?? "Add Your ExperienceYear"}</p>
          </div>
          <div>
            <p className="text-gray-400">Contact Number</p>
            <p>
              {user?.additionalDetails?.contactNumber ?? "Add Your Contact Number"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

