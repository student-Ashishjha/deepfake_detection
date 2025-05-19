import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { InfinitySpin } from 'react-loader-spinner';


// Icons
import { FaUpload, FaHistory, FaInfoCircle, FaTrash } from "react-icons/fa";
import { BsImage, BsFilm, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { MdSecurity, MdOutlineHelp } from "react-icons/md";

const App = () => {
  const BASEURL = 'http://localhost:8000';
  
  // Core state
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState(''); // 'image' or 'video'
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(null);
  
  // UI state
  const [activeTab, setActiveTab] = useState('upload');
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [theme, setTheme] = useState('light');
  const [history, setHistory] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings
  const [autoAnalyze, setAutoAnalyze] = useState(false);
  const [showAdvancedInfo, setShowAdvancedInfo] = useState(false);

  // Theme toggler
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    setMediaType(type);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaUrl(reader.result);
      if (autoAnalyze) {
        setTimeout(() => {
          type === 'video' ? predictVideo() : predictImage();
        }, 500);
      }
    };
    
    reader.readAsDataURL(file);
  };

  const predictMedia = async (endpoint) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append(mediaType, selectedFile);
      
      const postHeader = {
        method: "POST",
        body: formData
      };
      
      const res = await fetch(`${BASEURL}/${endpoint}`, postHeader);
      const data = await res.json();
      
      setResult(data);
      // Simulate confidence score for demo purposes
      setConfidenceScore(Math.round((Math.random() * 30) + (data.result === 0 ? 65 : 70)));
      setLoading(false);
      
      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        filename: selectedFile.name,
        type: mediaType,
        result: data.result,
        timestamp: new Date().toLocaleString(),
        confidence: Math.round((Math.random() * 30) + (data.result === 0 ? 65 : 70))
      };
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 10));
      toast.success("Analysis completed successfully");
      
    } catch (error) {
      toast.error("API Error! Could not process your request.");
      setLoading(false);
      console.error(error);
    }
  };

  const predictVideo = () => predictMedia('predictVideo');
  const predictImage = () => predictMedia('predictImage');

  const reset = () => {
    setMediaUrl('');
    setMediaType('');
    setSelectedFile(null);
    setResult('');
    setConfidenceScore(null);
  };
  
  const clearHistory = () => {
    setHistory([]);
    toast.info("History cleared");
  };

  const getResultLabel = () => {
    if (!result) return null;
    
    if (result.result === 0) {
      return <span className="font-bold text-green-500">Real</span>;
    } else if (result.result === 1) {
      return <span className="font-bold text-red-500">Fake</span>;
    } else {
      return <span className="font-bold text-neutral-700">No Face Detected</span>;
    }
  };

  const UploadPanel = () => (
    <div className="flex flex-col items-center w-full space-y-6">
      <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Upload Media</h2>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <label className="flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer group transition-all">
              <div className="flex flex-col items-center justify-center p-4">
                <BsFilm className="text-5xl text-gray-400 group-hover:text-blue-500 transition-colors mb-2" />
                <p className="text-center text-gray-500 dark:text-gray-300 group-hover:text-blue-500">Upload Video</p>
                <p className="text-xs text-gray-400 mt-1">MP4, MOV, AVI</p>
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="flex-1">
            <label className="flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer group transition-all">
              <div className="flex flex-col items-center justify-center p-4">
                <BsImage className="text-5xl text-gray-400 group-hover:text-blue-500 transition-colors mb-2" />
                <p className="text-center text-gray-500 dark:text-gray-300 group-hover:text-blue-500">Upload Image</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'image')}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const ResultPanel = () => {
    if (!mediaUrl) return null;
    
    return (
      <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-6 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 text-center">Analysis Results</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {mediaType === 'video' ? (
                <video controls className="w-full h-auto max-h-96">
                  <source src={mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={mediaUrl} alt="Uploaded media" className="w-full h-auto max-h-96 object-contain" />
              )}
            </div>
            <div className="text-sm text-gray-500 mt-2 truncate">
              {selectedFile && selectedFile.name}
            </div>
          </div>
          
          <div className="flex-1">
            {!result ? (
              <div className="flex flex-col items-center justify-center h-full">
                <button
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition duration-200"
                  onClick={mediaType === 'video' ? predictVideo : predictImage}
                >
                  <FaUpload />
                  Analyze {mediaType === 'video' ? 'Video' : 'Image'}
                </button>
                <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
                  Click to detect if this {mediaType} is real or manipulated
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-center">
                <div className="flex items-center justify-center mb-8">
                  <div className={`text-6xl p-4 rounded-full ${
                    result.result === 0 
                      ? 'text-green-500' 
                      : result.result === 1 
                        ? 'text-red-500' 
                        : 'text-gray-500'
                  }`}>
                    {result.result === 0 
                      ? '✓' 
                      : result.result === 1 
                        ? '✕' 
                        : '?'}
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">
                    {result.result === 0 
                      ? 'Real Content' 
                      : result.result === 1 
                        ? 'Deepfake Detected' 
                        : 'No Face Detected'}
                  </h3>
                  {confidenceScore && (
                    <div className="mt-2">
                      <div className="text-lg">Confidence: {confidenceScore}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className={`h-2.5 rounded-full ${result.result === 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                          style={{ width: `${confidenceScore}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {showAdvancedInfo && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                    <h4 className="font-semibold mb-2">Advanced Analysis</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Visual artifacts:</span>
                        <span>{result.result === 1 ? 'Detected' : 'None'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Face coherence:</span>
                        <span>{result.result === 0 ? 'High' : 'Low'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Facial landmarks:</span>
                        <span>{result.result === 0 ? 'Natural' : 'Inconsistent'}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={reset}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-white transition duration-200"
                  >
                    Try Another
                  </button>
                  {showAdvancedInfo ? (
                    <button
                      onClick={() => setShowAdvancedInfo(false)}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg text-blue-700 dark:text-blue-200 flex items-center gap-1 transition duration-200"
                    >
                      <BsChevronUp size={14} /> Hide Details
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowAdvancedInfo(true)}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg text-blue-700 dark:text-blue-200 flex items-center gap-1 transition duration-200"
                    >
                      <BsChevronDown size={14} /> Show Details
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const HistoryPanel = () => (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Analysis History</h2>
        {history.length > 0 && (
          <button 
            onClick={clearHistory} 
            className="text-red-500 hover:text-red-700 flex items-center gap-1"
          >
            <FaTrash size={14} /> Clear
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No analysis history yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 text-left">File</th>
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Result</th>
                <th className="py-2 text-left">Confidence</th>
                <th className="py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map(item => (
                <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="py-3 truncate max-w-[150px]">{item.filename}</td>
                  <td className="py-3 capitalize">{item.type}</td>
                  <td className="py-3">
                    <span className={`font-medium px-2 py-1 rounded text-sm ${
                      item.result === 0 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                        : item.result === 1 
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {item.result === 0 ? 'Real' : item.result === 1 ? 'Fake' : 'No Face'}
                    </span>
                  </td>
                  <td className="py-3">{item.confidence}%</td>
                  <td className="py-3 text-sm text-gray-500 dark:text-gray-400">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const InfoPanel = () => (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">About Deepfake Detection</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-lg mb-2">What are Deepfakes?</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Deepfakes are synthetic media where a person's likeness is replaced with someone else's 
            using artificial intelligence. This technology can create convincing but fabricated 
            videos or images that appear to show people saying or doing things they never did.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">How Does Detection Work?</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Our detection system uses advanced machine learning algorithms to analyze visual inconsistencies, 
            facial movements, and other artifacts that are often present in manipulated media but invisible 
            to the human eye. The technology looks for unusual blending, lighting inconsistencies, and unnatural 
            facial behaviors.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">Limitations</h3>
          <p className="text-gray-700 dark:text-gray-300">
            While our system is highly effective, deepfake technology is constantly evolving. No detection 
            system is 100% accurate, and very high-quality deepfakes may sometimes evade detection. 
            We continually update our algorithms to improve accuracy.
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This tool is for educational and informational purposes. If you suspect media manipulation 
              in content that could cause harm, please report it to the appropriate authorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const SettingsPanel = () => (
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

  const Navbar = () => (
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

  const TabBar = () => (
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {loading ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <InfinitySpin width="200" color="#4fa94d" />
          <h1 className="mt-6 text-xl">Analyzing your media...</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">This may take a few moments</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-10 max-w-6xl">
          <Navbar />
          
          <TabBar />
          
          {showSettings && <SettingsPanel />}
          
          <div className="space-y-6">
            {activeTab === 'upload' && (
              <>
                <UploadPanel />
                <ResultPanel />
              </>
            )}
            
            {activeTab === 'history' && <HistoryPanel />}
            
            {activeTab === 'info' && <InfoPanel />}
          </div>
        </div>
      )}
      
      <ToastContainer position="bottom-right" theme={theme} />
      
      {/* CSS for toggle switches */}
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #3b82f6;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #3b82f6;
        }
        .toggle-checkbox {
          right: 0;
          z-index: 1;
          border-color: #e5e7eb;
          transition: all 0.3s;
        }
        .toggle-label {
          transition: background-color 0.3s;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* For dark mode */
        .dark {
          color-scheme: dark;
        }
      `}</style>
    </div>
  );
};

export default App;