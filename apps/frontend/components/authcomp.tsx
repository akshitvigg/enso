import { Input } from "@repo/ui/input";
// import { Input } from "./input";

export default function AuthComp({ isSignin }: { isSignin: boolean }) {
  return (
    <div className=" h-screen items-center justify-center flex">
      <div className=" h-96 w-96 border rounded-xl border-neutral-800">
        <div className=" flex justify-center">
          <div className=" ">
            <Input placeholder={"email"} />
            <Input placeholder={"password"} />
            <button>{isSignin ? "sign in" : "sign up"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
