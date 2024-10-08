import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { urlStore } from "@/store/store";
import { useRouter } from "next/router";
import Spinner from "react-spinner-material";

export default function ElectionsSection() {
  const url = urlStore;
  const router = useRouter();
  const [activeElections, setActiveElections] = useState([]);

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const countDays = (endDate, startDate) => {
    return (
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24)
    );
  };

  useEffect(() => {
    const fetchActiveElections = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Anda harus login untuk melihat pemilihan aktif.");
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get(`${url}/api/vote/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setActiveElections(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchActiveElections();
  }, [url, router]);

  if (!activeElections)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner visible={true} color="#5046e4" size={100} />
      </div>
    );

  return (
    <>
      <div className="container mx-auto px-4 py-12 font-poppins">
        <h1
          className="text-3xl font-bold mb-8 text-center font-jakarta text-primary"
          data-aos="fade-down"
        >
          Pemilihan Aktif
        </h1>
        <div className="w-11/12 md:w-5/6 mx-auto py-10">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-20"
            data-aos="fade-up"
          >
            {activeElections.map((election) => (
              <div
                key={election._id}
                className="bg-white shadow-md border border-gray-200 hover:border-primary rounded-xl transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {election.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Jenis: {election.type === "bem" ? "BEM" : "Himpunan"}
                  </p>
                  <p className="text-gray-600 mb-4">
                    Jadwal: {formattedDate(election.startDate)} -{" "}
                    {formattedDate(election.endDate)}
                  </p>
                  <p className="text-gray-600 mb-4">
                    Durasi: {countDays(election.endDate, election.startDate)}{" "}
                    hari
                  </p>
                  <Link href={`/vote/${election._id}`}>
                    <p className="bg-primary text-white px-4 py-2 rounded hover:bg-[#453bcf] transition duration-300 ease-in-out inline-block">
                      Pilih Sekarang
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {activeElections.length === 0 && (
            <p className="text-center text-xl text-gray-700" data-aos="fade-up">
              Tidak ada pemilihan aktif saat ini.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
