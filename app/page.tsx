import { destinations } from "@/data/destinations";
import TravelHero from "./component/TravelHero";
export default function Home() {
  return (
    <main>
    <TravelHero destinations={destinations} />
  </main>
  );
}
