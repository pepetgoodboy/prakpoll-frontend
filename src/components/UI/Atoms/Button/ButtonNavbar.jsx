import Link from "next/link";

export default function ButtonNavbar({ to, text, onClick }) {
  return (
    <>
      <Link
        href={to}
        className="py-2 px-4 bg-[#5046E4] hover:bg-[#453bcf] text-white font-medium rounded-md text-sm text-center"
        onClick={onClick}
      >
        <button type="button">{text}</button>
      </Link>
    </>
  );
}
