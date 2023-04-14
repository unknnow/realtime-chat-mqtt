/* global Paho */

const mqttService = {
    client: null,
    onUserConnected: null,
    onUserDisconnected: null,

    connect(clientId, username, onConnectionLost, onMessageArrived, onUserConnected, onUserDisconnected) {
        this.client = new Paho.MQTT.Client("broker.hivemq.com", 8000, clientId);

        this.client.onConnectionLost = onConnectionLost;
        this.client.onMessageArrived = onMessageArrived;

        this.onUserConnected = onUserConnected;
        this.onUserDisconnected = onUserDisconnected;

        this.username = username;
        this.clientId = clientId;

        this.client.connect({ onSuccess: this.setupUserPresence });
    },

    setupUserPresence: () => {
        mqttService.subscribe("users/connected");
        mqttService.subscribe("users/disconnected");
        mqttService.subscribe("users/list");

        const data = {
            username: mqttService.username,
            clientId: mqttService.clientId,
        };

        mqttService.publish("users/connected", data);
        mqttService.requestUserList();
    },

    requestUserList: function () {
        this.publish("users/list", {
            requesterClientId: this.clientId,
        });
    },

    subscribe(topic) {
        if (this.client) {
            this.client.subscribe(topic);
        }
    },

    unsubscribe(topic) {
        if (this.client) {
            this.client.unsubscribe(topic);
        }
    },


    publish: function (topic, data) {
        const additionalData = {
            id: new Date().getTime(), // Permet d'avoir une valeur pratiquement unique
            username: this.username,
        };

        const mergedData = { ...additionalData, ...data };

        const message = new Paho.MQTT.Message(JSON.stringify(mergedData));
        message.destinationName = topic;
        this.client.send(message);
    },
};

export default mqttService;
