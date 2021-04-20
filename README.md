# Foxhole-API-Wrapper
A NPM package for foxhole

## Install 
`npm i foxhole-api-wrapper`

## Usage

``` js
const FoxHoleApi = require('foxhole-api-wrapper')
const foxhole = new FoxHoleApi()

foxhole.foxholeService.init() // Init module /!\ IT'S REQUIRED /!\
```


## Fonction

### getWarInfo()

   Return a promise war info of current war

```js
const FoxHoleApi = require('foxhole-api-wrapper')
const foxhole = new FoxHoleApi()
foxhole.foxholeService.init()

//Return Live1 war info
foxhole.live1.getWarInfo().then((data) =>{
    console.log(data)
})

//Return Live2 war info
foxhole.live2.getWarInfo().then((data) =>{
    console.log(data)
})
```
### getAllMaps()

   Return a promise with all map name

```js
const FoxHoleApi = require('foxhole-api-wrapper')
const foxhole = new FoxHoleApi()
foxhole.foxholeService.init()

//Return Live1 maps
foxhole.live1.getAllMaps().then((data) =>{
    console.log(data)
})

//Return Live2 maps
foxhole.live2.getAllMaps().then((data) =>{
    console.log(data)
})
```

### getCasualties()

   Return a promise with all Casualties for each maps and global maps

```js
const FoxHoleApi = require('foxhole-api-wrapper')
const foxhole = new FoxHoleApi()
foxhole.foxholeService.init()

//Return Live1 casualties
foxhole.live1.getCasualties().then((data) =>{
    console.log(data)
})

//Return Live2 casualties
foxhole.live2.getCasualties().then((data) =>{
    console.log(data)
})
```
