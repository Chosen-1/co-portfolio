import { getCurrentUser } from "@/lib/supabase/auth";

export default async function AuthUserTestPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">
          No authenticated user.
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-slate-950">
          Authenticated User
        </h1>

        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p className="break-all">
            <strong>User ID:</strong> {user.id}
          </p>
        </div>
      </div>
    </main>
  );
}