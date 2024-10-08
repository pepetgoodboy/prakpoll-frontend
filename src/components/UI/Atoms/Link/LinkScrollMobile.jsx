import { Link } from "react-scroll";

export default function LinkScrollMobile({ to, logo, text }) {
  return (
    <>
      <Link
        activeClass="active"
        to={to}
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        className="flex"
      >
        {logo}
        <p className="ml-3 text-gray-700 font-medium cursor-pointer">{text}</p>
      </Link>
    </>
  );
}
