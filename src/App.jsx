import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    if (!text.trim()) return;

    setLoading(true);
    const res = await fetch("https://scam-detector-backend-12pp.onrender.com/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  const verdictColor = (verdict) => {
    if (verdict === "High Risk") return "red";
    if (verdict === "Medium Risk") return "orange";
    return "green";
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Campus Placement Scam Detector</h2>

      <textarea
        rows="8"
        placeholder="Paste Offer letter / message here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <br />
      <br />

      <button onClick={analyzeText} disabled={loading || !text.trim()}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Risk Score: {result.score}</h3>

          <p
            style={{
              color: verdictColor(result.verdict),
              fontWeight: "bold",
            }}
          >
            {result.verdict}
          </p>

          {result.message && <p>{result.message}</p>}

          {result.reason && result.reason.length > 0 && (
            <>
              <h4>Reasons:</h4>
              <ul>
                {result.reason.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
