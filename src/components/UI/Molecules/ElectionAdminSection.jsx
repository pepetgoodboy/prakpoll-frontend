import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { urlStore } from "@/store/store";
import { useRouter } from "next/router";

export default function ElectionsAdminSection() {
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

  const fetchActiveElections = async () => {
    const token = localStorage.getItem("tokenAdmin");
    if (!token) {
      toast.error("Anda harus login untuk melihat pemilihan aktif.");
      router.push("/login");
      return;
    }

    try {
      const response = await axios.get(`${url}/api/vote/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`,
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

  const handleRemoveElection = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/vote/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`,
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchActiveElections();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchActiveElections();
  }, [url, router]);

  return (
    <>
      <div className="container mx-auto px-4 py-12 font-poppins h-screen">
        <h1
          className="text-3xl font-bold mb-8 text-center font-jakarta text-primary"
          data-aos="fade-down"
        >
          Pemilihan Aktif
        </h1>
        <div className="w-11/12 md:w-5/6 mx-auto py-10 text-gray-700">
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
                  <h2 className="text-xl font-semibold mb-2">
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
                  <div className="flex gap-4">
                    <Link href={`/admin/elections/${election._id}`}>
                      <p className="bg-primary text-white px-4 py-2 rounded hover:bg-[#453bcf] transition duration-300 ease-in-out inline-block">
                        Lihat Detail
                      </p>
                    </Link>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleRemoveElection(election._id)}
                    >
                      <p className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out inline-block">
                        Hapus Pemilihan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {activeElections.length === 0 && (
          <p
            className="text-center text-gray-700 text-sm sm:text-base md:text-xl"
            data-aos="fade-up"
          >
            Tidak ada pemilihan aktif saat ini.
          </p>
        )}
      </div>
    </>
  );
}
