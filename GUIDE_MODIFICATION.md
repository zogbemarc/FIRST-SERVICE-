# GUIDE COMPLET POUR MODIFIER LE SITE FIRST SERVICE
*Guide pour personnes qui ne connaissent pas le code*

---

## 📋 TABLE DES MATIÈRES

1. [Où trouver les images dans le projet](#où-trouver-les-images)
2. [Comment ajouter/changer une image](#comment-ajouterchanger-une-image)
3. [Comment modifier les textes et informations](#comment-modifier-les-textes)
4. [Comment changer les numéros de téléphone](#comment-changer-les-numéros)
5. [Exemples pratiques avec votre projet](#exemples-pratiques)

---

## 🖼️ OÙ TROUVER LES IMAGES DANS LE PROJET

### Structure des dossiers d'images :
```
images/
├── logo/
│   └── logo-FIRST-SERVICE.png     # Logo principal du site
├── ava.png                         # Image pour service "Avitaillement"
├── soutage.png                     # Image pour service "Soutage"
├── produit.png                     # Image pour service "Produits Divers"
├── about.png                       # Image de la section "À propos"
└── first.png                       # Image d'accueil
```

---

## 📸 COMMENT AJOUTER/CHANGER UNE IMAGE

### Étape 1 : Préparer votre nouvelle image
1. **Format recommandé** : PNG, JPG ou WEBP
2. **Taille idéale** : moins de 2 Mo pour un chargement rapide
3. **Nommez simplement** : pas d'espaces, utilisez des tirets (ex: `nouveau-service.png`)

### Étape 2 : Placer l'image dans le bon dossier
1. Allez dans le dossier `images/`
2. Copiez votre nouvelle image dans ce dossier
3. **Exemple** : si vous voulez changer l'image d'avitaillement, remplacez `ava.png`

### Étape 3 : Mettre à jour le code HTML
Ouvrez le fichier HTML correspondant avec un éditeur de texte (comme Notepad++) :

**Pour changer l'image d'avitaillement dans `index.html` :**
```html
<!-- Ligne 83 environ -->
<img src="images/ava.png" alt="Avitaillement Maritime" class="icon-img">
```
Remplacez `ava.png` par le nom de votre nouvelle image.

**Pour changer le logo :**
```html
<!-- Ligne 30 dans index.html et autres pages -->
<img src="images/logo/logo-FIRST-SERVICE.png" alt="Logo FIRST SERVICE" style="height:50px;">
```

---

## ✏️ COMMENT MODIFIER LES TEXTES ET INFORMATIONS

### Dans les fichiers HTML
Les textes sont directement visibles dans les fichiers HTML. Ouvrez-les avec un éditeur de texte.

**Exemple dans `index.html` :**
```html
<!-- Ligne 56 - Titre principal -->
<h1 class="display-3 fw-bold mb-4 typewriter">FIRST SERVICE</h1>

<!-- Ligne 57-58 - Description -->
<p class="lead mb-5 fs-4">L'excellence au service de vos escales...</p>
```

**Pour modifier :**
1. Repérez le texte entre les balises HTML
2. Changez simplement le contenu
3. Sauvegardez le fichier

---

## 📞 COMMENT CHANGER LES NUMÉROS DE TÉLÉPHONE

### Numéros apparaissent dans plusieurs fichiers :

**Dans `index.html` (ligne 20) :**
```html
<span><i class="bi bi-telephone-outbound me-1"></i>+225 00 00 00 00 00</span>
```

**Dans `produits.html` (ligne 19) :**
```html
<span><i class="bi bi-telephone-outbound me-1"></i>+33 5 56 00 00 00</span>
```

**Dans les pieds de page (footer) :**
```html
<!-- Ligne 178 dans index.html -->
<li class="mb-3 d-flex align-items-center">
  <i class="bi bi-telephone text-primary me-3 fs-5"></i>+225 00 00 00 00 00
</li>
```

### Pour changer :
1. Ouvrez chaque fichier HTML
2. Recherchez avec Ctrl+F le numéro actuel
3. Remplacez par le nouveau numéro
4. Sauvegardez

---

## 🎯 EXEMPLES PRATIQUES AVEC VOTRE PROJET

### Exemple 1 : Changer l'image de service "Avitaillement"
1. **Préparer** : Nouvelle image nommée `avitaillement-nouveau.png`
2. **Placer** : Mettez-la dans le dossier `images/`
3. **Modifier** : Dans `index.html`, ligne 83 :
   ```html
   <!-- AVANT -->
   <img src="images/ava.png" alt="Avitaillement Maritime" class="icon-img">
   
   <!-- APRÈS -->
   <img src="images/avitaillement-nouveau.png" alt="Avitaillement Maritime" class="icon-img">
   ```

### Exemple 2 : Changer le titre de la page d'accueil
Dans `index.html`, ligne 56 :
```html
<!-- AVANT -->
<h1 class="display-3 fw-bold mb-4 typewriter">FIRST SERVICE</h1>

<!-- APRÈS -->
<h1 class="display-3 fw-bold mb-4 typewriter">MARITIME SERVICE PRO</h1>
```

### Exemple 3 : Changer l'email de contact
Dans `index.html`, ligne 21 :
```html
<!-- AVANT -->
<span><i class="bi bi-envelope me-1"></i>contact@firstservice.ci</span>

<!-- APRÈS -->
<span><i class="bi bi-envelope me-1"></i>info@maritime-service.com</span>
```

### Exemple 4 : Changer le numéro de téléphone partout
1. Ouvrir `index.html`
2. Ctrl+F pour chercher `+225 00 00 00 00 00`
3. Remplacer par `+225 07 00 00 00 00`
4. Faire la même chose dans `produits.html`, `services.html`, etc.

---

## 📁 FICHIERS À MODIFIER SELON VOS BESOINS

| Ce que vous voulez changer | Fichier(s) à modifier | Ligne(s) approximative(s) |
|---------------------------|----------------------|--------------------------|
| Logo du site | Tous les fichiers HTML | Ligne 30 |
| Numéro de téléphone principal | `index.html` | Ligne 20 |
| Email de contact | `index.html` | Ligne 21 |
| Titre de la page d'accueil | `index.html` | Ligne 56 |
| Description de l'entreprise | `index.html` | Ligne 57-58 |
| Images des services | `index.html` | Lignes 83, 92, 101 |
| Image "À propos" | `index.html` | Ligne 144 |
| Informations du pied de page | Tous les fichiers HTML | Lignes 160-190 |

---

## ⚠️ CONSEILS IMPORTANTS

1. **Sauvegardez toujours** avant de modifier
2. **Testez après chaque modification** : ouvrez la page dans votre navigateur
3. **Respectez la structure HTML** : ne supprimez pas les balises, seulement le contenu
4. **Pour les images** : gardez les mêmes dimensions si possible
5. **N'hésitez pas** à demander de l'aide si quelque chose ne fonctionne pas

---

## 🚀 RÉCAPITULATIF RAPIDE

1. **Images** : Mettez-les dans `images/` → changez le nom dans le code HTML
2. **Textes** : Ouvrez les fichiers HTML → modifiez directement entre les balises
3. **Numéros** : Cherchez avec Ctrl+F → remplacez partout
4. **Testez** : Actualisez votre navigateur (F5) pour voir les changements

*C'est tout ! Avec ce guide, vous pouvez modifier toutes les informations importantes du site sans connaître le code.*
