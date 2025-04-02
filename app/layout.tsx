import { getSession } from "@/lib/session";  // Use our new utility
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

// Force dynamic rendering for the root layout
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Travel Adventures",
  description: "Explore the world with custom travel packages",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use our new getSession utility
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
