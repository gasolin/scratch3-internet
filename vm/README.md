1. copy extension to `scratch-vm/src/extensions/`
2. patch `scratch-vm/src/extension-support/extension-manager.js`

    gasoIFTTT: () => require('../extensions/scratch3_ifttt'),
    gasoJSON: () => require('../extensions/scratch3_json'),
    gasoLASS: () => require('../extensions/scratch3_lass'),
    gasoThingSpeak: () => require('../extensions/scratch3_thingspeak'),

Can refer core blocks scratch-vm/src/blocks
