import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineAutoAwesome, MdRefresh, MdFileDownload } from "react-icons/md";
import { FaRegCheckCircle, FaRegTimesCircle, FaQuestionCircle } from "react-icons/fa";
import { RiFingerprintLine } from "react-icons/ri";
import { useState, useEffect } from "react";

const ResultPanel = ({
  mediaUrl,
  mediaType,
  selectedFile,
  result,
  confidenceScore,
  showAdvancedInfo,
  setShowAdvancedInfo,
  predictVideo,
  predictImage,
  reset
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  
  useEffect(() => {
    if (mediaUrl) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [mediaUrl]);
  
  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      if (mediaType === "video") {
        predictVideo();
      } else {
        predictImage();
      }
      setAnalyzing(false);
    }, 500);
  };

  const generateReport = () => {
    if (!result) return;
    
    const resultText = result.result === 0 
      ? "Authentic Content" 
      : result.result === 1 
      ? "Deepfake Detected" 
      : "No Face Detected";
      
    const confidence = confidenceScore ? `${confidenceScore}%` : "N/A";
    
    const advancedDetails = `
Visual artifacts: ${result.result === 1 ? "Detected" : "None"}
Face coherence: ${result.result === 0 ? "High" : "Low"}
Facial landmarks: ${result.result === 0 ? "Natural" : "Inconsistent"}
    `;
    
    const timestamp = new Date().toLocaleString();
    const filename = selectedFile ? selectedFile.name : "unknown-file";
    
    const report = `
========================================
          DEEPFAKE ANALYSIS REPORT          
========================================

File analyzed: ${filename}
Media type: ${mediaType}
Analysis date: ${timestamp}

RESULT: ${resultText}
Confidence score: ${confidence}

TECHNICAL DETAILS:
${advancedDetails}

This report was generated automatically by DeepfakeDetector.
========================================
    `;
    
    // Create blob and download link
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deepfake-analysis-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!mediaUrl) return null;

  return (
    <div 
      className={`w-full p-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
      rounded-2xl shadow-xl mt-8 overflow-hidden transition-all duration-500 ease-in-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 py-4 px-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Analysis Results
        </h2>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="rounded-xl overflow-hidden border-2 border-gray-100 dark:border-gray-700 shadow-md bg-white dark:bg-gray-900">
              {mediaType === "video" ? (
                <video controls className="w-full h-auto max-h-96">
                  <source src={mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={mediaUrl}
                  alt="Uploaded media"
                  className="w-full h-auto max-h-96 object-contain"
                />
              )}
            </div>
            <div className="flex items-center mt-3 text-sm text-gray-500 dark:text-gray-400">
              <RiFingerprintLine className="mr-2" />
              <span className="truncate">
                {selectedFile && selectedFile.name}
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {!result ? (
              <div className="flex flex-col items-center justify-center h-full py-6">
                <div className="mb-8 w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <MdOutlineAutoAwesome className="text-5xl text-blue-500 dark:text-blue-400" />
                </div>
                
                <button
                  className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                  text-white rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 
                  shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  ${analyzing ? 'animate-pulse' : ''}`}
                  onClick={handleAnalyze}
                  disabled={analyzing}
                >
                  {analyzing ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>Analyze {mediaType === "video" ? "Video" : "Image"}</>
                  )}
                </button>
                
                <p className="text-gray-500 dark:text-gray-400 mt-6 text-center max-w-sm">
                  Our AI model will analyze this {mediaType} to determine if it's authentic or has been manipulated
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <div 
                  className={`flex items-center justify-center mb-6 transition-all duration-500 ${
                    result ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                  }`}
                >
                  <div
                    className={`text-6xl p-4 rounded-full transition-all duration-300 ${
                      result.result === 0
                        ? "text-green-500 animate-fadeIn"
                        : result.result === 1
                        ? "text-red-500 animate-fadeIn"
                        : "text-gray-500"
                    }`}
                  >
                    {result.result === 0 ? (
                      <FaRegCheckCircle className="animate-fadeIn" />
                    ) : result.result === 1 ? (
                      <FaRegTimesCircle className="animate-fadeIn" />
                    ) : (
                      <FaQuestionCircle className="animate-fadeIn" />
                    )}
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 
                    className={`text-2xl font-bold mb-1 ${
                      result.result === 0
                        ? "text-green-600 dark:text-green-400"
                        : result.result === 1
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {result.result === 0
                      ? "Authentic Content"
                      : result.result === 1
                      ? "Deepfake Detected"
                      : "No Face Detected"}
                  </h3>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {result.result === 0
                      ? "Our analysis indicates this content is genuine"
                      : result.result === 1
                      ? "Our AI detected signs of manipulation"
                      : "We couldn't find any faces to analyze"}
                  </p>
                  
                  {confidenceScore && (
                    <div className="mt-6">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{confidenceScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${
                            result.result === 0 
                              ? "bg-gradient-to-r from-green-400 to-green-600" 
                              : "bg-gradient-to-r from-red-400 to-red-600"
                          }`}
                          style={{ width: `${confidenceScore}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showAdvancedInfo ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 mb-4 bg-gray-50 dark:bg-gray-900/50">
                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
                      <span className="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                      Technical Analysis
                    </h4>
                    <div className="text-sm space-y-3">
                      <div className="flex justify-between items-center p-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="text-gray-600 dark:text-gray-400">Visual artifacts</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          result.result === 1 
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                            : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }`}>
                          {result.result === 1 ? "Detected" : "None"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="text-gray-600 dark:text-gray-400">Face coherence</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          result.result === 0 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}>
                          {result.result === 0 ? "High" : "Low"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2">
                        <span className="text-gray-600 dark:text-gray-400">Facial landmarks</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          result.result === 0 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}>
                          {result.result === 0 ? "Natural" : "Inconsistent"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-3 mt-6">
                  <button
                    onClick={reset}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                    rounded-lg text-gray-700 dark:text-white transition duration-200 flex items-center gap-1"
                  >
                    <MdRefresh className="text-lg" /> New Analysis
                  </button>
                  
                  
                  <button
                    onClick={generateReport}
                    className="px-4 py-2 bg-green-50 dark:bg-green-900/40 hover:bg-green-100 dark:hover:bg-green-800/60 
                    rounded-lg text-green-700 dark:text-green-300 flex items-center gap-1 transition duration-200"
                  >
                    <MdFileDownload className="text-lg" /> Download Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;