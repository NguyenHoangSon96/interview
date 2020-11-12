const admin = require("firebase-admin");

function initFirebase() {
    const serviceAccount = require("../firebaseServiceAccountKey.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://linhtinh0.firebaseio.com"
    });
}

async function createUser(email, password) {
    try {
        return await admin.auth().createUser({email, password});
    } catch (e) {
        throw e
    }
}

async function getUserByEmail(email) {
    try {
        return await admin.auth().getUserByEmail(email)
    } catch (e) {
        throw e
    }
}

async function deleteUserByUid(uid) {
    try {
        await admin.auth().deleteUser(uid);
    } catch (e) {
        throw e
    }
}

module.exports = {
    initFirebase,
    createUser,
    getUserByEmail,
    deleteUserByUid,
    admin
}
