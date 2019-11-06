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
                        }
                    },
                    text: msg.onJSONReceived[theLocale]
                },
                {
                    opcode: 'readAttrFromJSON',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: 'id'
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
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: 'id'
                        },
                        n: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        attr: {
                            type: ArgumentType.STRING,
                            defaultValue: 'attr'
                        }
                    },
                    text: msg.readEntryFromJSON[theLocale]
                }
            ]
        };
    }

    fetchJSON (args, util) {
        const url = args.url;
        const id = args.id || defaultId;
        return fetch(url).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    console.log("got json set", json);
                    this.data[id] = {
                        fetched: true,
                        data: json
                    };
                    this.runtime.startHats('gasoJSON_onJSONReceived', {});
                });
            }
        });
    }

    isDataFetched (id) {
        return this.data[id] && this.data[id].fetched;
    }

    onJSONReceived (args, util){
        const id = args.id || defaultId;
        if (this.isDataFetched(id)) {
            console.log('got id ', id);
            return true;
        }
    }

    readAttrFromJSON (args, util) {
        const id = args.id || defaultId;
        const attr = args.attr;

        if (this.isDataFetched(id)) {
            console.log('show ', this.data[id].data[attr]);
            return this.data[id].data[attr];
        }
        // return msg.readEntryFromJSONErr[theLocale];
        return `錯誤： ${id}[${attr}]不存在`;
    }

    readEntryFromJSON (args, util) {
        const id = args.id || defaultId;
        const attr = args.attr;
        const n = args.n;

        if (this.isDataFetched(id)) {
            return this.data[id].data[n - 1][attr];
        }
        // return msg.readEntryFromJSONErr[theLocale];
        return `錯誤： ${id}第${n}筆資料[${attr}]不存在`;
    }
}

module.exports = gasoJSON;
