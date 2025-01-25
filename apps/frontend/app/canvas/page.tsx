import { SocketCanvas } from "@/components/SocketConnectCanvas";

export default async function CanvasPage({
  params,
}: {
  params: { roomId: string };
}) {
  const roomId = (await params).roomId;
  console.log(roomId);
  return <SocketCanvas roomId={roomId} />;
}
