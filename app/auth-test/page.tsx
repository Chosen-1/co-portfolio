"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AuthTestPage() {
  const [message, setMessage] = useState("Checking authentication...");

  useEffect(() => {
    const supabase = createClient();

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setMessage(`Authentication error: ${error.message}`);
        return;
      }

      if (!data.session) {
        setMessage("No active session.");
        return;
      }

      setMessage(
        `Authenticated as: ${data.session.user.email}`
      );
    }

    checkSession();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">
          Authentication Test
        </h1>

        <p className="mt-3 text-slate-600">
          {message}
        </p>
      </div>
    </main>
  );
}