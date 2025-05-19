import { useEffect } from 'react';
import { FiMoon, FiSun, FiZap, FiBarChart2 } from 'react-icons/fi';

const SettingsPanel = ({
  theme,
  setTheme,
  autoAnalyze,
  setAutoAnalyze,
  showAdvancedInfo,
  setShowAdvancedInfo,
}) => {
  // Apply theme when component mounts and when theme changes
  useEffect(() => {
    // Apply current theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Function to handle theme changes
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    
    // Apply theme changes immediately
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
  };

  const Toggle = ({ checked, onChange, label, description, icon }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
          {icon}
        </div>
        <div>
          <div className="font-medium text-gray-800 dark:text-gray-200">{label}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </div>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
      </label>
    </div>
  );

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        Settings
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider">Appearance</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => handleThemeChange('light')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                theme === 'light' 
                ? 'bg-blue-100 text-blue-600 border-2 border-blue-500 font-medium' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
              }`}
            >
              <FiSun className="text-lg" />
              Light
            </button>
            
            <button 
              onClick={() => handleThemeChange('dark')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                theme === 'dark' 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border-2 border-blue-500 dark:border-blue-700 font-medium' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
              }`}
            >
              <FiMoon className="text-lg" />
              Dark
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider">Preferences</h3>
          
          <div className="space-y-1 divide-y divide-gray-100 dark:divide-gray-700">
            <Toggle
              checked={autoAnalyze}
              onChange={() => setAutoAnalyze(!autoAnalyze)}
              label="Auto-analyze uploads"
              description="Automatically analyze media when uploaded"
              icon={<FiZap className="text-lg" />}
            />
            
            <Toggle
              checked={showAdvancedInfo}
              onChange={() => setShowAdvancedInfo(!showAdvancedInfo)}
              label="Advanced information"
              description="Show detailed analysis information by default"
              icon={<FiBarChart2 className="text-lg" />}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          More Options
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;