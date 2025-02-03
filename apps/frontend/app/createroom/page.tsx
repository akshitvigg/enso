"use client";

import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";

export default function CreateRoom() {
  const roomnameRef = useRef<HTMLInputElement>(null);
  const [roomid, setroomid] = useState("");

  async function getroomid() {
    localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:3002/createroom",
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
  return (
    <div className=" items-center h-screen flex justify-center">
      <div>
        <div>
          <input
            className="rounded-lg border outline-none  py-2 px-10 border-neutral-700 bg-[#27272a]"
            ref={roomnameRef}
            type="text"
            placeholder=" enter room name"
          />
        </div>
        <div>
          <button
            onClick={getroomid}
            className=" transition-all duration-200 text-md mt-7 py-2 px-[110px]  border-[#262626] border  rounded-lg hover:bg-[#262626]  bg-[#18181b] "
          >
            create room
          </button>
        </div>
      </div>
      <Link className=" cursor-pointer" href={`/canvas/${roomid}`}>
        {roomid}
      </Link>
    </div>
  );
}
