import Input from "../input";

export default function Modal({
  onSubmit,
  onClose,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-customModalBg-default flex justify-center items-center z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black flex flex-col rounded-2xl p-4 w-72 z-50"
      >
        <form onSubmit={onSubmit} className="mt-4">
          <div className="mb-4">
            <Input name="makeRoom" placeholder="New Channel" />
          </div>
          <button className="bg-blue-500 w-full py-2 rounded">Create</button>
        </form>
      </div>
    </div>
  );
}
