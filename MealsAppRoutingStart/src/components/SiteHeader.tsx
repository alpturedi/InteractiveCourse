import NavBar from "@/components/NavBar";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { ROUTES } from "@/helpers/routes";

export function SiteHeader() {
  const onSwitchChange = (checked: boolean) => {
    localStorage.setItem("isAuthenticated", String(checked));
  };

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <NavBar items={ROUTES} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex items-center space-x-1">
            <div className="flex items-center gap-2 space-x-2">
              <Label htmlFor="auth">Authenticated: </Label>
              <Switch id="auth" className="blue" onCheckedChange={onSwitchChange} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
