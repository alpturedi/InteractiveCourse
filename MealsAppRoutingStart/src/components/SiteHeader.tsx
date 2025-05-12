import NavBar from "@/components/NavBar";
import { Link } from "react-router";
import { ROUTES } from "@/helpers/constants";

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <NavBar items={ROUTES} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link to="#todo" target="_blank" rel="noreferrer">
              <div>
                {/* <Icons.gitHub className="h-5 w-5" /> */}
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link to="#todo" target="_blank" rel="noreferrer">
              <div>
                {/* <Icons.twitter className="h-5 w-5 fill-current" /> */}
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
