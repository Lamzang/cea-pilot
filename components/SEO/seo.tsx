import Head from "next/head";

export default function SEO({ title }: { title: string }) {
  return (
    <Head>
      <title>한국개념기반교육협회 | {title}</title>
      <meta
        name="description"
        content={`한국개념기반교육협회의 ${title} 페이지입니다.`}
      />
      <meta
        name="keywords"
        content="한국개념기반교육협회, 개념기반교육, 개념교육, 개념기반, 교육, 협회, 교육협회, 신교육과정"
      />
      <meta name="author" content="한국개념기반교육협회" />
      <meta property="og:title" content={`한국개념기반교육협회 | ${title}`} />
      <meta
        property="og:description"
        content="한국개념기반교육협회의 협회소개 페이지입니다."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://kcbea.com" />
      <meta property="og:locate" content="ko_KR" />
      <meta property="og:image" content="/assets/images/logo_withtext.png" />
    </Head>
  );
}
