import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { urlStore } from "@/store/store";
import { toast } from "react-toastify";
import Spinner from "react-spinner-material";
import VoteLayout from "@/components/Layouts/VoteLayout";

export default function Vote() {
  const url = urlStore;
  const router = useRouter();
  const { id } = router.query;
  const [voteData, setVoteData] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    if (id) {
      fetchVoteData();
    }
  }, [id]);

  const fetchVoteData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${url}/api/vote/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVoteData(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate) return;

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${url}/api/vote/add/${id}/${selectedCandidate}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (!voteData)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner visible={true} color="#5046e4" size={100} />
      </div>
    );

  return (
    <VoteLayout>
      <div className="container mx-auto px-4 py-12 font-poppins">
        <h1
          className="text-3xl text-center font-jakarta text-primary font-bold mb-6"
          data-aos="fade-down"
        >
          {voteData.title}
        </h1>
        <div
          className="w-11/12 md:w-5/6 xl:w-3/4 mx-auto py-10"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-16">
            {voteData.candidates.map((candidate) => {
              // Pisahkan misi berdasarkan baris baru "\n"
              const misiList = candidate.misi.split("\n");

              return (
                <div
                  key={candidate._id}
                  className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
                >
                  <img
                    src={`${url}/images/${candidate.image}`}
                    alt={candidate.name}
                    className="w-full h-96 object-cover object-center mb-4 rounded-lg border border-gray-200"
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    {candidate.name}
                  </h2>
                  <p className="text-gray-700 mb-4">Visi: {candidate.visi}</p>
                  {/* Render Misi sebagai List */}
                  <p className="text-gray-700 mb-4">Misi:</p>
                  <ul className="list-disc ml-5 text-gray-700 mb-4">
                    {misiList.map((misiItem, index) => (
                      <li key={index}>{misiItem}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedCandidate(candidate._id)}
                    className={`w-full px-4 py-2 rounded ${
                      selectedCandidate === candidate._id
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    Pilih
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleVote}
              className="mt-8 bg-primary text-white px-6 py-3 rounded hover:bg-[#453bcf] font-medium cursor-pointer"
              disabled={!selectedCandidate}
            >
              Kirim Suara
            </button>
          </div>
        </div>
      </div>
    </VoteLayout>
  );
}
