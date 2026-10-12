import { demos } from "@/lib/config";
import LiveStage from "./LiveStage";
import SectionHeader from "./SectionHeader";

export default function Demos() {
  return (
    <section id="templates" className="border-t border-line">
      <div className="mx-auto max-w-shell px-[clamp(20px,4vw,60px)] py-[clamp(64px,8vw,112px)]">
        <SectionHeader label={demos.label} title={demos.title} subtitle={demos.subtitle} className="mb-[clamp(40px,5vw,64px)]" />
        <LiveStage />
      </div>
    </section>
  );
}
