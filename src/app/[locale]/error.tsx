"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center w-full">
      <h2 className="text-center text-[18px] text-red-500">
        An error occured: {error.message}
      </h2>
      <button
        className="mt-4 rounded-md bg-[#FF6C02] px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
