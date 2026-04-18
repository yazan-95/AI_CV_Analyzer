import { useState } from "react";
import { analyzeText, analyzePDF } from "./api";
import Card from "./components/card";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ProgressSteps from "./components/ui/ProgressSteps";
import ScoreCircle from "./components/ui/ScoreCircle";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [error, setError] = useState(null);
  const [cvText, setCvText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [result, setResult] = useState(null);

  // 🔥 SAFE PARSER (handles string OR object)
  const parseResult = (res) => {
    try {
      const raw = res?.data?.result;
      if (!raw) return null;

      return typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (e) {
      console.error("Parsing error:", e);
      return null;
    }
  };

  const normalizeScore = (data) => {
    return data?.match_score ?? data?.score ?? 0;
  };

  // 🔥 TEXT ANALYSIS
  const handleTextAnalyze = async () => {
    if (!cvText.trim() || !jobDesc.trim()) {
      toast.error("Please fill both fields");
      return;
    }

    setError(null);
    setResult(null);
    setLoading(true);

    try {
      setLoadingStep("Uploading CV...");
      await new Promise((r) => setTimeout(r, 400));

      setLoadingStep("Parsing CV...");
      await new Promise((r) => setTimeout(r, 600));

      setLoadingStep("Matching with job...");
      const res = await analyzeText({
        cv_text: cvText,
        job_description: jobDesc,
      });

      setLoadingStep("Generating insights...");
      await new Promise((r) => setTimeout(r, 500));

      const parsed = parseResult(res);

      if (!parsed) {
        throw new Error("Invalid response from server");
      }

      setResult(parsed);
      toast.success("Analysis completed");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Something went wrong while analyzing text.");
      toast.error("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 PDF ANALYSIS
  const handlePDFAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a PDF file");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setError(null);
    setResult(null);
    setLoading(true);

    try {
      setLoadingStep("Uploading PDF...");
      await new Promise((r) => setTimeout(r, 400));

      setLoadingStep("Extracting text...");
      await new Promise((r) => setTimeout(r, 600));

      setLoadingStep("Analyzing content...");
      const res = await analyzePDF(formData);

      setLoadingStep("Generating insights...");
      await new Promise((r) => setTimeout(r, 500));

      const parsed = parseResult(res);

      if (!parsed) {
        throw new Error("Invalid response from server");
      }

      setResult(parsed);
      toast.success("Analysis completed");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Something went wrong while analyzing PDF.");
      toast.error("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const score = normalizeScore(result);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white py-10 px-4">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">CV Analyzer</h1>
          <p className="text-gray-400 text-sm">
            AI-powered resume matching and analysis
          </p>
        </div>

        {/* INPUT */}
        <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 shadow-xl space-y-5">

          <h2 className="text-lg font-semibold text-gray-300">
            Upload or Paste Your CV
          </h2>

          <textarea
            className="w-full h-36 p-4 bg-gray-950 rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste CV text..."
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
          />

          <textarea
            className="w-full h-36 p-4 bg-gray-950 rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste Job Description..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          <button
            onClick={handleTextAnalyze}
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Text"}
          </button>

          {/* PDF */}
          <div className="pt-4 space-y-2 border-t border-gray-800">
            <h3 className="text-sm text-gray-400">Or upload PDF</h3>

            <input
              type="file"
              className="text-sm text-gray-400"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file && (
              <p className="text-xs text-gray-500">
                Selected: {file.name}
              </p>
            )}

            <button
              onClick={handlePDFAnalyze}
              disabled={loading}
              className="w-full py-2 rounded-xl font-medium bg-green-600 hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze PDF"}
            </button>
          </div>

        </div>

        {/* RESULTS */}
        <div className="space-y-6">

          {loading && (
            <div className="flex flex-col items-center justify-center gap-4 py-10">
              <LoadingSpinner />
              <ProgressSteps step={loadingStep} />
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl text-center">
              {error}
            </div>
          )}

          {!loading && result && (
            <div className="animate-fade-in space-y-6">

              {/* SCORE */}
              <div className="flex justify-center">
                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg text-center">
                  <ScoreCircle score={score} />

                  <p className="text-sm text-gray-400 mt-3">
                    {score >= 70
                      ? "Strong Match"
                      : score >= 40
                      ? "Moderate Match"
                      : "Weak Match"}
                  </p>
                </div>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Card title="Recommendation">
                  <p>{result?.recommendation || "No recommendation available"}</p>
                </Card>

                <Card title="Strengths">
                  <ul className="list-disc pl-5 space-y-1">
                    {(result?.strengths || []).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </Card>

                <Card title="Weaknesses">
                  <ul className="list-disc pl-5 space-y-1">
                    {(result?.weaknesses || []).map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </Card>

                <Card title="Missing Skills">
                  <ul className="list-disc pl-5 space-y-1">
                    {(result?.missing_skills || []).map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </Card>

              </div>
            </div>
          )}

          {!loading && !result && !error && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <div className="text-5xl mb-4">📄</div>
              <p className="text-lg">No analysis yet</p>
              <p className="text-sm text-gray-600">
                Upload your CV and job description to get started
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}