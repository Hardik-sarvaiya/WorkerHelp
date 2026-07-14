import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/operations/authAPI";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";



const Dashboard = () => {

  const {loading: authLoading} = useSelector( (state) => state.auth );
  const {loading: profileLoading} = useSelector( (state) => state.profile );

  

  if(profileLoading || authLoading) {
    return (
      <div className="mt-10">
        Loading...
      </div>
    )
  }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
      <Sidebar/>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Dashboard
