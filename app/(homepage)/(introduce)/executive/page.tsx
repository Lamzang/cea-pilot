export default function Page() {
  return (
    <div className="min-h-screen ">
      <h1 className="text-3xl font-bold  ml-8 border-b-2 pb-6 mt-6 mb-10">
        임원진
      </h1>
      <div className="w-full h-full grid grid-cols-3 gap-10 p-10">
        <div className="w-full h-40 border"></div>
        <div className="w-full h-40 border"></div>
        <div className="w-full h-40 border"></div>
        <div className="w-full h-40 border"></div>
        <div className="w-full h-40 border"></div>
      </div>
    </div>
  );
}
