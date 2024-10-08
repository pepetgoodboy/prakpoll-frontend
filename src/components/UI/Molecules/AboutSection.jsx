import Easy from "../../../../public/assets/icons/easy.png";
import Shield from "../../../../public/assets/icons/shield.png";
import Result from "../../../../public/assets/icons/result.png";
import Transparant from "../../../../public/assets/icons/transparant.png";
import Image from "next/image";
import CardBenefit from "../Atoms/Card/CardBenefit";

export default function AboutSection() {
  return (
    <>
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <div className="w-11/12 md:w-5/6 mx-auto font-poppins">
          <div className="flex flex-col gap-28">
            <div
              className="flex flex-col gap-4 text-center justify-center"
              data-aos="fade-up"
            >
              <h4 className="text-3xl font-bold text-primary font-jakarta">
                Apa itu PrakPoll?
              </h4>
              <p className="text-gray-700 text-justify md:text-center">
                PrakPoll adalah platform voting online yang dibuat untuk
                memudahkan mahasiswa Praktisi Politeknik Bisnis Digital Bandung
                dalam memilih pemimpin organisasi mahasiswa baik Ketua Badan
                Eksekutif Mahasiswa ataupun Ketua Himpunan Mahasiswa. Dengan
                antarmuka yang user-friendly dan sistem keamanan yang terjamin,
                PrakPoll memungkinkan setiap suara mahasiswa didengar dan
                dihitung secara adil.
              </p>
            </div>
            <div
              className="flex flex-col gap-8 text-center justify-center"
              data-aos="fade-up"
            >
              <h4 className="text-3xl font-bold text-primary font-jakarta mb-8">
                Mengapa PrakPoll?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CardBenefit
                  image={Easy}
                  alt="Easy"
                  title="Mudah Diakses"
                  desc="PrakPoll dapat diakses dari berbagai perangkat (smartphone,
                    komputer) dan jaringan internet, sehingga mahasiswa dapat
                    berpartisipasi kapan saja dan di mana saja."
                />
                <CardBenefit
                  image={Shield}
                  alt="Shield"
                  title="Privasi Terjamin"
                  desc="Setiap suara pengguna dijamin kerahasiaannya. Sistem
                    keamanan yang canggih mencegah terjadinya kebocoran data."
                />
                <CardBenefit
                  image={Result}
                  alt="Result"
                  title="Hasil Cepat & Akurat"
                  desc="Hasil penghitungan suara dapat diketahui secara real-time,
                    sehingga proses pemilihan menjadi lebih efisien."
                />
                <CardBenefit
                  image={Transparant}
                  alt="Transparant"
                  title="Transparansi"
                  desc="Seluruh proses pemilihan, mulai dari pendaftaran hingga
                    pengumuman hasil, dilakukan secara terbuka dan transparan."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
