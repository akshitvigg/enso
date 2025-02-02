"use client";
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
    <div className=" h-screen items-center justify-center flex">
      <div className=" h-96 w-96 border rounded-xl border-neutral-800">
        <div className=" flex justify-center">
          <div>
            {/* email */}
            <div className=" mt-16  flex justify-center">
              <div>
                <label className="text-sm" htmlFor="email">
                  Email
                </label>{" "}
                <br />
                <input
                  id="email"
                  className=" rounded-lg border outline-none  py-2 px-10 border-neutral-700 bg-[#27272a]"
                  ref={emailInputRef}
                  placeholder="demo@gmail.com"
                />
              </div>
            </div>
            {/* pass */}
            <div className=" mt-2 flex justify-center">
              <div>
                <label className=" text-sm" htmlFor="pass">
                  Password
                </label>
                <br />
                <input
                  id="pass"
                  className="  rounded-lg border outline-none  py-2 px-10 border-neutral-700 bg-[#27272a]"
                  ref={passInputRef}
                  placeholder="password"
                />
              </div>
            </div>
            {/* name */}
            {isSignup && (
              <div className="mt-2 flex justify-center">
                <div>
                  <label className="text-sm" htmlFor="name">
                    Name
                  </label>{" "}
                  <br />
                  <input
                    id="name"
                    className="border  rounded-lg outline-none py-2 px-10 border-neutral-700 bg-[#27272a]"
                    ref={nameInputRef}
                    placeholder="Sakamoto Taro"
                  />
                </div>
              </div>
            )}
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
