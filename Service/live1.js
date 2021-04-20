let server = 'https://war-service-live.foxholeservices.com/api'
const utils = require('../utils/utils')
const Service = require('./FoxholeService')
const fs =require('fs/promises');
const path = require('path');
class Live1 {
    constructor(init) {
        this.init = init
        this.service = new Service()
    }

    /**
     *  Get Live1 information on the war
     * @returns {Promise<Object>}
     */

    getWarInfo() {
        return new Promise((resolve, reject) => {
            if (this.service.IsInit()) {
                utils.request(server + "/worldconquest/war").then((data) => {
                    resolve(JSON.parse(data))
                })
            } else {
                console.trace('[FOXHOLE API WRAPPER] Foxhole api wrapper is not initialized please use .init() function')
            }
        })
    }

    getAllMaps(){
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../data/mapsLive1.json')).then((data) => {
                resolve(JSON.parse(data))
            })
        })
    }

    getCasualties(){
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../data/casualtiesLive1.json')).then((data) => {
                resolve(JSON.parse(data))
            })
        })
    }
}

module.exports = Live1
