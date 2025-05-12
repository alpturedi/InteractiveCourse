import { Outlet } from "react-router";

import { cn } from "@/helpers/utils";
import { SiteHeader } from "@/components/SiteHeader";
import TailwindIndicator from "@/components/TailwindIndicator";

export default function Layout() {
  return (
    <>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
        <TailwindIndicator />
      </body>
    </>
  );
}
