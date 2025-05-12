import { Link } from "react-router";
import { cn } from "@/helpers/utils";

export default function NavBar({ items }: /*MainNavProps*/ any) {
  return (
    <div className="flex gap-6 md:gap-10">
      <div className="flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <span className="inline-block font-bold">Meals App</span>
      </div>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item: any, index: number) =>
              item.href && (
                <Link
                  key={index}
                  to={item.href}
                  className={cn("flex items-center text-sm font-medium text-muted-foreground", item.disabled && "cursor-not-allowed opacity-80")}
                >
                  {item.title}
                </Link>
              ),
          )}
        </nav>
      ) : null}
    </div>
  );
}
