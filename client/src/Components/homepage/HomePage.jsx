import Welcome from "./Welcome";
import HowWorks from "./HowWorks";
import FeaturedBooks from "./FeaturedBooks";
import Testimonial from "./Testimonial";
import ReadyStart from "./ReadyStart";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen bg-[#F1EAD7] flex flex-col relative overflow-x-clip">
       <Welcome />
       <HowWorks />
       <FeaturedBooks />
       <Testimonial />
       <ReadyStart />
      
    </main>
  );
}