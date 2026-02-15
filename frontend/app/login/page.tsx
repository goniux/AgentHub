"use client"

import { useSession, signIn } from "next-auth/react"
import { useEffect } from "react"
import { getBackendToken } from "@/lib/auth"

export default function LoginPage() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.email) {
      getBackendToken(session.user.email, session.user.name || "")
    }
  }, [session])

  if (!session) {
    return (
      <button onClick={() => signIn("github")}>
        Login with GitHub
      </button>
    )
  }

  return <p>Logged in successfully</p>
}
