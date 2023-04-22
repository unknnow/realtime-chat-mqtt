# Realtime Chat Application with VueJS and MQTT

Ce projet est une application de chat en temps réel (CHAT) utilisant VueJS et MQTT.

**Ce projet a été réalisé dans un cadre scolaire et est destiné à des fins éducatives uniquement.**


## Fonctionnalités

- Connexion avec un nom d'utilisateur (unique)
- Chat général pour discuter avec tous les utilisateurs connectés
- Possibilité de créer des canaux de discussion publics ou privés
- Inviter des utilisateurs à rejoindre un canal de discussion
- Les utilisateurs peuvent rejoindre un canal, quitter un canal et discuter avec les autres membres du canal
- N'importe quel utilisateur peut créer un canal public ou privé
- Possibilité de discuter en privé (one-to-one) avec un autre utilisateur

## Prérequis

- Node.js
- npm

## Installation

1. Clonez le dépôt :
   ```git clone https://github.com/unknnow/realtime-chat-mqtt```
2. Naviguez vers le dossier du projet :
   ```cd realtime-chat-mqtt```
3. Installez les dépendances :
   ```npm install```
4. Exécutez l'application en mode développement :
   ```npm run serve```

Visitez `http://localhost:8080` pour accéder à l'application.

### Le fonctionnement des topics

Les topics sont utilisés pour organiser les discussions entre les utilisateurs. Ils sont basés sur le protocole MQTT et permettent de gérer les messages entre les utilisateurs de manière efficace.

1. Les canaux de discussion (channels) utilisent des topics pour échanger des messages entre les utilisateurs. Par exemple, un topic pour un canal public pourrait être `public/channel-name`.
2. Les discussions privées (one-to-one) utilisent des topics spécifiques pour échanger des messages entre deux utilisateurs. Par exemple, un topic pour une discussion privée entre deux utilisateurs pourrait être `private/user1/user2`.
3. Les topics d'invitation sont utilisés pour inviter des utilisateurs à rejoindre un canal. Par exemple, un topic d'invitation pourrait être `mp/invite/user-to-invite`.

### Gestion des utilisateurs connectés avec MQTT

Le système MQTT permet également de gérer la liste des utilisateurs connectés. Lorsqu'un utilisateur se connecte ou se déconnecte, un message est envoyé sur le topic `connected-users` ou `users/disconnected`. Les clients abonnés à ce topic mettent à jour leur liste d'utilisateurs connectés en fonction des messages reçus.

Cela permet d'afficher la liste des utilisateurs connectés en temps réel et de mettre à jour cette liste lorsque de nouveaux utilisateurs se connectent ou lorsque des utilisateurs existants se déconnectent.

### Le fonctionnement global de la solution

L'application est basée sur Vue.js pour la partie front-end et utilise le protocole MQTT pour la gestion des communications en temps réel.

1. L'utilisateur se connecte en fournissant un nom d'utilisateur unique.
2. Une fois connecté, l'utilisateur est redirigé vers la page principale où il peut interagir avec les autres utilisateurs.
3. L'utilisateur peut rejoindre un canal public, créer un nouveau canal ou discuter en privé avec un autre utilisateur.
4. Les messages sont échangés en temps réel grâce à l'utilisation du protocole MQTT et des topics associés.
5. L'utilisateur peut quitter un canal ou se déconnecter de l'application à tout moment.


## Technologies utilisées

- Vue.js
- Vue-router
- MQTT.js
- Vue CLI
- Bootstrap Vue
- Font Awesome
- Hive MQ (Broker public)

## Structure du projet

- `src/components`: Contient tous les composants Vue utilisés pour construire l'application
- `src/services`: Contient le service `mqttService` pour gérer la communication MQTT
- `src/App.vue`: Composant racine de l'application
- `src/main.js`: Point d'entrée de l'application
- `src/router.js`: Contient la configuration des routes pour l'application
