const FoxholeService = require('./Service/FoxholeService')
const Live1 = require('./Service/live1');
const Live2 = require('./Service/live2');

    class FoxHoleApi {
        constructor() {
            this.foxholeService = new FoxholeService()
            this.live1 = new Live1()
            this.live2 = new Live2()
        }
    }



module.exports =FoxHoleApi
