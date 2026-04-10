import "./globals.css";

export const metadata = {
  title: "JerseyHub",
  description: "Premium football jerseys store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}