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
      <div className="flex justify-center">
        <div className="w-[1100px]">{children}</div>
      </div>

      <Footer />
    </div>
  );
}
