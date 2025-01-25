import { SocketCanvas } from "@/components/SocketConnectCanvas";

type Params = Promise<{ roomId: string }>;

export default async function CanvasPage({ params }: { params: Params }) {
  const roomId = (await params).roomId;
  console.log(roomId);
  return <SocketCanvas roomId={roomId} />;
}
