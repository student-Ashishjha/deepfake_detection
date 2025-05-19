import { FaTrash } from "react-icons/fa";

const HistoryPanel = ({ history, clearHistory }) => (
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

export default HistoryPanel;
