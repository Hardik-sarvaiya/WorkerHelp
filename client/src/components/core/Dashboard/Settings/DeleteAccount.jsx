

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../../services/operations/SettingsAPI"; // API thunk
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";

const DeleteAccount = () => {
  const token = useSelector(state => state.auth.token) || localStorage.getItem("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);

  // Edited handleConfirmDelete:
  // 1. Checks if token exists
  // 2. Uses async/await with try/catch
  // 3. Shows proper toasts
  // 4. Ensures loading state is correct
  const handleConfirmDelete = async () => {
    if (!token) {
      toast.error("You must be logged in to delete your account");
      closeConfirm();
      return;
    }

    setLoading(true);
    try {
      // Dispatch deleteProfile thunk and wait for completion
      await dispatch(deleteProfile(token, navigate));
      // No need for additional navigation here, deleteProfile handles it
    } catch (err) {
      console.error("DELETE PROFILE ERROR:", err);
      toast.error(err?.response?.data?.message || err?.message || "Could not delete account. Try again later.");
    } finally {
      setLoading(false);
      closeConfirm();
    }
  };

  return (
    <>
      {/* Delete Account Card */}
      <div className="my-10 flex flex-row gap-x-5 rounded-md border border-pink-700 bg-pink-900 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-400" />
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-50">Delete Account</h2>

            {/*Edited button */}
            <button
              onClick={openConfirm}
              disabled={loading}
              className="ml-4 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              aria-label="Delete account"
            >
              {loading ? "Deleting..." : "Delete Account"}
            </button>
          </div>

          <p className="w-3/5 text-pink-200">
            Deleting your account will permanently remove your profile and all
            associated data. This action cannot be undone.
          </p>
        </div>
      </div>

      {/* Confirm Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm account deletion
            </h3>
            <p className="text-sm text-gray-600">
              Are you absolutely sure? This action permanently deletes your
              account.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                className="rounded border px-4 py-2 text-sm"
                disabled={loading}
              >
                Cancel
              </button>

              {/*Edited confirm button */}
              <button
                onClick={handleConfirmDelete}
                className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccount;
