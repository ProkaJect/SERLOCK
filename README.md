# SERLOCK — Serrurier dépanneur 24h/24 à Bordeaux

Site vitrine de SERLOCK, serrurier dépanneur d'urgence à Bordeaux et alentours.

## Stack

HTML/CSS statique pur, aucun framework, aucune dépendance de build. Un seul fichier `index.html`, fait main. Seule ressource externe : Google Fonts (Archivo + Public Sans).

## Objectif

Convertir : chaque visiteur en urgence doit pouvoir appeler le 07 68 64 25 13 en un tap (CTA header, hero, CTA final, barre d'appel fixe sur mobile). SEO local Bordeaux travaillé (title/description, Schema.org Locksmith, Open Graph).

## Fichiers

- `public/index.html` — la landing complète (CSS inline)
- `public/favicon.svg` — favicon (serrure sur fond nuit)
- `public/robots.txt` — indexation ouverte (sitemap à ajouter quand le domaine sera connu)
- `nginx.conf` — config nginx (sert `public/`), incluse dans le bloc `server` du buildpack
- `.buildpacks` — déclare le buildpack nginx de Scalingo (le HTML statique n'est pas auto-détecté)

## Déploiement

Hébergé sur Scalingo (app `serlock`). Le buildpack [Scalingo/nginx-buildpack](https://github.com/Scalingo/nginx-buildpack) sert le dossier `public/` en statique. Un simple push suffit, aucune étape de build.
