---
layout: "content"
image: "Tutorial"
title: "FAQ"
text: "Frequently asked questions about ios-store"
position: 7
theme: 'platforms'
collection: 'ios_store'
module: 'store'
platform: 'ios'
---

# ios-store FAQ

## Integration

**Can I test ios-store only on a device?**

When you want to test in-app purchases you will need to test on a device.

---

**What is the purpose of the "Soomla Secret" and can I change it after launching my game?**

The Soomla Secret is a special string of your choice that the framework uses for encrypting end device data. The rationale here is that you want all the users' balances to be stored securely to prevent malicious users from hacking the numbers.

You should choose this secret wisely and never change it! If you try to change it after you launch your game, old data from the database will become unavailable, meaning that your users will lose their balances.

---

**The prices of the products I want to sell should be set in iTunes Connect. Then why does Soomla expect me to supply a price in the code?**

All SOOMLA items require you to provide price by design. The purpose of this is to support displaying of prices in situations of no internet connectivity where you can't query iTunes Connect.

The prices used for purchase are the Market Prices defined in iTunes Connect.

To get the updated market prices in your application use the `postMarketItemsRefreshFinished` event.

---

## General

**What's the difference between "item IDs" and "product IDs" that SOOMLA requires and can they have the same value?**

Item IDs are internal IDs that SOOMLA uses to identify ALL entities in the economy. Product IDs are IDs you need to provide for products that you want to sell in the App Store. These product IDs need to correspond exactly to what you define in the App Store.

So, every item in your implementation of `CCStoreAssets` will have an item ID, and the items you are selling for money (PurchaseWithMarket) will also have product IDs.

An item's "item ID" and "product ID" can be the same, but it's not recommended as it creates a source of confusion for you.

---

**I have a `LifetimeVG` defined in my game that is available for purchase in the App Store. Why does this item still appear after I restart my app?**

`LifetimeVG`s that are defined in the App Store, are defined as non-consumable products. This means that once the user purchases this item, Apple saves it for them forever.

The only way to delete this kind of item is to refund it in the App Store.

---

**How can I test purchases of `LifetimeVG`s that are defined in Google Play?**

For testing purposes, you will need to purchase the `LifetimeVG` and then return it in order to repurchase.

Because of the characteristics of `LifetimeVG`s (kept for him/her forever in the Market), the only way to purchase the same item a second time, is to refund the first purchase.

Instructions for how to refund items in Google Play:

1. Visit your merchant account through Google's Developer Console (there's a link under the "Financial Reports" tab).

2. Refund the test item. See Google's [Refund an order](https://support.google.com/wallet/business/answer/2741495?hl=en) instructions for how to do this.

3. Clear your local inventory by calling:

  ``` cpp
  CCStoreInventory::sharedStoreInventory()->takeItem("lifetimeVG_ID", 1, &soomlaError);
  ```

NOTE that Google Play caches purchase statuses locally, so you may have to wait a few minutes for the cancellation to actually take place. If you don't want to wait, a faster option is to clear the cache of the "Google Play Store" app and your app manually, to force the non-consumable item refresh.

---

**If I make changes to the products I have defined in iTunes Connect or Google Play, how can I see the updated information in my code?**

Use [`SoomlaStore`](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/SoomlaStore.h)'s function `refreshMarketItemsDetails` to see the current details of your IAP products. For example, if you update the price of a product in iTunes Connect (or Google Play), you will be able to see the new price after refreshing App Store item details.

---

**Are user purchases synced across various devices?**

Purchases you make with coins \ other virtual items, are not synced across devices, however, we are planning to add this functionality in the future. Regarding restoring transactions that were bought with real money in the App Store, are associated per user. Thus they should be available on other devices with the same account and app.

See [Apple's docs](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/StoreKitGuide/Chapters/Products.html1) regarding product types and syncing them across devices.

---

## Common Errors

**I updated the names of some of the items in my implementation of `IStoreAssets`. Strangely, when I try to buy the items with the new names, I get a `VirtualItemNotFoundException`, but when I try to purchase the items with their old names, everything works fine. What's going on?**

When you ran the app for the first time, it saves your assets to the internal DB. In subsequent runs, the Store module loads the assets from the DB, disregarding the assets you passed in the init arguments. UNLESS, you increase the [version of your assets](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStoreExample/SoomlaiOSStoreExample/MuffinRushAssets.m#L209), in which case it overrides the assets saved in the DB.

So you can either do the above, or you can delete the app from your device (thus deleting the internal DB) and install again.

---

**When I build for iOS, I get the following error: "SoomlaStore: An error occurred for product id "xxxx" with code "0" and description "Cannot connect to iTunes Store"**.

Most likely, this is an integration issue with iTunesConnect. Make sure you've done the following:

- Your Bundle Identifier matches the one defined in iTunes Connect (In-App Purchases tab of your app - Bundle ID)

- Your Product Name in Unity matches the app name as defined in iTunes Connect.

- The Product ID declared in your `IStoreAssets` implementation matches the Product ID of the corresponding item in iTunes connect.

For more information see our tutorial on [In-app Billing for iOS](/ios/store/Store_AppStoreIAB).

---

**I defined non-consumable items in iTunesConnect, and when I try to `RestoreTransactions` I get the following error: "SOOMLA SoomlaVerification: An error occurred while trying to get receipt data. Stopping the purchasing process for: XXX".**

From [Apple's docs](https://developer.apple.com/library/ios/technotes/tn2259/_index.html):

> Calling the payment queue’s restoreCompletedTransactions method may not restore any products in your application for one or more of the following reasons:

> 1. You did not have any previously bought non-consumable, auto-renewable subscriptions, or free subscriptions.

> 2. You were trying to restore non-renewing subscription or consumable products, which are not restorable. The restoreCompletedTransactions method only restores non-consumable, auto-renewable subscriptions, and free subscriptions.

You can also try to create a new test user, buy all the non-consumables, uninstall, re-install, and then restore purchases.

---

**My app was rejected by Apple because it doesn't have a "restore" button. How can I properly implement this?**

You need to implement a button and call `SoomlaStore`'s `restoreTransactions` method.

---
