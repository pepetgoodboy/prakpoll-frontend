import Link from "next/link";

export default function LinkNavDesk({ to, text }) {
  return (
    <>
      <Link
        href={to}
        className="border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium whitespace-nowrap"
      >
        {text}
      </Link>
    </>
  );
}
