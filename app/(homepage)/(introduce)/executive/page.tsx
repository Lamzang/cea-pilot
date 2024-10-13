import Image from "next/image";

export default function Page() {
  const executives = [
    {
      name: "신은정",
      position: "대표이사(회장)",
      email: "graceshin@cbcikorea.org",
      img: "/assets/excutive/sinenjung.jpg",
      phone: "010-7238-0145",
      career: [
        "개념기반 교육과정과 수업 공식 트레이너/컨설턴트",
        "IBEN 공식 워크샵 리더/학교 인증단 리더/학교 컨설턴트",
        "중등 수학교사",
      ],
    },
    {
      name: "김병일",
      position: "상임이사(부회장)",
      email: "http0518@gmail.com",
      img: "/assets/excutive/kimbyeongil.jpg",
      phone: "010-2303-4915",
      career: [
        "경북대학교 교육방법 및 교육과정/ 박사",
        "초등성장연구소/ 대표",
        "경북 초등 교사",
      ],
    },
    {
      name: "고은지",
      position: "학술연구이사",
      email: "koeunjee17@naver.com ",
      img: "/assets/excutive/koenji.jpg",
      phone: "010-7151-9896",
      career: [
        "중등 영어 교사",
        "NSU IBEC MYP 강사",
        "IB MEP 프리랜서 한국어 번역/감수자개념기반 교육과정과 수업(CBCI) 공식 트레이너/컨설턴트",
      ],
    },
    {
      name: "윤희영",
      position: "고문이사",
      email: "khu121128@gmail.com",
      img: "/assets/excutive/yunheyyoung.jpg",
      phone: "010-5816-8982",
      career: [
        "초등 교사",
        "IBEC PYP",
        "한국교원대학교 교육과정과 평가/ 석사",
        "AIDT 교원연수강사",
      ],
    },
    {
      name: "윤선정",
      position: "운영이사",
      email: "yunsjmom@gmail.com",
      img: "/assets/excutive/yunseongjung.jpg",
      phone: "010-4339-5595",
      career: ["중등 수학 교사", "NSU IBEC DP", "연세대학교 수학교육/석사"],
    },
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold sm:ml-8 ml-1 border-b-2 pb-6 mt-6 mb-10">
        임원진
      </h1>
      <div className="w-full h-full grid sm:grid-cols-2 gap-16 sm:p-16 p-3">
        {executives.map((data, index) => (
          <div key={index} className="border">
            <div className="flex sm:flex-row flex-col px-4 pt-4">
              <div className="w-32 h-32 relative aspect-square overflow-hidden rounded-full">
                <Image
                  src={data.img}
                  alt={data.name + data.position}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
              </div>
              <div className="p-6 w-full sm:w-[calc(100%-150px)]">
                <div className="text-lg font-bold pb-2 px-1 text-blue-500">
                  {data.position}
                </div>
                <div className="text-3xl font-bold w-full pb-6 border-b border-black">
                  {data.name}
                </div>
              </div>
            </div>
            <div className="px-10 pb-4">
              <div>이메일: {data.email}</div>
              <div className="pt-4">
                {data.career.map((career, index) => (
                  <div key={index}>{career}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
