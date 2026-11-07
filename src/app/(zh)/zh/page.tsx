import { Home } from "@/components/Home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ lang: "zh", path: "/" });

export default function HomePage() {
  return <Home lang="zh" />;
}
