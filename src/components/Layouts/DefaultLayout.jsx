import AOSWrapper from "../UI/Atoms/AOS/AOSWrapper";
import Footer from "../UI/Molecules/Footer";
import Navbar from "../UI/Molecules/Navbar";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <AOSWrapper>{children}</AOSWrapper>
      <Footer />
    </>
  );
}
