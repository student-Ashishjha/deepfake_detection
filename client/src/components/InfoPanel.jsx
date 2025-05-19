import { FaInfoCircle } from "react-icons/fa";

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

export default InfoPanel;
