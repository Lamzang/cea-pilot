interface IMember {
  uid: string;
  name: string;
}

export default function InviteModal({
  onSubmit,
  onClose,
  members,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  members: IMember[];
}) {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-customModalBg-default flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black flex flex-col rounded-2xl p-4 w-72"
      >
        <form
          onSubmit={onSubmit}
          className="mt-4 flex flex-col justify-between h-full"
        >
          <div className="mb-4">
            {/** db에서 chat-member 에서 멤버 목록을 가져온 다음 option으로 제공을 하자 */}
            <div className="h-32 overflow-y-auto">
              {members.map((data, index) => {
                return <div key={index}>{data.name}</div>;
              })}
            </div>
          </div>
          <button className="bg-blue-500 w-full py-2 rounded">Create</button>
        </form>
      </div>
    </div>
  );
}
