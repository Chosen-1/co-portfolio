import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          const cookieHeader = request.headers.get("cookie");

          if (!cookieHeader) {
            return [];
          }

          return cookieHeader.split(";").map((cookie) => {
            const [name, ...rest] = cookie.trim().split("=");

            return {
              name,
              value: rest.join("="),
            };
          });
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/login", request.url);

    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/builder/:path*"],
};