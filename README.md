# scratch3-internet

[![GitHub Actions](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fgasolin%2Fscratch3-internet%2Fbadge&style=flat-square)](https://actions-badge.atrox.dev/gasolin/scratch3-internet/goto)

## Getting start

```
git clone https://github.com/gasolin/scratch3-internet.git
npm run setup
npm run start
```

## Update submodules

```sh
git submodule update --init
```

This will clone `scratch-gui` and `scratch-vm` as submodules.

## Blocks

currently provides
- [JSON parse blocks](https://github.com/gasolin/scratch3-internet/tree/master/vm/extensions/scratch3_json) - JSON blocks are general purpose blocks that provides JSON fetch and parse functions.
- [LASS parse blocks](https://github.com/gasolin/scratch3-internet/tree/master/vm/extensions/scratch3_lass) - LASS blocks can fetch data from https://pm25.lass-net.org/

## Translation

Currently provide block translations for
- English (en)
- Traditional Chinsese (zh-tw)

Translation files are locate nearby the blocks definition file in the `/vm/extensions/` folder.
