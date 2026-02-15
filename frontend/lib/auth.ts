export async function getBackendToken(email: string, name: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    }
  )

  const data = await res.json()

  localStorage.setItem("agenthub_token", data.token)

  return data.token
}
