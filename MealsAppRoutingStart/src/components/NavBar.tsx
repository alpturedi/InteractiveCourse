import { Link } from "react-router";
import { cn } from "@/helpers/utils";
import { useLocation } from "react-router";

export default function NavBar({ items }: any) {
  let location = useLocation();

  console.log("¡ ⛰️ ~ NavBar ~ location⛰️ !", location.pathname, items);

  return (
    <div className="flex gap-6 md:gap-10">
      <div className="flex items-center space-x-2">
        <span className="inline-block font-bold">Meals App</span>
      </div>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item: any, index: number) =>
              item.path &&
              !item.hidden && (
                <Link
                  key={index}
                  to={item.path}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80",
                    location.pathname === item.path ? "text-red-500" : "text-gray-500 hover:text-red-500",
                  )}
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
