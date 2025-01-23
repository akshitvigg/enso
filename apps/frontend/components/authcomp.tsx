import { Input } from "@repo/ui/input";
const AuthComp = ({ isSignin }: { isSignin: boolean }) => {
  return (
    <div className=" h-screen items-center justify-center flex">
      <Input />
    </div>
  );
};
export default AuthComp;
