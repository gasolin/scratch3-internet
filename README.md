# scratch3-internet

[![GitHub Actions](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fgasolin%2Fscratch3-internet%2Fbadge&style=flat-square)](https://actions-badge.atrox.dev/gasolin/scratch3-internet/goto)

scratch3-internet project is aim to enable plenty of internet interactions for scratch 3 users.
scratch3-internet project also come up a easy-to-use extention setup/deploy structure, so extension developer can fork the project and start their extension development immediately.

## Getting start

```sh
git clone https://github.com/gasolin/scratch3-internet.git --depth 1
npm run setup
npm run start
```

## Blocks

currently provides
- [JSON parse blocks](https://github.com/gasolin/scratch3-internet/tree/master/vm/extensions/scratch3_json) - JSON blocks are general purpose blocks that provides JSON fetch and parse functions.
- [LASS parse blocks](https://github.com/gasolin/scratch3-internet/tree/master/vm/extensions/scratch3_lass) - LASS blocks can fetch data from https://pm25.lass-net.org/
- [IFTTT webhook block](https://github.com/gasolin/scratch3-internet/tree/master/vm/extensions/scratch3_ifttt) - [IFTTT](https://maker.ifttt.com/) webhook block can use IFTTT to connect with plenty of web services
- [ThingSpeak block](https://github.com/gasolin/scratch3-internet/tree/master/vm/extensions/scratch3_thingspeak) - [ThingSpeak](https://thingspeak.com/) block can use ThingSpeak to [save data](http://blog.ilc.edu.tw/blog/blog/868/post/97509/733185)

## Translation

Currently provide block translations for
- English (en)
- Traditional Chinsese (zh-tw)

Translation files are locate nearby the blocks definition file in the `/vm/extensions/` folder.

## Deploy

To host the scratch 3 web in your github page

```sh
npm run build
npm run deploy
```

## Reference

The project is also used for https://sites.google.com/view/osep-scratch3/ (repo https://github.com/ys-fang/OSEP)
