import { Link } from "react-scroll";

export default function LinkScrollDesk({ to, text, onClick }) {
  return (
    <>
      <Link
        activeClass="active"
        to={to}
        onClick={onClick}
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        className="border-transparent cursor-pointer text-gray-700 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium whitespace-nowrap"
      >
        {text}
      </Link>
    </>
  );
}
