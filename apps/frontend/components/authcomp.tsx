"use client";
import { Input } from "@repo/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function AuthComp({ isSignup }: { isSignup: boolean }) {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function signup() {
    const email = emailInputRef.current?.value;
    const password = passInputRef.current?.value;
    const name = nameInputRef.current?.value;

    const res = await axios.post("http://localhost:3002/signup", {
      email,
      password,
      name,
    });

    console.log(res.data);
    alert("user signed up");
    router.push("/signin");
  }
  async function signin() {
    const email = emailInputRef.current?.value;
    const password = passInputRef.current?.value;

    const res = await axios.post("http://localhost:3002/signin", {
      email,
      password,
    });

    console.log(res.data);
    alert("user signed in" + res.data.token);
    localStorage.setItem("token", res.data.token);
  }
  return (
    <div className=" text-black h-screen items-center justify-center flex">
      <div className=" h-96 w-96 border rounded-xl border-neutral-800">
        <div className=" flex justify-center">
          <div className=" ">
            <Input reference={emailInputRef} placeholder="email" />
            <Input reference={passInputRef} placeholder="password" />
            {isSignup && <Input reference={nameInputRef} placeholder="name" />}
            <button
              className=" text-white"
              onClick={() => {
                isSignup ? signup() : signin();
              }}
            >
              {isSignup ? "sign up" : "sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
