import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Provider from "@/components/layout/Provider";

export default function MainLayout({ children }) {
  return (
    <body className="bg-[#f5f5f5] dark:bg-[#0f172a] text-black dark:text-[#f5f5f5]">

      <Navbar />
      {children}
      <Footer />

    </body>
  );
}