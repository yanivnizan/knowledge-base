---
layout: "content"
image: "Tutorial"
title: "Main Classes"
text: "The main classes of ios-store contain functionality to perform store-related operations, provide you with different storages, and hold the basic assets needed to operate the store."
position: 4
---

#**Main Classes**

Here you can find descriptions of some of the main classes and interfaces of iOS-store. These classes contain functionality to perform store-related operations, provide you with different storages, and hold the basic assets needed to operate the store.

##[StoreController](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/StoreController.h)

StoreController holds the basic assets needed to operate the Store. You can use it to purchase products from the App Store. It provides you with functionality such as starting/stopping the in-app billing service in the background, querying the inventory for information, or starting a purchase process in the App Store.

> **NOTE:** This is the only class you need to initialize in order to use the SOOMLA SDK. More about this in [Getting Started](/docs/platforms/ios/GettingStarted).

Taken from AppDelegate.m of our Muffin Rush [Example](https://github.com/soomla/ios-store/tree/master/SoomlaiOSStoreExample/SoomlaiOSStoreExample):

``` objectivec
// We initialize StoreController when the application loads!
id<IStoreAssets> storeAssets = [[MuffinRushAssets alloc] init];
[[StoreController getInstance] initializeWithStoreAssets:storeAssets andCustomSecret:@"ChangeMe!!!"];
```

###Important Functions

**`public void refreshInventory(final boolean refreshMarketItemsDetails)`**

This function queries the App Store’s inventory, and creates a list of all metadata stored in the App Store (the items that have been purchased). The metadata includes the item's name, description, price, product ID, etc… Then a `MarketItemsRefreshed` event is posted with the list just created. Upon failure, displays an error message.

##[StoreInfo](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/data/StoreInfo.h)

`StoreInfo` is the mother of all metadata information about your specific game.

This class holds your store's

- Virtual currencies
- Virtual currency packs
- Virtual goods of all kinds
- Virtual categories
- Non-consumable items

`StoreInfo` can be questioned about the existence of `VirtualItem`s and the associations between them.

`StoreInfo` is always initialized from the database, except for the first time the game is loaded - in that case it is initialized with your implementation of `IStoreAssets`, a class that represents your game's metadata. When your game loads for the first time, the virtual economy's metadata is saved, and from that moment on it'll be loaded from the database.

**Example:**

Get the current balance of a virtual good with item id "green_hat" (This is the 'long' way, but you should preferably use `StoreInventory`'s functions):

``` objectivec
VirtualGood* greenHat = (VirtualGood*)[[StoreInfo getInstance] virtualItemWithId:@"green_hat"];
int greenHatsBalance = [[[StorageManager getInstance] virtualGoodStorage] balanceForItem:greenHat];
```

##[StorageManager](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/data/StorageManager.h)

`StorageManager` creates all the storage-related instances in your game. These include: `VirtualCurrencyStorage`, `VirtualGoodStorage`, `NonConsumableStorage`, and `KeyValueStorage`.

Use the `StorageManager`’s functions to access the different storage bases. Then you will be able to use the different storages’ available functions to perform actions such as set/get an item’s balance, add/remove an item from the storage, etc…

**Example:**

``` objectivec
[[[StorageManager getInstance] nonConsumableStorage] add:nonConsumable];
```

##[StoreInventory](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/StoreInventory.h)

`StoreInventory` is a utility class that provides you with functions that perform store-related operations. With `StoreInventory` you can give or take items from your users. You can buy items or upgrade them. You can also check their equipping status and change it.

###Important Functions

**`+ (void)buyItemWithItemId:(NSString*)itemId`**

Buys the item that has the given `itemId` according to its purchase type - either with real money ($$) or with other virtual items. Read more about PurchaseTypes in [Economy Model](/docs/platforms/ios/EconomyModel).

<br>
**`+ (void)giveAmount:(int)amount ofItem:(NSString*)itemId`**

Gives your user the given amount of the virtual item with the given item id, and demands nothing in return. For example, when your user plays your game for the first time you GIVE him for free 1000 gems.

**Example:** Give the user 10 pieces of a virtual currency with item id "currency_coin":

``` objectivec
[StoreInventory giveAmount:10 ofItem:@"currency_coin"];
```

<br>
**`+ (void)takeAmount:(int)amount ofItem:(NSString*)itemId`**

Takes from your user the given amount of the virtual item with the given item id. For example, when your user requests a refund you need to TAKE the item he/she is returning.

**Example:** Take 10 virtual goods with item id "green_hat":

``` objectivec
[StoreInventory takeAmount:10 ofItem:@"currency_coin"];
```

<br>
**`+ (void)equipVirtualGoodWithItemId:(NSString*)goodItemId`**

Equips the given virtual good with the given good item id. Equipping means that your user decides to currently use a specific virtual good. According to additional factors, your user may or may not use other equippable goods at the same time. To understand more about equipping please see section "EquippableVG" in [Economy Model](/docs/platforms/ios/EconomyModel).


##[StoreConfig](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/StoreConfig.h)

The configurations of your store will be kept in `StoreConfig`.

`StoreConfig`’s configurations:

- `SOOM_SEC` - The main encryption secret. CHANGE IT! and change it only once.

- `STORE_DEBUG_LOG` - Tells iOS-store if to print debug messages or not.

- `METADATA_VERSION` - This value defines the version of the metadata located in your database. Never change the value of this variable!

- `VERIFY_PURCHASES` - When set to 'YES', server side verification will be enabled.

    <div class="warning-box">Set `VERIFY_PURCHASES` to `NO` before you publish your app!</div>
