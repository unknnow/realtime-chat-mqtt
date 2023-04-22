/* global Paho */

const mqttService = {
    client: null,
    onUserConnected: null,
    onUserDisconnected: null,

    // Fonction pour se connecter au broker MQTT HiveMQ
    connect(clientId, username, onConnectionLost, onMessageArrived, onUserConnected, onUserDisconnected) {
        // Initialiser le client MQTT avec le broker, le port et l'ID client
        this.client = new Paho.MQTT.Client("broker.hivemq.com", 8000, clientId);

        // Attribuer les fonctions de rappel pour la perte de connexion et l'arrivée de messages
        this.client.onConnectionLost = onConnectionLost;
        this.client.onMessageArrived = onMessageArrived;

        // Attribuer les fonctions de rappel pour les utilisateurs qui se connectent et se déconnectent
        this.onUserConnected = onUserConnected;
        this.onUserDisconnected = onUserDisconnected;

        // Stocker le nom d'utilisateur et l'ID client
        this.username = username;
        this.clientId = clientId;

        // Se connecter au broker MQTT et configurer la présence de l'utilisateur
        this.client.connect({ onSuccess: this.setupUserPresence });
    },

    // Fonction pour configurer la présence de l'utilisateur
    setupUserPresence: () => {
        // S'abonner aux différents sujets pour les utilisateurs et les invitations
        mqttService.subscribe("users/connected");
        mqttService.subscribe("users/disconnected");
        mqttService.subscribe("users/list");
        mqttService.subscribe("invitations/" + mqttService.username);
        mqttService.subscribe("mp/invite/" + mqttService.username);

        // Publier un message pour indiquer que l'utilisateur est connecté
        const data = {
            username: mqttService.username,
            clientId: mqttService.clientId,
        };

        mqttService.publish("users/connected", data);
        mqttService.requestUserList();
    },

    // Fonction pour demander la liste des utilisateurs connectés
    requestUserList: function () {
        this.publish("users/list", {
            requesterClientId: this.clientId,
        });
    },

    // Fonction pour s'abonner à un topic
    subscribe(topic) {
        if (this.client) {
            this.client.subscribe(topic);
        }
    },

    // Fonction pour se désabonner d'un topic
    unsubscribe(topic) {
        if (this.client) {
            this.client.unsubscribe(topic);
        }
    },

    // Fonction pour publier un message sur un topic
    publish: function (topic, data) {
        // Ajouter des données supplémentaires au message, comme l'ID et le nom d'utilisateur
        const additionalData = {
            id: new Date().getTime(), // Génére un ID pratiquement unique
            username: this.username,
        };

        // Fusionner les données supplémentaires avec les données du message
        const mergedData = { ...additionalData, ...data };

        // Créer le message MQTT et définir le topic de destination
        const message = new Paho.MQTT.Message(JSON.stringify(mergedData));
        message.destinationName = topic;
        // Envoyer le message au broker MQTT
        this.client.send(message);
    },
};

// Exporte le service MQTT pour l'utiliser dans d'autres parties de l'application
export default mqttService;
