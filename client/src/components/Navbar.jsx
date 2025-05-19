import { MdSecurity } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const Navbar = ({ showSettings, setShowSettings }) => {
  return (
    <div className="flex justify-between items-center py-4 px-6 mb-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
      <div className="flex items-center gap-3">
        <MdSecurity className="text-3xl text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">DeepfakeGuard</h1>
      </div>
      
      <div className="flex items-center">
        <button 
          aria-label="Settings"
          onClick={() => setShowSettings(!showSettings)}
          className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 transition-colors"
        >
          <IoMdSettings className="text-xl text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;