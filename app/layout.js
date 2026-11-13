import "./globals.css";

export const metadata = {
  title: "Claim Code",
  description: "Claim your code",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
