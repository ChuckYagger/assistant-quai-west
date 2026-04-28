"use client";

import { useMemo, useState } from "react";

const productLinks = {
  boutique: "https://boutique.quai-west-composites.fr",
  polyester: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=resine+polyester",
  epoxy: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=resine+epoxy",
  gelcoat: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=gelcoat",
  fibre: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=fibre+de+verre",
  silicone: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=silicone+moulage",
  peinture: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=peinture+polyurethane",

  kormatekHome: "https://www.kormatek-boisetdeco.fr/",
  kormatekExterior: "https://www.kormatek-boisetdeco.fr/protection-du-bois-exterieur/",
  kormatekTerrassfix: "https://www.kormatek-boisetdeco.fr/nettoyant-pour-menuiseries-sols/40-demidekk-terrassfix-7029350153726.html",
  kormatekTreolje: "https://www.kormatek-boisetdeco.fr/protection-du-bois-exterieur/33-150-treolje-solvent-ou-v-7029350006831.html",
  kormatekCleantech: "https://www.kormatek-boisetdeco.fr/protection-du-bois-exterieur/30-106-demidekk-cleantech.html",
  kormatekAccessories: "https://www.kormatek-boisetdeco.fr/accessoires/"
};

const projectOptions = [
  { value: "bateau", label: "Réparation bateau / coque" },
  { value: "surf", label: "Réparation planche de surf" },
  { value: "moulage", label: "Moulage / fabrication de pièce" },
  { value: "carrosserie", label: "Peinture carrosserie" },
  { value: "bois", label: "Rénovation bois / terrasse" },
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
  { key: "support", title: "Quel est le support principal ?", type: "cards", options: [
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
    { key: "woodType", title: "Votre bois est :", type: "cards", options: [
      { value: "terrasse", label: "Terrasse" },
      { value: "bardage", label: "Bardage" },
      { value: "mobilier", label: "Mobilier extérieur" },
      { value: "menuiserie", label: "Menuiserie" },
      { value: "interieur", label: "Bois intérieur" }
    ]},
    { key: "woodState", title: "État du bois :", type: "cards", options: [
      { value: "neuf", label: "Neuf" },
      { value: "grise", label: "Grisé" },
      { value: "ancienne-lasure", label: "Ancienne lasure" },
      { value: "ancienne-peinture", label: "Ancienne peinture" },
      { value: "tache", label: "Taché / noirci" }
    ]}
  ],
  stratification: []
};

function getQuestions(answers) {
  return [...baseQuestions, ...(specificQuestions[answers.project] || [])];
}

function labelFor(questionKey, value) {
  const all = [...baseQuestions, ...Object.values(specificQuestions).flat()];
  const q = all.find(item => item.key === questionKey);
  if (!q || !q.options) return value;
  return q.options.find(opt => opt.value === value)?.label || value;
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
    title = "Rénovation bois / terrasse avec Kormatek Bois & Déco";

    if (answers.woodType === "terrasse" && (answers.woodState === "grise" || answers.woodState === "tache")) {
      product = "Demidekk Terrassfix + Treolje";
      categoryUrl = productLinks.kormatekTerrassfix;
      explanation = "Pour une terrasse grisée, tachée ou noircie, commencez par nettoyer/dégriser avec Demidekk Terrassfix, puis protégez avec Treolje.";
      products = ["Demidekk Terrassfix - nettoyant dégriseur terrasse", "Treolje - saturateur / imprégnation bois extérieur", "Brosse plate ou rouleau", "Abrasifs si nécessaire", "Gants"];
      warning = "Ne saturez pas une terrasse encore grisée, sale ou humide : le bois doit être propre, sec et ouvert avant protection.";
    } else if (answers.woodState === "ancienne-peinture" || answers.goal === "peindre" || answers.priority === "finition") {
      product = "Demidekk Cleantech";
      categoryUrl = productLinks.kormatekCleantech;
      explanation = "Pour une finition opaque extérieure durable sur bois, Demidekk Cleantech est la recommandation Kormatek.";
      products = ["Demidekk Cleantech - finition opaque bois extérieur", "Visir Oljegrunning Klar ou primaire adapté", "Jotun Kraftvask ou nettoyant adapté", "Brosse plate / rouleau", "Abrasifs"];
      warning = "Sur ancienne peinture, éliminez les parties non adhérentes et préparez correctement le support avant application.";
    } else if (answers.woodType === "terrasse" || answers.goal === "proteger") {
      product = "Treolje";
      categoryUrl = productLinks.kormatekTreolje;
      explanation = "Pour protéger une terrasse ou des bois extérieurs tout en conservant un rendu naturel ou teinté, Treolje est la solution saturateur / imprégnation Kormatek.";
      products = ["Treolje - saturateur / imprégnation bois extérieur", "Demidekk Terrassfix si le bois est à nettoyer", "Brosse plate", "Chiffon non pelucheux pour essuyer l’excédent", "Gants"];
      warning = "Appliquez en couches fines et essuyez l’excédent : le produit doit pénétrer dans le bois, pas former une couche épaisse.";
    } else {
      product = "Gamme Protection du bois extérieur Kormatek";
      categoryUrl = productLinks.kormatekExterior;
      explanation = "Le choix dépend du rendu attendu : naturel/teinté avec Treolje ou plus opaque avec une finition Demidekk adaptée.";
      products = ["Treolje pour rendu naturel ou teinté", "Demidekk Cleantech pour finition opaque", "Demidekk Terrassfix pour préparation", "Brosse / rouleau", "Abrasifs"];
      warning = "La préparation du bois conditionne la tenue : support propre, sec, sain et compatible avec la finition choisie.";
    }

    const liters = surface / 8;
    quantities = [`Produit Kormatek estimé : ${formatNumber(liters)} L par couche`, "Prévoir généralement 1 à 2 couches selon le produit et l’état du bois", "Pour bois grisé : prévoir Demidekk Terrassfix avant protection"];
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

  const questions = useMemo(() => getQuestions(answers), [answers]);
  const current = questions[step];
  const isLast = step >= questions.length;
  const result = useMemo(() => recommend(answers), [answers]);
  const progress = Math.min(((step + 1) / Math.max(questions.length, 1)) * 100, 100);

  function selectAnswer(key, value) {
    const next = { ...answers, [key]: value };
    if (key === "project") {
      Object.keys(next).forEach(k => {
        if (!["project", "level", "surface", "support", "goal", "priority"].includes(k)) delete next[k];
      });
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
  }

  if (!started) {
    return (
      <main className="page">
        <section className="hero">
          <div className="badge">Assistant technique Quai West</div>
          <h1>Trouvez le bon produit, la bonne quantité et les bons accessoires en moins de 2 minutes.</h1>
          <p>
            Réparation bateau, surf, moulage, peinture carrosserie, stratification ou rénovation bois/terrasse :
            obtenez une recommandation claire avec les produits Quai West et Kormatek Bois & Déco.
          </p>
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
              {answers.project === "bois" ? "Voir le produit Kormatek recommandé" : "Voir les produits recommandés"}
            </a>
          </article>

          <article className="card">
            <h2>Votre diagnostic</h2>
            <ul className="cleanList">
              <li><strong>Projet :</strong> {labelFor("project", answers.project)}</li>
              <li><strong>Support :</strong> {labelFor("support", answers.support)}</li>
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
            <form name="diagnostic-quai-west" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/success.html" className="leadForm">
              <input type="hidden" name="form-name" value="diagnostic-quai-west" />
              <p style={{ display: "none" }}><label>Ne pas remplir : <input name="bot-field" /></label></p>
              <input type="hidden" name="marque" value={result.brand} />
              <input type="hidden" name="projet" value={labelFor("project", answers.project)} />
              <input type="hidden" name="surface" value={`${result.surface} m²`} />
              <input type="hidden" name="support" value={labelFor("support", answers.support)} />
              <input type="hidden" name="niveau" value={labelFor("level", answers.level)} />
              <input type="hidden" name="priorite" value={labelFor("priority", answers.priority)} />
              <input type="hidden" name="produit_recommande" value={result.product} />
              <label>Prénom<input name="prenom" required placeholder="Votre prénom" /></label>
              <label>Email<input name="email" type="email" required placeholder="votre@email.fr" /></label>
              <label>Téléphone, facultatif<input name="telephone" placeholder="Votre téléphone" /></label>
              <label>Commentaire<textarea name="commentaire" rows="4" placeholder="Précisez votre projet"></textarea></label>
              <label className="checkbox"><input type="checkbox" name="optin" /> J’accepte de recevoir des conseils techniques et offres.</label>
              <button className="primary" type="submit">Envoyer mon diagnostic</button>
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
              {["0.25", "0.5", "1", "3", "5", "10"].map(value => <button key={value} onClick={() => selectAnswer("surface", value)}>{value} m²</button>)}
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
