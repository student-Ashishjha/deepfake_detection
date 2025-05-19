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
    console.log('Tab clicked:', tabName); // Debug log
    setActiveTab(tabName);
    setStaticActiveTab(tabName);
  };

  // Determine tab styling based on the static local state
  const getTabStyles = (tabName) => {
    const isActive = staticActiveTab === tabName;
    
    if (isActive) {
      return "bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/10 border border-blue-100 dark:border-blue-800/50 font-semibold transform scale-105";
    }
    
    return "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-600/60 hover:shadow-md hover:scale-102 backdrop-blur-sm";
  };

  // Get icon color based on active state
  const getIconColor = (tabName) => {
    return staticActiveTab === tabName 
      ? "text-blue-600 dark:text-blue-400" 
      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200";
  };

  // Tab data to make the component more maintainable
  const tabs = [
    { 
      id: "upload", 
      label: "Upload", 
      icon: FaUpload,
      description: "Upload media files"
    },
    { 
      id: "history", 
      label: "History", 
      icon: FaHistory,
      description: "View past analysis"
    },
    { 
      id: "faq", 
      label: "FAQ", 
      icon: MdOutlineHelp,
      description: "Get help and support"
    },
  ];

  return (
    <div className="flex justify-center md:justify-start mb-6">
      <div className="relative">
        {/* Enhanced background container */}
        <div className="flex bg-gradient-to-r from-gray-100/90 to-gray-200/90 dark:from-gray-700/90 dark:to-gray-600/90 rounded-xl p-1.5 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50">
          
          {/* Active tab indicator background */}
          <div className="absolute inset-1.5 pointer-events-none">
            <div 
              className={`absolute top-0 bottom-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg transition-all duration-300 ease-out ${
                staticActiveTab === 'upload' ? 'left-0 w-1/3' :
                staticActiveTab === 'history' ? 'left-1/3 w-1/3' :
                staticActiveTab === 'faq' ? 'left-2/3 w-1/3' : 'opacity-0'
              }`}
            />
          </div>

          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = staticActiveTab === tab.id;
            
            return (
              <button
                key={tab.id}
                className={`group relative px-5 py-3.5 rounded-lg flex items-center gap-3 transition-all duration-300 ease-out min-w-max ${getTabStyles(tab.id)}`}
                onClick={() => handleTabClick(tab.id)}
                aria-pressed={isActive}
                aria-label={`${tab.label} tab - ${tab.description}`}
                title={tab.description}
              >
                {/* Icon with enhanced styling */}
                <div className={`transition-all duration-300 ${getIconColor(tab.id)}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                
                {/* Text with enhanced typography */}
                <span className="text-sm font-medium transition-all duration-300 whitespace-nowrap">
                  {tab.label}
                </span>
                
                {/* Subtle hover effect overlay */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabBar;