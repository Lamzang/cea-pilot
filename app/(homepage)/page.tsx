import AuthBtn from "@/components/btn/authBtn";

import Link from "next/link";
import BackgroundImage from "@/components/background";
import AnnouncementComponent from "@/components/announcementComponent";

export default function Home() {
  return (
    <main className="flex flex-col m-0 p-0 overflow-hidden w-full">
      <div>
        <>
          {/* <BackgroundImage /> */}
          <div
            className={`absolute w-full left-0 h-[200px] sm:h-[500px] flex justify-center items-center image-container
          `}
            style={{
              zIndex: -50,
              backgroundImage: `url("/assets/mainTitle/background2.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full h-full bg-black bg-opacity-20"></div>
          </div>
          <div className="flex justify-center items-center flex-col h-[200px] sm:h-[500px] sm:pb-20 z-50">
            <div className="text-2xl sm:text-5xl font-bold text-white ">
              한국개념기반교육협회
            </div>
            <div className="text-white text-sm sm:text-xl">
              Korea Concept-Based Education Association
            </div>
          </div>
        </>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-auto lg:mt-10 px-4 justify-between">
        <AnnouncementComponent />

        <div className="w-full lg:w-1/3 mx-2 lg:ml-5 mt-6 lg:mt-0 rounded-2xl">
          <div className="text-xl lg:text-2xl font-bold border-b-2 border-black w-full text-blue-500 mt-8 pb-8">
            진행예정행사
          </div>
          <div className="space-y-2 w-full flex justify-center items-center">
            {/* <img
              className="mt-4 w-full h-full rounded-2xl"
              src="/assets/mainTitle/background3.jpg"
            /> */}
            <span className="mt-10">진행예정 행사 없음</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row p-8">
        <div className="lg:w-1/3 flex mt-4 border-8 rounded-3xl lg:mx-6 h-full  ">
          <div className="h-full rounded-2xl w-full p-4 bg-gray-100">
            <div className="h-full grid grid-cols-2 w-full gap-4">
              <Link
                href="/introduce"
                className="flex flex-col max-h-[150px]  w-full lg:h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 "
              >
                <div className="h-[30%] w-[25%] flex justify-center">
                  <img className="h-full" src="/assets/svg/home.svg" />
                </div>
                <span className="lg:text-lg text-base pt-2">협회소개</span>
              </Link>
              <Link
                href="/create-account"
                className="flex flex-col max-h-[150px] w-full h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 "
              >
                <div className="h-[30%] w-[25%]  flex justify-center">
                  <img className="h-full" src="/assets/svg/account.svg" />
                </div>
                <span className="lg:text-lg text-base pt-2">협회가입</span>
              </Link>
              <Link
                href="/article"
                className="flex flex-col max-h-[150px] w-full h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 "
              >
                <div className="h-[30%] w-[25%]  flex justify-center">
                  <img className="h-full" src="/assets/svg/document.svg" />
                </div>
                <span className="lg:text-lg text-base pt-2">협회정관</span>
              </Link>
              <Link
                href="https://www.facebook.com/groups/337483832687824"
                className="flex flex-col max-h-[150px] w-full h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 "
              >
                <div className="h-[30%] w-[25%]  flex justify-center">
                  <img className="h-full" src="/assets/svg/facebook.svg" />
                </div>
                <span className="lg:text-lg text-base pt-2">협회 SNS</span>
              </Link>
              <Link
                href="/shop"
                className="flex flex-col max-h-[150px] w-full h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 "
              >
                <div className="h-[40%] w-[25%]  flex justify-center">
                  <img className="h-full" src="/assets/svg/cart.svg" />
                </div>
                <span className="lg:text-lg text-base pt-2">
                  연수 및 도서구매
                </span>
              </Link>
              <Link
                href="/data-container"
                className="flex flex-col max-h-[150px] w-full h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 "
              >
                <div className="h-[40%] w-[25%]  flex justify-center">
                  <img className="h-full" src="/assets/svg/papers.svg" />
                </div>
                <span className="lg:text-lg text-base pt-2">자료마당</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 mx-2 lg:ml-5  lg:mt-0 rounded-2xl">
          <div className="text-xl lg:text-2xl font-bold border-b-2 border-black w-full text-blue-500 mt-8 pb-8">
            주요 활동
          </div>
          <div className="space-y-2 w-full flex justify-center items-center">
            {/* <img
              className="mt-4 w-full h-full rounded-2xl"
              src="/assets/mainTitle/background3.jpg"
            /> */}
            <span className="mt-10">주요활동 내용 들어갈 공간</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full pl-10 lg:flex-row justify-center items-center  h-auto  ">
        {/* 상담하기 섹션 */}
        {/* <div className="w-full border-8 rounded-3xl lg:w-1/3 h-48 sm:h-[400px] mt-4 justify-center items-center text-lg font-bold text-gray-800">
          <h2 className="pl-8 py-2 font-bold rounded-t-2xl text-xl bg-blue-500 text-white  ">
            간편 상담 서비스
          </h2>
          <InterviewComponent />
        </div> */}

        {/* 후원하기 섹션 */}
        {/* 첫 번째 그리드 섹션 */}
      </div>
    </main>
  );
}
