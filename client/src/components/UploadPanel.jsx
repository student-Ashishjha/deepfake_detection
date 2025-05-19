import React from "react";
import { Upload, Image, Video, Shield, Lock, Zap, Brain, Check, ShieldCheck } from "lucide-react";

const UploadPanel = ({ handleFileUpload }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Background card with premium design */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-2xl opacity-75">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-blue-500 opacity-20 animate-pulse"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative flex flex-col lg:flex-row gap-10">
          {/* Left side - Enhanced header section */}
          <div className="lg:w-2/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <ShieldCheck className="h-8 w-8 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Upload Media</h2>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">AI-Powered Detection</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Upload an image or video to analyze and detect potential deepfakes with our advanced AI detection system. 
              Get instant results with detailed confidence scores.
            </p>
            
            {/* Enhanced security notice */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                  <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Secure & Private</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your files are processed securely with end-to-end encryption and automatically deleted after analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">High Accuracy</div>
                {/* <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy Rate</div> */}
              </div>
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">&lt;2s</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Analysis Time</div>
              </div>
            </div>
          </div>
          
          {/* Right side - Enhanced upload options */}
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image upload card */}
            <div className="group relative overflow-hidden">
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                
                <div className="relative flex flex-col items-center justify-center h-full min-h-48">
                  <div className="relative mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Image className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Image</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
                    JPG, PNG, WebP, GIF supported
                  </p>
                  
                  <label className="cursor-pointer w-full">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <Upload className="h-4 w-4" />
                      <span>Select Image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'image')}
                    />
                  </label>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <p className="text-xs text-gray-400">Max size: 10MB</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video upload card */}
            <div className="group relative overflow-hidden">
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                
                <div className="relative flex flex-col items-center justify-center h-full min-h-48">
                  <div className="relative mb-6">
                    <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Video className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Video</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
                    MP4, MKV, WebM, AVI supported
                  </p>
                  
                  <label className="cursor-pointer w-full">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <Upload className="h-4 w-4" />
                      <span>Select Video</span>
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'video')}
                    />
                  </label>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <p className="text-xs text-gray-400">Max size: 50MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced bottom features section */}
        <div className="relative mt-10 pt-8 border-t border-gray-200/60 dark:border-gray-700/60">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Secure Upload</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40">
                <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fast Analysis</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40">
                <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Privacy First</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40">
                <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI-Powered</span>
            </div>
          </div>
          
          {/* Additional info bar */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">Trusted User</span>
              {/* <div className="w-1 h-1 bg-gray-400 rounded-full"></div> */}
              {/* <span>Processing 10,000+ files daily</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPanel;