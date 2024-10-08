import React, { useState } from "react";
import axios from "axios";
import { urlStore } from "@/store/store";
import InputAuth from "../Atoms/Input/InputAuth";
import { toast } from "react-toastify";

export default function AddElectionsSelection() {
  const url = urlStore;
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    studyProgram: "",
    startDate: "",
    endDate: "",
  });
  const [candidates, setCandidates] = useState([
    { name: "", visi: "", misi: "", image: null },
    { name: "", visi: "", misi: "", image: null },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCandidateChange = (index, field, value) => {
    const newCandidates = [...candidates];
    newCandidates[index][field] = value;
    setCandidates(newCandidates);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    const newCandidates = [...candidates];
    newCandidates[index].image = file;
    setCandidates(newCandidates);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();

    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });

    const candidatesData = candidates.map((candidate) => ({
      name: candidate.name,
      visi: candidate.visi,
      misi: candidate.misi,
      image: candidate.image ? candidate.image.name : null,
    }));

    submitData.append("candidates", JSON.stringify(candidatesData));

    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].image) {
        submitData.append(`candidateImage${i + 1}`, candidates[i].image);
      }
    }

    try {
      const response = await axios.post(`${url}/api/vote/create`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`,
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setFormData({
          title: "",
          type: "",
          studyProgram: "",
          startDate: "",
          endDate: "",
        });
        setCandidates([
          { name: "", visi: "", misi: "", image: null },
          { name: "", visi: "", misi: "", image: null },
        ]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 font-poppins">
      <h1
        className="text-3xl font-bold mb-8 text-center font-jakarta text-primary"
        data-aos="fade-down"
      >
        Tambah Pemilihan
      </h1>

      <form
        onSubmit={onSubmit}
        className="space-y-6 w-11/12 md:w-5/6 mx-auto text-gray-700"
        data-aos="fade-up"
      >
        <div>
          <label htmlFor="title" className="block mb-1">
            Judul Pemilihan
          </label>
          <InputAuth
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            variant="w-full"
          />
        </div>

        <div>
          <label htmlFor="type" className="block mb-1">
            Tipe Pemilihan
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-200 outline-none rounded-lg focus:border-[#453bcf] focus:ring-1 focus:ring-[#453bcf]"
          >
            <option value="" disabled>
              Pilih tipe pemilihan
            </option>
            <option value="bem">BEM</option>
            <option value="himpunan">Himpunan</option>
          </select>
        </div>

        <div>
          <label htmlFor="studyProgram" className="block mb-1">
            Program Studi
          </label>
          <select
            id="studyProgram"
            name="studyProgram"
            value={formData.studyProgram}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-200 outline-none rounded-lg focus:border-[#453bcf] focus:ring-1 focus:ring-[#453bcf]"
          >
            <option value="" disabled>
              Pilih program studi
            </option>
            <option value="All">Semua Jurusan</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Manajemen Informatika">Manajemen Informatika</option>
            <option value="Perpajakan">Perpajakan</option>
            <option value="Manajemen Bisnis Digital">
              Manajemen Bisnis Digital
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="startDate" className="block mb-1">
            Tanggal Mulai
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-200 outline-none rounded-lg focus:border-[#453bcf] focus:ring-1 focus:ring-[#453bcf]"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block mb-1">
            Tanggal Selesai
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-200 outline-none rounded-lg focus:border-[#453bcf] focus:ring-1 focus:ring-[#453bcf]"
          />
        </div>

        <h2 className="text-2xl font-jakarta text-primary font-semibold mt-8 mb-4">
          Kandidat
        </h2>

        {candidates.map((candidate, index) => (
          <div key={index} className="border p-4 rounded-md mb-4">
            <h3 className="text-xl font-semibold mb-2">Kandidat {index + 1}</h3>

            <div className="mb-2">
              <label htmlFor={`candidate-name-${index}`} className="block mb-1">
                Nama Kandidat
              </label>
              <InputAuth
                type="text"
                id={`candidate-name-${index}`}
                value={candidate.name}
                onChange={(e) =>
                  handleCandidateChange(index, "name", e.target.value)
                }
                variant="w-full"
              />
            </div>

            {/* Input untuk visi, misi, dan foto */}
            <div className="mb-2">
              <label htmlFor={`candidate-visi-${index}`} className="block mb-1">
                Visi
              </label>
              <textarea
                id={`candidate-visi-${index}`}
                value={candidate.visi}
                onChange={(e) =>
                  handleCandidateChange(index, "visi", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-200 outline-none rounded-lg focus:border-[#453bcf] focus:ring-1 focus:ring-[#453bcf]"
              />
            </div>

            <div className="mb-2">
              <label htmlFor={`candidate-misi-${index}`} className="block mb-1">
                Misi
              </label>
              <textarea
                id={`candidate-misi-${index}`}
                value={candidate.misi}
                onChange={(e) =>
                  handleCandidateChange(index, "misi", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-200 outline-none rounded-lg focus:border-[#453bcf] focus:ring-1 focus:ring-[#453bcf]"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor={`candidate-image-${index}`}
                className="block mb-1"
              >
                Foto Kandidat
              </label>
              <input
                type="file"
                id={`candidate-image-${index}`}
                onChange={(e) => handleImageChange(index, e)}
                accept="image/*"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Simpan Pemilihan
          </button>
        </div>
      </form>
    </div>
  );
}
