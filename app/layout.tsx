import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const title = 'Le Lieu — Riverside Dining in Choisy-le-Roi';
const description = 'Modern French bistro by the Seine in Choisy-le-Roi. Seasonal cuisine, cocktails, terrace dining, and easy online reservations.';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://www.lelieu-restaurant.fr'),
  openGraph: {
    title,
    description,
    type: 'website',
    url: 'https://www.lelieu-restaurant.fr',
    siteName: 'Le Lieu'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description
  }
};

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Le Lieu',
  servesCuisine: 'French',
  telephone: '+33 1 43 91 88 41',
  email: 'contact@lelieu-restaurant.fr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '32 Quai Fernand Dupuy',
    postalCode: '94600',
    addressLocality: 'Choisy-le-Roi',
    addressCountry: 'FR'
  },
  openingHours: ['Su-Th 12:00-15:00', 'Su-Th 19:00-22:30', 'Fr-Sa 12:00-15:00', 'Fr-Sa 19:00-23:00'],
  url: 'https://www.lelieu-restaurant.fr'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="noise">
        <Script id="restaurant-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
        {children}
      </body>
    </html>
  );
}
