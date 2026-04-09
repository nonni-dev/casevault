import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Provider from "@/components/layout/Provider";

export default function MainLayout({ children }) {
  return (
    <Provider>

              <Navbar />
                {children}
                <Footer />
        
            </Provider>
  );
}