import { BsChevronDown, BsChevronUp } from "react-icons/bs";

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
  reset,
}) => {
  if (!mediaUrl) return null;

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-center">Analysis Results</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
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
          <div className="text-sm text-gray-500 mt-2 truncate">
            {selectedFile && selectedFile.name}
          </div>
        </div>

        <div className="flex-1">
          {!result ? (
            <div className="flex flex-col items-center justify-center h-full">
              <button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition duration-200"
                onClick={mediaType === "video" ? predictVideo : predictImage}
              >
                Analyze {mediaType === "video" ? "Video" : "Image"}
              </button>
              <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
                Click to detect if this {mediaType} is real or manipulated
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col h-full justify-center">
                <div className="flex items-center justify-center mb-8">
                  <div
                    className={`text-6xl p-4 rounded-full ${
                      result.result === 0
                        ? "text-green-500"
                        : result.result === 1
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {result.result === 0
                      ? "✓"
                      : result.result === 1
                      ? "✕"
                      : "?"}
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">
                    {result.result === 0
                      ? "Real Content"
                      : result.result === 1
                      ? "Deepfake Detected"
                      : "No Face Detected"}
                  </h3>
                  {confidenceScore && (
                    <div className="mt-2">
                      <div className="text-lg">Confidence: {confidenceScore}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className={`h-2.5 rounded-full ${
                            result.result === 0 ? "bg-green-500" : "bg-red-500"
                          }`}
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
                        <span>{result.result === 1 ? "Detected" : "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Face coherence:</span>
                        <span>{result.result === 0 ? "High" : "Low"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Facial landmarks:</span>
                        <span>{result.result === 0 ? "Natural" : "Inconsistent"}</span>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;
