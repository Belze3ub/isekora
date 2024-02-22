import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '../components/Navbar/Navbar';
import { SelectedGenresProvider } from '@/contexts/genre';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Isekora - twoja biblioteka anime online',
  description:
    'Isekora to platforma, która gromadzi linki do najnowszych odcinków anime od różnych grup suberskich, zapewniając Ci dostęp do szerokiej gamy serii anime w jednym miejscu. Czy jesteś fanem shōnen, shōjo, seinen, josei czy jakiegokolwiek innego gatunku, Isekora ma coś dla każdego. Odkryj nowe serie i zanurz się w świecie anime z Isekora. Dołącz do naszej społeczności i zacznij swoją podróż po anime już dziś!',
  icons: {
    icon: '../public/images/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SelectedGenresProvider>
            <Navbar />
            <main>{children}</main>
          </SelectedGenresProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
