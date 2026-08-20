"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-800"
    >
      Print / Save as PDF
    </button>
  );
}