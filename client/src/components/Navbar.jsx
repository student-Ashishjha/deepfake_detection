import { MdSecurity } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const Navbar = ({ showSettings, setShowSettings }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <MdSecurity className="text-3xl text-blue-600" />
        <h1 className="text-2xl font-bold">DeepfakeGuard</h1>
      </div>
      
      <div className="flex items-center space-x-1">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <IoMdSettings className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
