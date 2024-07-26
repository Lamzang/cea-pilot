export default function AdminMessagePage() {
  return (
    <div>
      <div>Latest sended messages</div>
      <div>show templates</div>
      <div className="flex">
        <div>scope</div>
        <input placeholder="message" />
        <button>Send</button>
      </div>
    </div>
  );
}
