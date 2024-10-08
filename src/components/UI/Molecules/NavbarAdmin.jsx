import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { FaPoll, FaUsers } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi";
import { RiChatPollLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LinkNavLogo from "../Atoms/Link/LinkNavLogo";
import LinkNavDesk from "../Atoms/Link/LinkNavDesk";
import LinkNavMobile from "../Atoms/Link/LinkNavMobile";
import ButtonNavbar from "../Atoms/Button/ButtonNavbar";

export default function NavbarAdmin() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("tokenAdmin");
      router.push("/login");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("tokenAdmin");
      setToken(storedToken);
    }
  }, []);
  return (
    <header className="sticky top-0 z-40 bg-white font-jakarta ring-1 ring-gray-300 shadow-sm">
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0 truncate">
            <LinkNavLogo />
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              <LinkNavDesk to="/admin" text="Beranda" />
              <LinkNavDesk to="/admin/user" text="User" />
              <LinkNavDesk to="/admin/elections" text="Pemilihan Aktif" />
              <LinkNavDesk to="/admin/elections/add" text="Tambah Pemilihan" />
            </div>
          </div>
          <div className="flex items-center lg:hidden px-2">
            {/* Button to open menu */}
            <div
              onClick={handleClick}
              className="px-2 py-2 cursor-pointer hover:bg-gray-100 text-[#a5acb6] hover:text-gray-500 rounded-md"
            >
              <FiMenu className="h-6 w-6" />
            </div>
          </div>
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            <div className="hidden lg:flex items-center space-x-3">
              <ButtonNavbar
                to="/login"
                text="Keluar"
                onClick={token ? handleLogout : null}
              />
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      <div
        className={`absolute top-0 inset-x-0 p-2 ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="rounded-lg shadow-lg ring-1 ring-gray-300 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <LinkNavLogo />
              </div>
              <div className="-mr-2">
                <div
                  onClick={handleClick}
                  className="px-1 py-1 cursor-pointer hover:bg-gray-100 border-[3px] border-[#5046E4] text-[#a5acb6] hover:text-gray-500 rounded-md"
                >
                  <IoClose className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-6">
                <LinkNavMobile
                  to="/admin"
                  logo={<HiOutlineHome className="h-6 w-6 text-[#5046E4]" />}
                  text="Beranda"
                />
                <LinkNavMobile
                  to="/admin/user"
                  logo={<FaUsers className="h-6 w-6 text-[#5046E4]" />}
                  text="User"
                />
                <LinkNavMobile
                  to="/admin/elections"
                  logo={<FaPoll className="h-6 w-6 text-[#5046E4]" />}
                  text="Pemilihan Aktif"
                />
                <LinkNavMobile
                  to="/admin/elections/add"
                  logo={<RiChatPollLine className="h-6 w-6 text-[#5046E4]" />}
                  text="Tambah Pemilihan"
                />
              </nav>
            </div>
            <div className="mt-8">
              <div className="flex flex-col space-y-4">
                <ButtonNavbar
                  to="/login"
                  text="Keluar"
                  onClick={token ? handleLogout : null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}