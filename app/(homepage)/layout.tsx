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
      <div className="flex justify-center sm:px-6 lg:px-8 mt-10">
        <div className="w-full sm:mx-20 sm:max-w-screen-2xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
