/**
 * Created by Hafeez on 10/11/2016.
 */

var jwt = require('jsonwebtoken'),
    expressJWT = require('express-jwt'),
    LocalStorage = require('node-localstorage').LocalStorage,
    jwtSecret = Buffer.from('sdfkja(hsdkf345k+3bbk)3j45b/sdf88K6L$hpqyme*RObj38VKCr=jipiu0yUd-kZ0@hb02AS__tW8O5NNS2GGa#k-GtrhxMDSY!M_f', 'base64'),
    jwtExpress = expressJWT({
        secret: jwtSecret
    }),
    token,
    storage = new LocalStorage('./services/token'),
    storageKey = 'auth-token';


function setToken(email) {
    if (email) {
        token = jwt.sign({
            email: email
        }, jwtSecret, { expiresIn: '1h' });

        storage.setItem(storageKey, token);
    }
}

function getToken() {
    return storage.getItem(storageKey);
}

function clearToken() {
    storage.removeItem(storageKey);
}

module.exports = {
    jwtExpress: jwtExpress,
    setToken: setToken,
    getToken: getToken,
    clearToken: clearToken
}