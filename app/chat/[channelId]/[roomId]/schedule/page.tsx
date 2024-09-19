export default function Page({
  params,
}: {
  params: { channelId: string; roomId: string };
}) {
  console.log("params", params);
  return <div>일정</div>;
}
