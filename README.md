# FIRST SERVICE – Site vitrine

Ce projet est un site vitrine pour **FIRST SERVICE**, une entreprise spécialisée dans :
- Avitaillement maritime
- Soutage
- Vente de produits divers

---

## 📝 Présentation du Projet
Une documentation détaillée pour la présentation (jury/professeur) est disponible ici : [PRESENTATION.md](./PRESENTATION.md)

---

## 📁 Structure du projet

```
first-service/
├── css/
│   └── style.css
├── js/
│   ├── config/
│   │   └── supabase.js
│   ├── api/
│   │   ├── auth.js
│   │   ├── messages.js
│   │   └── products.js
│   ├── pages/
│   │   ├── index.js
│   │   ├── services.js
│   │   ├── produits.js
│   │   ├── contact.js
│   │   └── admin.js
│   ├── ui/
│   │   └── products.js
│   └── utils/
│       └── init.js
├── index.html
├── services.html
├── produits.html
├── contact.html
├── admin.html
├── mentions.html
├── privacy.html
└── README.md
```

### Pages HTML
- `index.html` : page d’accueil
- `services.html` : nos services
- `produits.html` : catalogue des produits
- `contact.html` : formulaire de contact
- `admin.html` : espace d’administration
- `mentions.html` : mentions légales
- `privacy.html` : politique de confidentialité

### Dossiers JS
- `config/` : configuration Supabase (`supabase.js`)
- `api/` : accès données (authentification, produits, messages)
- `pages/` : logique dédiée à chaque page
- `ui/` : composants d’affichage (cartes produits, etc.)
- `utils/` : initialisation et helpers partagés

---

## 🚀 Comment lancer le projet
1. Ouvrir le dossier dans **VS Code** (ou équivalent).
2. Installer l’extension **Live Server** si besoin.
3. Clic droit sur `index.html` → **Open with Live Server**.
4. Le site s’ouvre dans le navigateur.

---

## 🔐 Backend (Supabase)
- Tables :  
  - `produits` : id, nom, description, prix, image  
  - `messages` : id, nom, email, message  
  - `users` : id, email, role (admin, client)
- Renseigner `SUPABASE_URL` et `SUPABASE_ANON_KEY` dans `js/config/supabase.js`
  ou définir, avant `js/utils/init.js`, un script non versionné.

### SQL de base
```sql
create table if not exists produits (
  id bigint generated always as identity primary key,
  nom text not null,
  description text,
  prix numeric(12,2),
  image text,
  created_at timestamp with time zone default now()
);
```

---

## 📌 Objectif
- Simple à comprendre
- Facile à modifier
- Design professionnel et responsive

