# Development Log

### 1. Partial Porting to TypeScript

It's always tricky to switch to TypeScript on an established project. Some imports weren't working. You also need to add `"allowJs": true` to your tsconfig file.

I couldn't figure out directly importing a css to js file which I'm not a big fan of either. I moved the existing css to index.css. I added tailwind as well therefore modifying css will be minimal anyway.

### 2. Handling of API Routes

Existing app were reading it from .env file. There are no secrets in the routes so I moved them to a contants.ts file.

### 3. Added aliases for common folders

### 4. Struggle for creating a layout

Vite template's css confused me before. I should delete it before starting to work. The root and body items messes up with the layout for some reason. It took me some time to remember to delete those.

### 5. Make a route constant that navbar and main routing element feed from

### 6. Add switch to mock authentication

Imported shadcn component toggle. Made its color close to the meal colors

### 7. Add current page indicator to navbar

CSS a color: inherit property was overriding my text-color. I removed it. Everything looks fine.
