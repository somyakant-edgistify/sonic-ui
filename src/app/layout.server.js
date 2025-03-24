import RootLayoutClient from "./layout";

export const metadata = {
  title: "Sonic",
  description: "From cart to doorstep in hours",
  icons: {
    icon: "/favicon.ico", 
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
