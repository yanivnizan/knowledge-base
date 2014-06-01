---
layout: ‘content’
image: 'Tutorial'
title: 'IStoreAssets'
text: "This interface represents a game economy. You will need to create your own implementation of IStoreAssets, which will hold all of the entities of your game's economy."
position: 2
---

**IStoreAssets**
===

This interface represents a game economy. When you use SOOMLA to create your game economy, one of the important steps to do is to create your own implementation of `IStoreAssets`. Then you’ll need to initialize `StoreController` with your version of `IStoreAssets`. All of this is explained in detail in the Getting Started tutorial.

**Some of the important functions of IStoreAssets explained:**

**`public int getVersion()`**  

*Params:* none
*Return:* int - the version number

This value will determine if the saved data in the database will be deleted or not. Bump the version every time you want to delete the old data in the database. If you don't bump this value, you won't be able to see changes you've made to the objects in your implementation of `IStoreAssets`.

*For example:* If you previously created a `VirtualGood` with the name "Hat" and you published your application, the name "Hat will be saved in all of your users' databases. If you want to change the name to "Green Hat" than you'll also have to bump the version (say from 0 to 1). Now the new "Green Hat" name will replace the old one.

<br>
**`public VirtualCurrency[] getVirtualCurrencies()`**

*Params:* none
*Return:* VirtualCurrency[]

Create an instance of all your desired Virtual Currencies. For every currency, you'll have to provide: name, description and item id.

<br>
**`public VirtualGood[] getVirtualGoods()`**

*Params:* none
*Return:* VirtualGood[]

Create an instance of all your desired `VirtualGood`s. For every good, you'll have to provide: name, description, item id, and purchase type.

<br>
**`public VirtualCurrencyPack[] getVirtualCurrencyPacks()`**

*Params:* none
*Return:* VirtualCurrencyPack[]

Create an instance of all your desired `VirtualCurrencyPacks`. These are representations of currency packs that the user can purchase from the Market. For every `VirtualCurrencyPack`, you'll have to provide: name, description, item id, purchase type, currency amount (the amount of currencies in the pack), and currency item id (the item id of the associated currency).

<br>
**`VirtualCategory[] getVirtualCategories()`**

*Params:* none
*Return:* VirtualCategory[]

Create an instance of all your desired virtual categories. For every `VirtualCategory`, you'll have to provide: name and goods item ids (list of item ids of the Virtual Goods in this category).

> **NOTE:** If you don't want to categorize your `VirtualGood`s, just add one 'GENERAL' `VirtualCategory` as we do in our MuffinRush [example](https://github.com/soomla/android-store/blob/master/SoomlaAndroidExample/src/com/soomla/example/MuffinRushAssets.java).

<br>
**`NonConsumableItem[] getNonConsumableItems()`**

*Params:* none
*Return:* VirtualCategory[]

Create an instance of all your desired `NonConsumableItem`s. For every `NonConsumableItem`, you'll have to provide: name, description, item id and purchase type. Non-consumable items are items that can only be bought once but stay in the user’s possession forever, such as a "no-ads" token.
