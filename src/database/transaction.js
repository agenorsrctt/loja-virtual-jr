const db = require('../database/connection');

async function beginTransaction() {
    return new Promise((resolve, reject) => {
        db.run('BEGIN TRANSACTION', (erro) => {
            if (erro) {
                reject(erro);
            } else {
                resolve();
            }
        });
    });
}

async function commitTransaction() {
    return new Promise((resolve, reject) => {
        db.run('COMMIT', (erro) => {
            if (erro) {
                reject(erro);
            } else {
                resolve();
            }
        });
    });
}

async function rollbackTransaction() {
    return new Promise((resolve, reject) => {
        db.run('ROLLBACK', (erro) => {
            if (erro) {
                reject(erro);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    beginTransaction,
    commitTransaction,
    rollbackTransaction
};