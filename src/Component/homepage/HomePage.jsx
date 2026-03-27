import Welcome from "./Welcome";
import HowWorks from "./HowWorks";
import FeaturedBooks from "./FeaturedBooks";
import Testimonial from "./Testimonial";
import ReadyStart from "./ReadyStart";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F1EAD7] flex flex-col relative overflow-x-clip">
      <div className="sticky top-0 z-50 w-full bg-[#F1EAD7] shadow-sm">
        <Header />
      </div>
       <Welcome />
       <HowWorks />
       <FeaturedBooks />
       <Testimonial />
       <ReadyStart />  
      <Footer />
      
    </main>
  );
}