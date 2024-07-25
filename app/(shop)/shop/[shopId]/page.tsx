export default function ShopEach() {
  return (
    <div className="pt-24 flex justify-center items-center">
      <div className="w-5/6 border flex flex-col">
        <div className="border w-full flex">
          <div className="w-1/2 h-auto border ">
            <img className="w-full h-auto" />
          </div>
          <div className="w-1/2 border ">
            <div>Title</div>
            <div>Cost</div>
            <div>description</div>
            <div className="flex gap-2">
              <div className="border">장바구니</div>
              <div className="border">바로구매</div>
            </div>
          </div>
        </div>
        <div>상품소개</div>
        <div>
          <div>review data</div>
          <div>
            <div>order</div>
            <div>
              <div className="flex">
                <img />
                <div>name</div>
              </div>
              <div className="flex ">
                <div>review star</div>
                <div>date</div>
              </div>
              <div>review content</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
