import "./globals.css";

export const metadata = {
  title: "Assistant Projet Quai West + Kormatek",
  description: "Assistant projet pour composites, peinture, bateau, surf, rénovation bois, terrasse, peinture intérieure, sol intérieur et béton avec recommandations Quai West et Kormatek Bois & Déco.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
