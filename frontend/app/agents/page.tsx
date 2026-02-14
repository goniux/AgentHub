"use client";

import { useEffect, useState } from "react";

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents`)
      .then(res => res.json())
      .then(data => setAgents(data));
  }, []);

  const runAgent = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/${id}/run?input_text=${input}`, {
      method: "POST"
    });

    alert("Agent executed!");
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Agents</h1>

      <input
        placeholder="Enter input for agent..."
        className="border p-2 mb-6 w-full"
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      {agents.map((agent: any) => (
        <div key={agent.id} className="border p-4 mb-4 rounded">
          <h2 className="font-semibold">{agent.name}</h2>
          <p>{agent.description}</p>

          <button
            className="mt-2 px-4 py-2 bg-black text-white rounded"
            onClick={() => runAgent(agent.id)}
          >
            Run Agent
          </button>
        </div>
      ))}
    </main>
  );
}
