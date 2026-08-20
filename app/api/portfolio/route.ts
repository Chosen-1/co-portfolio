import { NextResponse } from "next/server";
import {
  getUserPortfolio,
  saveUserPortfolio,
} from "@/lib/supabase/portfolio";

export async function GET() {
  try {
    const portfolio = await getUserPortfolio();

    return NextResponse.json(portfolio);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to load portfolio.";

    return NextResponse.json(
      { error: message },
      { status: 401 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const portfolio = await saveUserPortfolio(body);

    return NextResponse.json(portfolio);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to save portfolio.";

    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}