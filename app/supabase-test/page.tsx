"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SupabaseTestPage() {
  const [message, setMessage] = useState("Testing Supabase...");

  useEffect(() => {
    const supabase = createClient();

    async function testConnection() {
      const { error } = await supabase
        .from("portfolios")
        .select("id")
        .limit(1);

      if (error) {
        console.error(error);
        setMessage(`Supabase error: ${error.message}`);
        return;
      }

      setMessage("Supabase connection successful!");
    }

    testConnection();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">
          Supabase Test
        </h1>

        <p className="mt-3 text-slate-600">
          {message}
        </p>
      </div>
    </main>
  );
}