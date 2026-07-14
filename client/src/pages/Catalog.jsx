

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiX } from "react-icons/fi";
import placeholderImage from "../assets/placeholder.png";

const Catalog = () => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Escape regex special characters
  const escapeRegExp = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Fetch all workers
  useEffect(() => {
    const controller = new AbortController();

    const fetchWorkers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/workers/all", {
          signal: controller.signal,
        });

        // Backend may return 'workers' or 'users'
        const allWorkers =
          response?.data?.workers || response?.data?.users || [];
        setWorkers(allWorkers);
        setFilteredWorkers(allWorkers);

        console.log("Fetched workers:", allWorkers); // Debugging
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Fetch cancelled");
        } else {
          console.error("Error fetching workers:", err);
          setError("Failed to load workers. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();

    const filtered = workers.filter((w) => {
      const user = w.user || {};

      // convert number fields to string for search
      const contactStr =
        w.contactNumber?.toString() || user.contactNumber?.toString() || "";
      const experienceStr = w.experienceYears?.toString() || "";

      return (
        user.firstName?.toLowerCase().includes(lowerSearch) ||
        user.lastName?.toLowerCase().includes(lowerSearch) ||
        w.city?.toLowerCase().includes(lowerSearch) ||
        w.location?.toLowerCase().includes(lowerSearch) || 
        contactStr.includes(lowerSearch) || 
        experienceStr.includes(lowerSearch) || 
        (Array.isArray(w.skills) &&
          w.skills.some((skill) => skill.toLowerCase().includes(lowerSearch)))
      );
    });
    setFilteredWorkers(filtered);
  }, [searchTerm, workers]);

  // Highlight matched text
  const highlightText = (text = "") => {
    if (!text) return "";
    text = text.toString(); //  ensure string
    if (!searchTerm) return text;
    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-300 text-gray-900 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-sky-400 text-lg">
        Loading workers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-400 text-lg">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-sky-400 text-gray-900 rounded hover:bg-sky-500"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6 leading-snug text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-600">
          Worker Catalog
        </h1>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2 mb-8">
          <FiSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by name, city, or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent w-full px-3 py-2 text-white focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-gray-400 hover:text-white"
            >
              <FiX className="text-xl" />
            </button>
          )}
        </div>

        {/* Workers Grid */}
        {filteredWorkers.length === 0 ? (
          <p className="text-gray-400 text-center">
            No workers found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((worker) => {
              const user = worker.user || {};
              return (
                <div
                  key={worker._id || worker.id} // use unique key if available
                  className="bg-gray-800 border border-gray-600 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
                >
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={user.profilePhoto || placeholderImage}
                      alt={`${user.firstName || ""} ${user.lastName || ""}`}
                      className="w-16 h-16 rounded-full object-cover border border-gray-700"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {highlightText(user.firstName || "Unknown")}{" "}
                        {highlightText(user.lastName || "")}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {user.email || "No email"}
                      </p>
                    </div>
                  </div>

                  {/* Worker Info */}
                  <div className="text-sm space-y-1 text-gray-300">
                    {worker.skills?.length > 0 && (
                      <p>
                        <span className="font-medium text-sky-400">
                          Skills:
                        </span>{" "}
                        {worker.skills.map((skill, i) => (
                          <span key={i}>
                            {highlightText(skill)}
                            {i < worker.skills.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    )}
                    {worker.city && (
                      <p>
                        <span className="font-medium text-sky-400">City:</span>{" "}
                        {highlightText(worker.city)}
                      </p>
                    )}
                    {worker.location && (
                      <p>
                        <span className="font-medium text-sky-400">
                          Location:
                        </span>{" "}
                        {highlightText(worker.location)}
                      </p>
                    )}
                    {worker.experienceYears && (
                      <p>
                        <span className="font-medium text-sky-400">
                          Experience:
                        </span>{" "}
                        {highlightText(worker.experienceYears)} Years
                      </p>
                    )}
                    {(worker.contactNumber || user.contactNumber) && (
                      <p>
                        <span className="font-medium text-sky-400">
                          Contact:
                        </span>{" "}
                        {highlightText(
                          worker.contactNumber || user.contactNumber
                        )}
                      </p>
                    )}
                  </div>

                  {/* About Section */}
                  {worker.about && (
                    <p className="mt-3 text-gray-400 text-sm line-clamp-3">
                      {highlightText(worker.about)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
