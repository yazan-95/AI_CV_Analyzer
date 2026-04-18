export default function ProgressSteps({ step }) {
    return (
      <div className="flex flex-col items-center gap-3 mt-6">
        <p className="text-lg font-medium text-gray-700">{step}</p>
      </div>
    );
  }