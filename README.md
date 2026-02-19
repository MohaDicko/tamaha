
# 🌍 Tamaha Association Website

Site web officiel de l'association Tamaha, réalisé avec Next.js 14, TypeScript, TailwindCSS et Contentlayer.

## 🚀 Démarrage Rapide

1.  **Installation des dépendances**
    ```bash
    npm install
    # Si erreur de peer dependencies avec React 19/Next 15 :
    npm install --legacy-peer-deps
    ```

2.  **Configuration des variables d'environnement**
    Renommez `.env.example` en `.env` (ou créez-le) :
    ```bash
    cp .env.example .env
    ```
    Contenu requis :
    ```env
    # URL du site (pour SEO et sitemap)
    NEXT_PUBLIC_SITE_URL="http://localhost:3000"

    # Email (Resend)
    RESEND_API_KEY="re_123456789"
    CONTACT_TO_EMAIL="contact@tamaha.org"
    ```

3.  **Lancer le serveur de développement**
    ```bash
    npm run dev
    ```
    Le site sera accessible sur `http://localhost:3000`.

## 🏗️ Architecture

-   **`app/`** : Pages (App Router).
    -   `(public)/` : Pages publiques (Accueil, Blog, Contact...).
    -   `api/` : API Routes server-side (Contact).
-   **`components/`** : Composants React.
    -   `ui/` : Composants de base (shadcn/ui).
    -   `layout/` : Navbar, Footer.
    -   `sections/` : Blocs de page (Hero, Stats, CTA).
-   **`content/`** : Contenu éditorial (MDX).
    -   `posts/` : Articles de blog.
    -   `events/` : Événements.
    -   `projects/` : Projets (Actions).
-   **`lib/`** : Utilitaires et Logique métier.
    -   `content/` : Abstraction de la couche de données (MDX > CMS).

## 📝 Gestion du Contenu

Le contenu est géré via des fichiers MDX dans le dossier `content/`.

### Ajouter un article de blog
Créez un fichier `.mdx` dans `content/posts/` :
```yaml
---
title: "Mon nouvel article"
date: "2024-03-20"
excerpt: "Résumé court pour la liste."
cover: "/images/mon-cover.jpg"
tags: ["Actualité", "Terrain"]
featured: true
---

Votre contenu en Markdown...
```

### Ajouter un événement
Créez un fichier `.mdx` dans `content/events/` :
```yaml
---
title: "Gala de charité"
date: "2024-12-15"
location: "Paris"
excerpt: "Soirée annuelle..."
cover: "..."
---
```

## 🛠️ Stack Technique

-   **Framework** : Next.js 14 (App Router)
-   **Langage** : TypeScript (Strict)
-   **Style** : TailwindCSS + shadcn/ui
-   **Contenu** : Contentlayer (MDX)
-   **Validation** : Zod + React Hook Form
-   **Email** : Resend

## 📦 Déploiement

Le site est optimisé pour Vercel.
1. Poussez le code sur GitHub/GitLab.
2. Importez le projet sur Vercel.
3. Configurez les variables d'environnement (`RESEND_API_KEY`, etc.).
4. Déployez.

## 🔄 Évolution vers un CMS (Sanity, Strapi...)

L'architecture est conçue pour être agnostique. Pour changer de source de données :
1. Créez un nouveau dossier `lib/content/sanity` (par exemple).
2. Implémentez les fonctions `getPosts`, `getEvents` respectant les types définis.
3. Modifiez `lib/content/index.ts` pour exporter depuis votre nouvelle source.
4. Les pages et composants n'auront pas besoin d'être modifiés.
