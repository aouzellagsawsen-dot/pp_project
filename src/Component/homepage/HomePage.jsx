import Welcome from "./Welcome";
import HowWorks from "./HowWorks";
import FeaturedBooks from "./FeaturedBooks";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F1EAD7] flex flex-col">
       <Welcome />
      
      <HowWorks />
      
      <FeaturedBooks />
      
    </main>
  );
}