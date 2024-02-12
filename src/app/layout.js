import ReduxProvider from "./_components/redux-provider/ReduxProvider";
import DesktopNav from "./_components/layouts/DesktopNav";
import { Analytics } from "@vercel/analytics/react";
import "./styles/global.scss";
export const metadata = {
  title:
    "ENOCH | Customer Relationship Management (CRM) Software for Small Businesses",
  description:
    "ENOCH is a customer relationship management (CRM) software for small businesses. It is built with Supabase, Next.js, and Redux Toolkit. It is designed to help small businesses manage their customer relationships and sales processes.",
  manifestURL: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body>
          <DesktopNav />
          <main>{children}</main>
          <Analytics />
        </body>
      </ReduxProvider>
    </html>
  );
}
