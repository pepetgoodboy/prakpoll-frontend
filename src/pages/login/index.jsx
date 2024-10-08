import LabelAuth from "@/components/UI/Atoms/Label/LabelAuth";
import InputAuth from "@/components/UI/Atoms/Input/InputAuth";
import FormAuth from "@/components/UI/Atoms/Form/FormAuth";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { urlStore } from "@/store/store";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const url = urlStore;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await axios.post(`${url}/api/user/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        if (response.data.role === "admin") {
          localStorage.setItem("tokenAdmin", response.data.token);
          router.push("/admin");
        } else {
          localStorage.setItem("token", response.data.token);
          router.push("/");
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error(error.response.data.message);
          setIsLoading(false);
        }
      } else {
        toast.error(error.response.data.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
      toast.error("Anda sudah login!");
    }
  }, [url, router]);

  return (
    <>
      <AuthLayout title="Masuk" text="Daftar">
        <FormAuth
          onSubmit={handleLogin}
          id="login"
          name="login"
          text="Masuk"
          question="Belum"
          linkText="Daftar"
          link="/register"
          isLoading={isLoading}
        >
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
