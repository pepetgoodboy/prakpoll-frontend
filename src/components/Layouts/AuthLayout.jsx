import Logo from "../../../public/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ title, text, children }) {
  return (
    <>
      <div className="w-11/12 min-h-screen flex justify-center items-center mx-auto">
        <div className="flex justify-center items-center flex-col gap-6 font-poppins">
          <Image src={Logo} width={60} height={60} alt="PrakPoll Logo" />
          <div className="flex flex-col gap-2 text-center">
            <h4 className="text-3xl font-bold font-jakarta">
              {title} akun PrakPoll
            </h4>
            <p className="text-gray-700 text-sm">
              atau{" "}
              <Link href="/login" className="text-primary hover:text-[#453bcf]">
                {text} ke akun anda
              </Link>
            </p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
