const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const msg = require('./translation');
const formatMessage = require('format-message');

const menuIconURI = null;
const blockIconURI = null;

const defaultId = 'default';
let theLocale = null;

class gasoJSON {
    constructor (runtime) {
        theLocale = this._setLocale();
        this.runtime = runtime;
        // communication related
        this.comm = runtime.ioDevices.comm;
        this.session = null;
        this.runtime.registerPeripheralExtension('gasoJSON', this);
        // session callbacks
        this.reporter = null;
        this.onmessage = this.onmessage.bind(this);
        this.onclose = this.onclose.bind(this);
        this.write = this.write.bind(this);
        // string op
        this.decoder = new TextDecoder();
        this.lineBuffer = '';

        this.data = {};
        this.emptyObj = {
            VALUE: {}
        };
    }

    onclose () {
        this.session = null;
    }

    write (data, parser = null) {
        if (this.session) {
            return new Promise(resolve => {
                if (parser) {
                    this.reporter = {
                        parser,
                        resolve
                    };
                }
                this.session.write(data);
            });
        }
    }

    onmessage (data) {
        const dataStr = this.decoder.decode(data);
        this.lineBuffer += dataStr;
        if (this.lineBuffer.indexOf('\n') !== -1){
            const lines = this.lineBuffer.split('\n');
            this.lineBuffer = lines.pop();
            for (const l of lines) {
                if (this.reporter) {
                    const {parser, resolve} = this.reporter;
                    resolve(parser(l));
                }
            }
        }
    }

    scan () {
        this.comm.getDeviceList().then(result => {
            this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
        });
    }

    _setLocale () {
        let nowLocale = '';
        switch (formatMessage.setup().locale) {
        case 'zh-tw':
            nowLocale = 'zh-tw';
            break;
        default:
            nowLocale = 'en';
            break;
        }
        return nowLocale;
    }

    getInfo () {
        theLocale = this._setLocale();

        return {
            id: 'gasoJSON',
            name: msg.name[theLocale],
            color1: '#4a90e2',
            color2: '#4a90e2',
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'fetchJSON',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        url: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://'
                        },
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: 'id'
                        }
                    },
                    text: msg.fetchJSON[theLocale]
                },
                {
                    opcode: 'onJSONReceived',
                    blockType: BlockType.HAT,
                    isEdgeActivated: false,
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: 'id'
                        },
                        variable: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        }
                    },
                    text: msg.onJSONReceived[theLocale]
                },
                {
                    opcode: 'readFromJSON',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: 'id'
                        }
                    },
                    text: msg.readFromJSON[theLocale]
                },
                {
                    opcode: 'readAttrFromJSON',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        variable: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        },
                        attr: {
                            type: ArgumentType.STRING,
                            defaultValue: 'attr'
                        }
                    },
                    text: msg.readAttrFromJSON[theLocale]
                },
                {
                    opcode: 'readEntryFromJSON',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        variable: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        },
                        n: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    },
                    text: msg.readEntryFromJSON[theLocale]
                }
            ]
        };
    }

    fetchJSON (args) {
        const url = args.url;
        const id = args.id || defaultId;
        return fetch(url).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    console.log("got json set", json);
                    this.data[id] = {
                        fetched: true,
                        data: JSON.stringify(json)
                    };
                    this.runtime.startHats('gasoJSON_onJSONReceived', {});
                });
            }
        });
    }

    isDataFetched (id) {
        return this.data[id] && this.data[id].fetched;
    }

    // scratch-vm/src/blocks/scratch3_data.js
    // setVariableTo (args, util) {
    //     const variable = util.target.lookupOrCreateVariable(
    //         args.VARIABLE.id, args.VARIABLE.name);
    //     variable.value = args.VALUE;

    //     if (variable.isCloud) {
    //         util.ioQuery('cloud', 'requestUpdateVariable', [variable.name, args.VALUE]);
    //     }
    // }

    onJSONReceived (args){
        const id = args.id || defaultId;
        if (this.isDataFetched(id)) {
            console.log('got data with id ', id);
            return true;
        }
    }

    readFromJSON (args) {
        const id = args.id || defaultId;
        if (this.isDataFetched(id)) {
            console.log('return ', this.data[id].data);
            return this.data[id].data;
        }
        return msg.readFromJSONErr[theLocale];
    }

    readAttrFromJSON (args) {
        const variable = args.variable || this.emptyObj;
        const attr = args.attr;
        try {
            const parsed = JSON.parse(variable);
            const data = parsed[attr];
            return typeof data === 'string' ? data : JSON.stringify(data);
        } catch (err) {
            return `Error: ${err}`;
        }
    }

    readEntryFromJSON (args) {
        const variable = args.variable || this.emptyObj;
        const n = args.n;
        try {
            const parsed = JSON.parse(variable);
            const data = parsed[n - 1];
            return typeof data === 'string' ? data : JSON.stringify(data);
        } catch (err) {
            return `Error: ${err}`;
        }
    }
}

module.exports = gasoJSON;
