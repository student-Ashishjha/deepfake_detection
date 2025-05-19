import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { InfinitySpin } from 'react-loader-spinner';

// Icons
import { FaUpload } from "react-icons/fa";

import Navbar from './components/Navbar';
import TabBar from './components/TabBar';
import UploadPanel from './components/UploadPanel';
import ResultPanel from './components/ResultPanel';
import HistoryPanel from './components/HistoryPanel';
import InfoPanel from './components/InfoPanel';
import SettingsPanel from './components/SettingsPanel';
import Footer from './components/Footer';
import FAQPanel from './components/FAQPanel';
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
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to 'light'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  const [history, setHistory] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings
  const [autoAnalyze, setAutoAnalyze] = useState(false);
  const [showAdvancedInfo, setShowAdvancedInfo] = useState(false);

  // Theme toggler
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
          <Navbar showSettings={showSettings} setShowSettings={setShowSettings} />
          
          <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {showSettings && (
            <SettingsPanel 
              theme={theme} setTheme={setTheme} 
              autoAnalyze={autoAnalyze} setAutoAnalyze={setAutoAnalyze} 
              showAdvancedInfo={showAdvancedInfo} setShowAdvancedInfo={setShowAdvancedInfo} 
            />
          )}
          
          <div className="space-y-6">
            {activeTab === 'upload' && (
              <>
                <UploadPanel handleFileUpload={handleFileUpload} />
                <ResultPanel 
                  mediaUrl={mediaUrl} mediaType={mediaType} selectedFile={selectedFile} 
                  result={result} confidenceScore={confidenceScore} showAdvancedInfo={showAdvancedInfo} 
                  predictVideo={predictVideo} predictImage={predictImage} reset={reset} 
                />
              </>
            )}
            
            {activeTab === 'history' && (
              <HistoryPanel history={history} clearHistory={clearHistory} />
            )}
            
            {activeTab === 'faq' && <FAQPanel />}
          </div>
        </div>
      )}
      
      <ToastContainer position="bottom-right" theme={theme} />
      <Footer />
    </div>
  );
};
export default App;
