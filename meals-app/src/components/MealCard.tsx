import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealProps = { meal: Meal } & React.ComponentProps<typeof Card>;

export default function MealCard({ className, meal, ...props }: MealProps) {
  const favMealIds = JSON.parse(sessionStorage.getItem("favMealIds") ?? "[]");

  const isChecked = Array.isArray(favMealIds) && favMealIds?.find((mealId) => mealId === meal.idMeal) ? true : false;

  const handleCheckedChange = (checked: boolean) => {
    const favMealIds = JSON.parse(sessionStorage.getItem("favMealIds") ?? "[]");
    if (checked) {
      favMealIds.push(meal.idMeal);
    } else {
      const index = favMealIds.indexOf(meal.idMeal);
      if (index > -1) {
        favMealIds.splice(index, 1);
      }
    }
    sessionStorage.setItem("favMealIds", JSON.stringify(favMealIds));
  };

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle className="line-clamp-2 overflow-hidden">{meal.strMeal}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Add to Favorites</p>
          </div>
          <Switch defaultChecked={isChecked} onCheckedChange={handleCheckedChange} />
        </div>
        <img src={meal?.strMealThumb} alt={meal.strMeal} className="rounded-md" />
      </CardContent>
      {/* <CardFooter>
        <Button className="w-full">
          <Check /> Mark all as read
        </Button>
      </CardFooter> */}
    </Card>
  );
}
