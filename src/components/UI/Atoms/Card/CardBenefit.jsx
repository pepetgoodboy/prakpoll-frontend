import Image from "next/image";

export default function CardBenefit({ image, alt, title, desc }) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="w-14 p-2 mx-auto bg-primary rounded-lg">
          <Image src={image} alt={alt} width={50} height={50} />
        </div>
        <p className="text-gray-700 font-semibold">{title}</p>
        <p className="text-gray-700 text-center">{desc}</p>
      </div>
    </>
  );
}
