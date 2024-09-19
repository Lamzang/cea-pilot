export default function AuthModal({
  onClose,
  onCreateAccount,
  onLogin,
}: {
  onClose: () => void;
  onCreateAccount: () => void;
  onLogin: () => void;
}) {
  return (
    <div className="absolute -top-32 left-0 w-full flex justify-center z-50">
      <div onClick={onClose} className="fixed top-0 left-0 w-full h-full " />
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black flex flex-col rounded-2xl p-6 w-80 shadow-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-105"
      >
        <div
          className="rounded-full hover:bg-gray-300"
          onClick={() => {
            onLogin();
            onClose();
          }}
        >
          Login
        </div>
        <div
          className="rounded-full hover:bg-gray-300"
          onClick={() => {
            onCreateAccount();
            onClose();
          }}
        >
          Create Account
        </div>
      </div>
    </div>
  );
}
