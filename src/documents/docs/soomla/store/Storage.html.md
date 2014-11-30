---
layout: "content"
image: "Storage"
title: "Storage"
text: "You users get access to their data even when there’s no internet around. Our encrypted local storage is designed just for that."
position: 4
theme: 'soomla'
collection: 'soomla_store'
---

#**Storage & Metadata**

##How SOOMLA storage works

Every user that downloads your game will have local, on-device storage that is encrypted and kept in an SQLite database. `SoomlaStore` is the only class you need to initialize in order to use the SOOMLA SDK.

Upon initialization, `SoomlaStore` initializes `StoreInfo`. The first time your game is loaded, `StoreInfo` is initialized with your implementation of `IStoreAssets`. On that first time, your virtual economy’s metadata is saved on the local database on your users’ devices. After that it is always initialized from the database.

If at some point you want to change the metadata, you will have to bump up the version number in the `getVersion` function in your implementation of `IStoreAssets`, in order for your users to see your changes. The value of `getVersion` will determine if the saved data in the local (on-device) database will be deleted or not. You'll need to bump the version after ANY change in order to see the changes, otherwise your store’s metadata will always be loaded from the local database, hence your changes will not be shown. Keep this in mind when you release updates to your users.

<div class="info-box">In case you are using the SOOMLA Highway or Storefront, you do NOT need to bump the version after changes, because they allow updating the economy remotely without re-distributing your game.</div>

##Security

SOOMLA keeps the game's data in an encrypted database, and uses the AES (Advanced Encryption Standard) algorithm for encryption. This algorithm is a standard symmetric encryption algorithm used to secure the user's data on the device. AES is a common approach to solve this kind of problem. To learn more about AES read [here](http://en.wikipedia.org/wiki/Advanced_Encryption_Standard).

If you want to protect your game from 'bad people' (and who doesn't?!), you might want to follow some guidelines:

- SOOMLA keeps the game's data in an encrypted database. In order to encrypt your data, SOOMLA generates a private key out of several parts of information. The Soomla Secret (before v3.4.1 is was called customSec) is one of them. SOOMLA recommends that you provide this value when initializing SoomlaStore and before you release your game.

  <div class="warning-box">You can change this value once! If you try to change it again, old data from the database will become unavailable.</div>

- Following Google's recommendation, SOOMLA also recommends that you split your public key and construct it on runtime or even use bit manipulation on it in order to hide it. The key itself is not secret information but if someone replaces it, your application might receive fake messages that might harm it.

##**Useful Classes**
To further understand how SOOMLA handles storage, below are descriptions about each of the relevant classes.

###StoreInventory
`StoreInventory` is a utility class that provides you with functions that perform store-related operations. With `StoreInventory` you can give or take items from your users, buy items or upgrade them, and also check their equipping status and change it.

**Some of StoreInventory’s useful functions are:**

<div class="info-box">The names and signatures of the functions may vary across the available platforms but their purposes are the same.</div>

- **buy(String itemId)**

  Buys the item with the given `itemId`, either with real money ($$) or with other virtual items.

- **giveVirtualItem(String itemId, int amount)**

  Gives your user the given amount of the virtual items with the given `itemId`. For example, when your user plays your game for the first time you GIVE him/her 1000 gems.

    <div class="info-box">This action is different than `buy`; You use `give` to give your user something for free. You use `buy` to give your user something and get something in return (either money or other virtual goods).</div>

- **takeItem(String itemId, int amount)**

  Takes from your user the given `amount` of the virtual item with the given `itemId`.

- **equipVirtualGood(String goodItemId)**

  Equips the given virtual good with the given `goodItemId`. Equipping means that your user decides to currently use a specific virtual good. To understand more about equipping see [EquippableVG](/docs/soomla/store/EconomyModel#equippablevg).

###StoreInfo
This class holds all of the metadata information about your specific game. It is initialized with your implementation of `IStoreAssets` and you can use it to retrieve information about your specific game. `StoreInfo` holds your store's:

- Virtual currencies
- Virtual currency packs
- Virtual goods of all kinds
- Virtual categories

`StoreInfo` can be questioned about the existence of `VirtualItem`s and the associations between them.
`StoreInfo` is always initialized from the database, except for the first time the game is loaded - in that case it is initialized with your implementation of `IStoreAssets`. When your game loads for the first time, the virtual economy's metadata is saved, and from that moment on it'll be loaded from the database.

##**Storage Internals**

This section describes the internal classes that make up the storage. We highly recommend that you avoid accessing these storage mechanisms directly (except for `KeyValueStorage` - see below), and instead use `StoreInventory`’s convenient functions.

###StorageManager
Here all the storage-related instances of your game are created. These include the following (all of which are described below):

- `KeyValueStorage`
- `VirtualCurrencyStorage`
- `VirtualGoodsStorage`

You use the `StorageManager`’s getter functions to access these different storages. Then you will be able to use the different storages’ available functions to perform actions such as set/get an item’s balance, add/remove an item from the storage, etc…

####**For Example**
Get the current balance of a virtual good with item ID "green_hat":

**Android:**

``` java
VirtualGood greenHat = (VirtualGood)StoreInfo.getVirtualItem("green_hat");
int greenHatsBalance = StorageManager.getVirtualGoodsStorage().getBalance(greenHat);
```

**iOS:**

``` objectivec
VirtualGood* greenHat = (VirtualGood*)[[StoreInfo getInstance] virtualItemWithId:@"green_hat"];
int greenHatsBalance = [[[StorageManager getInstance] virtualGoodStorage] balanceForItem:greenHat];
```

###KeyValueStorage

`KeyValStorage` represents a simple key-value store, and contains functions to manipulate the key-value database. These are mostly simple functions that perform operations such as get (or set) the value of a key-val pair, or delete a key-val pair.

<div class="info-box">SOOMLA uses this key value storage for its own needs but you can choose to use it for your own storage purposes, as well. Make sure to use your own keys and not the ones that SOOMLA uses (which can be found in the class KeyValueDatabase).</div>
