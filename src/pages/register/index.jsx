import LabelAuth from "@/components/UI/Atoms/Label/LabelAuth";
import InputAuth from "@/components/UI/Atoms/Input/InputAuth";
import FormAuth from "@/components/UI/Atoms/Form/FormAuth";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { urlStore } from "@/store/store";
import axios from "axios";
import { toast } from "react-toastify";
import SelectOptionAuth from "@/components/UI/Atoms/Select/SelectOptionAuth";
export default function Register() {
  const [npm, setNpm] = useState("");
  const [name, setName] = useState("");
  const [studyProgram, setStudyProgram] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const url = urlStore;

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await axios.post(`${url}/api/user/register`, {
        npm: npm,
        name: name,
        studyProgram: studyProgram,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
          setIsLoading(false);
        }
      } else {
        toast.error(error.response.data.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <AuthLayout title="Daftar" text="Masuk">
        <FormAuth
          onSubmit={handleRegister}
          id="register"
          name="register"
          text="Daftar"
          question="Sudah"
          linkText="Masuk"
          link="/login"
          isLoading={isLoading}
        >
          <div className="flex flex-col gap-1 text-sm">
            <LabelAuth text="NPM" />
            <InputAuth
              type="number"
              id="npm"
              name="npm"
              value={npm}
              onChange={(e) => setNpm(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <LabelAuth text="Nama Lengkap" />
            <InputAuth
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <LabelAuth text="Program Studi" />
            <SelectOptionAuth
              id={"studyProgram"}
              name={"studyProgram"}
              value={studyProgram}
              onChange={(e) => setStudyProgram(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <LabelAuth text="Email" />
            <InputAuth
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <LabelAuth text="Password" />
            <InputAuth
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <InputAuth type="checkbox" id="checkbox" name="checkbox" />
            <p className="text-xs md:text-sm">
              Saya setuju dengan <span className="text-primary">syarat</span>{" "}
              dan <span className="text-primary">ketentuan</span> yang berlaku
            </p>
          </div>
        </FormAuth>
      </AuthLayout>
    </>
  );
}
