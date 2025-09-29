// lancer en tapant dans la console :
// node --experimental-strip-types tests.ts

import rawPenguins from "./penguins.json" with { type: 'json' };
import rawCityWages from "./citywages.json" with { type: 'json' };

//** Completer les TODO en ecrivant les parties :  */
type Penguin = {
    species: string;
    island: string;
    culmen_length_mm: number | null;
    culmen_depth_mm: number | null;
    flipper_length_mm: number | null;
    body_mass_g: number | null;
    sex: "MALE" | "FEMALE" | null;
};

const penguins = rawPenguins as Penguin[];

type CityWage = {
    Metro: string;
    POP_1980: number;
    LPOP_1980: number;
    R90_10_1980: number;
    POP_2015: number;
    LPOP_2015: number;
    R90_10_2015: number;
    nyt_display: string;
    state_display: string;
    highlight: number | null;
};

const cityWages = rawCityWages as CityWage[];


/* Désactiver COPILOT pour que vous fassiez l'effort de lire */

console.log("=== EXEMPLES DES MÉTHODES ARRAY AVEC LES DONNÉES PENGUINS ===\n");
console.log(`Nombre total de pingouins: ${penguins.length}\n`);

// ===== MÉTHODES D'ACCÈS AUX ÉLÉMENTS =====

console.log("--- MÉTHODES D'ACCÈS AUX ÉLÉMENTS ---");

// at() - Accède à un élément par son indice (accepte les indices négatifs)
console.log("• at() - Premier pingouin:", penguins.at(0)?.species);
console.log("• at() - Dernier pingouin:", penguins.at(-1)?.species);
console.log();

// slice() - Extrait une portion du tableau
console.log("• slice() - Les 3 premiers pingouins:");
console.log(penguins.slice(0, 3).map(p => `${p.species} de ${p.island}`));
console.log();

// ===== MÉTHODES DE RECHERCHE ET VÉRIFICATION =====

console.log("--- MÉTHODES DE RECHERCHE ET VÉRIFICATION ---");

// find() - Trouve le premier élément qui satisfait une condition
const premierChinstrap = penguins.find(p => p.species === "Chinstrap");
console.log("• find() - Premier pingouin Chinstrap:", premierChinstrap?.island);

// findIndex() - Trouve l'indice du premier élément qui satisfait une condition
const indexChinstrap = penguins.findIndex(p => p.species === "Chinstrap");
console.log("• findIndex() - Index du premier Chinstrap:", indexChinstrap);

// indexOf() - Trouve l'indice d'un élément (comparaison stricte)
const especies = penguins.map(p => p.species);
console.log("• indexOf() - Index de 'Gentoo' dans la liste des espèces:", especies.indexOf("Gentoo"));

// lastIndexOf() - Trouve le dernier indice d'un élément
console.log("• lastIndexOf() - Dernier index de 'Adelie':", especies.lastIndexOf("Adelie"));

// includes() - Vérifie si un élément existe dans le tableau
const iles = penguins.map(p => p.island);
console.log("• includes() - Île 'Dream' existe-t-elle?", iles.includes("Dream"));

// some() - Teste si au moins un élément satisfait une condition
const auMoinsUnLourd = penguins.some(p => p.body_mass_g != null && p.body_mass_g > 6000);
console.log("• some() - Y a-t-il des pingouins > 6000g?", auMoinsUnLourd);

// every() - Teste si tous les éléments satisfent une condition
const tousOntMasse = penguins.every(p => p.body_mass_g != null && p.body_mass_g > 0);
console.log("• every() - Tous ont une masse > 0?", tousOntMasse);
console.log();

// ===== MÉTHODES DE FILTRAGE =====

console.log("--- MÉTHODES DE FILTRAGE ---");

// filter() - Crée un nouveau tableau avec les éléments qui passent un test
const pingousinsMales = penguins.filter(p => p.sex === "MALE");
console.log("• filter() - Nombre de mâles:", pingousinsMales.length);

const pingouinsLourds = penguins.filter(p => p.body_mass_g != null && p.body_mass_g > 5000);
console.log("• filter() - Pingouins > 5000g:", pingouinsLourds.length);
console.log();

// ===== MÉTHODES DE TRANSFORMATION =====

console.log("--- MÉTHODES DE TRANSFORMATION ---");

// map() - Transforme chaque élément et crée un nouveau tableau
const descriptions = penguins.slice(0, 3).map(p => 
    `${p.species} (${p.sex}) - ${p.body_mass_g}g`
);
console.log("• map() - Descriptions des 3 premiers:");
descriptions.forEach(desc => console.log("  ", desc));

/* IMPORTANT : noter ce code 
 * L'usage de `map` pour n'extraire qu'une propriété.
 * Et l'usage de `[...new Set()]` sur le résultat pour ne garder que les noms uniques
 * Cela servira pour le prochain TP
 */
const nomsEspeces = penguins.map(p => p.species);
console.log("• map() - Espèces uniques:", [...new Set(nomsEspeces)]);

// flatMap() - Applique une fonction puis aplatit d'un niveau
const caracteristiques = penguins.slice(0, 2).flatMap(p => 
    [p.species, p.island, p.sex]
);
console.log("• flatMap() - Caractéristiques aplaties:", caracteristiques);

// reduce() - Réduit le tableau à une seule valeur
const masseTotale = penguins.reduce((total, p) => 
    p.body_mass_g != null ? total + p.body_mass_g : total, 0
);
console.log("• reduce() - Masse totale:", masseTotale, "grammes");

const nbrParEspece = penguins.reduce((acc, p) => {
    acc[p.species] = (acc[p.species] || 0) + 1;
    return acc;
}, {} as Record<string, number>);
console.log("• reduce() - Comptage par espèce:", nbrParEspece);

// reduceRight() - Réduit de droite à gauche
const derniersNoms = penguins.slice(-3).reduceRight((acc, p) => 
    acc + p.species + " ", ""
);
console.log("• reduceRight() - 3 dernières espèces (inversées):", derniersNoms.trim());
console.log();

// ===== MÉTHODES DE TRI =====

console.log("--- MÉTHODES DE TRI ---");

// sort() - Trie les éléments (modifie le tableau original)
const massesCopie = penguins.slice(0, 5).map(p => p.body_mass_g).filter(m => m != null);
console.log("• sort() - Masses avant tri:", massesCopie);
massesCopie.sort((a, b) => a - b); // différence pour tri
console.log("• sort() - Masses après tri croissant:", massesCopie);

// Tri par espèce
const pingouinsParEspece = penguins.slice(0, 10).sort((a, b) => 
    a.species.localeCompare(b.species)
);
console.log("• sort() - 10 premiers triés par espèce:");
pingouinsParEspece.forEach(p => console.log(`  ${p.species} - ${p.island}`));
console.log();

// ===== MÉTHODES D'ITÉRATION =====

console.log("--- MÉTHODES D'ITÉRATION ---");

// forEach() - Exécute une fonction pour chaque élément
console.log("• forEach() - Affichage des 3 premiers pingouins:");
penguins.slice(0, 3).forEach((p, index) => {
    console.log(`  ${index + 1}. ${p.species} de ${p.island} (${p.body_mass_g}g)`);
});


// ===== MÉTHODES DE CONVERSION =====

console.log("--- MÉTHODES DE CONVERSION ---");

// join() - Joint tous les éléments en une chaîne
const premiersNoms = penguins.slice(0, 5).map(p => p.species);
console.log("• join() - Espèces séparées par ' | ':", premiersNoms.join(" | "));
console.log("• join() - Espèces séparées par des virgules:", premiersNoms.join(", "));

// toString() - Convertit en chaîne (équivalent à join(','))
console.log("• toString() - Premières masses:", penguins.slice(0, 3).map(p => p.body_mass_g).toString());
console.log();

// ===== MÉTHODES DE CONCATÉNATION =====

console.log("--- MÉTHODES DE CONCATÉNATION ---");

// concat() - Joint des tableaux
const adelies = penguins.filter(p => p.species === "Adelie").slice(0, 2);
const chinstraps = penguins.filter(p => p.species === "Chinstrap").slice(0, 2);
const melange = adelies.concat(chinstraps);
console.log("• concat() - Mélange Adelies + Chinstraps:");
melange.forEach(p => console.log(`  ${p.species} de ${p.island}`));
console.log();

// ===== MÉTHODES D'APLATISSEMENT =====

console.log("--- MÉTHODES D'APLATISSEMENT ---");

// flat() - Aplatit les tableaux imbriqués
const groupesParIle = [
    penguins.filter(p => p.island === "Torgersen").slice(0, 2).map(p => p.species),
    penguins.filter(p => p.island === "Biscoe").slice(0, 2).map(p => p.species),
    penguins.filter(p => p.island === "Dream").slice(0, 2).map(p => p.species)
];
console.log("• flat() - Groupes par île avant aplatissement:", groupesParIle);
console.log("• flat() - Après aplatissement:", groupesParIle.flat());
console.log();

// ===== STATISTIQUES FINALES =====

console.log("--- STATISTIQUES FINALES ---");

// Calculs statistiques utilisant différentes méthodes
const masses = penguins.map(p => p.body_mass_g).filter(m => m != null);
const masseTotaleCalc = masses.reduce((sum, mass) => sum + mass, 0);
const masseMoyenne = masseTotaleCalc / masses.length;
const masseMin = Math.min(...masses);
const masseMax = Math.max(...masses);

console.log("• Statistiques des masses:");
console.log(`  - Masse moyenne: ${masseMoyenne.toFixed(1)}g`);
console.log(`  - Masse minimale: ${masseMin}g`);
console.log(`  - Masse maximale: ${masseMax}g`);

// Répartition par île
const repartitionIles = penguins.reduce((acc, p) => {
    acc[p.island] = (acc[p.island] || 0) + 1;
    return acc;
}, {} as Record<string, number>);
console.log("• Répartition par île:", repartitionIles);

// Répartition par sexe
const repartitionSexe = penguins.reduce((acc, p) => {
    if (p.sex != null) {
        acc[p.sex] = (acc[p.sex] || 0) + 1;
    }
    return acc;
}, {} as Record<string, number>);
console.log("• Répartition par sexe:", repartitionSexe);

// =============================================
// GROUPEMENT DES DONNÉES AVEC Object.groupBy
// =============================================

console.log("\n--- GROUPEMENT AVEC Object.groupBy ---");

// Groupement par île
console.log("• Object.groupBy() - Répartition par île:");
const pingouinsParIle = Object.groupBy(penguins, pingouin => pingouin.island);
for (const [ile, pingouins] of Object.entries(pingouinsParIle)) {
    console.log(`  ${ile}: ${pingouins?.length || 0} pingouins`);
}


// Groupement par espèce et sexe combinés
console.log("\n• Object.groupBy() - Répartition par espèce et sexe:");
const pingouinsParEspeceEtSexe = Object.groupBy(penguins, pingouin => 
    `${pingouin.species} - ${pingouin.sex || 'inconnu'}`
);

// Groupement par sexe
console.log("\n• Object.groupBy() - Répartition par sexe:");
const pingouinsParSexe = Object.groupBy(penguins, pingouin => pingouin.sex ?? "inconnu");
for (const [sexe, pingouins] of Object.entries(pingouinsParSexe)) {
    console.log(`  ${sexe}: ${pingouins?.length || 0} pingouins`);
}

// Groupement par catégorie de masse (léger, moyen, lourd)
console.log("\n• Object.groupBy() - Répartition par catégorie de masse:");
const pingouinsParCategorieMasse = Object.groupBy(penguins, pingouin => {
    if (!pingouin.body_mass_g) return 'masse inconnue';
    if (pingouin.body_mass_g < 3500) return 'léger';
    if (pingouin.body_mass_g < 4500) return 'moyen';
    return 'lourd';
});

Object.entries(pingouinsParCategorieMasse)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([categorie, pingouins]) => {
        console.log(`  ${categorie}: ${pingouins?.length || 0} pingouins`);
    });


console.log("\n=== EXEMPLES DES METHODES ARRAY AVEC LES DONNEES CITYWAGES ===\n");
console.log(`Nombre total de zones metropolitaines: ${cityWages.length}\n`);

console.log("--- METHODES D'ACCES AUX ELEMENTS (CITYWAGES) ---");
console.log("- at() - Premiere zone:", cityWages.at(0)?.nyt_display);
console.log("- at() - Derniere zone:", cityWages.at(-1)?.nyt_display);
console.log();

console.log("- slice() - Trois premieres zones:");
console.log(cityWages.slice(0, 3).map(c => c.nyt_display + " (" + (c.state_display || "N/A") + ")"));
console.log();

console.log("--- METHODES DE RECHERCHE (CITYWAGES) ---");
const premiereMiseEnAvant = cityWages.find(c => c.highlight === 1);
console.log("- find() - Premiere ville mise en avant:", premiereMiseEnAvant?.nyt_display);
const indexSanFrancisco = cityWages.findIndex(c => c.Metro.includes("san francisco"));
console.log("- findIndex() - Position de San Francisco:", indexSanFrancisco);
const nomsVilles = cityWages.map(c => c.nyt_display);
console.log("- includes() - Seattle est-elle presente?", nomsVilles.includes("Seattle"));
console.log("- some() - Inegalite R90/10 2015 > 7?", cityWages.some(c => c.R90_10_2015 > 7));
console.log("- every() - Toutes ont une population 2015 renseignee?", cityWages.every(c => c.POP_2015 != null));
console.log();

console.log("--- METHODES DE FILTRAGE (CITYWAGES) ---");
const villesEnForteCroissance = cityWages.filter(c => c.POP_2015 - c.POP_1980 > 3000000);
console.log("- filter() - Croissance > 3M d'habitants:", villesEnForteCroissance.map(c => c.nyt_display));
const villesHighlight = cityWages.filter(c => c.highlight === 1);
console.log("- filter() - Villes highlight:", villesHighlight.map(c => c.nyt_display));
console.log();

console.log("--- METHODES DE TRANSFORMATION (CITYWAGES) ---");
const resumesCity = cityWages.slice(0, 5).map(c => c.nyt_display + ": " + (c.POP_2015 / 1_000_000).toFixed(1) + "M hab");
console.log("- map() - Resumes des 5 premieres:", resumesCity);
const etatsUniques = [...new Set(cityWages.map(c => c.state_display).filter(Boolean))];
console.log("- map() + Set - Etats representes:", etatsUniques.slice(0, 10));
console.log();

console.log("--- REDUCTIONS ET TRI (CITYWAGES) ---");
const populationTotale1980 = cityWages.reduce((total, c) => total + c.POP_1980, 0);
const populationTotale2015 = cityWages.reduce((total, c) => total + c.POP_2015, 0);
console.log("- reduce() - Population totale 1980:", populationTotale1980);
console.log("- reduce() - Population totale 2015:", populationTotale2015);
const topInegalite = cityWages.slice().sort((a, b) => b.R90_10_2015 - a.R90_10_2015).slice(0, 5);
console.log("- sort() - Top 5 R90/10 (2015):");
topInegalite.forEach((city, index) => {
    console.log("  " + (index + 1) + ". " + city.nyt_display + " (" + city.R90_10_2015 + ")");
});
console.log();

console.log("--- GROUPBY (CITYWAGES) ---");
const villesParEtat = Object.groupBy(cityWages, city => city.state_display || "Sans libelle");
Object.entries(villesParEtat)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 5)
    .forEach(([etat, villes]) => {
        const count = (villes?.length) || 0;
        console.log("  " + etat + ": " + count + " villes");
    });
console.log("- join() - 5 premieres villes:", cityWages.slice(0, 5).map(c => c.nyt_display).join(" | "));
console.log();

console.log("\n=== FIN DES EXEMPLES ===");

/* Bonus : experimenter ces methodes sur d'autres datasets : https://observablehq.com/@observablehq/sample-datasets */