import Link from "next/link";

export default function FooterVote() {
  return (
    <>
      <div className="pt-8">
        <div className="mt-6 px-4 sm:px-16 py-16 bg-[#fafafa] font-poppins">
          <div className="flex flex-col gap-8 lg:gap-32 lg:grid lg:grid-cols-[3fr,1fr,1fr] lg:justify-between">
            <div className="flex flex-col gap-4">
              <h4 className="text-xl text-primary font-semibold font-jakarta">
                PrakPoll
              </h4>
              <p className="text-gray-700 text-justify">
                PrakPoll adalah platform voting online yang dibuat untuk
                memudahkan mahasiswa Praktisi Politeknik Bisnis Digital Bandung
                dalam memilih pemimpin organisasi mahasiswa baik Ketua Badan
                Eksekutif Mahasiswa ataupun Ketua Himpunan Mahasiswa.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xl font-medium font-jakarta">
                Mengapa PrakPoll?
              </h4>
              <div className="flex flex-col gap-1">
                <p className="text-gray-700">Mudah Diakses</p>
                <p className="text-gray-700">Privasi Terjamin</p>
                <p className="text-gray-700">Hasil Cepat & Akurat</p>
                <p className="text-gray-700">Transparansi</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xl font-medium font-jakarta">Direct Link</h4>
              <div className="flex flex-col gap-1">
                <Link href="/" className="text-gray-700 hover:text-primary">
                  Beranda
                </Link>
                <Link
                  href="/elections"
                  className="text-gray-700 hover:text-primary"
                >
                  Pemilihan Aktif
                </Link>
                <Link
                  href="/result"
                  className="text-gray-700 hover:text-primary"
                >
                  Hasil
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto bg-[#fafafa]">
          <div className="flex justify-center py-6 border border-t-gray-200">
            <p className="text-center text-gray-700 text-sm">
              Copyright &copy; PrakPoll 2024
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
