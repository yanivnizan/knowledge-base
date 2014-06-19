---
layout: "content"
image: "Storage"
title: "Storage"
text: "SOOMLA provides game developers with local storage and functionality to maintain it."
position: 4
theme: 'soomla'
collection: 'soomla_store'
---

#**Storage & Metadata**

##How SOOMLA storage works

Every user that downloads your game will have local, on-device storage that is encrypted and kept in an SQLite database. `StoreController` is the only class you need to initialize in order to use the SOOMLA SDK.

Upon initialization, `StoreController` initializes `StoreInfo`. The first time your game is loaded, `StoreInfo` is initialized with your implementation of `IStoreAssets`. On that first time, your virtual economy’s metadata is saved on the local database on your users’ devices. After that it is always initialized from the database.

If at some point you want to change the metadata, you will have to bump up the version number in the `getVersion` function in your implementation of `IStoreAssetes`, in order for your users to see your changes. The value of `getVersion` will determine if the saved data in the local (on-device) database will be deleted or not. You'll need to bump the version after ANY change in order to see the changes, otherwise your store’s metadata will always be loaded from the local database, hence your changes will not be shown. Think about this when you release updates to your users.

<div class="info-box">
In case you are using the SOOMLA Highway or Storefront, you do NOT need to bump the version after changes, because they allow updating the economy remotely without re-distributing your game.
</div>

##Security

SOOMLA keeps the game's data in an encrypted database, and uses the AES (Advanced Encryption Standard) algorithm for encryption. This algorithm is a standard symmetric encryption algorithm used to secure the user's data on the device. AES is a common approach to solve this kind of problem. To learn more about AES read [here](http://en.wikipedia.org/wiki/Advanced_Encryption_Standard).

In order to encrypt your data, SOOMLA generates a private key out of several parts of information. In the class StoreConfig you’ll find a field called SOOM_SEC. To protect your game from hackers, SOOMLA recommends that you change this value before you release your game.

> **WARNING:** You can change this value only once! If you try to change it again, old data from the database will become unavailable.

##**Relevant Classes**
To further understand how SOOMLA handles storage, below are descriptions about each of the relevant classes.

###StoreInventory
`StoreInventory` is a utility class that provides you with functions that perform store-related operations. With `StoreInventory` you can give or take items from your users. You can buy items or upgrade them. You can also check their equipping status and change it.

**Some of StoreInventory’s useful functions explained:**

> **NOTE:** The names of the functions may vary across the available platforms but their purposes are the same.

- **buy**
**Params:** `itemId`
**Description:** Buys the item that has the given `itemId`, either with real money ($$) or with other virtual items.

- **giveVirtualItem**
**Params**: `itemId`, `amount`
**Description**: Gives your user the given amount of the virtual items with the given itemId. For example, when your user plays your game for the first time you GIVE him/her 1000 gems.

    > **NOTE:** This action is different than `buy`; You use `give` to give your user something for free. You use `buy` to give your user something and get something in return (either money or other virtual goods).

- **takeVirtualItem**
**Params**: `itemId`, `amount`
**Description**: Takes from your user the given `amount` of the virtual item with the given `itemId`.

- **equipVirtualGood**
**Params**: `goodItemId`
**Description**: Equips the given virtual good with the given `goodItemId`. Equipping means that your user decides to currently use a specific virtual good. According to additional factors, your user may or may not use other equippable goods at the same time. To understand more about equipping see [EquippableVG](/docs/soomla/Economy#equippablevg).

###StoreInfo
This class holds all of the metadata information about your specific game. It is initialized with your implementation of `IStoreAssets` and you can use it to retrieve information about your specific game. `StoreInfo` holds your store's:

- Virtual currencies
- Virtual currency packs
- Virtual goods of all kinds
- Virtual categories
- Non-consumable items

`StoreInfo` can be questioned about the existence of `VirtualItem`s and the associations between them.
`StoreInfo` is always initialized from the database, except for the first time the game is loaded - in that case it is initialized with your implementation of `IStoreAssets`. When your game loads for the first time, the virtual economy's metadata is saved, and from that moment on it'll be loaded from the database.
Examples using `StoreInfo` can be found in the below section about `StorageManager`.

##**Storage Internals**

This section describes the internal classes that make up the storage. We highly recommend that you avoid accessing these storage mechanisms directly (except for `KeyValueStorage` - see below), and instead use `StoreInventory`’s convenient functions.

###StorageManager
Here all the storage-related instances of your game are created. These include the following (all of which are described below):

- `KeyValueStorage`
- `VirtualCurrencyStorage`
- `VirtualGoodsStorage`
- `NonConsumableItemsStorage`

You use the `StorageManager`’s getter functions to access these different storages. Then you will be able to use the different storages’ available functions to perform actions such as set/get an item’s balance, add/remove an item from the storage, etc…

**Example Usage:**
Get the current balance of a virtual good with item Id "green_hat":

- In android:

    ```
    VirtualGood greenHat = (VirtualGood)StoreInfo.getVirtualItem("green_hat");
    int greenHatsBalance = StorageManager.getVirtualGoodsStorage().getBalance(greenHat);
    ```

- In iOS:

    ```
    VirtualGood* greenHat = (VirtualGood*)[[StoreInfo getInstance] virtualItemWithId:@"green_hat"];
    int greenHatsBalance = [[[StorageManager getInstance] virtualGoodStorage] balanceForItem:greenHat];
    ```

###KeyValueStorage

`KeyValStorage` represents a simple key-value store, and contains functions to manipulate the key-value database. These are mostly simple functions that perform operations such as get (or set) the value of a key-val pair, or delete a key-val pair.

> **NOTE:** SOOMLA uses this key value storage for its own needs but you can choose to use it for your own storage purposes, as well. Make sure to use your own keys and not the ones that SOOMLA uses (which can be found in the class KeyValueDatabase).

####Usage Examples

**getValue**
(used in function in `VirtualGoodsStorage`)

Android:

```
public boolean isEquipped(EquippableVG good){
    ...
    String itemId = good.getItemId();
    String key = KeyValDatabase.keyGoodEquipped(itemId);
    String val = StorageManager.getKeyValueStorage().getValue(key);
    ...
}
```

iOS:

```
- (BOOL)isGoodEquipped:(EquippableVG*)good {
    ...
    NSString* key = [KeyValDatabase keyGoodEquipped:good.itemId];
    NSString* val = [[[StorageManager getInstance] keyValueStorage] getValueForKey:key];
    ...
}
```
<br>
**setValue**
(used in function in `NonConsumableItemsStorage`)

Android:

```
public boolean add(NonConsumableItem nonConsumableItem){
    ...
    String itemId = nonConsumableItem.getItemId();
    String key = KeyValDatabase.keyNonConsExists(itemId);
    StorageManager.getKeyValueStorage().setValue(key, "");
    ...
}
```

iOS:

```
- (BOOL)add:(NonConsumableItem*)nonConsumableItem{
    ...
    NSString* key = [KeyValDatabase keyNonConsExists:nonConsumableItem.itemId];
    [[[StorageManager getInstance] keyValueStorage] setValue:@"" forKey:key];
    ...
}
```
<br>
**deleteKeyValue**
(used in function in `NonConsumableItemsStorage`)

Android:
```
public boolean remove(NonConsumableItem nonConsumableItem){
    ...
    String itemId = nonConsumableItem.getItemId();
    String key = KeyValDatabase.keyNonConsExists(itemId);
    StorageManager.getKeyValueStorage().deleteKeyValue(key);
    ...
}
```

iOS:

```
- (BOOL)remove:(NonConsumableItem*)nonConsumableItem{
    ...
    NSString* key = [KeyValDatabase keyNonConsExists:nonConsumableItem.itemId];
    [[[StorageManager getInstance] keyValueStorage] deleteValueForKey:key];
    ...
}
```
