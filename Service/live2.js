let server = 'https://war-service-live-2.foxholeservices.com/api'
const utils = require('../utils/utils')
const fs =require('fs/promises');
const path = require('path');
const Service = require('./FoxholeService')
class Live2 {
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

    /**
     * Get all maps name
     * @returns {Promise<Array>}
     */

    getAllMaps() {
        return new Promise((resolve, reject) => {
            if (this.service.IsInit()) {

                fs.readFile(path.resolve(__dirname, '../data/mapsLive2.json')).then((data) => {
                    resolve(JSON.parse(data))
                })
            } else {
                console.trace('[FOXHOLE API WRAPPER] Foxhole api wrapper is not initialized please use .init() function')
            }
        })
    }
    /**
     * Get casualties for each maps and global
     * @returns {Promise<Object>}
     */


    getCasualties() {
        return new Promise((resolve, reject) => {
            if (this.service.IsInit()) {

                fs.readFile(path.resolve(__dirname, '../data/casualtiesLive2.json')).then((data) => {
                    resolve(JSON.parse(data))
                })
            } else {
                console.trace('[FOXHOLE API WRAPPER] Foxhole api wrapper is not initialized please use .init() function')
            }
        })
    }
}

module.exports = Live2
