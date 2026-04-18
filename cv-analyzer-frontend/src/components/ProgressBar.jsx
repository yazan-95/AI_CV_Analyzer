const ProgressBar = ({ value = 0 }) => {
    const getColor = () => {
      if (value < 40) return "bg-red-500";
      if (value < 70) return "bg-yellow-500";
      return "bg-green-500";
    };
  
    return (
      <div className="w-full">
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-gray-400">Score</span>
          <span className="text-white font-semibold">{value}%</span>
        </div>
  
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className={`${getColor()} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;