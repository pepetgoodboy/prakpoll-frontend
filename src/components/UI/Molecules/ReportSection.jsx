import Image from "next/image";
import Report from "../../../../public/assets/icons/report.png";
import axios from "axios";
import { toast } from "react-toastify";

export default function ReportSection() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await axios.post(
        "https://formspree.io/f/movqapgg",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Laporan anda telah terkirim");
        form.reset();
      } else {
        toast.error("Laporan anda gagal terkirim");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan dalam mengirim laporan");
      console.error(error);
    }
  };

  return (
    <>
      <div className="py-14 font-poppins">
        <div className="w-full sm:w-10/12 md:w-11/12 mx-auto bg-primary text-white sm:rounded-2xl">
          <div
            className="px-4 sm:px-10 md:px-20 lg:px-32 xl:px-16 py-12 sm:py-14 flex gap-6"
            data-aos="zoom-in-down"
          >
            <div className="w-full xl:w-[65%] flex flex-col xl:justify-center gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-jakarta">
                  Lapor Masalah PrakPoll
                </h4>
                <p className="text-lg sm:text-xl">
                  Lapor masalah anda dengan menekan tombol di bawah ini
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                id="report"
                name="report"
                className="flex flex-col gap-4 md:flex-row"
              >
                <textarea
                  id="report"
                  name="report"
                  rows={1}
                  required
                  placeholder="Masukkan Laporan anda"
                  className="w-full px-4 py-5 rounded-lg outline-none text-gray-700 text-lg"
                />
                <button
                  type="submit"
                  className="w-40 px-4 py-2 bg-[#3116aa] hover:bg-[#35228d] rounded-lg text-white font-medium"
                >
                  Kirim
                </button>
              </form>
            </div>
            <div className="hidden xl:w-[35%] xl:flex xl:justify-center xl:items-center">
              <Image src={Report} alt="Report" width={300} height={300} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
