# FIRST SERVICE – Site vitrine

Ce projet est un site vitrine pour **FIRST SERVICE**, une entreprise spécialisée dans :
- Avitaillement maritime
- Soutage
- Vente de produits divers

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
└── README.md
```

### Pages HTML
- `index.html` : page d’accueil
- `services.html` : nos services
- `produits.html` : catalogue des produits
- `contact.html` : formulaire de contact
- `admin.html` : espace d’administration

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
  ou définir, avant `js/utils/init.js`, un petit script non versionné :
  ```html
  <script>
    window.__SUPABASE_URL = "https://votre-projet.supabase.co";
    window.__SUPABASE_ANON_KEY = "ey...";
  </script>
  ```

### SQL de base (à exécuter dans le SQL Editor Supabase)
```sql
create table if not exists produits (
  id bigint generated always as identity primary key,
  nom text not null,
  description text,
  prix numeric(12,2),
  image text,
  created_at timestamp with time zone default now()
);

create table if not exists messages (
  id bigint generated always as identity primary key,
  nom text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

create table if not exists users (
  id uuid primary key references auth.users,
  email text unique,
  role text default 'client'
);
```

Politiques RLS minimales (adapter à vos besoins) :
```sql
alter table produits enable row level security;
alter table messages enable row level security;
alter table users enable row level security;

-- Produits : lecture publique, écriture réservée aux admins
create policy "Produits lecture publique" on produits for select using (true);
create policy "Produits admins" on produits for all
  using (auth.jwt() ->> 'email') in (select email from users where role = 'admin');

-- Messages : insertion ouverte, lecture admin
create policy "Messages insert" on messages for insert with check (true);
create policy "Messages admin read" on messages for select
  using (auth.jwt() ->> 'email') in (select email from users where role = 'admin');
```

---

## 🤝 Collaboration
- Chaque page HTML a son JS dédié dans `js/pages/`.
- Les données passent par `js/api/`, l’affichage dynamique par `js/ui/`.
- Le style global est dans `css/style.css`.

---

## 📌 Objectif
- Simple à comprendre
- Facile à modifier
- Design professionnel et responsive
