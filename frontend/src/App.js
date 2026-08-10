import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { ImmediateHelp } from "@/components/ImmediateHelp";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import OurWhy from "@/pages/OurWhy";
import CareMap from "@/pages/CareMap";
import Gatherings from "@/pages/Gatherings";
import Stories from "@/pages/Stories";
import GetInvolved from "@/pages/GetInvolved";
import Give from "@/pages/Give";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollManager />
        <div className="sticky top-0 z-50">
          <ImmediateHelp />
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-why" element={<OurWhy />} />
          <Route path="/care-map" element={<CareMap />} />
          <Route path="/gatherings" element={<Gatherings />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/give" element={<Give />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        <Toaster theme="dark" position="bottom-center" />
      </BrowserRouter>
    </div>
  );
}

export default App;
