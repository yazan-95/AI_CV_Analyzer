import { useEffect, useState } from "react";

export default function ScoreCircle({ score = 0 }) {
  const [progress, setProgress] = useState(0);

  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(score);
    }, 200);
    return () => clearTimeout(timeout);
  }, [score]);

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  // ✅ FIXED COLOR LOGIC (explicit colors)
  const getStrokeColor = () => {
    if (score < 40) return "#ef4444";   // red-500
    if (score < 70) return "#facc15";   // yellow-400
    return "#22c55e";                   // green-500
  };

  const getTextColor = () => {
    if (score < 40) return "text-red-500";
    if (score < 70) return "text-yellow-400";
    return "text-green-500";
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <svg height={radius * 2} width={radius * 2}>
        
        {/* Background */}
        <circle
          stroke="#1f2937"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress */}
        <circle
          stroke={getStrokeColor()} // ✅ FIX HERE
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 1s ease",
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {/* Score Text */}
      <div className={`-mt-20 text-3xl font-bold ${getTextColor()}`}>
        {progress}%
      </div>

      <p className="text-xs text-gray-400 mt-2">Match Score</p>
    </div>
  );
}