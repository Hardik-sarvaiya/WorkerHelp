import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword" 




export default function Settings() {
  return (
    <>
      <div className="ml-15 w-full">
        <h1 className="text-3xl lg:text-4xl font-extrabold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300 ml-4">Edit Profile</h1>

        {/* Change Profile Picture */}
        <ChangeProfilePicture />

        {/* Profile */}
        <EditProfile />

        {/* Password */}
        <UpdatePassword />
        
        {/* Delete Account */}
        <DeleteAccount />
      </div>
      

    </>
  )
}