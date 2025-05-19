import { MdSecurity } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const Navbar = ({ showSettings, setShowSettings }) => {
  return (
    <nav className="relative">
      {/* Main navbar container */}
      <div className="flex justify-between items-center py-4 px-6 mb-6 bg-gradient-to-r from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 shadow-lg shadow-black/5 dark:shadow-black/20 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
        {/* Logo and brand section */}
        <div className="flex items-center gap-4">
          {/* Enhanced logo with gradient background */}
          <div className="relative p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
            <MdSecurity className="text-2xl text-white" />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 opacity-75 blur-lg -z-10" />
          </div>
          
          {/* Brand text with enhanced styling */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              DeepfakeGuard
            </h1>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
              AI Media Protection
            </span>
          </div>
        </div>
        
        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Status indicator (optional) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-700 dark:text-green-300">
              Secure
            </span>
          </div>
          
          {/* Settings button with enhanced styling */}
          <button 
            aria-label="Settings"
            onClick={() => setShowSettings(!showSettings)}
            className={`group relative p-3 rounded-xl transition-all duration-300 ease-out
              ${showSettings 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 text-white' 
                : 'bg-gray-100/70 dark:bg-gray-700/70 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
              } 
              hover:scale-105 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/20
              focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
              border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm`}
          >
            <IoMdSettings className={`text-lg transition-transform duration-300 ${showSettings ? 'rotate-45' : 'group-hover:rotate-12'}`} />
            
            {/* Notification dot (optional) */}
            {!showSettings && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
            )}
          </button>
        </div>
      </div>
      
      {/* Subtle bottom gradient line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent opacity-50" />
    </nav>
  );
};

export default Navbar;