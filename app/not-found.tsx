import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">404 - Not Found</h2>
        <p className="text-muted-foreground">Could not find the requested resource.</p>
      </div>
      <Link href="/" className={buttonVariants()}>Return Home</Link>
    </div>
  );
}
