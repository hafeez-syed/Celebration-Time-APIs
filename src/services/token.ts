/**
 * Created by Hafeez on 10/11/2016.
 */
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import nodeLocalStorage from 'node-localstorage';

const LocalStorage = nodeLocalStorage.LocalStorage;
const jwtSecret = Buffer.from('sdfkja(hsdkf345k+3bbk)3j45b/sdf88K6L$hpqyme*RObj38VKCr=jipiu0yUd-kZ0@hb02AS__tW8O5NNS2GGa#k-GtrhxMDSY!M_f', 'base64');
const jwtExpress = expressJWT({ secret: jwtSecret });
const storage = new LocalStorage('./services/token');
const storageKey = 'auth-token';
let token;


function setToken(email) {
    if (email) {
        token = jwt.sign({
            email
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

export = {
    clearToken,
    getToken,
    jwtExpress,
    setToken,
};
