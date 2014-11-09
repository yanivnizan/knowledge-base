---
layout: "content"
image: "Storage"
title: "Storage"
text: ""
position: 5
theme: 'soomla'
collection: 'soomla_levelup'
---

#Storage

##About

LevelUp will keep your game's state encrypted in SOOMLA's on-device key-value database technology. You don't need to take care of these things ever again, just let LevelUp take care of it for you and query for whatever you need using the API in [LevelUp's model](/docs/soomla/levelup/Model) objects.

Because LevelUp is a dependent module on SOOMLA's Store module, it's recommended that you also read about Store [Storage](/docs/soomla/store/Storage).

##Storage Internals

These are the classes that make up the storages of LevelUp. We highly recommend that you avoid accessing the storages directly, and instead use the convenient functions provided in each of the LevelUp model objects. For example, use the function `isCompleted` that is provided in `World`, and not the one in `WorldStorage`.

- `WorldStorage`

- `LevelStorage`

- `ScoreStorage`

- `GateStorage`

- `MissionStorage`
