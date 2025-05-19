import { FaUpload, FaHistory } from "react-icons/fa";
import { MdOutlineHelp } from "react-icons/md";

const TabBar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center md:justify-start mb-6">
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
            activeTab === 'upload' 
              ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' 
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
          onClick={() => setActiveTab('upload')}
        >
          <FaUpload /> Upload
        </button>
        
        <button
          className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
            activeTab === 'history' 
              ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' 
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
          onClick={() => setActiveTab('history')}
        >
          <FaHistory /> History
        </button>
        
        <button
          className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
            activeTab === 'info' 
              ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' 
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
          onClick={() => setActiveTab('info')}
        >
          <MdOutlineHelp /> Info
        </button>
      </div>
    </div>
  );
};

export default TabBar;
