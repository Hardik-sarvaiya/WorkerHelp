
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeProfilePicture } from "../../../../services/operations/SettingsAPI";
import { toast } from "react-hot-toast";
import { setUserProfile } from "../../../../slices/profileSlice";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // 🖼 Preview selected image
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  useEffect(() => {
    if (imageFile) previewFile(imageFile);
  }, [imageFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleFileUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("displayPicture", imageFile);

    setLoading(true);
    try {
      // 🔹 Dispatch API call
      const updatedUser = await dispatch(changeProfilePicture(token, formData));

      console.log("UPDATED USER ===>", updatedUser);

      if (updatedUser) {
        // 🔹 Update Redux store with backend response
        dispatch(setUserProfile(updatedUser));

        // 🔹 Update preview instantly
        const fullImageUrl =
          updatedUser.image.startsWith("http")
            ? updatedUser.image
            : `http://localhost:3001${updatedUser.image}`; // backend port

        setPreviewSource(fullImageUrl);

        toast.success("Profile picture updated successfully");
      } else {
        toast.error("Failed to update picture — no data returned");
      }
    } catch (error) {
      console.error("CHANGE PROFILE ERROR:", error);
      toast.error("Could not update profile picture");
    } finally {
      setLoading(false);
      setImageFile(null);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-700 bg-gray-800 p-8 px-12 text-gray-50 mt-4">
      <div className="flex items-center gap-x-4">
        <img
          src={
            previewSource ||
            (user?.image?.startsWith("http")
              ? user.image
              : user?.image
              ? `http://localhost:3001${user.image}` // backend port
              : "/default-avatar.png")
          }
          alt={`profile-${user?.firstName || "user"}`}
          className="aspect-square w-[78px] rounded-full object-cover border border-gray-600"
        />

        <div className="space-y-2">
          <p className="font-semibold">Change Profile Picture</p>

          <div className="flex flex-row gap-3">
            <button
              onClick={() => fileInputRef.current.click()}
              className="rounded bg-purple-400 px-3 py-1 text-sm font-medium text-black hover:bg-purple-300"
            >
              Choose
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={handleFileUpload}
              disabled={loading}
              className="rounded bg-pink-500 px-3 py-1 text-sm font-medium text-black hover:bg-pink-300 disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
