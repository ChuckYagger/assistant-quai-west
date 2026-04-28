"use client";

import { useMemo, useState } from "react";

const productLinks = {
  boutique: "https://boutique.quai-west-composites.fr",
  polyester: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=resine+polyester",
  epoxy: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=resine+epoxy",
  gelcoat: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=gelcoat",
  silicone: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=silicone+moulage",
  peinture: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=peinture+polyurethane",

  kormatekHome: "https://www.kormatek-boisetdeco.fr/",
  kormatekExterior: "https://www.kormatek-boisetdeco.fr/11-protection-du-bois-exterieur",
  kormatekTerrassfix: "https://www.kormatek-boisetdeco.fr/nettoyant-pour-menuiseries-sols/40-demidekk-terrassfix-7029350153726.html",
  kormatekTreolje: "https://www.kormatek-boisetdeco.fr/protection-du-bois-exterieur/33-150-treolje-solvent-ou-v-7029350006831.html",
  kormatekCleantech: "https://www.kormatek-boisetdeco.fr/protection-du-bois-exterieur/30-106-demidekk-cleantech.html",
  kormatekPanelakk: "https://www.kormatek-boisetdeco.fr/protection-du-bois-interieur/25-panelakk-7029350139577.html",
  kormatekVeggTag: "https://www.kormatek-boisetdeco.fr/peinture-interieure-decorative/23-vegg-tag-05-7029350008156.html",
  kormatekGulvmaling: "https://www.kormatek-boisetdeco.fr/peintures-pour-sol-interieur/39-trestjerner-gulvmaling-7031157802370.html",
  kormatekBetongolje: "https://www.kormatek-boisetdeco.fr/peintures-pour-sol-interieur/37-trestjerner-betongolje-7031157801748.html",
  kormatekGulvlakk: "https://www.kormatek-boisetdeco.fr/peintures-pour-sol-interieur/44-trestjerner-gulvlakk-.html",
  kormatekAccessories: "https://www.kormatek-boisetdeco.fr/15-accessoires"
};

const projectOptions = [
  { value: "bateau", label: "Réparation bateau / coque" },
  { value: "surf", label: "Réparation planche de surf" },
  { value: "moulage", label: "Moulage / fabrication de pièce" },
  { value: "carrosserie", label: "Peinture carrosserie" },
  { value: "bois", label: "Bois, terrasse, sol ou peinture intérieure" },
  { value: "stratification", label: "Stratification / étanchéité" },
  { value: "inconnu", label: "Je ne sais pas" },
];

const baseQuestions = [
  { key: "project", title: "Quel est votre projet principal ?", type: "cards", options: projectOptions },
  { key: "level", title: "Quel est votre niveau ?", type: "cards", options: [
    { value: "debutant", label: "Débutant" },
    { value: "confirme", label: "Bricoleur confirmé" },
    { value: "pro", label: "Professionnel" }
  ]},
  { key: "surface", title: "Quelle surface souhaitez-vous traiter ?", type: "surface" },
  { key: "support", title: "Quel est le support principal ?", type: "cards", skipFor: ["bois"], options: [
    { value: "polyester", label: "Polyester" },
    { value: "epoxy", label: "Époxy" },
    { value: "bois", label: "Bois" },
    { value: "metal", label: "Métal" },
    { value: "beton", label: "Béton" },
    { value: "plastique", label: "Plastique" },
    { value: "ancienne-peinture", label: "Ancienne peinture" },
    { value: "inconnu", label: "Je ne sais pas" }
  ]},
  { key: "goal", title: "Quel résultat souhaitez-vous obtenir ?", type: "cards", options: [
    { value: "reparer", label: "Réparer" },
    { value: "renforcer", label: "Renforcer" },
    { value: "mouler", label: "Mouler" },
    { value: "proteger", label: "Protéger" },
    { value: "peindre", label: "Peindre" },
    { value: "etancher", label: "Étancher" },
    { value: "finition", label: "Finition esthétique" }
  ]},
  { key: "priority", title: "Quelle est votre priorité ?", type: "cards", options: [
    { value: "simple", label: "Solution simple" },
    { value: "resistance", label: "Résistance maximale" },
    { value: "finition", label: "Belle finition" },
    { value: "prix", label: "Prix maîtrisé" },
    { value: "rapidite", label: "Rapidité d’application" },
    { value: "conseil", label: "Conseil technique" }
  ]}
];

const specificQuestions = {
  bateau: [
    { key: "boatIssue", title: "Votre réparation concerne :", type: "cards", options: [
      { value: "fissure", label: "Petite fissure" },
      { value: "trou", label: "Trou / impact" },
      { value: "fragilisee", label: "Zone fragilisée" },
      { value: "gelcoat", label: "Reprise de gelcoat" },
      { value: "complete", label: "Stratification complète" }
    ]}
  ],
  surf: [
    { key: "surfBoard", title: "Votre planche est :", type: "cards", options: [
      { value: "polyester", label: "Polyester" },
      { value: "epoxy-eps", label: "Époxy / EPS" },
      { value: "inconnu", label: "Je ne sais pas" }
    ]},
    { key: "surfIssue", title: "Type de dommage :", type: "cards", options: [
      { value: "pet", label: "Petit pet" },
      { value: "fissure", label: "Fissure" },
      { value: "trou", label: "Trou" },
      { value: "delamination", label: "Délamination" },
      { value: "zone-molle", label: "Zone molle" }
    ]}
  ],
  moulage: [
    { key: "moldingNeed", title: "Que souhaitez-vous faire ?", type: "cards", options: [
      { value: "moule-souple", label: "Fabriquer un moule" },
      { value: "tirage", label: "Tirer une pièce dans un moule" },
      { value: "coulee", label: "Faire une coulée / inclusion" },
      { value: "technique", label: "Fabriquer une pièce technique" },
      { value: "decoratif", label: "Créer un objet décoratif" }
    ]}
  ],
  carrosserie: [
    { key: "finish", title: "Finition souhaitée :", type: "cards", options: [
      { value: "brillant-direct", label: "Brillant direct" },
      { value: "base-vernis", label: "Base mate + vernis" },
      { value: "metalisee", label: "Métallisée" },
      { value: "ral", label: "RAL couleur unie" },
      { value: "inconnu", label: "Je ne sais pas" }
    ]}
  ],
  bois: [
    { key: "kormatekProject", title: "Quel type de projet Kormatek souhaitez-vous réaliser ?", type: "cards", options: [
      { value: "terrasse-exterieure", label: "Terrasse bois extérieure" },
      { value: "bois-exterieur", label: "Bardage, menuiserie ou bois extérieur" },
      { value: "bois-interieur-transparent", label: "Bois intérieur transparent / lasure" },
      { value: "peinture-interieure", label: "Peinture décorative intérieure murs/plafonds" },
      { value: "sol-bois-transparent", label: "Sol intérieur bois transparent / vernis" },
      { value: "sol-interieur-opaque", label: "Sol intérieur opaque bois ou béton" },
      { value: "sol-beton-transparent", label: "Sol béton transparent / anti-poussière" }
    ]},
    { key: "kormatekState", title: "Quel est l’état du support ?", type: "cards", options: [
      { value: "neuf", label: "Neuf ou brut" },
      { value: "grise", label: "Grisé / terni" },
      { value: "sale", label: "Sale / taché / noirci" },
      { value: "ancienne-lasure", label: "Ancienne lasure" },
      { value: "ancienne-peinture", label: "Ancienne peinture" },
      { value: "ancien-vernis", label: "Ancien vernis" },
      { value: "poussiereux", label: "Béton poreux / poussiéreux" }
    ]},
    { key: "kormatekFinish", title: "Quel rendu souhaitez-vous ?", type: "cards", options: [
      { value: "naturel", label: "Aspect naturel" },
      { value: "transparent", label: "Transparent / incolore" },
      { value: "teinte", label: "Teinté" },
      { value: "opaque", label: "Opaque / couvrant" },
      { value: "mat", label: "Mat décoratif" },
      { value: "resistance-sol", label: "Résistance au passage" }
    ]}
  ],
  stratification: []
};

function getQuestions(answers) {
  const filteredBase = baseQuestions.filter(q => !(q.skipFor || []).includes(answers.project));
  return [...filteredBase, ...(specificQuestions[answers.project] || [])];
}

function labelFor(questionKey, value) {
  const all = [...baseQuestions, ...Object.values(specificQuestions).flat()];
  const q = all.find(item => item.key === questionKey);
  if (!q || !q.options) return value || "Non renseigné";
  return q.options.find(opt => opt.value === value)?.label || value || "Non renseigné";
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("fr-FR", { maximumFractionDigits: 2 });
}

function recommend(answers) {
  const surface = Math.max(parseFloat(String(answers.surface || "1").replace(",", ".")) || 1, 0.1);
  let title = "Diagnostic technique personnalisé";
  let product = "Sélection technique";
  let categoryUrl = productLinks.boutique;
  let explanation = "Votre projet nécessite une sélection compatible entre le support, le résultat attendu et les conditions d’application.";
  let products = ["Produit principal adapté", "Accessoires d’application", "Protection individuelle"];
  let warning = "En cas de doute sur la compatibilité du support, réalisez toujours un essai sur une petite zone.";
  let quantities = [];
  let brand = "Quai West";

  if (answers.project === "bateau") {
    title = "Réparation bateau / coque";
    product = answers.support === "epoxy" ? "Résine époxy + tissu de verre" : answers.boatIssue === "gelcoat" ? "Gelcoat / topcoat de finition" : "Kit de stratification polyester";
    categoryUrl = answers.support === "epoxy" ? productLinks.epoxy : answers.boatIssue === "gelcoat" ? productLinks.gelcoat : productLinks.polyester;
    explanation = answers.support === "epoxy" ? "Le support époxy demande une résine compatible pour garantir l’adhérence." : "Pour une coque polyester, résine polyester + mat de verre est souvent une solution efficace.";
    products = ["Résine adaptée", "Catalyseur ou durcisseur", "Mat/tissu de verre", "Acétone ou nettoyant", "Pinceaux / rouleaux", "Gants nitrile"];
    warning = "Ne stratifiez pas sur un support humide, gras ou insuffisamment poncé.";
    const resinKg = surface * 2 * 0.8;
    quantities = [`Résine estimée : ${formatNumber(resinKg)} kg`, `Catalyseur à 2 % : ${formatNumber(resinKg * 1000 * 0.02)} g`, `Fibre : ${formatNumber(surface * 2)} m² environ`];
  }

  if (answers.project === "surf") {
    title = "Réparation planche de surf";
    product = answers.surfBoard === "epoxy-eps" || answers.support === "epoxy" ? "Kit résine époxy surf" : "Kit résine polyester surf";
    categoryUrl = product.includes("époxy") ? productLinks.epoxy : productLinks.polyester;
    explanation = product.includes("époxy") ? "Une planche EPS/époxy doit être réparée avec une résine époxy." : "Pour une planche polyester, une résine polyester adaptée au surf convient.";
    products = ["Résine adaptée", "Tissu de verre fin", "Papier abrasif", "Spatule", "Gants", "Polish finition"];
    warning = "N’utilisez pas de résine polyester sur une planche EPS/époxy.";
    quantities = [`Résine estimée : ${formatNumber(Math.max(surface * 0.6, 0.15))} kg`, `Tissu de verre : ${formatNumber(surface * 1.3)} m² environ`];
  }

  if (answers.project === "moulage") {
    title = "Moulage / fabrication de pièce";
    if (answers.moldingNeed === "moule-souple") {
      product = "Silicone de moulage";
      categoryUrl = productLinks.silicone;
      products = ["Silicone de moulage", "Agent de démoulage", "Balance", "Gants", "Spatules"];
      explanation = "Un moule souple facilite la reproduction des détails et le démoulage.";
      quantities = [`Silicone : estimation à confirmer selon volume, environ ${formatNumber(surface * 1.5)} kg`];
    } else {
      product = "Gelcoat + résine polyester + fibre";
      categoryUrl = productLinks.polyester;
      products = ["Gelcoat", "Résine polyester", "Fibre de verre", "Catalyseur", "Agent de démoulage"];
      explanation = "Pour tirer une pièce dans un moule, gelcoat + stratification polyester est une base classique.";
      const resinKg = surface * 2 * 0.8;
      quantities = [`Résine : ${formatNumber(resinKg)} kg`, `Gelcoat : ${formatNumber(surface * 0.6)} kg`, `Catalyseur : ${formatNumber(resinKg * 1000 * 0.02)} g`];
    }
    warning = "N’oubliez jamais l’agent de démoulage.";
  }

  if (answers.project === "carrosserie") {
    title = "Peinture carrosserie";
    product = answers.finish === "base-vernis" || answers.finish === "metalisee" ? "Base mate + vernis" : "Peinture polyuréthane brillant direct";
    categoryUrl = productLinks.peinture;
    explanation = product.includes("Base") ? "Les finitions métallisées nécessitent généralement une base couleur puis un vernis." : "Pour une couleur RAL unie, le brillant direct est efficace et résistant.";
    products = ["Peinture", "Durcisseur", "Diluant", "Apprêt si nécessaire", "Dégraissant", "Abrasifs", "Masquage"];
    warning = "Ne peignez jamais sur un support mal dégraissé ou insuffisamment poncé.";
    quantities = [`Peinture estimée : ${formatNumber((surface / 9) * 2)} L pour 2 couches`, "Prévoir durcisseur et diluant selon fiche technique"];
  }

  if (answers.project === "bois") {
    brand = "Kormatek Bois & Déco";
    title = "Diagnostic Kormatek Bois & Déco";
    const p = answers.kormatekProject;
    const s = answers.kormatekState;
    const f = answers.kormatekFinish;

    if (p === "terrasse-exterieure" && (s === "grise" || s === "sale")) {
      product = "Demidekk Terrassfix + Treolje";
      categoryUrl = productLinks.kormatekTerrassfix;
      explanation = "Pour une terrasse grisée, tachée ou noircie, commencez par nettoyer/dégriser avec Demidekk Terrassfix, puis protégez avec Treolje.";
      products = ["Demidekk Terrassfix", "Treolje", "Brosse terrasse", "Abrasifs si nécessaire", "Gants"];
      warning = "Ne saturez pas une terrasse encore grisée, sale ou humide : le bois doit être propre, sec et ouvert avant protection.";
      quantities = [`Nettoyant/dégriseur : prévoir selon encrassement`, `Treolje estimé : ${formatNumber(surface / 8)} L par couche`];
    } else if (p === "terrasse-exterieure") {
      product = "Treolje";
      categoryUrl = productLinks.kormatekTreolje;
      explanation = "Pour protéger une terrasse bois extérieure avec un rendu naturel ou teinté, Treolje est la solution saturateur / imprégnation.";
      products = ["Treolje", "Demidekk Terrassfix si nettoyage nécessaire", "Brosse plate", "Chiffon non pelucheux", "Gants"];
      warning = "Appliquez en couches fines et essuyez l’excédent pour éviter un film collant en surface.";
      quantities = [`Treolje estimé : ${formatNumber(surface / 8)} L par couche`, "Prévoir 1 à 2 couches selon absorption du bois"];
    } else if (p === "bois-exterieur" && (f === "opaque" || s === "ancienne-peinture")) {
      product = "Demidekk Cleantech";
      categoryUrl = productLinks.kormatekCleantech;
      explanation = "Pour bardage, menuiserie ou bois extérieur avec finition couvrante, Demidekk Cleantech apporte une finition opaque durable et satinée.";
      products = ["Demidekk Cleantech", "Primaire adapté si bois brut", "Nettoyant si support sale", "Brosse / rouleau", "Abrasifs"];
      warning = "Éliminez les anciennes parties non adhérentes et respectez la préparation avant mise en peinture.";
      quantities = [`Peinture/lasure opaque estimée : ${formatNumber(surface / 8)} L par couche`, "Prévoir souvent 2 couches"];
    } else if (p === "bois-exterieur") {
      product = "Gamme protection bois extérieur Kormatek";
      categoryUrl = productLinks.kormatekExterior;
      explanation = "Pour le bois extérieur, le choix dépend du rendu : transparent/teinté ou opaque couvrant.";
      products = ["Treolje selon usage", "Demidekk Cleantech pour opaque", "Nettoyant/préparation", "Brosse / rouleau"];
      warning = "Un bois extérieur doit être propre, sec et sain avant toute protection.";
      quantities = [`Produit estimé : ${formatNumber(surface / 8)} L par couche`, "Prévoir 1 à 2 couches selon système choisi"];
    } else if (p === "bois-interieur-transparent") {
      product = "Panelakk";
      categoryUrl = productLinks.kormatekPanelakk;
      explanation = "Pour protéger ou décorer un bois intérieur tout en conservant son aspect, Panelakk est une lasure à l’eau transparente, teintée ou incolore.";
      products = ["Panelakk", "Abrasif fin", "Brosse adaptée", "Chiffon", "Protection de chantier"];
      warning = "Poncez légèrement et dépoussiérez parfaitement avant application.";
      quantities = [`Panelakk estimé : ${formatNumber(surface / 10)} L par couche`, "Prévoir 1 à 2 couches selon rendu souhaité"];
    } else if (p === "peinture-interieure") {
      product = "Vegg & Tag 05";
      categoryUrl = productLinks.kormatekVeggTag;
      explanation = "Pour murs et plafonds intérieurs, Vegg & Tag 05 est une peinture murale mate à base d’eau.";
      products = ["Vegg & Tag 05", "Rouleau murs/plafonds", "Brosse à rechampir", "Adhésif de masquage", "Bâche de protection"];
      warning = "Sur support taché, farinant ou très poreux, prévoyez une préparation adaptée.";
      quantities = [`Peinture murale estimée : ${formatNumber((surface / 10) * 2)} L pour 2 couches`];
    } else if (p === "sol-bois-transparent") {
      product = "Trestjerner Gulvlakk";
      categoryUrl = productLinks.kormatekGulvlakk;
      explanation = "Pour parquet, escalier ou sol bois intérieur avec finition transparente résistante, Trestjerner Gulvlakk est la solution vernis.";
      products = ["Trestjerner Gulvlakk", "Abrasifs", "Rouleau/laqueur", "Dépoussiérage soigneux", "Protection de chantier"];
      warning = "Sur ancien vernis, poncez et vérifiez l’adhérence.";
      quantities = [`Vernis estimé : ${formatNumber(surface / 10)} L par couche`, "Prévoir 2 à 3 couches selon sollicitation"];
    } else if (p === "sol-beton-transparent") {
      product = "Trestjerner Betongolje";
      categoryUrl = productLinks.kormatekBetongolje;
      explanation = "Pour sol béton, dalle poreuse, terre cuite, OSB ou Fermacell avec protection transparente, Trestjerner Betongolje fixe les poussières et bouche les pores.";
      products = ["Trestjerner Betongolje", "Nettoyant / dégraissant", "Rouleau sol", "Aspirateur / dépoussiérage", "Gants"];
      warning = "Le béton doit être propre, sec, poreux et parfaitement dépoussiéré.";
      quantities = [`Saturateur béton estimé : ${formatNumber(surface / 8)} L par couche`, "Consommation variable selon porosité"];
    } else if (p === "sol-interieur-opaque") {
      product = "Trestjerner Gulvmaling";
      categoryUrl = productLinks.kormatekGulvmaling;
      explanation = "Pour un sol intérieur en bois ou béton avec finition couvrante, Trestjerner Gulvmaling est une peinture dure adaptée aux sols.";
      products = ["Trestjerner Gulvmaling", "Nettoyant / dégraissant", "Abrasifs", "Rouleau sol", "Adhésif de masquage"];
      warning = "Sur sol déjà peint ou verni, vérifiez l’adhérence et poncez avant application.";
      quantities = [`Peinture sol estimée : ${formatNumber((surface / 8) * 2)} L pour 2 couches`];
    } else {
      product = "Sélection Kormatek Bois & Déco";
      categoryUrl = productLinks.kormatekHome;
      products = ["Préparation du support", "Produit de finition adapté", "Brosse / rouleau", "Abrasifs"];
      quantities = [`Estimation générale : ${formatNumber(surface / 8)} L par couche`];
    }
  }

  if (answers.project === "stratification" || answers.project === "inconnu") {
    title = answers.project === "stratification" ? "Stratification / étanchéité" : "Projet à préciser";
    product = answers.support === "epoxy" ? "Résine époxy + renfort" : "Résine polyester ou époxy selon support";
    categoryUrl = answers.support === "epoxy" ? productLinks.epoxy : productLinks.polyester;
    products = ["Résine adaptée", "Renfort fibre de verre", "Catalyseur ou durcisseur", "Abrasifs", "Gants"];
    const resinKg = surface * 2 * 0.8;
    quantities = [`Résine estimée : ${formatNumber(resinKg)} kg`, `Renfort : ${formatNumber(surface * 2)} m² environ`];
  }

  return { title, product, categoryUrl, explanation, products, warning, quantities, surface, brand };
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ surface: "1" });
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const questions = useMemo(() => getQuestions(answers), [answers]);
  const current = questions[step];
  const isLast = step >= questions.length;
  const result = useMemo(() => recommend(answers), [answers]);
  const progress = Math.min(((step + 1) / Math.max(questions.length, 1)) * 100, 100);

  function selectAnswer(key, value) {
    const next = { ...answers, [key]: value };
    if (key === "project") {
      Object.keys(next).forEach(k => {
        if (!["project", "level", "surface"].includes(k)) delete next[k];
      });
      if (value === "bois") next.support = "bois";
      setStep(0);
    }
    setAnswers(next);
  }

  function nextStep() {
    if (!current || !answers[current.key]) return;
    setStep(s => s + 1);
  }

  function reset() {
    setStarted(false);
    setStep(0);
    setAnswers({ surface: "1" });
    setShowLeadForm(false);
    setSubmitStatus("");
  }

  function encodeFormData(data) {
    return new URLSearchParams(data).toString();
  }

  async function handleLeadSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    const payload = {
      "form-name": "diagnostic-quai-west",
      "bot-field": "",
      marque: result.brand || "",
      projet: labelFor("project", answers.project),
      projet_kormatek: labelFor("kormatekProject", answers.kormatekProject),
      etat_kormatek: labelFor("kormatekState", answers.kormatekState),
      rendu_kormatek: labelFor("kormatekFinish", answers.kormatekFinish),
      support: labelFor("support", answers.support),
      surface: `${result.surface} m²`,
      niveau: labelFor("level", answers.level),
      priorite: labelFor("priority", answers.priority),
      produit_recommande: result.product || "",
      quantites: (result.quantities || []).join(" | "),
      panier_conseille: (result.products || []).join(" | "),
      erreur_a_eviter: result.warning || "",
      prenom: form.prenom?.value || "",
      email: form.email?.value || "",
      telephone: form.telephone?.value || "",
      commentaire: form.commentaire?.value || "",
      optin: form.optin?.checked ? "oui" : "non"
    };

    setSubmitStatus("Envoi en cours...");

    try {
      const response = await fetch("/forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: encodeFormData(payload)
      });

      if (!response.ok) throw new Error("Erreur Netlify Forms");

      setSubmitStatus("Diagnostic envoyé avec succès.");
      form.reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("Erreur lors de l’envoi. Vérifiez Netlify Forms ou réessayez.");
    }
  }

  if (!started) {
    return (
      <main className="page">
        <section className="hero">
          <div className="badge">Assistant technique Quai West + Kormatek</div>
          <h1>Trouvez le bon produit, la bonne quantité et les bons accessoires en moins de 2 minutes.</h1>
          <p>Réparation bateau, surf, moulage, peinture carrosserie, stratification, rénovation bois, terrasse, sol intérieur, béton ou peinture décorative.</p>
          <div className="heroActions">
            <button className="primary" onClick={() => setStarted(true)}>Démarrer mon diagnostic</button>
            <a className="secondary" href={productLinks.boutique} target="_blank">Voir Quai West</a>
            <a className="secondary" href={productLinks.kormatekHome} target="_blank">Voir Kormatek Bois & Déco</a>
          </div>
          <div className="trust"><span>✓ Calcul quantité</span><span>✓ Panier conseillé</span><span>✓ Erreurs à éviter</span></div>
        </section>
      </main>
    );
  }

  if (isLast) {
    return (
      <main className="page">
        <section className="resultHeader">
          <button className="backLink" onClick={reset}>← Recommencer</button>
          <div className="badge">{result.brand}</div>
          <h1>{result.title}</h1>
          <p>Voici une première estimation. Elle doit être confirmée selon la fiche technique du produit et l’état réel du support.</p>
        </section>

        <section className="resultGrid">
          <article className="card highlight">
            <h2>Produit recommandé</h2>
            <h3>{result.product}</h3>
            <p>{result.explanation}</p>
            <a className="primary full" href={result.categoryUrl} target="_blank">
              {answers.project === "bois" ? "Voir la solution Kormatek recommandée" : "Voir les produits recommandés"}
            </a>
          </article>

          <article className="card">
            <h2>Votre diagnostic</h2>
            <ul className="cleanList">
              <li><strong>Projet :</strong> {labelFor("project", answers.project)}</li>
              {answers.project === "bois" ? (
                <>
                  <li><strong>Projet Kormatek :</strong> {labelFor("kormatekProject", answers.kormatekProject)}</li>
                  <li><strong>État :</strong> {labelFor("kormatekState", answers.kormatekState)}</li>
                  <li><strong>Rendu :</strong> {labelFor("kormatekFinish", answers.kormatekFinish)}</li>
                </>
              ) : (
                <li><strong>Support :</strong> {labelFor("support", answers.support)}</li>
              )}
              <li><strong>Surface :</strong> {formatNumber(result.surface)} m²</li>
              <li><strong>Niveau :</strong> {labelFor("level", answers.level)}</li>
              <li><strong>Priorité :</strong> {labelFor("priority", answers.priority)}</li>
            </ul>
          </article>

          <article className="card"><h2>Quantité estimée</h2><ul className="cleanList">{result.quantities.map((q, i) => <li key={i}>{q}</li>)}</ul></article>
          <article className="card"><h2>Panier conseillé</h2><ul className="pillList">{result.products.map((p, i) => <li key={i}>{p}</li>)}</ul></article>
          <article className="card warning"><h2>Erreur à éviter</h2><p>{result.warning}</p></article>

          <article className="card">
            <h2>Recevoir le diagnostic</h2>
            <p>Envoyez le diagnostic pour être recontacté ou conserver la recommandation.</p>
            <button className="secondary full" onClick={() => setShowLeadForm(!showLeadForm)}>Recevoir mon diagnostic par email</button>
          </article>
        </section>

        {showLeadForm && (
          <section className="leadBox">
            <h2>Recevoir mon diagnostic</h2>
            <form name="diagnostic-quai-west" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleLeadSubmit} className="leadForm">
              <input type="hidden" name="form-name" value="diagnostic-quai-west" />
              <p style={{ display: "none" }}><label>Ne pas remplir : <input name="bot-field" /></label></p>
              <label>Prénom<input name="prenom" required placeholder="Votre prénom" /></label>
              <label>Email<input name="email" type="email" required placeholder="votre@email.fr" /></label>
              <label>Téléphone, facultatif<input name="telephone" placeholder="Votre téléphone" /></label>
              <label>Commentaire<textarea name="commentaire" rows="4" placeholder="Précisez votre projet"></textarea></label>
              <label className="checkbox"><input type="checkbox" name="optin" value="oui" /> J’accepte de recevoir des conseils techniques et offres.</label>
              <button className="primary" type="submit">Envoyer mon diagnostic</button>
              {submitStatus && <p className="formStatus">{submitStatus}</p>}
            </form>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="page">
      <section className="quiz">
        <div className="topBar">
          <button className="backLink" onClick={() => setStep(s => Math.max(s - 1, 0))} disabled={step === 0}>← Retour</button>
          <span>Étape {step + 1} sur {questions.length}</span>
        </div>
        <div className="progress"><span style={{ width: `${progress}%` }} /></div>
        <h1>{current.title}</h1>

        {current.type === "cards" && (
          <div className="options">
            {current.options.map(option => (
              <button key={option.value} className={`option ${answers[current.key] === option.value ? "selected" : ""}`} onClick={() => selectAnswer(current.key, option.value)}>
                {option.label}
              </button>
            ))}
          </div>
        )}

        {current.type === "surface" && (
          <div className="surfaceBox">
            <input type="number" min="0.1" step="0.1" value={answers.surface} onChange={(e) => selectAnswer("surface", e.target.value)} />
            <span>m²</span>
            <div className="quickSurfaces">
              {["0.25", "0.5", "1", "3", "5", "10", "20", "50"].map(value => <button key={value} onClick={() => selectAnswer("surface", value)}>{value} m²</button>)}
            </div>
          </div>
        )}

        <div className="navActions">
          <button className="secondary" onClick={reset}>Quitter</button>
          <button className="primary" onClick={nextStep} disabled={!answers[current.key]}>Continuer</button>
        </div>
      </section>
    </main>
  );
}
