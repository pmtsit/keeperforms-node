const KeeperClient = require('../lib/').default;

const keeperClient = new KeeperClient('uris', '4830750d-6baf-a73e-923d-b8050ba1d28d');

keeperClient.getClients().then((clients) => console.log(JSON.stringify(clients)));
