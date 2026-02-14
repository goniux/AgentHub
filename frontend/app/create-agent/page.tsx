"use client";

import { useState } from "react";

export default function CreateAgent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");

  const submitAgent = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        prompt,
      }),
    });

    alert("Agent created!");
    setName("");
    setDescription("");
    setPrompt("");
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Create New Agent
      </h1>

      <input
        placeholder="Agent Name"
        className="border p-2 mb-4 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border p-2 mb-4 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <textarea
        placeholder="Agent Prompt"
        className="border p-2 mb-4 w-full"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={submitAgent}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Create Agent
      </button>
    </main>
  );
}
