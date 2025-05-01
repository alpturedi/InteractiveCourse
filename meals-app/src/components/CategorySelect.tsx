import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export default function CategorySelect({
  categories,
  onChange,
  isSearchActive,
}: {
  categories: Category[];
  onChange: (category: Category) => void;
  isSearchActive: boolean;
}) {
  return categories.length > 0 ? (
    <Select
      value={isSearchActive ? "0" : undefined}
      defaultValue={categories[0].idCategory}
      onValueChange={(value) => {
        const newCategory = categories.find((category) => category.idCategory === value);
        if (newCategory) {
          onChange(newCategory);
        }
      }}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.idCategory} value={category.idCategory}>
            {category.strCategory}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <p>No categories available</p>
  );
}
