# scratch3-internet

[![GitHub Actions](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fgasolin%2Fscratch3-internet%2Fbadge&style=flat-square)](https://actions-badge.atrox.dev/gasolin/scratch3-internet/goto)

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
- [IFTTT webhook block](https://github.com/gasolin/scratch3-internet/tree/master/vm/extensions/scratch3_ifttt) - IFTTT webhook block can use IFTTT to connect with plenty of web services https://maker.ifttt.com/

## Translation

Currently provide block translations for
- English (en)
- Traditional Chinsese (zh-tw)

Translation files are locate nearby the blocks definition file in the `/vm/extensions/` folder.

## Deploy

To host the scratch 3 web in your github page

```sh
npm run deploy
```
