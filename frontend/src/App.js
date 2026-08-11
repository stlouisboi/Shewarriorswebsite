import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Lenis from "lenis";
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
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import AnnualReports from "@/pages/AnnualReports";
import CommitmentToCare from "@/pages/CommitmentToCare";
import PrayerTeam from "@/pages/PrayerTeam";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentCancel from "@/pages/PaymentCancel";

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

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SmoothScroll />
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
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/annual-reports" element={<AnnualReports />} />
          <Route path="/commitment-to-care" element={<CommitmentToCare />} />
          <Route path="/prayer-team" element={<PrayerTeam />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        <Toaster theme="dark" position="bottom-center" />
      </BrowserRouter>
    </div>
  );
}

export default App;
