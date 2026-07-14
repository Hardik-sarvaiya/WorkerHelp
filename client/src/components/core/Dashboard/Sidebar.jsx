

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import SidebarLink from "./SidebarLink";
import ConfirmationModal from "../../common/ConfirmationModal";
import { VscAccount } from "react-icons/vsc";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalData, setModalData] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="mt-10 text-center text-gray-300">
        Loading...
      </div>
    );
  }

  const handleLogoutClick = () => {
    setModalData({
      text1: "Are you sure?",
      text2: "You will be logged out of your account.",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(logout(navigate)),
      btn2Handler: () => setModalData(null),
    });
  };

  return (
    <div className="flex flex-col min-w-[222px] border-r border-gray-700 h-screen overflow-y-auto fixed bg-gray-800 py-10 box-border">
      {/* Sidebar Links */}
      <div className="flex flex-col">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null;
          return <SidebarLink key={link.id} link={link} icon={link.icon} />;
        })}
      </div>

      {/* Divider */}
      <div className="mx-auto my-6 h-[1px] w-10/12 bg-gray-600"></div>

      {/* Settings + Logout */}
      <div className="flex flex-col gap-2 mt-6">
        <SidebarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          icon={VscSettingsGear}
        />
        <button
          type="button"
          onClick={handleLogoutClick}
          className="flex items-center gap-2 px-8 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-all duration-200"
        >
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {modalData && <ConfirmationModal modalData={modalData} />}
    </div>
  );
};

export default Sidebar;
