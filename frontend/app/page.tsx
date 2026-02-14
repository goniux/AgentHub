"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/runs`)
      .then(res => res.json())
      .then(data => setRuns(data));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Agent Execution Feed
      </h1>

      {runs.length === 0 && (
        <p>No agent runs yet.</p>
      )}

      {runs.map((run: any) => (
        <div key={run.id} className="border rounded p-4 mb-4">
          <h2 className="font-semibold">
            Agent #{run.agent_id}
          </h2>

          <p>
            <strong>Input:</strong> {run.input_text}
          </p>

          <pre className="bg-black text-green-400 p-4 mt-2 rounded whitespace-pre-wrap">
            {run.output_text}
          </pre>
        </div>
      ))}
    </main>
  );
}
