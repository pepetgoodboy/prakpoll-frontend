import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Spinner from "react-spinner-material";
import { urlStore } from "@/store/store";
import VoteLayout from "@/components/Layouts/VoteLayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ResultVote() {
  const url = urlStore;
  const router = useRouter();
  const { id } = router.query;
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (id) {
      fetchResults();
    }
  }, [id]);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`${url}/api/vote/report/${id}`);
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (!results)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner visible={true} color="#5046e4" size={100} />
      </div>
    );

  const chartData = {
    labels: results.candidateResults.map((candidate) => candidate.name),
    datasets: [
      {
        label: "Suara",
        data: results.candidateResults.map((candidate) => candidate.voteCount),
        backgroundColor: "rgba(75, 192, 192, 0.6",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Hasil Pemilihan",
      },
    },
  };

  return (
    <VoteLayout>
      <div className="container mx-auto px-4 py-8 font-poppins">
        <h1
          className="text-3xl font-bold mb-6 font-jakarta text-primary text-center"
          data-aos="fade-down"
        >
          Hasil Real Time {results.voteTitle}
        </h1>
        <div className="bg-white shadow-md rounded-2xl border border-gray-200 p-6 mb-8">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 justify-center text-center"
          data-aos="fade-up"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-4">Detail Pemilihan</h2>
            <p className="capitalize">
              <strong>Jenis Pemilihan:</strong> {results.voteType}
            </p>
            <p className="capitalize">
              <strong>Proram Studi:</strong> {results.studyProgram}
            </p>
            <p>
              <strong>Tanggal Mulai:</strong> {formattedDate(results.startDate)}
            </p>
            <p>
              <strong>Tangal Selesai:</strong> {formattedDate(results.endDate)}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Partisipasi</h2>
            <p>
              <strong>Total Suara:</strong> {results.totalVotes}
            </p>
            <p>
              <strong>Total Pemilih:</strong> {results.eligibleVoters}
            </p>
            <p>
              <strong>Tingkat Partisipasi:</strong> {results.participationRate}
            </p>
          </div>
        </div>
        <div className="mt-8 lg:mt-16 text-gray-700" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Hasil Kandidat
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 text-center w-11/12 mx-auto md:w-5/6">
            {results.candidateResults.map((candidate, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary hover:scale-110 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{candidate.name}</h3>
                <p>
                  <strong>Suara:</strong> {candidate.voteCount}
                </p>
                <p>
                  <strong>Persentase:</strong> {candidate.percentage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VoteLayout>
  );
}
