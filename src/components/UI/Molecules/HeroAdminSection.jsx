import Link from "next/link";
export default function HeroAdminSection() {
  return (
    <>
      <div className="py-8 px-4 max-w-7xl mx-auto h-screen">
        <div
          className="h-[600px] md:h-[550px] bg-primary bg-blend-multiply bg-cover bg-center bg-no-repeat rounded-2xl"
          style={{ backgroundImage: 'url("/assets/images/bg-admin.webp")' }}
        >
          <div className="w-11/12 sm:w-4/5 xl:w-10/12 mx-auto font-poppins">
            <div
              className="flex flex-col gap-9 py-8 sm:py-20 md:py-28 xl:py-32"
              data-aos="fade-up"
            >
              <div className="flex flex-col justify-center text-center sm:text-start font-jakarta">
                <h3 className="text-5xl md:text-5xl font-extrabold text-white">
                  Selamat Datang
                </h3>
                <h3 className="text-5xl md:text-5xl font-extrabold text-primary">
                  Admin
                </h3>
              </div>
              <div className="text-center sm:text-start text-gray-300">
                <p className="px-2 leading-relaxed sm:text-lg lg:w-4/5 xl:w-2/3">
                  Selamat datang di Dashboard Admin PrakPoll! Di sini, Anda
                  dapat mengelola seluruh proses pemilihan dengan mudah dan
                  aman. Dashboard ini memberikan informasi real-time tentang
                  status pemilihan, peserta, dan aktivitas voting.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 px-2 font-medium">
                <Link
                  href="/admin/user"
                  className="px-4 sm:px-8 py-3 bg-white rounded-lg text-primary"
                >
                  Kelola User
                </Link>
                <Link
                  href="/admin/elections"
                  className="px-4 sm:px-10 py-3 bg-primary bg-opacity-70 rounded-lg text-white"
                >
                  Kelola Pemilihan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
