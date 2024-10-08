import Link from "next/link";
import Spinner from "react-spinner-material";

export default function FormAuth({
  id,
  name,
  onSubmit,
  text,
  question,
  linkText,
  link,
  children,
  isLoading,
}) {
  return (
    <>
      <form
        id={id}
        name={name}
        onSubmit={onSubmit}
        className="py-8 px-12 border border-gray-200 border-t-4 border-t-[#fee600] rounded-xl flex flex-col gap-6 text-gray-700"
      >
        {children}
        <button
          type="submit"
          className="flex justify-center items-center px-4 sm:px-8 py-3 bg-primary rounded-lg text-white"
        >
          {isLoading ? (
            <Spinner radius={20} color={"#ffffff"} stroke={2} visible={true} />
          ) : (
            text
          )}
        </button>
      </form>
      <p className="text-center text-sm text-gray-700">
        {question} punya akun?{" "}
        <Link className="text-primary hover:text-[#453bcf]" href={link}>
          {linkText} sekarang
        </Link>
      </p>
    </>
  );
}
