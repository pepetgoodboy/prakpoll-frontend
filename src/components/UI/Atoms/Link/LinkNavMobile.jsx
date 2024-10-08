import Link from "next/link";

export default function LinkNavMobile({ to, logo, text }) {
  return (
    <>
      <Link href={to} className="flex">
        {logo}
        <p className="ml-3 text-gray-700 font-medium">{text}</p>
      </Link>
    </>
  );
}
