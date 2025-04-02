"use client";

import { WEB_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type choice = "create" | "join";

export default function CreateRoom() {
  const roomnameRef = useRef<HTMLInputElement>(null);
  const [roomid, setroomid] = useState("");
  const [choice, setchoice] = useState<choice>();
  const router = useRouter();

  async function getroomid() {
    localStorage.getItem("token");
    const res = await axios.post(
      `${WEB_URL}/createroom`,
      {
        slug: roomnameRef.current?.value,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    setroomid(res.data.roomid);
    alert(res.data.roomid);
  }

  function join() {
    router.push(`/canvas/${roomnameRef.current?.value}`);
  }

  useEffect(() => {
    if (roomid) {
      router.push(`/canvas/${roomid}`);
    }
  }, [roomid, router]);

  return (
    <div className=" items-center h-screen flex justify-center">
      <div>
        {choice && (
          <div>
            <input
              className="rounded-lg border outline-none  py-2 px-10 border-neutral-700 bg-[#27272a]"
              ref={roomnameRef}
              type="text"
              placeholder={
                choice === "create" ? "enter room name" : "enter room id"
              }
            />
            <button
              onClick={choice === "create" ? getroomid : join}
              className="transition-all duration-200 text-md mt-7 py-2 px-10 ml-2  border-[#262626] border  rounded-lg hover:bg-[#262626]  bg-[#18181b]"
            >
              {choice === "create" ? "create" : "join"}
            </button>
          </div>
        )}
        {!choice && (
          <div>
            <div>
              <button
                onClick={() => {
                  setchoice("create");
                }}
                className=" transition-all duration-200 text-md mt-7 py-2 px-[110px]  border-[#262626] border  rounded-lg hover:bg-[#262626]  bg-[#18181b] "
              >
                Create room
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setchoice("join");
                }}
                className=" transition-all duration-200 text-md mt-7 py-2 px-[115px]  border-[#262626] border  rounded-lg hover:bg-[#262626]  bg-[#18181b] "
              >
                Join Room
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
