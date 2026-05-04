# ORGANIGRAMME COMPLET DU SITE FIRST SERVICE
*Vue d'ensemble de la structure du site web*

---

## 🌐 STRUCTURE GÉNÉRALE DU SITE

```
                    FIRST SERVICE
                    Site Web Complet
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    Pages HTML         Dossiers           Fichiers
    Principales         Images           JavaScript
        │                  │                  │
        │                  │                  │
    ┌───┴───┐      ┌─────┴─────┐      ┌──────┴──────┐
    │       │      │           │      │             │
 index.html  logo/   contact/   js/    pages/     utils/
 services.html  │     │     │     │     │           │
 produits.html  │     │     │     │     │           │
 contact.html   │     │     │     │     │           │
 admin.html     │     │     │     │     │           │
 mentions.html  │     │     │     │     │           │
 privacy.html   │     │     │     └─────┘           │
                │     │     │                       │
                └─────┴─────┘                       │
                                                   │
                                            ┌──────┴──────┐
                                            │             │
                                         CSS/          API/
                                      style.css      config/
                                                    │
                                                supabase.js
```

---

## 📄 DÉTAIL DES PAGES PRINCIPALES

### 1. **index.html** - Page d'Accueil
```
🏠 PAGE D'ACCUEIL (index.html)
├── 📞 Header : +225 00 00 00 00 00 | contact@firstservice.ci
├── 🧭 Navigation : Accueil | Services | Produits | Contact | Admin
├── 🎯 Hero Section
│   ├── 📝 Titre : "FIRST SERVICE"
│   ├── 📄 Description : "L'excellence au service de vos escales..."
│   └── 🔘 Boutons : "Nos Services" | "Nous Contacter"
├── ⚙️ Services Section
│   ├── 🖼️ Image : images/ava.png (Avitaillement)
│   ├── 🖼️ Image : images/soutage.png (Soutage)
│   ├── 🖼️ Image : images/produit.png (Produits Divers)
│   └── 📝 Textes des 3 services
├── 🏢 À Propos Section
│   ├── 🖼️ Image : images/about.png
│   ├── 📊 Statistique : "10+ Années d'Expérience"
│   └── 📝 Textes de présentation
└── 📱 Footer : Contact | Liens | Mentions légales
```

### 2. **services.html** - Page des Services
```
🛠️ PAGE SERVICES (services.html)
├── 📞 Header : +225 00 00 00 00 00 | contact@firstservice.ci
├── 🧭 Navigation (identique)
├── 🎯 Hero Section : "Vos Services Maritimes"
├── 📋 Liste des Services
│   ├── ✅ Avitaillement complet
│   ├── ✅ Soutage sécurisé
│   ├── ✅ Produits techniques
│   ├── ✅ Logistique portuaire
│   └── ✅ Support 24/7
├── 📝 Descriptions détaillées
└── 📱 Footer (identique)
```

### 3. **produits.html** - Page des Produits
```
📦 PAGE PRODUITS (produits.html)
├── 📞 Header : +33 5 56 00 00 00 | contact@firstservice.fr
├── 🧭 Navigation (identique)
├── 🎯 Hero Section : "Vente de Produits Divers"
├── 📊 Catalogue de produits
│   ├── 🔌 Chargement depuis Supabase
│   ├── 📦 Grille de produits dynamique
│   └── 🔄 Mise à jour automatique
├── 📝 "Demander un devis"
└── 📱 Footer (identique)
```

### 4. **contact.html** - Page de Contact
```
📧 PAGE CONTACT (contact.html)
├── 📞 Header : +225 00 00 00 00 00 | contact@firstservice.ci
├── 🧭 Navigation (identique)
├── 🎯 Hero Section : "Contactez-Nous"
├── 📋 Formulaire de contact
│   ├── 📝 Nom
│   ├── 📧 Email
│   ├── 📞 Téléphone
│   ├── 📄 Message
│   └── 🔘 Bouton "Envoyer"
├── 📍 Informations de contact
│   ├── 🏢 Adresse : Zone Portuaire, Abidjan
│   ├── 📧 Email : contact@firstservice.ci
│   ├── 📞 Téléphone : +225 00 00 00 00 00
│   └── ⏰ Disponibilité : 24/7
└── 📱 Footer (identique)
```

### 5. **admin.html** - Page d'Administration
```
⚙️ PAGE ADMIN (admin.html)
├── 🔒 Connexion requise
├── 📊 Tableau de bord
│   ├── 📈 Statistiques
│   ├── 👥 Gestion des utilisateurs
│   ├── 📦 Gestion des produits
│   └── 📝 Gestion des contenus
└── 🔧 Outils d'administration
```

---

## 🖼️ ORGANISATION DES IMAGES

### Dossier `images/`
```
📁 images/
├── 📁 logo/
│   └── 🖼️ logo-FIRST-SERVICE.png (Logo principal)
├── 📁 contact/
│   └── 🖼️ [images de contact]
├── 📁 produit/
│   └── 🖼️ [images des produits]
├── 📁 services/
│   └── 🖼️ [images des services]
├── 🖼️ ava.png (Service Avitaillement)
├── 🖼️ soutage.png (Service Soutage)
├── 🖼️ produit.png (Service Produits)
├── 🖼️ about.png (Section À Propos)
└── 🖼️ first.png (Page d'accueil)
```

### Emplacement des images dans les pages
```
📍 OÙ TROUVER LES IMAGES :

🏠 index.html :
├── Ligne 30 : 📁 images/logo/logo-FIRST-SERVICE.png
├── Ligne 83 : 📁 images/ava.png
├── Ligne 92 : 📁 images/soutage.png
├── Ligne 101 : 📁 images/produit.png
└── Ligne 144 : 📁 images/about.png

📦 produits.html :
└── Ligne 28 : 📁 images/logo/logo-FIRST-SERVICE.png

📞 contact.html :
└── Ligne 28 : 📁 images/logo/logo-FIRST-SERVICE.png
```

---

## 📝 ORGANISATION DES TEXTES ET INFORMATIONS

### Numéros de téléphone
```
📞 NUMÉROS DANS LE SITE :

🏠 index.html :
├── Ligne 20 : +225 00 00 00 00 00 (Header)
└── Ligne 178 : +225 00 00 00 00 00 (Footer)

📦 produits.html :
├── Ligne 19 : +33 5 56 00 00 00 (Header)
└── Ligne 103 : +225 00 00 00 00 00 (Footer)

📞 contact.html :
├── Ligne 20 : +225 00 00 00 00 00 (Header)
└── Ligne 103 : +225 00 00 00 00 00 (Footer)
```

### Emails
```
📧 EMAILS DANS LE SITE :

🏠 index.html :
├── Ligne 21 : contact@firstservice.ci (Header)
└── Ligne 177 : contact@firstservice.ci (Footer)

📦 produits.html :
├── Ligne 20 : contact@firstservice.fr (Header)
└── Ligne 102 : contact@firstservice.ci (Footer)

📞 contact.html :
├── Ligne 21 : contact@firstservice.ci (Header)
└── Ligne 102 : contact@firstservice.ci (Footer)
```

### Textes principaux
```
📝 TEXTES IMPORTANTS À MODIFIER :

🏠 index.html :
├── Ligne 56 : "FIRST SERVICE" (Titre principal)
├── Ligne 57-58 : Description de l'entreprise
├── Ligne 85 : "Avitaillement" (Titre service 1)
├── Ligne 86 : Description avitaillement
├── Ligne 94 : "Soutage" (Titre service 2)
├── Ligne 95 : Description soutage
├── Ligne 103 : "Produits Divers" (Titre service 3)
├── Ligne 104 : Description produits
└── Ligne 117 : "Expertise maritime au Port d'Abidjan"

📦 produits.html :
├── Ligne 51 : "Vente de Produits Divers"
├── Ligne 52-53 : Description de la page produits

📞 contact.html :
├── Ligne 51 : "Contactez-Nous"
└── Ligne 52-53 : Description de la page contact
```

---

## 🔄 NAVIGATION ENTRE LES PAGES

### Menu de navigation (identique sur toutes les pages)
```
🧭 MENU DE NAVIGATION :
├── 🏠 Accueil → index.html
├── 🛠️ Services → services.html
├── 📦 Produits → produits.html
├── 📧 Contact → contact.html
└── ⚙️ Admin → admin.html
```

### Footer (identique sur toutes les pages)
```
📱 FOOTER :
├── 📧 contact@firstservice.ci
├── 📞 +225 00 00 00 00 00
├── 🏢 Zone Portuaire, Abidjan
├── 🔗 Mentions Légales → mentions.html
├── 🔗 Confidentialité → privacy.html
└── 📅 © 2026 First Service
```

---

## 🎯 GUIDE DE MODIFICATION RAPIDE

### Pour changer une information
1. **Trouver la page** dans l'organigramme ci-dessus
2. **Ouvrir le fichier HTML** correspondant
3. **Chercher la ligne** indiquée
4. **Modifier le texte** entre les balises
5. **Sauvegarder** et tester

### Pour changer une image
1. **Trouver l'image** dans la section images
2. **Remplacer le fichier** dans le dossier `images/`
3. **Vérifier le nom** dans le code HTML
4. **Mettre à jour** si nécessaire

### Pour changer un numéro/email
1. **Chercher dans la section** "Numéros de téléphone" ou "Emails"
2. **Modifier dans tous les fichiers** listés
3. **Vérifier la cohérence** sur toutes les pages

---

## 📊 RÉSUMÉ VISUEL

```
                    🌐 FIRST SERVICE
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    📄 PAGES           🖼️ IMAGES          💾 DONNÉES
        │                  │                  │
  ┌─────┴─────┐    ┌─────┴─────┐    ┌─────┴─────┐
  │ 🏠 index   │    │ 📁 logo/  │    │ 📞 Tél    │
  │ 🛠️ services│    │ 📁 contact│    │ 📧 Email  │
  │ 📦 produits │    │ 📁 produit│    │ 📍 Adresse│
  │ 📧 contact │    │ 📁 services│    │ 📝 Textes │
  │ ⚙️ admin   │    │ 🖼️ ava.png│    │ 🔗 Liens  │
  │ 📄 mentions│    │ 🖼️ about.png│    │           │
  │ 🔒 privacy │    │ 🖼️ first.png│    │           │
  └───────────┘    └───────────┘    └───────────┘
```

*Cet organigramme permet de visualiser facilement où se trouvent toutes les informations du site !*
