import Image from "next/image";
import Link from "next/link";
import LogoNavbar from "../../../../../public/assets/logo.png";

export default function LinkNavLogo() {
  return (
    <>
      <Link
        href="/"
        className="flex-shrink-0 flex items-center text-gray-900 dark:text-gray-200"
      >
        <Image src={LogoNavbar} alt="PrakPoll Logo" className="h-8 w-auto" />
        <p className="text-3xl font-semibold font-poppins">PrakPoll</p>
      </Link>
    </>
  );
}
