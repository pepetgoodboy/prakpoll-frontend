import Link from "next/link";
export default function HeroSection() {
  return (
    <>
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <div
          className="h-[500px] md:h-[550px] bg-primary bg-blend-multiply bg-cover bg-center bg-no-repeat rounded-2xl"
          style={{ backgroundImage: 'url("/assets/images/bg-voting.webp")' }}
        >
          <div className="w-11/12 sm:w-4/5 xl:w-10/12 mx-auto font-poppins">
            <div
              className="flex flex-col gap-9 py-8 sm:py-20 md:py-28 xl:py-32"
              data-aos="fade-up"
            >
              <div className="flex flex-col justify-center text-center sm:text-start font-jakarta">
                <h3 className="text-5xl md:text-5xl font-extrabold text-white">
                  Satu suara
                </h3>
                <h3 className="text-5xl md:text-5xl font-extrabold text-primary">
                  Satu masa depan
                </h3>
              </div>
              <div className="text-center sm:text-start text-gray-300">
                <p className="px-2 leading-relaxed sm:text-lg lg:w-4/5 xl:w-2/3">
                  Setiap suara anda menentukan arah organisasi kita. Gunakan hak
                  suara anda untuk membentuk masa depan kampus yang lebih baik.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 px-2 font-medium">
                <Link
                  href="/elections"
                  className="px-4 sm:px-8 py-3 bg-white rounded-lg text-primary"
                >
                  Pilih Sekarang
                </Link>
                <Link
                  href="/result"
                  className="px-4 sm:px-10 py-3 bg-primary bg-opacity-70 rounded-lg text-white"
                >
                  Lihat Hasil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
