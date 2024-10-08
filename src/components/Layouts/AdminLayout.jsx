import AOSWrapper from "../UI/Atoms/AOS/AOSWrapper";
import FooterAdmin from "../UI/Molecules/FooterAdmin";
import NavbarAdmin from "../UI/Molecules/NavbarAdmin";
import isAdmin from "@/middlewares/isAdmin";
export default function AdminLayout({ children }) {
  isAdmin();
  return (
    <>
      <NavbarAdmin />
      <AOSWrapper>{children}</AOSWrapper>
      <FooterAdmin />
    </>
  );
}
