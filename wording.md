## SITEMAP V2

### Changements clés vs. proposition initiale

| Modification | Justification |
| --- | --- |
| Ajout `/produit/multi-org` | Différenciateur fort pour cabinets et ETI — sous-exploité dans la v1 |
| `/solutions/cabinets-conseil` renommé `/solutions/cabinets` | URL plus courte, mémorisable |
| Ajout `/essai-gratuit/onboarding` | Page de succès post-inscription avec wizard guidé |
| Fusion `/securite` + RGPD en un seul hub | Évite la duplication, plus lisible pour les DSI/DPO |
| Ajout `/partenaires` | Canal prescripteur cabinets — objectif business clé identifié dans le plan de prospection |
| Retrait `/ressources/changelog` du nav principal | Accessible depuis le footer ou dans-app — n'aide pas la conversion |
| Ajout `/ressources/outils` | Calculateurs RSE gratuits = lead gen + SEO haute intention |

---

### Sitemap

```
yumni.fr/
│
├── /  ................................. Homepage
│
├── /produit .......................... Tour produit complet
│   ├── /produit/cockpit .............. Dashboard & Score RSE temps réel
│   ├── /produit/kpis ................. KPIs & Alertes automatiques
│   ├── /produit/wsjf ................. Priorisation WSJF
│   ├── /produit/risques .............. Matrice des risques
│   ├── /produit/reporting ............ Rapport COMEX 1 clic (PPTX)
│   ├── /produit/esrs ................. Conformité ESRS / CSRD
│   ├── /produit/collaboration ........ Kanban, Calendrier, Commentaires
│   └── /produit/multi-org ............ Multi-tenant (cabinets & groupes)
│
├── /solutions ........................ Solutions par cible
│   ├── /solutions/cabinets ........... Cabinets de conseil RSE
│   ├── /solutions/pme ................ PME primo-reporters CSRD
│   └── /solutions/eti ................ ETI & Groupes multi-entités
│
├── /tarifs ........................... Pricing (Freemium → Pro → Enterprise)
│
├── /demo ............................. Démo vidéo + formulaire qualification
├── /essai-gratuit .................... Inscription Freemium (< 60 sec)
│   └── /essai-gratuit/bienvenue ...... Onboarding wizard post-inscription
│
├── /partenaires ...................... Programme prescripteurs cabinets
│
├── /ressources ....................... Hub ressources (SEO + nurturing)
│   ├── /ressources/blog .............. Articles RSE, CSRD, ESRS
│   ├── /ressources/guides ............ Guides téléchargeables (lead gen)
│   ├── /ressources/outils ............ Calculateurs gratuits (ROI, ESRS gap)
│   ├── /ressources/glossaire ......... Glossaire RSE / ESG / CSRD
│   └── /ressources/webinars .......... Webinars & Replays
│
├── /contact .......................... Contact commercial
├── /a-propos ......................... L'entreprise, mission, équipe
│
├── /securite ......................... Sécurité, RGPD, hébergement France
└── /mentions-legales ................. CGU, CGV, Politique cookies
```

---

## RÉDACTIONS PAR PAGE

---

### 1. `/` — HOMEPAGE

---

### Section Hero

**Titre H1**

> Pilotez votre stratégie RSE. En temps réel.
> 

**Sous-titre**

> Du cockpit stratégique au rapport COMEX — en 12 secondes.
Yumni centralise vos axes, objectifs, KPIs et risques RSE dans une plateforme simple, conforme CSRD, hébergée en France.
> 

**CTA primaire** : `Commencer gratuitement — sans carte bancaire`

**CTA secondaire** : `Voir la démo (3 min)`

*Visuel* : Animation autoplay du dashboard — score RSE, alertes, heatmap KPIs, génération du rapport PPTX en fin.

---

### Section Barre de confiance

> Hébergé en France 🇫🇷 par Scaleway · CSRD Ready · 12 standards ESRS couverts · RGPD by design · MFA inclus
> 

*(Remplacer par logos clients dès qu'ils sont disponibles)*

---

### Section Le Problème (3 colonnes)

**Colonne 1 — Le temps**

> **"3 jours pour compiler un reporting RSE."**
Vos équipes cherchent, agrègent, formulent. Pour un rapport trimestriel qui sera obsolète à la prochaine réunion.
> 

**Colonne 2 — L'aveugle**

> **"Vous apprenez qu'un KPI dérape — au COMEX."**
Sans alertes automatiques, les mauvaises nouvelles arrivent trop tard pour agir.
> 

**Colonne 3 — L'arbitraire**

> **"15 initiatives. Budget pour 5. Décision au feeling."**
Sans méthode de priorisation objective, les projets RSE les plus visibles gagnent — pas les plus impactants.
> 

---

### Section Démo produit (narrative)

**Titre** : *Trois clics. Du signal à l'action.*

**Étape 1** : Dashboard → 2 risques critiques remontent automatiquement
**Étape 2** : Drill-down → identification de l'action corrective
**Étape 3** : Rapport COMEX généré en 12 secondes

*Visuel* : Screencapture animée du parcours seed directrice RSE (GreenTech Industries)

---

### Section 6 Piliers produit

| Icône | Titre | Accroche | Lien |
| --- | --- | --- | --- |
| 📊 | Cockpit RSE temps réel | Votre score RSE, vos alertes, vos axes — en un écran | `/produit/cockpit` |
| 📈 | KPIs & Alertes automatiques | 40+ KPIs. Zéro surprise. | `/produit/kpis` |
| ⚡ | Priorisation WSJF | Les données décident. Pas la politique. | `/produit/wsjf` |
| 🛡️ | Gestion des risques | Chaque risque tracé. Chaque auditeur satisfait. | `/produit/risques` |
| 📄 | Rapport COMEX 1 clic | 3 jours → 12 secondes. | `/produit/reporting` |
| ✅ | Conformité ESRS / CSRD | Conforme par design. Pas par rattrapage. | `/produit/esrs` |

---

### Section Chiffres clés (counter animé)

- **12 secondes** — temps de génération d'un rapport COMEX
- **40 jours/an** — récupérés sur les tâches de reporting
- **12 standards ESRS** — couverts nativement
- **4 niveaux** — de pilotage (Axes → Objectifs → Projets → Actions)

---

### Section Par cible

**Pour Cabinets RSE**

> Multipliez vos clients sans multiplier vos effectifs.
[Découvrir →](https://www.notion.so/solutions/cabinets)
> 

**Pour PME**

> Pilotez votre RSE sans embaucher un responsable RSE.
[Découvrir →](https://www.notion.so/solutions/pme)
> 

**Pour ETI & Groupes**

> Un cockpit groupe. Chaque filiale, chaque KPI.
[Découvrir →](https://www.notion.so/solutions/eti)
> 

---

### Section Témoignage / Social proof

*(Placeholder — à remplacer par témoignage early adopter)*

> *"Avant Yumni, notre reporting trimestriel mobilisait 3 personnes pendant 4 jours. Maintenant, le rapport COMEX est généré automatiquement. Notre Direction RSE se concentre enfin sur ce qui compte : décider."*
— [Prénom NOM], Directeur RSE, [Entreprise]
> 

---

### Section CTA finale

**Titre** : *Prêt à piloter votre RSE comme un pro ?*

**CTA primaire** : `Essayer gratuitement`**CTA secondaire** : `Demander une démo`

---

### 2. `/produit` — VUE D'ENSEMBLE PRODUIT

---

**Titre H1**

> Une plateforme. Tout votre pilotage RSE.
> 

**Sous-titre**

> Yumni couvre l'intégralité du cycle de vie RSE : de la définition des axes stratégiques à la génération automatique du rapport COMEX, en passant par le suivi des KPIs, la gestion des risques et la conformité ESRS.
> 

**Schéma hiérarchique**

> Axes stratégiques → Objectifs SMART → Projets RSE → Actions terrain → KPIs & Jalons
> 

---

**Bloc features alternés gauche/droite :**

**① Cockpit Dashboard**

> Votre score RSE global, vos alertes en temps réel, vos axes au vert ou en danger — en un seul écran. Percez jusqu'au détail de chaque action en 3 clics.
> 

**② KPIs & Alertes**

> 40+ indicateurs préconfigurés. Heatmap d'évolution. Alertes automatiques dès qu'un KPI décroche. Fini les mauvaises surprises en COMEX.
> 

**③ Priorisation WSJF**

> Une méthode éprouvée (Weighted Shortest Job First) adaptée à la RSE. Chaque initiative scorée objectivement. Du funnel d'idées au projet validé en quelques clics.
> 

**④ Matrice des risques**

> Visualisation Impact × Probabilité. Chaque risque lié à ses actions de mitigation, son responsable, sa deadline. Une chaîne de traçabilité complète pour vos auditeurs.
> 

**⑤ Rapport COMEX**

> Sélectionnez vos sections, appliquez votre branding, générez. 12 secondes. Format PowerPoint natif, compatible Office.
> 

**⑥ Conformité ESRS**

> Mapping automatique de vos initiatives sur les 12 standards ESRS. Gap analysis instantanée. Double matérialité intégrée.
> 

**⑦ Collaboration**

> Kanban drag-and-drop. Calendrier RSE. Commentaires avec @mentions. Notifications. Tout le travail dans un seul endroit.
> 

**⑧ Multi-organisation**

> 1 compte. N organisations. Gestion multi-clients pour les cabinets, multi-filiales pour les groupes. Données isolées. Vue consolidée.
> 


**La roadmap produit**
Fondations -> Collaboration & Contrôle : Espace d’échanges centralisé : commentaires visibles, pièces jointes organisées et accès contrôlé via RBAC pour une collaboration fluide et sécurisée.
Structuration -> Double Matérialité Optimisée: Paramétrez seuils, visualisez la chaîne de valeur et lancez des campagnes structurées pour gérer vos impacts RSE avec précision et conformité ESRS.
Optimisation -> : Pilotage Stratégique RSE : Nouveaux dashboards interactifs avec alertes proactives, KPI liés aux enjeux doublement matériels et suivi automatisé pour décisions RSE rapides et concrètes.
Optimisation v2 -> Workflow Actionnable : Connectez matérialité, actions et KPIs dans un workflow intelligent : suivi Kanban, pré-remplissage et couverture complète pour une stratégie RSE maîtrisée.
Intelligence -> IA & Benchmark : Exploitez l’IA et les benchmarks sectoriels anonymisés pour guider vos décisions, accélérer l’analyse et positionner votre entreprise en leader RSE.
Reporting & Transparence -> Génération de rapports CSRD, traçabilité totale et partage public RSE pour crédibilité maximale, audit simplifié et communication stratégique forte.
---

### 2.1 `/produit/cockpit` — Dashboard & Pilotage

**Titre H1**

> Votre score RSE en un coup d'œil.
> 

**Sous-titre**

> Yumni agrège en temps réel l'ensemble de vos axes, objectifs, projets et KPIs dans un cockpit unifié. Du tableau de bord stratégique au drill-down opérationnel en 3 clics.
> 

**Problème → Solution**

> **Avant** : Fichiers Excel disséminés. Données périmées. Réunions de consolidation hebdomadaires.
**Avec Yumni** : Un score RSE global calculé automatiquement. Des alertes qui remontent avant que le problème ne s'aggrave. Un drill-down en 3 clics de l'axe à l'action.
> 

**Fonctionnalités clés**

- Score RSE global pondéré par axe
- Alertes automatiques sur KPIs, actions en retard, risques critiques
- Suivi budget prévu vs. réel par axe et par projet
- Progression visuelle (barres, sparklines, statuts colorés)
- Drill-down : Axe → Objectif → Projet → Action en 3 clics
- Vue "mes actions" personnalisée pour chaque collaborateur

**Démo narrative**

> Sophie Lefebvre, Directrice RSE de GreenTech Industries (1 200 salariés), ouvre Yumni le lundi matin. En 10 secondes : 2 risques critiques remontent (non-conformité CSRD, accident récidive), le KPI CO2 est en retard de trajectoire, et 4 actions sont en souffrance. Elle sait exactement où agir avant même sa première réunion.
> 

**CTA** : `Essayer le cockpit → Commencer gratuitement` · `Voir la démo live`

---

### 2.2 `/produit/kpis` — KPIs & Alertes automatiques

**Titre H1**

> 40+ KPIs. Zéro surprise.
> 

**Sous-titre**

> Configurez vos indicateurs RSE une fois. Suivez leur évolution en temps réel. Recevez une alerte dès qu'un KPI décroche — avant que ça devienne un problème au COMEX.
> 

**La douleur**

> *"Votre KPI CO2 a dérapé il y a 6 semaines. Vous le découvrez aujourd'hui, à 3 jours du COMEX."*
Sans système d'alerte, vous gérez les crises après coup — pas avant.
> 

**Fonctionnalités clés**

- Bibliothèque de 40+ KPIs RSE préconfigurés (environnement, social, gouvernance)
- Heatmap de progression : vert / orange / rouge en un coup d'œil
- Sparklines d'évolution temporelle par indicateur
- Alertes automatiques par email ou notification in-app (seuils personnalisables)
- Saisie collaborative : chaque responsable renseigne ses KPIs dans la plateforme
- Historique trimestriel avec comparaison année N-1
- Export CSV / intégration dans le rapport COMEX automatique

**Exemples de KPIs inclus**

- tCO2eq Scope 1+2 · % électricité renouvelable · Déchets industriels (tonnes)
- Taux de fréquence accidents (TF1) · Turn-over · Score QVT · Index Égalité F/H
- % fournisseurs évalués ESG · % managers formés éthique · Couverture ESRS (%)

**Scénario réel**

> GreenTech Normandie : le TF1 accidents régresse de 0,8 à 1,2 en Q4. L'alerte remonte automatiquement. Sophie est notifiée 72h avant la revue groupe. Une action corrective est créée et assignée dans la même interface.
> 

**CTA** : `Voir les KPIs en action` · `Commencer gratuitement`

---

### 2.3 `/produit/wsjf` — Priorisation WSJF

**Titre H1**

> 15 initiatives. Budget pour 5. Laissez les données décider.
> 

**Sous-titre**

> Yumni intègre la méthode WSJF (Weighted Shortest Job First) adaptée à la RSE. Fini les arbitrages politiques : chaque initiative est scorée objectivement. Les meilleures remontent. Toujours.
> 

**Avant / Après**

> **Avant** : Réunion de 3h. 5 personnes. Décision influencée par le manager le plus vocal.
**Avec Yumni** : Score calculé automatiquement. Pipeline visuel. Consensus basé sur les données.
> 

**Comment ça marche**

```
Score WSJF = (Valeur Business + Urgence Temporelle + Réduction de Risque) ÷ Effort
```

- Valeur Business (1–20) : Quel est l'impact RSE réel de cette initiative ?
- Urgence Temporelle (1–20) : Y a-t-il une contrainte réglementaire ou calendaire ?
- Réduction de Risque (1–20) : Cela couvre-t-il un risque identifié dans la matrice ?
- Effort (1–20) : Quelle est la charge estimée pour cette initiative ?

**Le pipeline d'idées**

> Inbox → Vote collectif → Évaluation WSJF → Ready → Converti en Projet RSE
> 

**Cas réel**

> GreenTech Industries dispose de 10 idées en pipeline. "Installation bornes de recharge" score 4.13 (31 votes), "Compensation carbone" score 6.67 mais fait débat. Sophie valide "Installation bornes" en un clic → le projet est créé automatiquement dans le cockpit, avec axe et objectif pré-assignés.
> 

**CTA** : `Tester la priorisation WSJF` · `Voir la démo`

---

### 2.4 `/produit/risques` — Gestion des Risques

**Titre H1**

> Chaque risque tracé. Chaque action liée. Chaque auditeur satisfait.
> 

**Sous-titre**

> Yumni centralise vos risques RSE dans une matrice Impact × Probabilité. Chaque risque est relié à ses actions de mitigation, son responsable et sa deadline. La traçabilité complète pour vos audits CSRD.
> 

**Fonctionnalités clés**

- Matrice 5×5 Impact × Probabilité avec code couleur (vert → rouge critique)
- 4 catégories : Légal / Opérationnel / Réputationnel / Financier / Stratégique
- Chaque risque → actions de mitigation liées → responsables → deadlines
- Chaîne d'audit complète : qui a fait quoi, quand, avec quel résultat
- Alertes automatiques sur les risques critiques
- Export pour rapports COMEX et audits CSRD

**Scénario réel**

> GreenTech : 2 risques critiques en Q1 — "Non-conformité CSRD" (legal, probabilité haute) et "Récidive accident grave" (opérationnel, sévérité critique). Yumni les remonte automatiquement dans le dashboard. Sophie escalade via la plateforme, assigne une action corrective et fixe une deadline. Tout est tracé.
> 

**CTA** : `Voir la matrice des risques` · `Demander une démo`

---

### 2.5 `/produit/reporting` — Rapport COMEX 1 clic

**Titre H1**

> 3 jours de reporting → 12 secondes.
> 

**Sous-titre**

> Yumni génère automatiquement votre rapport COMEX en PowerPoint natif. Données en temps réel. Branding personnalisé. Sections au choix. Export immédiat.
> 

**Timer visuel**

| Méthode | Temps | Ressources |
| --- | --- | --- |
| Excel + PowerPoint manuel | ~3 jours | 2-3 personnes |
| Yumni 1 clic | **12 secondes** | 0 personnes |

**Contenu du rapport généré**

- Score RSE global + évolution
- Synthèse par axe stratégique (Env / Social / Gouv)
- KPIs clés avec sparklines et alertes
- État d'avancement des projets (budgets, % completion)
- Risques critiques et actions de mitigation
- Pipeline WSJF et prochaines décisions
- Mapping ESRS et couverture des standards

**Personnalisation**

- Logo et charte graphique de votre entreprise
- Sélection des sections à inclure
- Planification automatique (hebdomadaire, mensuel, trimestriel)
- Génération multi-organisation pour les cabinets

**ROI**

> *"40 jours/an libérés par équipe RSE. Soit environ 15 000 € récupérés par ETP — réinvestis dans des actions à impact réel."*
> 

**CTA** : `Générer un rapport de démo` · `Commencer gratuitement`

---

### 2.6 `/produit/esrs` — Conformité ESRS / CSRD

**Titre H1**

> Conformité CSRD par design. Pas par rattrapage.
> 

**Sous-titre**

> Yumni mappe automatiquement vos initiatives RSE sur les 12 standards ESRS. Gap analysis instantanée. Double matérialité intégrée. Vous savez en permanence où vous en êtes.
> 

**Contexte réglementaire**

> **La CSRD concerne :**
> 
> - Dès 2024 : grandes entreprises (+500 salariés)
> - Dès 2025 : entreprises +250 salariés ou +40M€ de CA
> - Dès 2026 : PME cotées
> 
> **12 standards ESRS** couvrent : Environnement (E1-E5), Social (S1-S4), Gouvernance (G1) + standards transversaux (ESRS 1 & 2).
> 

**Ce que Yumni fait**

- Mapping automatique : vos projets et objectifs → standards ESRS associés
- Gap analysis : standards non couverts identifiés instantanément
- Double matérialité intégrée (impact financier + impact sur l'environnement et la société)
- Rapport ESRS exportable pour vos auditeurs
- Mise à jour au fil des évolutions réglementaires

**Scénario réel**

> GreenTech Industries prépare son premier rapport CSRD. Sophie ouvre la vue ESRS : 8 standards sur 12 sont couverts par les projets en cours. ESRS S2 (Travailleurs de la chaîne de valeur) n'est pas adressé. Une initiative est créée depuis ce constat, scorée en WSJF et priorisée.
> 

**CTA** : `Évaluer ma couverture ESRS` · `Demander une démo CSRD`

---

### 2.7 `/produit/collaboration` — Kanban, Calendrier, Commentaires

**Titre H1**

> Fini les 47 threads email. Travaillez dans la plateforme.
> 

**Sous-titre**

> Yumni centralise la coordination de vos équipes RSE : kanban d'actions, calendrier des jalons, commentaires avec @mentions, notifications. Tout le travail au même endroit.
> 

**Fonctionnalités**

- Kanban drag-and-drop sur vos actions RSE (À faire / En cours / Terminé)
- Calendrier RSE : visualisation des jalons, deadlines, événements réglementaires
- Commentaires et @mentions sur chaque projet, action ou risque
- Notifications in-app et email (assignation, deadline proche, commentaire)
- Pièces jointes par action
- Journal d'activité (audit trail complet)

**Scénario réel**

> Antoine Moreau commente sur l'action "Collecte données CSRD" : *"Données Caen toujours manquantes — relancé Fabrice 3 fois."* Sophie répond dans le fil : *"Je l'appelle directement."* L'échange est tracé, horodaté, lié à l'action. Aucun email, aucune réunion supplémentaire.
> 

**CTA** : `Commencer gratuitement` · `Voir toutes les fonctionnalités`

---

### 2.8 `/produit/multi-org` — Multi-organisation

**Titre H1**

> 1 compte. Autant d'organisations que vous voulez.
> 

**Sous-titre**

> Cabinets RSE : gérez chacun de vos clients dans un espace isolé, depuis un seul login. ETI : consolidez groupe et filiales dans un cockpit unifié. Les données de chacun restent les siennes.
> 

**Architecture**

```
Compte Yumni
├── Client A / Filiale A (données isolées)
├── Client B / Filiale B (données isolées)
├── Client C / Filiale C (données isolées)
└── Vue consolidée (admin cabinet / direction groupe)
```

**Pour les cabinets RSE**

- Onboardez un nouveau client en < 5 minutes avec les templates pré-configurés
- Chaque client accède uniquement à son espace
- Vous avez une vue transversale de tous vos clients
- Générez les rapports de tous vos clients depuis le même dashboard
- Yumni devient l'outil que vous proposez à vos clients — vous passez de prestataire à partenaire technologique

**Pour les ETI & Groupes**

- Multi-filiales avec permissions par entité (RBAC 4 niveaux)
- Dashboard groupe consolidé en temps réel
- Rapport COMEX groupe généré en 1 clic
- Isolation des données par entité juridique (RLS PostgreSQL)

**CTA** : `Voir l'offre Cabinets →` · `Voir l'offre ETI →`

---

### 3. `/solutions/cabinets` — Pour Cabinets de Conseil RSE

**Titre H1**

> Multipliez l'impact de votre cabinet. Sans multiplier vos effectifs.
> 

**Sous-titre**

> Yumni est la plateforme de pilotage RSE que vous proposez à vos clients. Vous gardez le conseil et la relation. On fournit l'outil. Vos clients pilotent en autonomie — vous restez indispensables.
> 

**Les 4 douleurs que vous reconnaissez**

**① Reporting client chronophage**

> Vous compilez des données éparpillées dans des Excel clients toutes les semaines. Avec Yumni : rapport automatique en 12 secondes, brandé aux couleurs de votre cabinet si vous le souhaitez.
> 

**② Pas de vue consolidée multi-clients**

> Vous jongler entre 12 clients, 12 fichiers, 12 outils différents. Avec Yumni : un seul login, une vue consolidée, des données toujours à jour.
> 

**③ Méthode non outillée**

> Votre expertise WSJF / pilotage RSE reste dans des slides. Avec Yumni : la méthode est intégrée dans l'outil. Vos clients la vivent, pas seulement la lisent.
> 

**④ Audit CSRD fastidieux**

> La préparation ESRS prend des semaines. Avec Yumni : mapping automatique, gap analysis instantanée, rapport auditeur en un clic.
> 

**Bénéfices chiffrés**

- 1 rapport client = 12 secondes vs. 2 jours de compilation
- Couverture ESRS visible en 1 écran → moins d'heures facturées sur l'analyse
- WSJF = méthodologie différenciante vendable à vos clients (et déjà dans l'outil)
- Onboarding nouveau client < 5 minutes avec templates pré-configurés

**L'argument clé**

> *"Yumni devient l'outil de pilotage que vous proposez à vos clients. Vous passez de consultant ponctuel à partenaire technologique continu. La valeur perçue augmente. La dépendance à vos livrables aussi."*
> 

**Programme partenaire**

> Accès gratuit à la plateforme pour votre cabinet. Tarif préférentiel pour vos clients. Badge "Partenaire Yumni Certifié".
[Voir le programme partenaire →](https://www.notion.so/partenaires)
> 

**CTA primaire** : `Demander une démo cabinet`**CTA secondaire** : `Voir le programme partenaire`

---

### 4. `/solutions/pme` — Pour PME

**Titre H1**

> Votre RSE structurée. Sans embaucher un responsable RSE.
> 

**Sous-titre**

> La CSRD vous oblige à reporter. Vous n'avez pas d'équipe dédiée, pas de consultant à plein temps, et Excel atteint ses limites. Yumni est fait pour vous.
> 

**Les 4 douleurs que vous reconnaissez**

**① Pas de budget pour un cabinet**

> Un cabinet RSE coûte entre 800 et 1 500 € / jour. Yumni Freemium : gratuit. Toutes les features core incluses.
> 

**② Pas d'expertise RSE interne**

> Vous ne savez pas par où commencer. Yumni propose des templates préconfigurés pour votre secteur : axes stratégiques, objectifs types, KPIs recommandés. Prêt en 2 minutes.
> 

**③ La peur de l'audit CSRD**

> Les 12 standards ESRS vous semblent abstraits. Yumni les rend concrets : chaque action que vous menez est automatiquement liée aux standards qu'elle couvre. Vous voyez vos gaps en un écran.
> 

**④ Excel = impasse à mesure que vous grandissez**

> Yumni remplace vos fichiers dès aujourd'hui et évolue avec vous. Le Freemium suffit pour démarrer. Le Pro prend le relais si votre périmètre s'élargit.
> 

**Le parcours simplifié**

```
Inscription gratuite (60 sec)
  → Template PME chargé automatiquement
    → Vos premiers KPIs configurés
      → Premier rapport COMEX généré
        → Couverture ESRS évaluée
          → Prêt pour votre premier audit CSRD
```

**Prix mis en avant**

> Gratuit pour démarrer. Moins cher qu'une journée de conseil pour piloter.
> 

**CTA principal** : `Commencer gratuitement — sans carte bancaire`

---

### 5. `/solutions/eti` — Pour ETI & Groupes

**Titre H1**

> Pilotez la RSE de votre groupe. Chaque filiale, chaque KPI, un seul cockpit.
> 

**Sous-titre**

> Multi-sites, multi-filiales, multi-réglementations. Yumni consolide tout en temps réel, sécurise l'accès par entité, et génère votre rapport groupe en 1 clic.
> 

**Les 4 douleurs que vous reconnaissez**

**① Consolidation multi-filiales impossible**

> Chaque filiale a ses propres fichiers. La consolidation groupe prend 2 semaines. Avec Yumni : chaque entité saisit dans son espace, le groupe consolide en temps réel.
> 

**② RBAC insuffisant**

> Vous ne pouvez pas donner accès à la filiale de Caen sans exposer les données de Strasbourg. Yumni : 4 niveaux de permissions (Owner, Admin, Manager, Viewer), isolation par organisation via RLS PostgreSQL.
> 

**③ Reporting groupe = tunnel de 2 semaines**

> Avec Yumni : rapport groupe consolidé en 1 clic. Chaque filiale, chaque axe, chaque KPI. Format PowerPoint natif.
> 

**④ Sécurité et conformité non négociables**

> Yumni : MFA/2FA natif, JWT + refresh tokens, rate limiting, hébergement Scaleway France (fr-par), RGPD by design, chiffrement TLS 1.3 en transit / AES-256 at rest.
> 

**Architecture multi-entités**

```
Direction Groupe RSE
├── Filiale A — GreenTech Normandie (Caen)
│   └── Accès limité aux données Normandie
├── Filiale B — GreenTech Est (Strasbourg)
│   └── Accès limité aux données Est
└── Dashboard consolidé groupe (Direction uniquement)
```

**Sécurité & Conformité**

- RBAC 4 niveaux avec permissions granulaires
- MFA/2FA pour tous les comptes
- Hébergement Scaleway, data center France (fr-par)
- RGPD by design — droit d'accès, rectification, suppression intégrés
- Isolation des données par RLS PostgreSQL
- Certifications visées : SOC 2 Type II, ISO 27001

**CTA primaire** : `Demander une démo groupe`**CTA secondaire** : `Contacter notre équipe entreprise`

---

### 6. `/tarifs` — PRICING

**Titre H1**

> Commencez gratuitement. Évoluez sans contrainte.
> 

**Sous-titre**

> Un Freemium complet pour démarrer aujourd'hui. Des offres Pro et Enterprise pour grandir à votre rythme.
> 

---

### Tableau des plans

|  | **Freemium** | **Pro** | **Enterprise** |
| --- | --- | --- | --- |
| **Public** | PME, découverte | PME matures, Cabinets | ETI, Groupes |
| **Prix** | **Gratuit** | **Sur devis** | **Sur mesure** |
| Organisations | 1 | Illimitées | Illimitées + multi-tenant |
| Utilisateurs | 5 | Illimités | Illimités |
| Projets | 20 | Illimités | Illimités |
| Axes & Objectifs | ✅ | ✅ | ✅ |
| KPIs & Alertes | ✅ | ✅ | ✅ |
| Priorisation WSJF | ✅ | ✅ | ✅ |
| Matrice des risques | ✅ | ✅ | ✅ |
| Rapport COMEX PPTX | ✅ (3/mois) | ✅ Illimité + planification | ✅ + branding avancé |
| Mapping ESRS | ✅ | ✅ | ✅ |
| Kanban & Calendrier | ✅ | ✅ | ✅ |
| Multi-organisation | — | ✅ | ✅ Groupe consolidé |
| API | — | ✅ | ✅ + webhooks |
| SSO / SAML | — | — | ✅ Roadmap |
| Support | Email | Prioritaire | Account manager dédié |
| Hébergement | France 🇫🇷 | France 🇫🇷 | France 🇫🇷 + on-premise option |
| **CTA** | `Commencer maintenant` | `Demander un devis` | `Contacter les ventes` |

---

### Calculateur ROI

> *Combien de temps passez-vous sur le reporting RSE chaque mois ?*
> 

**Slider** : X jours/mois × Y ETP × Coût journalier = **Économie annuelle avec Yumni**

*Exemple : 5 jours/mois × 1 ETP × 450 €/j = 27 000 €/an récupérés*

---

### Garanties

> **Pas de carte bancaire requise pour le FreemiumPas d'engagement** — changez de plan quand vous voulez
**Vos données vous appartiennent** — export complet à tout moment
**Hébergement souverain** — France, Scaleway, RGPD by design
> 

---

### FAQ Pricing

**Puis-je passer du Freemium au Pro à tout moment ?**

> Oui. La migration est immédiate. Vos données sont conservées intégralement.
> 

**Le Freemium inclut-il toutes les features ?**

> Oui, toutes les features core sont disponibles. Les limites portent sur le volume (5 users, 20 projets, 3 rapports/mois) et certaines fonctionnalités avancées (API, multi-org illimitée).
> 

**Comment fonctionne la tarification Pro ?**

> Le Pro est sur devis en fonction de votre taille, nombre d'utilisateurs et besoins. Contactez-nous pour un chiffrage personnalisé.
> 

**Y a-t-il un engagement de durée ?**

> Non. L'offre Freemium est gratuite sans engagement. Les offres Pro et Enterprise peuvent être mensuelles ou annuelles (remise annuelle disponible).
> 

**Mes données sont-elles sécurisées ?**

> Vos données sont hébergées en France sur l'infrastructure Scaleway (fr-par), chiffrées en transit (TLS 1.3) et au repos (AES-256). MFA inclus sur tous les plans.
> 

**Puis-je importer mes données existantes ?**

> Oui. Yumni propose un import CSV pour vos projets, KPIs et actions. Notre équipe peut vous accompagner pour les migrations complexes (offre Enterprise).
> 

---

### 7. `/demo` — PAGE DÉMO

**Titre H1**

> Voyez Yumni en action — en 3 minutes.
> 

**Sous-titre**

> Du cockpit stratégique au rapport COMEX : découvrez comment GreenTech Industries pilote sa RSE avec Yumni.
> 

**Layout : 2 colonnes**

**Colonne gauche — Vidéo démo**

> Vidéo 3–5 min avec chapitres :
> 
> - 0:00 — Le dashboard cockpit (score RSE, alertes)
> - 0:45 — KPIs et heatmap d'évolution
> - 1:30 — La matrice des risques (2 risques critiques)
> - 2:15 — Le pipeline WSJF (priorisation en direct)
> - 3:00 — Génération du rapport COMEX en 12 secondes

**Colonne droite — Formulaire qualification**

```
Prénom *
Email professionnel *
Entreprise *
Taille de l'entreprise : [PME <250] [ETI 250-5000] [Cabinet RSE] [Groupe +5000]
Principal défi RSE : [Reporting CSRD] [Pilotage KPIs] [Priorisation initiatives]
                    [Gestion des risques] [Conformité ESRS] [Autre]
Message (optionnel)

[ Voir la démo personnalisée →]
```

**Post-submit**

> Page de confirmation + Calendly pour réserver une démo live 30 min avec l'équipe Yumni.
> 

**Trust badges**

> ✅ Démo sans engagement · ✅ Données non partagées · ✅ Réponse sous 24h ouvrées
> 

---

### 8. `/essai-gratuit` — INSCRIPTION FREEMIUM

**Titre H1**

> Prêt en 2 minutes. Gratuit. Sans carte bancaire.
> 

**Sous-titre**

> Créez votre compte et commencez à piloter votre RSE aujourd'hui.
> 

**Formulaire**

```
Email professionnel *
Mot de passe *
Nom de l'entreprise *
[Créer mon compte →]
```

> Ou continuer avec [Google] [Microsoft]
> 

**Réassurance (3 colonnes)**

| ✅ | ✅ | ✅ |
| --- | --- | --- |
| Gratuit · sans carte bancaire | Hébergé en France 🇫🇷 | Prêt en 2 minutes |

**Social proof**

> *"Rejoignez les [XX] entreprises qui pilotent déjà leur RSE avec Yumni."*
> 

**Préview post-inscription**

> Screenshot animé de l'onboarding wizard : choix du template → dashboard pré-rempli
> 

---

### 8.1 `/essai-gratuit/bienvenue` — ONBOARDING POST-INSCRIPTION

**Wizard en 3 étapes**

**Étape 1 — Votre profil**

> *"Comment utilisez-vous Yumni ?"*
> 
> - PME — je pilote ma propre RSE
> - Cabinet — je gère plusieurs clients
> - ETI/Groupe — j'ai plusieurs entités à consolider

**Étape 2 — Template**

> *"Choisissez un point de départ"*
> 
> - Template PME CSRD (axes Environnement / Social / Gouvernance + 12 KPIs de base)
> - Template Cabinet (structure vide multi-clients)
> - Template ETI (multi-org avec consolidation)
> - Partir de zéro

**Étape 3 — Première action**

> *"Votre dashboard est prêt. Par où commencer ?"*
> 
> - Configurer mes premiers KPIs
> - Ajouter mes projets RSE en cours
> - Explorer le cockpit
> - Inviter mon équipe (jusqu'à 5 utilisateurs en Freemium)

---

### 9. `/partenaires` — PROGRAMME PRESCRIPTEURS

**Titre H1**

> Devenez partenaire Yumni. Outillez vos clients. Renforcez votre valeur.
> 

**Sous-titre**

> Cabinets RSE, consultants indépendants, agences spécialisées : Yumni vous propose un partenariat prescripteur. Vous conservez le conseil et la relation client. Nous fournissons la plateforme.
> 

**Le modèle partenaire**

```
Vous                          Vos clients
─────────────────────────────────────────
Expertise RSE / CSRD     →   Conseil stratégique
Yumni (multi-org)        →   Plateforme de pilotage
Accès gratuit cabinet    →   Tarif partenaire négocié
```

**Ce que vous obtenez**

- Accès gratuit à la plateforme pour votre cabinet (toutes features)
- Tarif préférentiel pour vos clients
- Badge "Partenaire Yumni Certifié" (différenciateur commercial)
- Matériaux de vente co-brandés (slides, one-pager)
- Formation produit incluse
- Support prioritaire

**Ce qu'on attend de vous**

- Prescription active auprès de vos clients
- Feedback produit régulier (vous êtes nos meilleurs testeurs)
- (Optionnel) Témoignage ou cas client co-publié


**CTA** : `Candidater au programme partenaire` → formulaire : Nom, Cabinet, nb clients RSE accompagnés, message

---

### 10. `/contact` — CONTACT COMMERCIAL

**Titre H1**

> Parlons de votre projet RSE.
> 

**Sous-titre**

> Notre équipe répond sous 24h ouvrées. Démo, devis, partenariat, presse — un seul formulaire.
> 

**Formulaire**

```
Nom *
Email professionnel *
Téléphone (optionnel)
Entreprise *
Type de demande : [Démo produit] [Devis Pro/Enterprise] [Programme partenaire] [Support] [Presse]
Message *

[Envoyer →]
```

**Informations de contact**

> 📧 [contact@yumni.fr](mailto:contact@yumni.fr)
💼 [LinkedIn Yumni](https://www.notion.so/Sitemap-NZA-330f56fb16e4809492b2c8ef9c2f0cc7?pvs=21)
🇫🇷 France — équipe disponible en horaires européens
> 

**Temps de réponse**

> Réponse garantie sous 24h ouvrées pour les demandes commerciales.
> 

---

### 11. `/ressources/blog` — BLOG RSE / CSRD

**Titre H1**

> Ressources RSE : comprendre, piloter, reporter.
> 

**Sous-titre**

> Articles pratiques sur la CSRD, les ESRS, le pilotage RSE et les meilleures pratiques pour les PME, ETI et cabinets de conseil.
> 

---

**Catégories & Articles prioritaires**

**CSRD & Réglementation**

- *"CSRD 2025-2026 : qui est concerné, quand, et comment se préparer"*
    - Cible SEO : `csrd pme 2025`, `qui est concerné CSRD`, `calendrier CSRD`
- *"Les 12 standards ESRS expliqués simplement"*
    - Cible SEO : `esrs standards liste`, `esrs explication`, `esrs csrd`
- *"Double matérialité CSRD : comment réaliser votre analyse"*
    - Cible SEO : `double matérialité csrd`, `analyse matérialité rse`

**Méthodologie RSE**

- *"WSJF adapté à la RSE : priorisez vos initiatives comme les meilleures équipes produit"*
    - Cible SEO : `priorisation rse`, `wsjf rse`, `méthode priorisation initiatives`
- *"Les 4 niveaux de pilotage RSE : axes, objectifs, projets, actions"*
    - Cible SEO : `pilotage rse`, `structurer stratégie rse`, `tableau de bord rse`
- *"KPIs RSE : les 10 indicateurs essentiels pour votre premier reporting"*
    - Cible SEO : `kpi rse liste`, `indicateurs rse`, `mesurer performance rse`

**Bonnes pratiques**

- *"Matrice des risques RSE : comment identifier, évaluer et mitiger vos risques"*
    - Cible SEO : `risques rse`, `matrice risques rse`, `gestion risques csrd`
- *"Rapport RSE COMEX : ce qu'il doit contenir et comment l'automatiser"*
    - Cible SEO : `rapport rse comex`, `reporting rse conseil administration`

**Template article**

> Image hero + temps de lecture + résumé en 3 bullets + CTA inline "Essayer gratuitement" + CTA footer "Télécharger notre guide CSRD"
> 

---

### 12. `/ressources/guides` — GUIDES TÉLÉCHARGEABLES

**Titre H1**

> Guides pratiques RSE — téléchargement gratuit.
> 

| Guide | Public | Format | CTA |
| --- | --- | --- | --- |
| *Le guide PME de la conformité CSRD 2026* | PME | PDF 15 pages | Email requis |
| *Cabinet RSE : outillez votre méthodologie avec le WSJF* | Cabinets | PDF 10 pages | Email requis |
| *WSJF pour la RSE : guide méthodologique complet* | Tous | PDF 8 pages | Email requis |
| *Checklist audit ESRS — les 12 standards point par point* | Compliance officers | PDF 5 pages | Email requis |

**UX** : Preview des 2 premières pages → formulaire email → accès immédiat + nurturing email sequence

---

### 13. `/ressources/outils` — CALCULATEURS GRATUITS (NOUVEAU)

**Titre H1**

> Outils RSE gratuits — évaluez votre situation en 5 minutes.
> 

**Outil 1 — Calculateur ROI Reporting**

> *Combien de temps perdez-vous sur le reporting RSE chaque année ?*
Inputs : nb personnes impliquées × jours/rapport × fréquence × coût journalier
Output : Économie annuelle estimée avec Yumni
> 

**Outil 2 — Évaluateur de couverture ESRS**

> *Checklist rapide des 12 standards ESRS — êtes-vous prêt pour votre audit CSRD ?*
12 questions (1 par standard) → Score de couverture + recommandations
> 

**Outil 3 — Calculateur de score WSJF**

> *Scorez votre prochaine initiative RSE en 1 minute.*
Inputs : Valeur Business, Urgence, Réduction de Risque, Effort
Output : Score WSJF + positionnement dans un comparatif type
> 

*Note SEO : Ces outils ciblent les requêtes à haute intention "calculateur csrd", "checklist esrs", "score wsjf"*

---

### 14. `/ressources/glossaire` — GLOSSAIRE RSE

**Titre H1**

> Glossaire RSE / ESG / CSRD — les définitions essentielles.
> 

**Termes prioritaires**

| Terme | Définition courte |
| --- | --- |
| **RSE** | Responsabilité Sociétale des Entreprises — engagement volontaire (puis réglementé) sur les enjeux environnementaux, sociaux et de gouvernance |
| **ESG** | Environnement, Social, Gouvernance — les 3 piliers d'évaluation extra-financière |
| **CSRD** | Corporate Sustainability Reporting Directive — directive européenne imposant un reporting RSE standardisé aux entreprises concernées |
| **ESRS** | European Sustainability Reporting Standards — les 12 standards techniques de la CSRD |
| **DPEF** | Déclaration de Performance Extra-Financière — ancêtre français du reporting RSE, remplacé par la CSRD |
| **Double Matérialité** | Analyse combinant l'impact de l'entreprise sur la société/l'environnement ET l'impact des enjeux ESG sur l'entreprise |
| **WSJF** | Weighted Shortest Job First — méthode de priorisation basée sur la valeur rapportée à l'effort |
| **Matérialité financière** | Impact des enjeux ESG sur la performance financière de l'entreprise |
| **Matérialité d'impact** | Impact de l'entreprise sur l'environnement et la société |
| **Scope 1** | Émissions directes de GES (combustion dans les installations de l'entreprise) |
| **Scope 2** | Émissions indirectes liées à la consommation d'énergie achetée |
| **Scope 3** | Toutes les autres émissions indirectes (chaîne de valeur amont et aval) |
| **TF1** | Taux de Fréquence des accidents avec arrêt — KPI sécurité clé |
| **QVT** | Qualité de Vie au Travail |

*CTA en bas de chaque définition : "Suivez ce KPI dans Yumni →"*

---

### 15. `/ressources/webinars` — WEBINARS

**Titre H1**

> Webinars Yumni — apprenez et pilotez mieux votre RSE.
> 

**Prochain webinar**

> **"CSRD 2025-2026 : les 5 erreurs que commettent les PME (et comment les éviter)"**
📅 [Date] à 11h · Durée : 45 min + Q&A
[S'inscrire gratuitement →]
> 

**Replays disponibles**

- *Live démo Yumni 30 min* — [Voir le replay]
- *WSJF en pratique : priorisez vos initiatives RSE en 1h* — [Voir le replay]
- *Décrypter les ESRS : les 12 standards en 30 min* — [Voir le replay]
- *Pilotage RSE pour PME : par où commencer ?* — [Voir le replay]

---

### 16. `/a-propos` — L'ENTREPRISE

**Titre H1**

> Notre mission : rendre le pilotage RSE accessible à toutes les entreprises.
> 

**Vision**

> Le CRM a démocratisé la relation client. Yumni démocratise le pilotage RSE. Chaque entreprise, quelle que soit sa taille, doit pouvoir structurer sa stratégie RSE, mesurer son impact et reporter avec confiance — sans avoir besoin d'une armée de consultants.
> 

**Valeurs**

- **Transparence** — nos données vous appartiennent, notre code est propre, notre roadmap est publique
- **Impact** — chaque feature est jugée à l'aune de l'impact RSE qu'elle génère pour nos utilisateurs
- **Souveraineté** — hébergement France, RGPD by design, pas de dépendance aux hyperscalers américains

**Notre histoire**

> Timeline : genèse du projet → premiers tests terrain → lancement Freemium → aujourd'hui
> 


---

### 17. `/securite` — SÉCURITÉ, RGPD & HÉBERGEMENT

**Titre H1**

> Vos données RSE méritent une protection RSE.
> 

**Sous-titre**

> Yumni est conçu pour les équipes RSE qui traitent des données sensibles : KPIs sociaux, risques légaux, données collaborateurs. Chaque décision d'architecture reflète ce niveau d'exigence.
> 

---

**Hébergement & Souveraineté**

> Yumni est hébergé exclusivement sur Scaleway, data center France (fr-par), soumis au droit européen. Aucune donnée ne transite hors UE.
> 

**Chiffrement**

> • En transit : TLS 1.3
• Au repos : AES-256
• Mots de passe : hachage bcrypt
> 

**Authentification**

> • JWT + refresh tokens avec rotation
• MFA / 2FA natif (toutes offres)
• Rate limiting anti-brute force
• CAPTCHA Cloudflare Turnstile à l'inscription
• Session invalidation complète à la déconnexion
> 

**Contrôle d'accès (RBAC)**

> 4 niveaux de permissions : Owner · Admin · Manager · Viewer
Isolation des données par organisation via Row Level Security (RLS) PostgreSQL
Aucun utilisateur ne peut accéder aux données d'une autre organisation
> 

**RGPD**

> • Droit d'accès, rectification et suppression implémentés
• Export complet de vos données sur demande
• Pas de revente de données, jamais
• Contact DPO : [rgpd@yumni.fr](mailto:rgpd@yumni.fr)
• Conservation : données supprimées dans les 30 jours suivant résiliation
> 

---

## ÉLÉMENTS TRANSVERSAUX

---

### Header sticky

```
[Logo Yumni]   Produit ▾   Solutions ▾   Tarifs   Ressources ▾   [Se connecter]   [Essai gratuit →]
```

- Fond blanc avec ombre légère après scroll
- Bouton "Essai gratuit" : vert (#10B981 ou similaire), border-radius 8px
- Sur mobile : burger menu + CTA "Essai gratuit" en bas fixe (full width)

---

### Footer enrichi

```
Yumni — Pilotage RSE souverain 🇫🇷

Produit                Solutions              Ressources             Légal
├── Cockpit            ├── Cabinets RSE       ├── Blog               ├── Mentions légales
├── KPIs               ├── PME                ├── Guides             ├── CGU
├── WSJF               └── ETI & Groupes      ├── Outils             ├── RGPD / DPO
├── Risques                                   ├── Glossaire          └── Sécurité
├── Reporting          Entreprise             └── Webinars
├── ESRS               ├── À propos
└── Collaboration      ├── Partenaires
                       └── Contact

Newsletter : [Email pro ...] [S'abonner]

Hébergé en France 🇫🇷 · RGPD · MFA · TLS 1.3 · Scaleway
© 2026 Yumni — Tous droits réservés
```

---

### Banner CSRD urgence (top bar dismissable)

> ⚡ **CSRD 2025** : votre entreprise est-elle prête ? → [Évaluez votre couverture ESRS gratuitement](https://www.notion.so/ressources/outils)
> 

---

### Exit-intent popup (desktop, 1x/session)

**Titre** : *"Avant de partir — voyez le produit en 30 secondes."***Contenu** : GIF du dashboard + génération rapport
**CTA primaire** : `Demander une démo`**CTA secondaire** : `Commencer gratuitement`

---

### CTA flottant mobile (bottom fixe)

> `Essayer gratuitement →` (plein écran, 56px de hauteur)
> 

---

## PARTIE 4 — NOTES ÉDITORIALES

### Ton & voix

- **Directif mais accessible** : phrases courtes, verbes d'action, pas de jargon inutile
- **Chiffré** : chaque affirmation doit avoir un chiffre (12 sec, 40 jours, 12 standards)
- **Empathique** : nommer la douleur avant de proposer la solution
- **Souverain** : "hébergé en France", "RGPD by design" répétés sur les pages à enjeux sécurité

### Mots à éviter

- "solution innovante", "plateforme de nouvelle génération", "outil puissant" — trop générique
- "nous sommes les meilleurs" — montrez, ne dites pas
- Jargon technique NestJS / Prisma / PostgreSQL sur les pages marketing — invisible pour les visiteurs

### Chiffres à valider avant mise en ligne

- Nombre d'entreprises utilisatrices actuelles (pour le social proof)
- Nombre exact de KPIs préconfigurés
- Prix Pro (ou confirmer "sur devis uniquement")
- Lien Calendly pour les démos

---

*Document généré le 27 mars 2026 — v1.0À réviser après : premiers retours clients, A/B tests sur les CTAs, mise en ligne du site*

---

## PARTIE 5 — ASSETS À PRODUIRE

> **Lecture du tableau** : Priorité **P1** = bloquant pour le lancement · **P2** = important mais contournable · **P3** = post-lancement
Effort : **S** (< 2h) · **M** (demi-journée) · **L** (1-2 jours) · **XL** (> 2 jours)
> 

---

### 5.1 Assets vidéo & captures produit

Ces assets sont le nerf de la guerre : sans visuels du vrai produit, aucune page feature ne peut convaincre.

| Asset | Usage | Priorité | Effort | Notes |
| --- | --- | --- | --- | --- |
| **Vidéo démo principale (3-5 min)** | `/demo`, Homepage hero | P1 | XL | Parcours Sophie Lefebvre (GreenTech) — cockpit → KPIs → risques → WSJF → rapport PPTX. Script disponible dans [PARCOURS-DEMO.md](http://parcours-demo.md/). Sous-titres FR obligatoires. |
| **Teaser 30 secondes** | Exit-intent popup, LinkedIn | P1 | M | Extrait monté de la vidéo principale. Le meilleur moment = génération du rapport en 12 sec. |
| **GIF dashboard (5-8 sec, loop)** | Homepage hero, `/produit/cockpit` | P1 | S | Scroll du dashboard → alertes qui remontent → drill-down. Poids < 2 Mo (optimiser avec ezgif). |
| **GIF génération rapport (5 sec)** | `/produit/reporting`, tarifs | P1 | S | Clic sur "Générer" → barre de progression → PPTX prêt. |
| **GIF WSJF pipeline (5-8 sec)** | `/produit/wsjf` | P2 | S | Déplacement d'une idée de "Évaluation" → "Ready" → conversion en projet. |
| **GIF matrice des risques** | `/produit/risques` | P2 | S | Zoom sur un risque critique → ouverture du détail → action liée. |
| **GIF heatmap KPIs** | `/produit/kpis` | P2 | S | TF1 accidents qui régresse (rouge) → alerte visuelle. |
| **Screenshots statiques HD** | `/produit/*`, guides PDF, plaquette | P1 | M | 1 screenshot par feature (8 min) + 1 vue mobile. Format 2x pour retina. Fond neutre (gris clair ou blanc). |
| **Mockup rapport PPTX** | `/produit/reporting`, `/ressources/guides` | P2 | M | Export d'un vrai rapport GreenTech avec quelques slides annotées → montre la qualité du rendu. |

**Conseil workflow** : Enregistrer avec Loom (qualité 4K) sur le dataset GreenTech. Editer avec CapCut (gratuit, export sans watermark). GIFs via [ezgif.com](http://ezgif.com/) ou Gifski (macOS, meilleure compression).

---

### 5.2 Assets graphiques & design

| Asset | Usage | Priorité | Effort | Notes |
| --- | --- | --- | --- | --- |
| **Brand kit complet** | Tout le site | P1 | L | Logo SVG (clair + foncé + favicon), palette couleurs (primary, secondary, neutrals), typographie (1 serif titres + 1 sans-serif corps), border-radius et espacements standardisés. |
| **OG Image générique** | SEO social (Twitter, LinkedIn) | P1 | S | 1200×630px — Logo + tagline + screenshot dashboard. Générer avec Figma ou Canva. |
| **OG Images par page** | SEO (title + description dans og:image) | P3 | M | 1 variante par page clé (/produit, /tarifs, /demo, /solutions/*). |
| **Icônes features (6 piliers)** | Homepage, `/produit` | P1 | S | Style linéaire cohérent. Utiliser Lucide (déjà dans le frontend) ou Phosphor Icons. |
| **Illustrations "Avant/Après"** | `/produit/reporting`, `/produit/cockpit` | P2 | M | Excel chaos (colonne gauche) vs. dashboard Yumni (colonne droite). Style flat, couleurs brand. Canva Pro ou Midjourney suffisent. |
| **Schéma hiérarchie RSE** | `/produit`, [CLAUDE.md](http://claude.md/), blog | P2 | S | Axes → Objectifs → Projets → Actions en diagramme propre. Excalidraw ou Figma. |
| **Schéma multi-org (cabinets)** | `/produit/multi-org`, `/solutions/cabinets` | P2 | S | 1 compte cabinet → N clients isolés → vue consolidée. |
| **Schéma formule WSJF** | `/produit/wsjf` | P2 | S | (Valeur + Urgence + Réduction risque) ÷ Effort = Score. Visuel stylisé, pas juste du texte. |
| **Photos équipe** | `/a-propos` | P2 | M | Photos professionnelles ou semi-pro sur fond neutre. LinkedIn-ready. |
| **Badge "Hébergé en France 🇫🇷"** | Footer, `/securite`, homepage | P1 | S | SVG simple — drapeau + mention Scaleway. |
| **Badges confiance** | Footer, `/essai-gratuit`, `/securite` | P1 | S | CSRD Ready · ESRS Compliant · RGPD · MFA · TLS 1.3. Style shield/badge. |

---

### 5.3 Assets contenus longs (documents)

| Asset | Usage | Priorité | Effort | Notes |
| --- | --- | --- | --- | --- |
| **Guide PDF — "PME & CSRD 2026" (15p)** | `/ressources/guides`, lead gen | P2 | XL | Contenu : calendrier CSRD, qui est concerné, checklist 12 standards, premiers pas. CTA Yumni à chaque chapitre. |
| **Guide PDF — "Cabinet RSE : outillez votre méthodo" (10p)** | `/ressources/guides`, lead gen | P2 | L | Contenu : proposition de valeur multi-tenant, WSJF comme méthode vendable, ROI cabinet. |
| **Guide PDF — "WSJF pour la RSE" (8p)** | `/ressources/guides` | P3 | L | Guide méthodologique complet avec exemples chiffrés. |
| **Checklist PDF — "Audit ESRS" (5p)** | `/ressources/guides`, nurturing | P2 | M | 12 standards × 3-5 questions de vérification chacun. Format checklist A4. |
| **Sample rapport PPTX téléchargeable** | `/produit/reporting` | P2 | S | Export du rapport GreenTech (anonymisé ou avec données fictives clairement indiquées). Montre la qualité réelle. |
| **Plaquette PDF commerciale** | Email outreach, `/contact` | P1 | — | ✅ Déjà disponible selon [plan-prospection.md](http://plan-prospection.md/) |

**Outil recommandé** : Notion → export PDF pour les guides (mise en page propre, sans dev). Canva pour les checklist illustrées.

---

### 5.4 Assets SEO & textes

| Asset | Usage | Priorité | Effort | Notes |
| --- | --- | --- | --- | --- |
| **Meta title + description pour chaque page** | SEO | P1 | M | 15 pages × 2 champs = 30 rédactions courtes. Format : `[Bénéfice principal] — Yumni`. Max 60 car. titre, 155 car. description. |
| **3 articles blog prioritaires** | SEO, nurturing | P2 | XL | "CSRD 2025-2026 : qui est concerné", "Les 12 standards ESRS expliqués", "WSJF adapté à la RSE". 1 500–2 500 mots chacun. |
| **Glossaire (20 termes minimum)** | SEO longue traîne | P3 | M | Déjà rédigé dans ce doc — à formater en HTML avec ancres. |
| **FAQ structurée ([schema.org](http://schema.org/))** | SEO rich snippets | P2 | S | FAQPage schema sur `/tarifs` et `/demo` — augmente la visibilité dans les SERP. |
| **Texte CGU / Politique de confidentialité** | `/mentions-legales`, compliance | P1 | L | À faire rédiger par un juriste ou adapter depuis un template spécialisé RGPD. Critique avant lancement. |

---

### 5.5 Assets techniques & intégrations

| Asset | Usage | Priorité | Effort | Notes |
| --- | --- | --- | --- | --- |
| **Formulaire de démo** (backend) | `/demo` | P1 | M | Collecte nom, email, entreprise, taille, défi RSE → stockage CRM ou Notion DB → email de confirmation auto. |
| **Formulaire d'inscription Freemium** | `/essai-gratuit` | P1 | — | Déjà dans l'app — vérifier que l'URL d'inscription est accessible publiquement sans connexion. |
| **Calendly (ou [Cal.com](http://cal.com/))** | Post-demo, `/contact` | P1 | S | Embed sur la page de confirmation post-formulaire démo. 1 type d'événement : "Démo Yumni 30 min". |
| **Analytics (Plausible ou GA4)** | Toutes pages | P1 | S | Plausible recommandé (RGPD-friendly, hébergé EU, pas de cookie banner requis). Objectifs : formulaire démo soumis, inscription Freemium, guide téléchargé. |
| **Chat widget (Crisp ou Intercom)** | Toutes pages | P2 | S | Crisp gratuit jusqu'à 2 agents. Configurer une réponse automatique hors horaires + redirection vers `/demo`. |
| **Cloudflare Turnstile (CAPTCHA)** | Formulaires | P1 | S | Déjà mentionné dans l'app — intégrer sur les formulaires du site vitrine. Gratuit, RGPD-friendly. |
| **Open Graph tags + Twitter Card** | SEO social | P1 | S | Chaque page doit avoir ses balises og:title, og:description, og:image correctement renseignées. |
| **Sitemap XML + robots.txt** | SEO technique | P1 | S | Générer automatiquement si Next.js (next-sitemap). Exclure /essai-gratuit/bienvenue et les pages onboarding. |
| **Redirections 301** | SEO | P2 | S | Si le domaine [yumni.fr](http://yumni.fr/) est déjà utilisé avec d'autres URLs, cartographier les redirections avant go-live. |
| **Banner cookie (si GA4)** | Compliance RGPD | P1 | S | Pas nécessaire avec Plausible (cookieless). Obligatoire avec GA4. Utiliser Cookiebot ou Axeptio. |

---

### 5.6 Assets social proof (à collecter en priorité)

C'est le point le plus sous-estimé — et le plus impactant sur la conversion.

| Asset | Usage | Priorité | Effort | Notes |
| --- | --- | --- | --- | --- |
| **1 témoignage early adopter** | Homepage, pages solutions | P1 | M | Format : photo + nom + titre + entreprise + citation avec résultat chiffré. Obtenir l'accord écrit. Même 1 seul change tout. |
| **2-3 logos clients / partenaires** | Barre de confiance homepage | P1 | S | En l'absence de clients, utiliser les logos des partenaires technologiques (Scaleway, Prisma, etc.) avec mention "Propulsé par". |
| **1 cas client structuré** | `/solutions/*`, blog | P2 | L | Format : Contexte → Problème → Solution → Résultats chiffrés. Peut être basé sur GreenTech (dataset de démo) comme exemple illustratif si pas encore de vrai client. |
| **Nombre d'utilisateurs ou d'entreprises** | `/essai-gratuit`, homepage | P2 | S | Dès que ce chiffre existe (même si petit : "23 entreprises font confiance à Yumni"). Commencer à tracker dès la mise en ligne. |

---

### 5.7 Récapitulatif par priorité et par responsable suggéré

### P1 — Bloquant lancement (à avoir le jour J)

| Asset | Responsable suggéré |
| --- | --- |
| Vidéo démo 3-5 min | Fondateur(s) — enregistrement écran + montage Loom/CapCut |
| Teaser 30 sec | Extrait de la vidéo principale |
| GIF dashboard (hero) | Fondateur(s) |
| GIF génération rapport | Fondateur(s) |
| Screenshots HD (8 features) | Fondateur(s) |
| Brand kit (logo, couleurs, typo) | Designer ou Figma Community template |
| OG Image générique | Canva / Figma (1h) |
| Icônes features | Lucide Icons (déjà dans le projet) |
| Meta title + description 15 pages | Fondateur(s) — s'appuyer sur les rédactions de ce doc |
| CGU / Politique de confidentialité | Juriste ou template RGPD adapté |
| Analytics (Plausible) | Dev (30 min) |
| Calendly configuré | Fondateur(s) (1h) |
| Formulaire démo opérationnel | Dev (2-4h) |
| Plaquette PDF | ✅ Déjà disponible |
| Badges confiance (SVG) | Designer (1h) |
| 1 témoignage early adopter | Fondateur(s) — à solliciter maintenant |

### P2 — Important, dans les 2 premières semaines

| Asset | Responsable suggéré |
| --- | --- |
| GIFs features (WSJF, risques, KPIs) | Fondateur(s) |
| Illustrations Avant/Après | Canva Pro / Midjourney |
| Schémas (hiérarchie RSE, multi-org, WSJF) | Excalidraw (ce repo a déjà le setup) |
| Photos équipe | Photographe demi-journée |
| 3 articles blog | Fondateur(s) + IA pour le draft |
| Guides PDF (2 en priorité : PME + Cabinet) | Fondateur(s) — Notion → export PDF |
| Sample rapport PPTX téléchargeable | Export depuis l'app (GreenTech dataset) |
| Chat widget Crisp | Dev (1h) |
| FAQ [schema.org](http://schema.org/) sur /tarifs | Dev (30 min) |
| 2-3 logos partenaires | Fondateur(s) — accord partenaires |

### P3 — Post-lancement, au fil de l'eau

Asset

---

OG Images par page (variantes)

---

Guides PDF supplémentaires (WSJF, checklist ESRS)

---

Glossaire HTML complet (20+ termes)

---

Articles blog (cadence 2/mois)

---

Webinar #1 (enregistrement + replay)

---

Cas client structuré

---

Nombre d'utilisateurs (dès que mesurable)

---

---

### 5.8 Ce qu'on peut produire sans aucun client ni budget

Un point pratique pour une équipe early-stage :

- **Vidéo démo** → le dataset GreenTech est déjà seedé et conçu pour ça. Enregistrer avec OBS (gratuit).
- **Sample rapport PPTX** → générer depuis l'app avec les données GreenTech, renommer "Rapport COMEX - Exemple.pptx".
- **Témoignage** → un beta testeur, un ami dirigeant qui a vu le produit, ou une citation reformulée avec accord. Même fictif clairement labellisé vaut mieux qu'une section vide.
- **Logos "partenaires"** → Scaleway, Prisma, NestJS, Next.js avec mention "Construit avec" ou "Propulsé par" — légitimise techniquement.
- **Articles blog** → 3 articles bien rédigés avec une vraie expertise CSRD font plus qu'une dizaine d'articles thin content. Utiliser Claude pour le draft, affiner avec l'expertise métier.
- **Illustrations** → Midjourney v6 génère des visuels "dashboard RSE abstrait" de qualité suffisante pour une page hero. 5$ de crédit suffisent.