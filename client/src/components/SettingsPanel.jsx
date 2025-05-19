const SettingsPanel = ({
  theme,
  setTheme,
  autoAnalyze,
  setAutoAnalyze,
  showAdvancedInfo,
  setShowAdvancedInfo,
}) => (
  <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
    <h2 className="text-xl font-semibold mb-4">Settings</h2>
    
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Appearance</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setTheme('light')}
            className={`px-4 py-2 rounded ${theme === 'light' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}
          >
            Light
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={`px-4 py-2 rounded ${theme === 'dark' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}
          >
            Dark
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="font-medium mb-3">Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto-analyze uploads</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Automatically analyze media when uploaded
              </div>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                name="auto-analyze" 
                id="auto-analyze"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked={autoAnalyze}
                onChange={() => setAutoAnalyze(!autoAnalyze)}
              />
              <label 
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${autoAnalyze ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                htmlFor="auto-analyze"
              ></label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Advanced information</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Show detailed analysis information by default
              </div>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                name="show-advanced"
                id="show-advanced"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked={showAdvancedInfo}
                onChange={() => setShowAdvancedInfo(!showAdvancedInfo)}
              />
              <label 
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${showAdvancedInfo ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                htmlFor="show-advanced"
              ></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsPanel;
