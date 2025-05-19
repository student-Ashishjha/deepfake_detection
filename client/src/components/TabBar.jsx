import { FaUpload, FaHistory } from "react-icons/fa";
import { MdOutlineHelp } from "react-icons/md";
import { useState, useEffect } from "react";

const TabBar = ({ activeTab, setActiveTab }) => {
  // Local state to prevent re-renders changing active tab styles
  const [staticActiveTab, setStaticActiveTab] = useState(activeTab);

  // Sync local state with props only when activeTab prop changes
  useEffect(() => {
    setStaticActiveTab(activeTab);
  }, [activeTab]);

  // Click handler that updates parent state and local state
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setStaticActiveTab(tabName);
  };

  // Determine tab styling based on the static local state
  const getTabStyles = (tabName) => {
    return staticActiveTab === tabName
      ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm font-medium"
      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600";
  };

  // Tab data to make the component more maintainable
  const tabs = [
    { id: "upload", label: "Upload", icon: <FaUpload className="text-lg" /> },
    { id: "history", label: "History", icon: <FaHistory className="text-lg" /> },
    { id: "info", label: "Info", icon: <MdOutlineHelp className="text-lg" /> },
  ];

  return (
    <div className="flex justify-center md:justify-start mb-6">
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-200 ${getTabStyles(
              tab.id
            )}`}
            onClick={() => handleTabClick(tab.id)}
            aria-pressed={staticActiveTab === tab.id}
            aria-label={`${tab.label} tab`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabBar;