import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata = {
  title: "Travel Adventures",
  description: "Explore the world with custom travel packages",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Try to get the session but handle errors gracefully
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Session error:", error);
    // Continue without a session - this prevents the JWT decryption error from breaking the app
  }

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
