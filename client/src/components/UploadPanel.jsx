import React from "react";
import { FaUpload, FaImage, FaVideo } from "react-icons/fa";
import { RiShieldCheckFill } from "react-icons/ri";
import { BsShieldLockFill } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";

const UploadPanel = ({ handleFileUpload }) => {
  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Background card with premium design */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        {/* Top decorative header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
        
        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Panel header */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <RiShieldCheckFill className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upload Media</h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Upload an image or video to analyze and detect potential deepfakes with our advanced AI detection system.
            </p>
            
            <div className="hidden md:block mt-6">
              <div className="bg-blue-50 dark:bg-gray-800/50 rounded-lg p-4 border border-blue-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <BsShieldLockFill className="text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Secure Processing</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Your files are processed securely and not stored permanently on our servers.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right side - Upload options */}
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image upload card */}
            <div className="relative group">
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full mb-4">
                    <FaImage className="text-3xl text-blue-500 dark:text-blue-400" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upload Image</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
                    Supports JPG, PNG, WebP
                  </p>
                  
                  <label className="cursor-pointer w-full">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm">
                      <FaUpload />
                      <span>Select Image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'image')}
                    />
                  </label>
                  
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    Max size: 10MB
                  </p>
                </div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/40"></div>
              </div>
            </div>
            
            {/* Video upload card */}
            <div className="relative group">
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-full mb-4">
                    <FaVideo className="text-3xl text-purple-500 dark:text-purple-400" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upload Video</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
                    Supports MP4, MKV, WebM
                  </p>
                  
                  <label className="cursor-pointer w-full">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm">
                      <FaUpload />
                      <span>Select Video</span>
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'video')}
                    />
                  </label>
                  
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    Max size: 50MB
                  </p>
                </div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/40"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom features section */}
        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <MdSecurity className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Secure Upload</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Fast Analysis</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Privacy First</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPanel;