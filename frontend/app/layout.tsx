import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ytsavex.com"),
  title: {
    template: "%s | YTSaveX",
    default: "YTSaveX - Free YouTube Video, Audio & Playlist Downloader",
  },
  description:
    "Fast, free online YouTube downloader for videos (1080p, 720p), MP3 audio (320kbps), and full playlists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased selection:bg-red-600 selection:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
