import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar({ onSearch }: { onSearch: (search: string) => void }) {
  return (
    <form
      className="flex items-center space-x-2"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get("search") as string;
        onSearch(search);
      }}
    >
      <Input type="text" name="search" className="px-3 py-2 w-80" placeholder="Search..." />
      <Button type="submit" className="px-3 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </Button>
    </form>
  );
}
