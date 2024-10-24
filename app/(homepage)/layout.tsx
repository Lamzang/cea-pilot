import Footer from "@/components/footer";
import Navbar from "@/components/navBar/navBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center sm:px-6 lg:px-8 ">
        <div className="w-full lg:mx-20 mx-2 lg:max-w-screen-2xl">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
