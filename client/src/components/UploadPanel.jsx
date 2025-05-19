import { BsImage, BsFilm } from "react-icons/bs";

const UploadPanel = ({ handleFileUpload }) => (
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

export default UploadPanel;
