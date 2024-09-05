import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    //logic
    navigate("/login");
  };

  return (
    <div className="top-0 left-0 w-full z-40 ">
      <div className="flex felx-wrap justify-between items-center text-black py-4 px-6 md:px-32 gap-20 ">

        <a href="#" className="w-30 h-11 flex items-center justify-center text-center">
          <span className="text-xl font-bold text-gray-500 hover:scale-105 transition-all">
            NovelNexus
          </span>
        </a>

        <div className="relative md:flex items-center gap-3">
          <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pl-10 rounded-1xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500 w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="py-2 px-4 rounded-1xl bg-blue-500 text-white hover:bg-blue-700 transition-all"
          >
            Search
          </button>
        </div>

        <div className="md:flex items-center gap-6 font-semibold text-base">
          <div>
            <button
              className="p-1 hover:bg-sky-400 hover:text-white rounded-1xl transition-all cursor-pointer"
              onClick={goToProfile}
            >
              Profile
            </button>
          </div>
          <div>
            <button
              className="p-1 hover:bg-sky-400 hover:text-white rounded-1xl transition-all cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </div>
  );
};

export default Navbar;
