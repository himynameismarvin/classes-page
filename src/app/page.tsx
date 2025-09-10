import LeftNavigation from "@/components/LeftNavigation";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <LeftNavigation />
      <MainContent />
    </div>
  );
}