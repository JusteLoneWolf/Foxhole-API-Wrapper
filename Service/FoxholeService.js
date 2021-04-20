const fs =require('fs/promises');
const path = require('path');
const utils = require('../utils/utils');
let initialized = false
class FoxHoleService {
    constructor() {

    }

    /**
     *  Initialize wrapper
     * @returns {Promise<unknown>}
     */
    init() {
        FoxHoleService.setInit(true)

        return new Promise((resolve, reject) => {
            //Fetch all maps of Live1 and Live2
            utils.request('https://war-service-live.foxholeservices.com/api/worldconquest/maps').then((data) => {
                fs.writeFile(path.resolve(__dirname, '../data/mapsLive1.json'), data)
                console.log('[FOXHOLE API WRAPPER] All maps of Live1 fetch !')
                utils.request('https://war-service-live-2.foxholeservices.com/api/worldconquest/maps').then((data) => {
                    fs.writeFile(path.resolve(__dirname, '../data/mapsLive2.json'), data)
                    console.log('[FOXHOLE API WRAPPER] All maps of Live2 fetch !')

                    fs.readFile(path.resolve(__dirname, '../data/mapsLive2.json')).then((data) => {
                        let mapData = {
                            maps:{},
                            total: {
                                warden: 0,
                                colonial: 0,
                                combined:0
                            }
                        }
                        let parseMapName = JSON.parse(data)
                        for (const map of parseMapName) {

                            utils.request('https://war-service-live-2.foxholeservices.com/api/worldconquest/warReport/' + map).then((data) => {
                                let {colonialCasualties, wardenCasualties} = JSON.parse(data)
                                mapData.total.colonial += colonialCasualties
                                mapData.total.warden += wardenCasualties
                                mapData.total.combined += colonialCasualties
                                mapData.total.combined += wardenCasualties

                                Object.assign(mapData.maps, {
                                        [map]: {
                                            colonialCasualties,
                                            wardenCasualties,
                                            totalCasualties: wardenCasualties + colonialCasualties
                                        }

                                })
                                fs.writeFile(path.resolve(__dirname, '../data/casualtiesLive2.json'), JSON.stringify(mapData, null, 2))
                            })
                        }
                    })

                    fs.readFile(path.resolve(__dirname, '../data/mapsLive1.json')).then((data) => {
                        let mapData = {
                            maps:{},
                            total: {
                                warden: 0,
                                colonial: 0,
                                combined:0
                            }
                        }
                        let parseMapName = JSON.parse(data)
                        for (const map of parseMapName) {

                            utils.request('https://war-service-live-2.foxholeservices.com/api/worldconquest/warReport/' + map).then((data) => {
                                let {colonialCasualties, wardenCasualties} = JSON.parse(data)
                                mapData.total.colonial += colonialCasualties
                                mapData.total.warden += wardenCasualties
                                mapData.total.combined += colonialCasualties
                                mapData.total.combined += wardenCasualties

                                Object.assign(mapData.maps, {
                                    [map]: {
                                        colonialCasualties,
                                        wardenCasualties,
                                        totalCasualties: wardenCasualties + colonialCasualties
                                    }

                                })
                                fs.writeFile(path.resolve(__dirname, '../data/casualtiesLive1.json'), JSON.stringify(mapData, null, 2))
                            })
                        }
                    })
                }).catch((err) => {
                    console.error('[FOXHOLE API WRAPPER] Live2 ' + err)
                })
            }).catch((err) => {
                console.error('[FOXHOLE API WRAPPER] Live1 ' + err)
            })
            FoxHoleService.Job()
        })
    }

    static setInit(status) {
        console.log('[FOXHOLE API WRAPPER] Initialized, is now ready to use!')

        initialized = status
    }

    IsInit() {
        return initialized
    }

    static UpdateJSON() {
        return new Promise((resolve, reject) => {
            utils.request('https://war-service-live.foxholeservices.com/api/worldconquest/maps').then((data) => {
                fs.writeFile(path.resolve(__dirname, '../data/mapsLive1.json'), data)
            }).catch((err) => {
                console.error('[FOXHOLE API JOB] Live1 ' + err)
            })
            utils.request('https://war-service-live-2.foxholeservices.com/api/worldconquest/maps').then((data) => {
                fs.writeFile(path.resolve(__dirname, '../data/mapsLive2.json'), data)
            }).catch((err) => {
                console.error('[FOXHOLE API JOB] Live2 ' + err)
            })
            resolve()
        })

    }

    static Job() {
        setInterval(() => {
            FoxHoleService.UpdateJSON().then(() => {
                fs.readFile(path.resolve(__dirname, '../data/mapsLive2.json')).then((mapLive2data) => {
                    let mapData = {}
                    let parseMapName = JSON.parse(mapLive2data)
                    for (const map of parseMapName) {

                        utils.request('https://war-service-live-2.foxholeservices.com/api/worldconquest/warReport/' + map).then((data) => {
                            let {colonialCasualties, wardenCasualties} = JSON.parse(data)
                            Object.assign(mapData, {
                                [map]: {
                                    colonialCasualties,
                                    wardenCasualties,
                                    totalCasualties: wardenCasualties + colonialCasualties
                                }
                            })
                            fs.writeFile(path.resolve(__dirname, '../data/casualtiesLive2.json'), JSON.stringify(mapData, null, 2))
                        })
                    }
                })
            })


            fs.readFile(path.resolve(__dirname, '../data/mapsLive1.json')).then((mapLive1data) => {
                let mapData = {}
                let parseMapName = JSON.parse(mapLive1data)
                for (const map of parseMapName) {

                    utils.request('https://war-service-live.foxholeservices.com/api/worldconquest/warReport/' + map).then((data) => {
                        let {colonialCasualties, wardenCasualties} = JSON.parse(data)
                        Object.assign(mapData, {
                            [map]: {
                                colonialCasualties,
                                wardenCasualties,
                                totalCasualties: wardenCasualties + colonialCasualties
                            }
                        })
                        fs.writeFile(path.resolve(__dirname, '../data/casualtiesLive1.json'), JSON.stringify(mapData, null, 2))
                    })
                }
            })
        }, 60000)
    }
}



module.exports =FoxHoleService
