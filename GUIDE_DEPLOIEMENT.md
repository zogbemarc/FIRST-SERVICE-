# GUIDE COMPLET POUR DÉPLOYER ET PARTAGER LE PROJET
*Guide pour personnes qui ne connaissent pas Git/GitHub*

---

## 📋 TABLE DES MATIÈRES

1. [Situation actuelle du projet](#situation-actuelle)
2. [Commandes pour mettre à jour le code](#commandes-pour-mettre-a-jour)
3. [Comment l'autre personne peut récupérer le projet](#comment-recuperer)
4. [Instructions détaillées pour la personne](#instructions-pour-la-personne)

---

## 📍 SITUATION ACTUELLE DU PROJET

**Votre projet est déjà sur GitHub :**
- URL : `https://github.com/zogbemarc/FIRST-SERVICE-.git`
- Branche : `main`
- Il y a des modifications non envoyées

---

## 🚀 COMMANDES POUR METTRE À JOUR VOTRE CODE

### Étape 1 : Ajouter vos modifications
```bash
git add .
```
*Ceci ajoute tous vos fichiers modifiés et nouveaux*

### Étape 2 : Faire un commit (message de modification)
```bash
git commit -m "Ajout du guide de modification et du guide de déploiement"
```
*Explique ce que vous avez modifié*

### Étape 3 : Envoyer sur GitHub
```bash
git push
```
*Envoie vos modifications sur GitHub*

---

## 👤 COMMENT L'AUTRE PERSONNE PEUT RÉCUPÉRER LE PROJET

### Option 1 : Si elle n'a jamais le projet (recommandé)
```bash
# 1. Cloner le projet
git clone https://github.com/zogbemarc/FIRST-SERVICE-.git

# 2. Entrer dans le dossier
cd FIRST-SERVICE-

# 3. Ouvrir les fichiers avec un éditeur de texte
```

### Option 2 : Si elle a déjà une version ancienne
```bash
# 1. Aller dans le dossier du projet
cd FIRST-SERVICE-

# 2. Récupérer les dernières modifications
git pull

# 3. Si conflit, faire :
git stash
git pull
git stash pop
```

---

## 📝 INSTRUCTIONS DÉTAILLÉES POUR LA PERSONNE

### Ce qu'elle doit faire :

**1. Installer Git (si pas déjà fait)**
- Aller sur https://git-scm.com/
- Télécharger et installer
- Redémarrer l'ordinateur

**2. Préparer un dossier**
- Créer un dossier `Projets` sur son bureau
- Ouvrir l'invite de commandes (Windows + R, taper `cmd`)

**3. Récupérer le projet**
```bash
# Se placer dans le dossier Projets
cd Desktop\Projets

# Cloner le projet
git clone https://github.com/zogbemarc/FIRST-SERVICE-.git

# Entrer dans le projet
cd FIRST-SERVICE-
```

**4. Vérifier que tout est là**
```bash
# Voir les fichiers
dir

# Ouvrir le dossier dans l'explorateur
explorer .
```

**5. Modifier les fichiers**
- Ouvrir les fichiers HTML avec Notepad++ ou VS Code
- Suivre le guide `GUIDE_MODIFICATION.md`
- Sauvegarder les modifications

**6. Si elle veut envoyer ses modifications**
```bash
# Ajouter ses changements
git add .

# Faire un commit
git commit -m "Modification des informations [son nom]"

# Envoyer sur GitHub
git push
```

---

## 🔧 COMMANDES UTILES AU QUOTIDIEN

### Pour vérifier l'état
```bash
git status
```
*Montre les fichiers modifiés*

### Pour voir les modifications
```bash
git diff
```
*Montre ce qui a changé*

### Pour annuler une modification
```bash
git restore nom_du_fichier.html
```

### Pour voir l'historique
```bash
git log --oneline
```

---

## 📤 SI VOUS VOULEZ PARTAGER AVEC QUELQU'UN D'AUTRE

### Envoyer simplement le lien GitHub :
```
https://github.com/zogbemarc/FIRST-SERVICE-
```

La personne peut :
1. Voir le code en ligne
2. Télécharger le fichier ZIP
3. Ou cloner avec Git

---

## ⚠️ PROBLÈMES COURANTS ET SOLUTIONS

### "Permission denied" ?
```bash
# Configurer son identité
git config --global user.name "Son Nom"
git config --global user.email "son.email@example.com"
```

### "Merge conflict" ?
```bash
# Annuler et recommencer
git reset --hard HEAD
git pull
```

### "Git not recognized" ?
- Redémarrer l'ordinateur après avoir installé Git
- Ou réinstaller Git

---

## 🎯 RÉCAPITULATIF RAPIDE

**Pour vous (envoyer vos modifications) :**
```bash
git add .
git commit -m "message"
git push
```

**Pour l'autre personne (récupérer) :**
```bash
git clone https://github.com/zogbemarc/FIRST-SERVICE-.git
cd FIRST-SERVICE-
```

**Pour mettre à jour plus tard :**
```bash
git pull
```

---

## 📞 SI BESOIN D'AIDE

1. **Vérifier la connexion internet**
2. **S'assurer que Git est bien installé**
3. **Utiliser les commandes exactement comme écrites**
4. **Ne pas hésiter à demander de l'aide**

*Le projet est maintenant prêt à être partagé et modifié par plusieurs personnes !*
