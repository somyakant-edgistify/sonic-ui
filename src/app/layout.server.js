import RootLayoutClient from "./layout";

export const metadata = {
  title: "Sonic",
  description: "From cart to doorstep in hours",
  icons: {
    icon: "/favicon.png", 
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
