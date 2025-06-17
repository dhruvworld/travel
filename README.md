# Shubham Tours Website

This is the official website for Shubham Tours, a premier travel agency specializing in tours across India.
## Development Notes

### Styling Guidelines
- Use Tailwind CSS for all styling
- Follow the established color scheme (blue-600 as primary, emerald-500 as secondary)
- Use Poppins font family for all text
- Maintain consistent spacing with paddings (`py-16 px-4`) and max-width constraints (`max-w-7xl mx-auto`)

### SEO Metadata
- Each page should have its own metadata export
- Include title, description, and keywords for every page
- Add OpenGraph data for social sharing

### Copilot Development Prompt

```
/*
📌 TASK: Style all sections using Tailwind CSS and apply SEO metadata in layout and per-page files.

1. Apply global font (Poppins) and base layout styling in `/app/layout.tsx`.
2. Style each homepage section (`/components/sections/`) with:
   - Spacing: `py-16 px-4 max-w-7xl mx-auto`
   - Headings: `text-4xl font-bold mb-6`
   - Cards: `bg-white rounded-2xl shadow-md p-6 hover:shadow-lg`
   - Buttons: `bg-blue-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition`
3. Update `/app/layout.tsx` metadata with global SEO:
   - title, description, openGraph
4. Add `export const metadata = {}` to `/app/about/page.tsx`, `/app/contact/page.tsx`, etc.

🔄 Copilot: Ensure no broken image paths, invalid JSX, or missing metadata exports.
*/
```

## Building and Deployment

This is a Next.js 14 application. To build and run:

1. Install dependencies: `npm install`
2. Development server: `npm run dev`
3. Production build: `npm run build`
4. Start production: `npm start`

## Project Structure

- `/app`: Page routes and app layout
- `/components`: Reusable UI components
- `/public`: Static assets like images
