import "./globals.css";

export const metadata = {
  title: "Assistant Projet Quai West",
  description: "Assistant projet pour composites, peinture, bateau, surf et rénovation bois/terrasse avec recommandations Quai West et Kormatek Bois & Déco.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
