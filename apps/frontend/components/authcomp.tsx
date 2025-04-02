"use client";
import { WEB_URL } from "@/config";
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

    const res = await axios.post(`${WEB_URL}/signup`, {
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

    const res = await axios.post(`${WEB_URL}/signin`, {
      email,
      password,
    });
    alert("user signed in" + res.data.token);
    localStorage.setItem("token", res.data.token);
  }

  return (
    <div className="  h-screen items-center justify-center flex">
      <div className="  w-96 border rounded-xl border-neutral-800">
        <div className=" flex justify-center">
          <div>
            {/* email */}
            <p className=" text-2xl flex justify-center mt-8 font-bold">
              Welcome to Enso
            </p>
            <div className=" mt-6  flex justify-center">
              <div>
                <label className=" font-semibold text-sm" htmlFor="email">
                  Email
                </label>
                <br />
                <input
                  id="email"
                  className=" mt-1 rounded-lg border outline-none  py-2 px-10 border-neutral-700 bg-[#27272a]"
                  ref={emailInputRef}
                  placeholder="demo@example.com"
                />
              </div>
            </div>
            {/* pass */}
            <div className=" mt-2 flex justify-center">
              <div>
                <label className=" font-semibold text-sm" htmlFor="pass">
                  Password
                </label>
                <br />
                <input
                  id="pass"
                  className=" mt-1 rounded-lg border outline-none  py-2 px-10 border-neutral-700 bg-[#27272a]"
                  ref={passInputRef}
                  placeholder="password"
                />
              </div>
            </div>
            {/* name */}
            {isSignup && (
              <div className="mt-2 flex justify-center">
                <div>
                  <label className="font-semibold text-sm" htmlFor="name">
                    Name
                  </label>
                  <br />
                  <input
                    id="name"
                    className="border mt-1  rounded-lg outline-none py-2 px-10 border-neutral-700 bg-[#27272a]"
                    ref={nameInputRef}
                    placeholder="Sakamoto Taro"
                  />
                </div>
              </div>
            )}
            {/* btn */}
            <div className="pb-12 flex justify-center">
              <button
                className=" transition-all duration-200 text-md mt-7 py-2.5 px-32  border-[#262626] border  rounded-lg hover:bg-[#262626]  bg-[#18181b] text-white"
                onClick={() => {
                  isSignup ? signup() : signin();
                }}
              >
                {isSignup ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
