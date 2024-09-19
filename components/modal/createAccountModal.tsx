import Input from "../input";

export default function CreateAccountModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="absolute -top-64 left-0 w-full flex justify-center z-50">
      <div onClick={onClose} className="fixed top-0 left-0 w-full h-full " />
      <form
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black flex flex-col rounded-2xl p-6 w-80 shadow-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-105"
      >
        <>
          <label htmlFor="email">이메일</label>
          <Input id="email" name="email" type="text" placeholder="Email" />
        </>
        <>
          <label htmlFor="displayName">이름</label>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            placeholder="이름"
          />
        </>
        <>
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            name="password"
            type="text"
            placeholder="password"
          />
        </>
        <>
          <label htmlFor="password_confirm">비밀번호 확인</label>
          <Input
            id="password_confirm"
            name="password_confirm"
            type="text"
            placeholder="password_confirm"
          />
        </>
      </form>
    </div>
  );
}
