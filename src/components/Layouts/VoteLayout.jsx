import AOSWrapper from "../UI/Atoms/AOS/AOSWrapper";
import NavbarSingle from "../UI/Molecules/NavbarSingle";
import FooterVote from "../UI/Molecules/FooterVote";

export default function VoteLayout({ children }) {
  return (
    <>
      <NavbarSingle />
      <AOSWrapper>{children}</AOSWrapper>
      <FooterVote />
    </>
  );
}
