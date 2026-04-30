"use client";

import { useMemo, useState } from "react";

const productLinks = {
  boutique: "https://boutique.quai-west-composites.fr",

  // Bateau / coque
  kitReparationPolyester: "https://boutique.quai-west-composites.fr/116-resine-kit",
  resinePolyester: "https://boutique.quai-west-composites.fr/5-resines-polyester",
  gelcoat: "https://boutique.quai-west-composites.fr/11-gel-coat",
  gelcoatPolyester: "https://boutique.quai-west-composites.fr/12-gel-coat-polyester",
  polyester: "https://boutique.quai-west-composites.fr/5-resines-polyester",
  catalyseur: "https://boutique.quai-west-composites.fr/adjuvants/136-catalyseur-polyester.html",
  epoxy: "https://boutique.quai-west-composites.fr/recherche?controller=search&s=resine+epoxy",

  // Surf
  kitSurfPolyester: "https://boutique.quai-west-composites.fr/resines/16-kit-polyester-incolore-surf-81833531749.html",
  kitSurfEpoxy: "https://boutique.quai-west-composites.fr/kit-de-resine-epoxy/28-surf-1070-81833531725.html",

  // Moulage
  moulage: "https://boutique.quai-west-composites.fr/40-moulage",
  siliconeRTV: "https://boutique.quai-west-composites.fr/kit-rtv/354-kit-rtv-3481-elastomere-de-silicone.html",
  kitRTV: "https://boutique.quai-west-composites.fr/148-kit-rtv",

  // Piscine
  piscine: "https://boutique.quai-west-composites.fr/369-piscine",

  // Peinture / carrosserie
  peinture: "https://boutique.quai-west-composites.fr/371-peinture-industrielle",
  peintureBrillantDirect: "https://boutique.quai-west-composites.fr/345-peintures-polyurethanes-brillant-direct",
  peintureKitMat: "https://boutique.quai-west-composites.fr/364-peinture-industrielle-mat-en-kit",
  peintureKitSatinee: "https://boutique.quai-west-composites.fr/363-peinture-industrielle-satinee-en-kit",
  peintureKitBrillant: "https://boutique.quai-west-composites.fr/362-peinture-industrielle-brillant-en-kit",

  // Kormatek
  kormatekHome: "https://www.kormatek-boisetdeco.fr/",
  kormatekExterior: "https://www.kormatek-boisetdeco.fr/protection-du-bois-exterieur",
  kormatekTerrasse: "https://www.kormatek-boisetdeco.fr/protection-du-bois-exterieur/33-150-treolje-solvent-ou-v-7029350006831.html",
  kormatekTerrassfix: "https://www.kormatek-boisetdeco.fr/nettoyant-pour-menuiseries-sols/40-demidekk-terrassfix-7029350153726.html",
  kormatekCleantech: "https://www.kormatek-boisetdeco.fr/protection-du-bois-exterieur/30-106-demidekk-cleantech.html",
  kormatekPanelakk: "https://www.kormatek-boisetdeco.fr/protection-du-bois-interieur/25-panelakk-7029350139577.html",
  kormatekVeggTag: "https://www.kormatek-boisetdeco.fr/peinture-interieure-decorative/23-vegg-tag-05-7029350008156.html",
  kormatekGulvmaling: "https://www.kormatek-boisetdeco.fr/peintures-pour-sol-interieur/39-trestjerner-gulvmaling-7031157802370.html",
  kormatekBetongolje: "https://www.kormatek-boisetdeco.fr/peintures-pour-sol-interieur/37-trestjerner-betongolje-7031157801748.html",
  kormatekGulvlakk: "https://www.kormatek-boisetdeco.fr/peintures-pour-sol-interieur/44-trestjerner-gulvlakk-.html"
};

const projectOptions = [
  { value: "bateau", label: "Réparation bateau / coque" },
  { value: "surf", label: "Réparation planche de surf" },
  { value: "moulage", label: "Moulage / fabrication de pièce" },
  { value: "carrosserie", label: "Peinture carrosserie" },
  { value: "bois", label: "Bois, terrasse, sol ou peinture intérieure" },
  { value: "piscine", label: "Remplacer un liner piscine par stratification polyester" },
  { value: "stratification", label: "Stratification / étanchéité" }
];

const baseQuestions = [
  { key: "project", title: "Quel est votre projet principal ?", type: "cards", options: projectOptions },
  { key: "surface", title: "Quelle surface souhaitez-vous traiter ?", type: "surface" },
  { key: "support", title: "Quel est le support principal ?", type: "cards", skipFor: ["bois", "moulage", "piscine"], options: [
    { value: "polyester", label: "Polyester" },
    { value: "epoxy", label: "Époxy" },
    { value: "bois", label: "Bois" },
    { value: "metal", label: "Métal" },
    { value: "plastique", label: "Plastique" },
    { value: "ancienne-peinture", label: "Ancienne peinture" },
    { value: "inconnu", label: "Je ne sais pas" }
  ]},
  { key: "goal", title: "Quel résultat souhaitez-vous obtenir ?", type: "cards", skipFor: ["moulage", "piscine"], options: [
    { value: "reparer", label: "Réparer" },
    { value: "renforcer", label: "Renforcer" },
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
      { value: "reproduction-petite-piece", label: "Reproduire un petit objet" },
      { value: "moule-souple", label: "Fabriquer un moule souple" },
      { value: "tirage", label: "Tirer une pièce dans un moule" },
      { value: "coulee", label: "Faire une coulée / inclusion" },
      { value: "technique", label: "Fabriquer une pièce technique" },
      { value: "decoratif", label: "Créer un objet décoratif" }
    ]},
    { key: "dimensions", title: "Quelle est la taille de votre objet ?", type: "dimensions" }
  ],
carrosserie: [
  { key: "finish", title: "Quelle finition souhaitez-vous ?", type: "cards", options: [
    { value: "kit-brillant-direct-ral", label: "Kit Brillant Direct RAL" },
    { value: "kit-peinture-brillant", label: "Kit Peinture Brillant" },
    { value: "kit-peinture-mat", label: "Kit Peinture Mat" },
    { value: "kit-peinture-satinee", label: "Kit Peinture Satinée" },
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
  piscine: [
    { key: "poolShape", title: "Quelle est la forme de votre piscine ou bassin ?", type: "cards", options: [
      { value: "rectangulaire", label: "Rectangulaire" },
      { value: "carree", label: "Carrée" },
      { value: "ronde", label: "Ronde" },
      { value: "ovale", label: "Ovale" },
      { value: "haricot", label: "Haricot / forme libre" },
      { value: "l", label: "En L" },
      { value: "couloir", label: "Couloir de nage" }
    ]},
    { key: "poolDimensions", title: "Indiquez les dimensions de votre piscine", type: "poolDimensions" }
  ],
  stratification: []
};

function getQuestions(answers) {
  if (answers.project === "piscine") {
    return [
      baseQuestions.find(q => q.key === "project"),
      ...specificQuestions.piscine
    ];
  }

  let filteredBase = baseQuestions
    .filter(q => !(q.skipFor || []).includes(answers.project))
    .map(q => {
      if (q.key === "goal" && answers.project === "carrosserie") {
        return { ...q, options: q.options.filter(opt => ["peindre", "finition"].includes(opt.value)) };
      }
      return q;
    });

  // Tunnel optimisé : pas de question "objectif" quand l'intention est déjà claire.
  if (["bateau", "surf", "carrosserie", "bois"].includes(answers.project)) {
    filteredBase = filteredBase.filter(q => q.key !== "goal");
  }

  // Le support est inutile pour la carrosserie dans cette V10 : on est déjà sur peinture carrosserie.
  if (answers.project === "carrosserie") {
    filteredBase = filteredBase.filter(q => q.key !== "support");
  }

  // Pour le surf, on garde la question spécifique "Votre planche est : polyester / époxy",
  // donc la question support générale est supprimée.
  if (answers.project === "surf") {
    filteredBase = filteredBase.filter(q => q.key !== "support");
  }

  // Pour le bois/Kormatek, on ne pose pas la question support générale.
  if (answers.project === "bois") {
    filteredBase = filteredBase.filter(q => q.key !== "support");
  }

  if (answers.project === "moulage") {
    filteredBase = filteredBase.filter(q => !["surface", "support", "goal"].includes(q.key));
  }

  if (answers.project === "bois" && answers.kormatekProject === "terrasse-exterieure") {
    const boisQuestions = specificQuestions.bois.map(q => {
      if (q.key === "kormatekState") {
        return {
          ...q,
          options: q.options.filter(opt => opt.value !== "poussiereux")
        };
      }
      return q;
    });

    return [...filteredBase, ...boisQuestions];
  }

  return [...filteredBase, ...(specificQuestions[answers.project] || [])];
}

function labelFor(questionKey, value) {
  const all = [...baseQuestions, ...Object.values(specificQuestions).flat()];
  const q = all.find(item => item.key === questionKey);
  if (!q || !q.options) return value || "";
  return q.options.find(opt => opt.value === value)?.label || value || "";
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("fr-FR", { maximumFractionDigits: 2 });
}

function formatPrice(value) {
  return Number(value || 0).toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

function getObjectVolumeLiters(answers) {
  const l = parseFloat(String(answers.objectLength || "0").replace(",", ".")) || 0;
  const w = parseFloat(String(answers.objectWidth || "0").replace(",", ".")) || 0;
  const h = parseFloat(String(answers.objectHeight || "0").replace(",", ".")) || 0;
  return (l * w * h) / 1000;
}

function getPoolSurface(answers) {
  const length = parseFloat(String(answers.poolLength || "0").replace(",", ".")) || 0;
  const width = parseFloat(String(answers.poolWidth || "0").replace(",", ".")) || 0;
  const depth = parseFloat(String(answers.poolDepth || "0").replace(",", ".")) || 0;
  const shape = answers.poolShape || "rectangulaire";

  if (!length || !width || !depth) return 0;

  let floor = length * width;
  let perimeter = 2 * (length + width);

  if (shape === "ronde") {
    const radius = width / 2;
    floor = Math.PI * radius * radius;
    perimeter = Math.PI * width;
  }

  if (shape === "ovale") {
    floor = Math.PI * (length / 2) * (width / 2);
    perimeter = Math.PI * (3 * ((length / 2) + (width / 2)) - Math.sqrt((3 * (length / 2) + (width / 2)) * ((length / 2) + 3 * (width / 2))));
  }

  if (shape === "haricot") {
    floor = length * width * 0.8;
  }

  if (shape === "l") {
    floor = length * width * 0.75;
    perimeter = 2 * (length + width) * 1.15;
  }

  const walls = perimeter * depth;
  return Math.max((floor + walls) * 1.08, 0);
}

function getPoolMaterials(surface) {
  const s = Math.max(surface, 1);
  const resinKg = s / 10 * 20;
  const matKg = s * 0.7;
  const gelcoatKg = s * 0.6;
  const catalystKg = (resinKg + gelcoatKg) * 0.02;
  const styreneParaffineL = 2;
  const acetoneL = 24;
  const styreneMonoL = s / 10;
  const pigmentKg = s / 10;

  return [
    `Résine polyester iso 172 : ${formatNumber(resinKg)} kg`,
    `Mat 300 g/m² : ${formatNumber(matKg)} kg`,
    `Gel coat Iso NPG blanc / bleu piscine / ivoire : ${formatNumber(gelcoatKg)} kg`,
    `Catalyseur : ${formatNumber(catalystKg)} kg`,
    `Styrène paraffiné : ${formatNumber(styreneParaffineL)} L`,
    `Acétone : ${formatNumber(acetoneL)} L`,
    `Styrène monomère : ${formatNumber(styreneMonoL)} L`,
    `Pâte pigmentaire blanc : ${formatNumber(pigmentKg)} kg`,
    `Outils : rouleaux débulleurs, pinceaux, rouleaux, gants, seaux de mélange`,
    `Préparation : abrasifs et matériel de ponçage / dépoussiérage du béton`
  ];
}

function estimateBasket(result, answers) {
  const surface = Math.max(parseFloat(String(result.surface || answers.surface || "1").replace(",", ".")) || 1, 0.1);
  const project = answers.project;
  let low = 0;
  let high = 0;
  let label = "Prix estimé du panier";
  let note = "Estimation indicative à confirmer selon conditionnement, teinte, stock et options choisies.";

  if (project === "bateau") {
    const resinKg = surface * 2 * 0.8;
    low = 35 + resinKg * 18 + surface * 10;
    high = 65 + resinKg * 30 + surface * 18;
    label = "Panier réparation coque estimé";
  }

  if (project === "surf") {
    low = 28 + surface * 25;
    high = 75 + surface * 45;
    label = "Panier réparation surf estimé";
  }

  if (project === "moulage") {
    const volume = Math.max(getObjectVolumeLiters(answers), 1);
    low = 45 + volume * 18;
    high = 120 + volume * 45;
    label = "Panier moulage RTV / fabrication estimé";
  }

  if (project === "carrosserie") {
    low = 55 + surface * 12;
    high = 140 + surface * 25;
    label = "Panier peinture carrosserie estimé";
  }

  if (project === "bois") {
    const p = answers.kormatekProject;
    if (p === "terrasse-exterieure") {
      low = 45 + surface * 4.5;
      high = 95 + surface * 8.5;
      label = "Panier terrasse bois Kormatek estimé";
    } else if (p === "peinture-interieure") {
      low = 35 + surface * 3.2;
      high = 85 + surface * 6.5;
      label = "Panier peinture intérieure Kormatek estimé";
    } else if (p === "sol-interieur-opaque" || p === "sol-beton-transparent" || p === "sol-bois-transparent") {
      low = 55 + surface * 5.5;
      high = 120 + surface * 10;
      label = "Panier sol intérieur Kormatek estimé";
    } else {
      low = 45 + surface * 4;
      high = 105 + surface * 8;
      label = "Panier bois Kormatek estimé";
    }
  }

  if (project === "piscine") {
    const poolSurface = getPoolSurface(answers);
    low = poolSurface * 28;
    high = poolSurface * 55;
    label = "Panier stratification piscine estimé";
    note = "Estimation indicative issue du calcul de surface et de la logique du devis piscine. À valider selon état du bassin, préparation et conditionnements.";
  }

  if (project === "stratification") {
    low = 45 + surface * 22;
    high = 120 + surface * 45;
    label = "Panier stratification estimé";
  }

  return { label, low: Math.max(Math.round(low), 15), high: Math.max(Math.round(high), 25), note };
}
function getSmartOffer(answers) {
  if (answers.project === "bateau") {
    if (answers.boatIssue === "gelcoat" || answers.boatIssue === "fissure") {
      return {
        main: "Gelcoat polyester de réparation",
        url: productLinks.gelcoatPolyester,
        upsell: "Kit finition gelcoat complet",
        complements: ["Catalyseur", "Abrasifs", "Acétone", "Pinceaux", "Polish"]
      };
    }

    return {
      main: "Kit réparation polyester",
      url: productLinks.kitReparationPolyester,
      upsell: "Pack stratification complet",
      complements: ["Mat de verre", "Catalyseur", "Rouleau débulleur", "Acétone", "Gants"]
    };
  }

  if (answers.project === "surf") {
    if (answers.surfBoard === "epoxy-eps") {
      return {
        main: "Kit résine époxy surf",
        url: productLinks.kitSurfEpoxy,
        upsell: "Kit époxy + tissu de verre",
        complements: ["Tissu de verre fin", "Abrasifs", "Spatule", "Gants"]
      };
    }

    return {
      main: "Kit polyester surf",
      url: productLinks.kitSurfPolyester,
      upsell: "Kit réparation surf complet",
      complements: ["Tissu de verre fin", "Papier abrasif", "Spatule", "Polish"]
    };
  }

  if (answers.project === "moulage") {
    const volume = getObjectVolumeLiters(answers);

    if (answers.moldingNeed === "reproduction-petite-piece" || answers.moldingNeed === "moule-souple" || volume <= 5) {
      return {
        main: "Silicone RTV de moulage",
        url: productLinks.siliconeRTV,
        upsell: "Kit RTV complet",
        complements: ["Agent de démoulage", "Balance de précision", "Spatules", "Récipient", "Gants"]
      };
    }

    return {
      main: "Résine polyester + gelcoat de moulage",
      url: productLinks.moulage,
      upsell: "Pack tirage polyester complet",
      complements: ["Gelcoat", "Fibre de verre", "Catalyseur", "Agent de démoulage"]
    };
  }

  if (answers.project === "piscine") {
    return {
      main: "Système stratification piscine polyester",
      url: productLinks.piscine,
      upsell: "Pack piscine complet gros volume",
      complements: ["Résine polyester ISO", "Mat 300", "Gelcoat Iso NPG", "Catalyseur", "Acétone", "Rouleaux débulleurs"]
    };
  }

  if (answers.project === "carrosserie") {
    return {
      main: "Peinture polyuréthane carrosserie",
      url: productLinks.peinture,
      upsell: "Kit peinture complet avec durcisseur et diluant",
      complements: ["Durcisseur", "Diluant", "Apprêt", "Dégraissant", "Abrasifs", "Masquage"]
    };
  }

  return {
    main: "Sélection technique Quai West",
    url: productLinks.boutique,
    upsell: "Pack conseillé",
    complements: ["Accessoires", "Protection", "Préparation support"]
  };
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
  let resultSurface = surface;
if (answers.project === "bateau") {
  title = "Réparation bateau / coque";

  if (answers.boatIssue === "gelcoat" || answers.boatIssue === "fissure") {
    product = "Gelcoat polyester de réparation";
    categoryUrl = productLinks.gelcoatPolyester;
    explanation = "Pour une reprise de gelcoat ou une petite fissure, une finition adaptée permet de retrouver une surface propre.";
    products = [
      "Gelcoat polyester",
      "Catalyseur",
      "Abrasifs",
      "Acétone",
      "Pinceaux",
      "Polish"
    ];
  } else {
    product = "Kit réparation polyester";
    categoryUrl = productLinks.kitReparationPolyester;
    explanation = "Pour une coque polyester, une réparation avec résine et fibre permet de retrouver solidité et étanchéité.";
    products = [
      "Kit réparation polyester",
      "Mat de verre",
      "Catalyseur",
      "Rouleau débulleur",
      "Acétone",
      "Gants"
    ];
  }

  warning = "Ne stratifiez jamais sur un support humide ou mal préparé.";

  const resinKg = surface * 2 * 0.8;
  quantities = [
    `Résine estimée : ${formatNumber(resinKg)} kg`,
    `Catalyseur à 2 % : ${formatNumber(resinKg * 1000 * 0.02)} g`,
    `Fibre : ${formatNumber(surface * 2)} m² environ`
  ];
}

if (answers.project === "surf") {
  title = "Réparation planche de surf";

  const smartOffer = getSmartOffer(answers);

  product = smartOffer.main;
  categoryUrl = smartOffer.url;
  products = [smartOffer.upsell, ...smartOffer.complements];

  explanation = product.includes("époxy")
    ? "Une planche EPS/époxy doit être réparée avec une résine époxy."
    : "Pour une planche polyester, une résine polyester adaptée au surf convient.";

  warning = "N’utilisez pas de résine polyester sur une planche EPS/époxy.";
  quantities = [
    `Résine estimée : ${formatNumber(Math.max(surface * 0.6, 0.15))} kg`,
    `Tissu de verre : ${formatNumber(surface * 1.3)} m² environ`
  ];
}

  if (answers.project === "moulage") {
    title = "Moulage / fabrication de pièce";
      const smartOffer = getSmartOffer(answers);

  product = smartOffer.main;
  categoryUrl = smartOffer.url;
  products = [smartOffer.upsell, ...smartOffer.complements];

    const volume = getObjectVolumeLiters(answers);
if (answers.moldingNeed === "reproduction-petite-piece" || answers.moldingNeed === "moule-souple" || volume <= 5) {
  product = "Silicone RTV de moulage";
  categoryUrl = productLinks.siliconeRTV;
      products = ["Silicone RTV de moulage", "Agent de démoulage si nécessaire", "Balance de précision", "Spatules", "Récipient de mélange", "Gants"];
      explanation = "Chez Quai West, pour la reproduction d’objets de petite taille, nous conseillons d’utiliser un RTV silicone afin d’obtenir une bonne reproduction des détails et un démoulage facile.";
      warning = "Prévoyez un coffrage propre et étanche, avec une marge suffisante autour de l’objet.";
      quantities = [`Volume objet estimé : ${formatNumber(volume)} L`, "Quantité RTV à confirmer selon coffrage, marge autour de la pièce et épaisseur souhaitée"];
    } else if (answers.moldingNeed === "coulee") {
      product = "Résine époxy de coulée";
      categoryUrl = productLinks.epoxy;
      products = ["Résine époxy de coulée", "Pigments éventuels", "Récipients", "Spatules", "Gants"];
      explanation = "La coulée et l’inclusion demandent une résine adaptée à l’épaisseur et au rendu souhaité.";
      warning = "Respectez les épaisseurs maximales de coulée pour éviter l’exothermie.";
      quantities = [`Volume objet estimé : ${formatNumber(volume)} L`, "Quantité de résine à confirmer selon volume réel de coulée"];
    } else {
      product = "Gelcoat + résine polyester + fibre";
      categoryUrl = productLinks.polyester;
      products = ["Gelcoat de moulage", "Résine polyester", "Fibre de verre", "Catalyseur", "Agent de démoulage"];
      explanation = "Pour tirer une pièce dans un moule, l’association gelcoat + stratification polyester est une solution classique.";
      warning = "N’oubliez jamais l’agent de démoulage.";
      quantities = [`Volume objet estimé : ${formatNumber(volume)} L`, "Prévoir résine, gelcoat, fibre et catalyseur selon la surface développée de la pièce"];
    }
  }

  if (answers.project === "carrosserie") {
  title = "Peinture carrosserie";

  if (answers.finish === "kit-brillant-direct-ral") {
    product = "Kit Brillant Direct RAL";
    categoryUrl = productLinks.peintureBrillantDirect;

  } else if (answers.finish === "kit-peinture-brillant") {
    product = "Kit Peinture Brillant";
    categoryUrl = productLinks.peintureKitBrillant;

  } else if (answers.finish === "kit-peinture-mat") {
    product = "Kit Peinture Mat";
    categoryUrl = productLinks.peintureKitMat;

  } else if (answers.finish === "kit-peinture-satinee") {
    product = "Kit Peinture Satinée";
    categoryUrl = productLinks.peintureKitSatinee;

  } else {
    product = "Kit peinture carrosserie";
    categoryUrl = productLinks.peintureBrillantDirect;
  }

  explanation = "Tous les kits sont fournis avec la base, le diluant et le durcisseur pour une application simplifiée.";

  products = [
    product,
    "Base peinture",
    "Diluant",
    "Durcisseur",
    "Apprêt",
    "Dégraissant",
    "Abrasifs",
    "Masquage"
  ];

  warning = "Une mauvaise préparation du support est la première cause d’échec en peinture carrosserie.";

  quantities = [
    `Kit peinture estimé : ${formatNumber((surface / 9) * 2)} L pour 2 couches`,
    "Base + diluant + durcisseur inclus"
  ];
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
    quantities = [
      `Nettoyant/dégriseur : prévoir selon encrassement`,
      `Treolje estimé : ${formatNumber(surface / 8)} L par couche`
    ];

  } else if (p === "terrasse-exterieure") {
    product = "Treolje";
    categoryUrl = productLinks.kormatekTerrasse;
    explanation = "Pour protéger une terrasse bois extérieure, Treolje est la solution Kormatek adaptée pour nourrir, imprégner et protéger le bois.";
    products = ["Treolje", "Demidekk Terrassfix si nettoyage nécessaire", "Brosse terrasse", "Chiffon non pelucheux", "Gants"];
    warning = "Appliquez en couches fines et essuyez l’excédent pour éviter un film collant en surface.";
    quantities = [
      `Treolje estimé : ${formatNumber(surface / 8)} L par couche`,
      "Prévoir 1 à 2 couches selon absorption du bois"
    ];

  } else if (p === "bois-exterieur" && f === "opaque") {
    product = "Demidekk Cleantech";
    categoryUrl = productLinks.kormatekCleantech;
    explanation = "Pour un bardage, une menuiserie ou un bois extérieur avec finition opaque, Demidekk Cleantech est la solution Kormatek recommandée.";
    products = ["Demidekk Cleantech", "Nettoyant/préparation", "Brosse / rouleau", "Abrasifs", "Protection de chantier"];
    warning = "Sur ancien support peint ou lasuré, éliminez les parties non adhérentes avant application.";
    quantities = [
      `Finition opaque estimée : ${formatNumber(surface / 8)} L par couche`,
      "Prévoir généralement 2 couches"
    ];

  } else if (p === "bois-exterieur") {
    product = "Gamme protection bois extérieur Kormatek";
    categoryUrl = productLinks.kormatekExterior;
    explanation = "Pour un bois extérieur, le choix dépend du rendu souhaité : naturel, teinté ou opaque. La gamme Kormatek protection bois extérieur permet d’orienter vers la bonne solution.";
    products = ["Produit de protection bois extérieur", "Nettoyant/préparation", "Brosse / rouleau", "Abrasifs", "Gants"];
    warning = "Un bois extérieur doit être propre, sec et sain avant toute protection.";
    quantities = [
      `Produit estimé : ${formatNumber(surface / 8)} L par couche`,
      "Prévoir 1 à 2 couches selon le système choisi"
    ];

  } else if (p === "peinture-interieure") {
    product = "Vegg & Tag 05";
    categoryUrl = productLinks.kormatekVeggTag;
    explanation = "Pour murs et plafonds intérieurs, Vegg & Tag 05 est une peinture murale mate à base d’eau.";
    products = ["Vegg & Tag 05", "Rouleau murs/plafonds", "Brosse à rechampir", "Adhésif de masquage", "Bâche de protection"];
    warning = "Sur support taché, farinant ou très poreux, prévoyez une préparation adaptée.";
    quantities = [
      `Peinture murale estimée : ${formatNumber((surface / 10) * 2)} L pour 2 couches`
    ];

  } else if (p === "sol-bois-transparent") {
    product = "Trestjerner Gulvlakk";
    categoryUrl = productLinks.kormatekGulvlakk;
    explanation = "Pour parquet, escalier ou sol bois intérieur avec finition transparente résistante, Trestjerner Gulvlakk est la solution vernis.";
    products = ["Trestjerner Gulvlakk", "Abrasifs", "Rouleau/laqueur", "Dépoussiérage soigneux"];
    warning = "Sur ancien vernis, poncez et vérifiez l’adhérence.";
    quantities = [
      `Vernis estimé : ${formatNumber(surface / 10)} L par couche`,
      "Prévoir 2 à 3 couches selon sollicitation"
    ];

  } else if (p === "sol-beton-transparent") {
    product = "Trestjerner Betongolje";
    categoryUrl = productLinks.kormatekBetongolje;
    explanation = "Pour sol béton, dalle poreuse, terre cuite, OSB ou Fermacell avec protection transparente, Trestjerner Betongolje fixe les poussières et bouche les pores.";
    products = ["Trestjerner Betongolje", "Nettoyant / dégraissant", "Rouleau sol", "Dépoussiérage", "Gants"];
    warning = "Le béton doit être propre, sec, poreux et parfaitement dépoussiéré.";
    quantities = [
      `Saturateur béton estimé : ${formatNumber(surface / 8)} L par couche`
    ];

  } else if (p === "sol-interieur-opaque") {
    product = "Trestjerner Gulvmaling";
    categoryUrl = productLinks.kormatekGulvmaling;
    explanation = "Pour un sol intérieur en bois ou béton avec finition couvrante, Trestjerner Gulvmaling est une peinture dure adaptée aux sols.";
    products = ["Trestjerner Gulvmaling", "Nettoyant / dégraissant", "Abrasifs", "Rouleau sol", "Masquage"];
    warning = "Sur sol déjà peint ou verni, vérifiez l’adhérence et poncez avant application.";
    quantities = [
      `Peinture sol estimée : ${formatNumber((surface / 8) * 2)} L pour 2 couches`
    ];

  } else if (p === "bois-interieur-transparent") {
    product = "Panelakk";
    categoryUrl = productLinks.kormatekPanelakk;
    explanation = "Pour protéger ou décorer un bois intérieur tout en conservant son aspect, Panelakk est une lasure à l’eau transparente, teintée ou incolore.";
    products = ["Panelakk", "Abrasif fin", "Brosse adaptée", "Chiffon", "Protection de chantier"];
    warning = "Poncez légèrement et dépoussiérez parfaitement avant application.";
    quantities = [
      `Panelakk estimé : ${formatNumber(surface / 10)} L par couche`
    ];

  } else {
    product = "Gamme protection bois extérieur Kormatek";
    categoryUrl = productLinks.kormatekExterior;
    explanation = "Le choix dépend du rendu attendu : transparent, teinté ou opaque couvrant. La gamme protection bois extérieur Kormatek permet de choisir la bonne finition.";
    products = ["Produit de protection bois adapté", "Nettoyant/préparation", "Brosse / rouleau", "Abrasifs"];
    warning = "Un bois doit être propre, sec et sain avant toute protection.";
    quantities = [
      `Produit estimé : ${formatNumber(surface / 8)} L par couche`
    ];
  }
}

  if (answers.project === "piscine") {
    brand = "Quai West";
    title = "Remplacer un liner par une stratification polyester";
    const poolSurface = getPoolSurface(answers);
    resultSurface = poolSurface;
    product = "Système de stratification polyester pour piscine béton";
    categoryUrl = productLinks.piscine;
    explanation = "Pour remplacer un liner sur une piscine béton, l’assistant calcule la surface fond + parois puis liste les matériaux nécessaires selon la logique du devis Quai West.";
    products = getPoolMaterials(poolSurface);
    warning = "Le support béton doit être parfaitement préparé, sain, sec, poncé/dépoussiéré et compatible avant stratification.";
    quantities = [`Surface fond + parois avec marge : ${formatNumber(poolSurface)} m²`, ...getPoolMaterials(poolSurface)];
  }

  if (answers.project === "stratification") {
    title = "Stratification / étanchéité";
    product = answers.support === "epoxy" ? "Résine époxy + renfort" : "Résine polyester ou époxy selon support";
    categoryUrl = answers.support === "epoxy" ? productLinks.epoxy : productLinks.polyester;
    products = ["Résine adaptée", "Renfort fibre de verre", "Catalyseur ou durcisseur", "Abrasifs", "Gants"];
    const resinKg = surface * 2 * 0.8;
    quantities = [`Résine estimée : ${formatNumber(resinKg)} kg`, `Renfort : ${formatNumber(surface * 2)} m² environ`];
  }
if (!categoryUrl) {
  categoryUrl = productLinks.boutique;
}
  return { title, product, categoryUrl, explanation, products, warning, quantities, surface: resultSurface, brand };
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
  const basketEstimate = useMemo(() => estimateBasket(result, answers), [result, answers]);
  const progress = Math.min(((step + 1) / Math.max(questions.length, 1)) * 100, 100);

  function selectAnswer(key, value) {
    const next = { ...answers, [key]: value };
    if (key === "project") {
      Object.keys(next).forEach(k => {
        if (!["project", "surface"].includes(k)) delete next[k];
      });
      if (value === "bois") next.support = "bois";
      if (value === "piscine") next.support = "beton";
      if (value === "bateau") next.goal = "reparer";
      if (value === "surf") next.goal = "reparer";
      if (value === "carrosserie") {
        next.goal = "peindre";
        next.support = "ancienne-peinture";
      }
      setStep(0);
    }
    setAnswers(next);
  }

  function nextStep() {
    if (!current) return;
    if (current.type === "dimensions") {
      if (!answers.objectLength || !answers.objectWidth || !answers.objectHeight) return;
    } else if (current.type === "poolDimensions") {
      if (!answers.poolLength || !answers.poolWidth || !answers.poolDepth) return;
    } else if (!answers[current.key]) return;
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
  "form-name": "diagnostic-quai-west-v2",
  "bot-field": "",
  marque: result.brand || "",
  projet: labelFor("project", answers.project),

  ...(answers.project === "bois" ? {
    projet_kormatek: labelFor("kormatekProject", answers.kormatekProject),
    etat_kormatek: labelFor("kormatekState", answers.kormatekState),
    rendu_kormatek: labelFor("kormatekFinish", answers.kormatekFinish)
  } : {}),

  support: labelFor("support", answers.support),
  surface: `${formatNumber(result.surface)} m²`,
  niveau: form.niveau?.value || "Non renseigné",
  priorite: labelFor("priority", answers.priority),
  produit_recommande: result.product || "",

  details_specifiques:
    answers.project === "piscine"
      ? `Forme piscine : ${labelFor("poolShape", answers.poolShape)} | Dimensions : ${answers.poolLength} x ${answers.poolWidth} x ${answers.poolDepth} m | Surface piscine : ${formatNumber(getPoolSurface(answers))} m²`
      : answers.project === "moulage"
        ? `Dimensions objet : ${answers.objectLength} x ${answers.objectWidth} x ${answers.objectHeight} cm | Volume : ${formatNumber(getObjectVolumeLiters(answers))} L`
        : "",

  quantites: (result.quantities || []).join(" | "),
  panier_conseille: (result.products || []).join(" | "),
  erreur_a_eviter: result.warning || "",
  prix_estime_min: formatPrice(basketEstimate.low),
  prix_estime_max: formatPrice(basketEstimate.high),
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
          <h1>Trouvez le bon produit, la bonne quantité et les bons accessoires en moins de 90 secondes.</h1>
          <p>
            Réparation bateau, surf, moulage, peinture carrosserie, stratification, rénovation bois, terrasse,
            sol intérieur, béton ou remplacement liner piscine par stratification polyester.
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
              {answers.project === "bois" ? "Voir la solution Kormatek recommandée" : "Voir les produits recommandés"}
            </a>
          </article>

          <article className="card">
            <h2>Votre diagnostic</h2>
            <ul className="cleanList">
              <li><strong>Projet :</strong> {labelFor("project", answers.project)}</li>
              {["bateau", "surf"].includes(answers.project) && <li><strong>Objectif déduit :</strong> Réparation</li>}
              {answers.project === "carrosserie" && <li><strong>Objectif déduit :</strong> Peinture / finition</li>}
              {answers.project === "bois" ? (
                <>
                  <li><strong>Projet Kormatek :</strong> {labelFor("kormatekProject", answers.kormatekProject)}</li>
                  <li><strong>État :</strong> {labelFor("kormatekState", answers.kormatekState)}</li>
                  <li><strong>Rendu :</strong> {labelFor("kormatekFinish", answers.kormatekFinish)}</li>
                </>
              ) : answers.project === "piscine" ? (
                <>
                  <li><strong>Forme piscine :</strong> {labelFor("poolShape", answers.poolShape)}</li>
                  <li><strong>Dimensions :</strong> {answers.poolLength} x {answers.poolWidth} x {answers.poolDepth} m</li>
                  <li><strong>Surface calculée :</strong> {formatNumber(getPoolSurface(answers))} m²</li>
                </>
              ) : answers.project === "moulage" ? (
                <>
                  <li><strong>Type :</strong> {labelFor("moldingNeed", answers.moldingNeed)}</li>
                  <li><strong>Dimensions objet :</strong> {answers.objectLength} x {answers.objectWidth} x {answers.objectHeight} cm</li>
                  <li><strong>Volume estimé :</strong> {formatNumber(getObjectVolumeLiters(answers))} L</li>
                </>
              ) : (
                <li><strong>Support :</strong> {labelFor("support", answers.support)}</li>
              )}
              <li><strong>Surface :</strong> {formatNumber(result.surface)} m²</li>
              <li><strong>Priorité :</strong> {labelFor("priority", answers.priority)}</li>
            </ul>
          </article>

          <article className="card"><h2>Quantité estimée</h2><ul className="cleanList">{result.quantities.map((q, i) => <li key={i}>{q}</li>)}</ul></article>

          <article className="card priceCard">
            <h2>{basketEstimate.label}</h2>
            <div className="priceRange">{formatPrice(basketEstimate.low)} à {formatPrice(basketEstimate.high)}</div>
            <p>{basketEstimate.note}</p>
          </article>

          <article className="card"><h2>Panier conseillé</h2><ul className="pillList">{result.products.map((p, i) => <li key={i}>{p}</li>)}</ul></article>
          <article className="card warning"><h2>Erreur à éviter</h2><p>{result.warning}</p></article>

          <article className="card conversionCard">
            <h2>Conseil Quai West</h2>
            <p>
              Pour éviter les erreurs de compatibilité, de dosage ou de quantité, envoyez votre diagnostic :
              l’équipe pourra vérifier votre configuration avant commande.
            </p>
            <ul className="cleanList">
              <li>✓ Validation du système produit</li>
              <li>✓ Ajustement des quantités</li>
              <li>✓ Conseil selon votre niveau réel</li>
            </ul>
            <button className="secondary full" onClick={() => setShowLeadForm(!showLeadForm)}>Recevoir mon diagnostic par email</button>
          </article>
        </section>

        {showLeadForm && (
          <section className="leadBox">
            <h2>Recevoir mon diagnostic</h2>
            <form name="diagnostic-quai-west-v2" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleLeadSubmit} className="leadForm">
              <input type="hidden" name="form-name" value="diagnostic-quai-west-v2" />
              <p style={{ display: "none" }}><label>Ne pas remplir : <input name="bot-field" /></label></p>
              <label>Prénom<input name="prenom" required placeholder="Votre prénom" /></label>
              <label>Email<input name="email" type="email" required placeholder="votre@email.fr" /></label>
              <label>Téléphone, facultatif<input name="telephone" placeholder="Votre téléphone" /></label>
              <label>Votre niveau, facultatif
                <select name="niveau" defaultValue="">
                  <option value="">Choisir une option</option>
                  <option value="Débutant">Débutant</option>
                  <option value="Bricoleur confirmé">Bricoleur confirmé</option>
                  <option value="Professionnel">Professionnel</option>
                </select>
              </label>
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
        <div className="breadcrumb">
          {Object.entries(answers)
            .filter(([key, value]) => value && !["surface", "support"].includes(key))
            .map(([key, value]) => labelFor(key, value) || value)
            .filter(Boolean)
            .join(" → ")}
        </div>
        {["bateau", "surf", "carrosserie"].includes(answers.project) && step === 1 && (
          <p className="helperText">
            Parcours raccourci : nous évitons les questions redondantes et utilisons directement votre choix de projet pour orienter la recommandation.
          </p>
        )}
        <h1>{current.title}</h1>

        {current.type === "cards" && (
          <div className="options">
            {current.options
              .filter(option => {
                if (
                  current.key === "kormatekState" &&
                  answers.kormatekProject === "terrasse-exterieure" &&
                  option.value === "poussiereux"
                ) {
                  return false;
                }
                return true;
              })
              .map(option => (
              <button key={option.value} className={`option ${answers[current.key] === option.value ? "selected" : ""}`} onClick={() => selectAnswer(current.key, option.value)}>
                {option.label}
              </button>
            ))}
          </div>
        )}

        {current.key === "poolShape" && (
          <p className="helperText">
            👉 En 30 secondes, obtenez la liste complète du matériel pour remplacer votre liner par une stratification polyester.
          </p>
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

        {current.type === "dimensions" && (
          <div className="dimensionBox">
            <input placeholder="Longueur (cm)" value={answers.objectLength || ""} onChange={(e) => selectAnswer("objectLength", e.target.value)} />
            <input placeholder="Largeur (cm)" value={answers.objectWidth || ""} onChange={(e) => selectAnswer("objectWidth", e.target.value)} />
            <input placeholder="Hauteur (cm)" value={answers.objectHeight || ""} onChange={(e) => selectAnswer("objectHeight", e.target.value)} />
            <p className="helperText">Pour les petits objets, Quai West recommande généralement un RTV silicone de moulage.</p>
          </div>
        )}

        {current.type === "poolDimensions" && (
          <div className="dimensionBox">
            <input placeholder="Longueur (m)" value={answers.poolLength || ""} onChange={(e) => selectAnswer("poolLength", e.target.value)} />
            <input placeholder="Largeur / diamètre (m)" value={answers.poolWidth || ""} onChange={(e) => selectAnswer("poolWidth", e.target.value)} />
            <input placeholder="Profondeur moyenne (m)" value={answers.poolDepth || ""} onChange={(e) => selectAnswer("poolDepth", e.target.value)} />
            <p className="helperText">Le calcul estime le fond + les parois + une marge de 8 %.</p>
          </div>
        )}

        <div className="navActions">
          <button className="secondary" onClick={reset}>Quitter</button>
          <button className="primary" onClick={nextStep} disabled={
            current.type === "dimensions"
              ? (!answers.objectLength || !answers.objectWidth || !answers.objectHeight)
              : current.type === "poolDimensions"
                ? (!answers.poolLength || !answers.poolWidth || !answers.poolDepth)
                : !answers[current.key]
          }>Continuer</button>
        </div>
      </section>
    </main>
  );
}
