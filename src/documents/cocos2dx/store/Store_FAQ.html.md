---
layout: "content"
image: "Tutorial"
title: "FAQ"
text: "Frequently asked questions about unity3d-store"
position: 7
theme: 'platforms'
collection: 'cocos2dx_store'
module: 'store'
platform: 'cocos2dx'
---

# cocos2dx-store FAQ

## Integration

**Can I test cocos2dx-store only on a device?**

When you want to test in-app purchases you will need to test on a device.

---

**What is the purpose of the "Soomla Secret" and can I change it after launching my game?**

The Soomla Secret is a special string of your choice that the framework uses for encrypting end device data. The rationale here is that you want all the users' balances to be stored securely to prevent malicious users from hacking the numbers.

You should choose this secret wisely and never change it! If you try to change it after you launch your game, old data from the database will become unavailable, meaning that your users will lose their balances.

---

**The prices of the products I want to sell should be set in iTunes Connect, Google Play, etc. Then why does Soomla expect me to supply a price in the code?**

All SOOMLA items require you to provide price by design. The purpose of this is to support displaying of prices in situations of no internet connectivity where you can't query iTunes Connect / Google Play.

The prices used for purchase are the Market Prices defined in Google Play or in iTunes Connect.

To get the updated market prices in your application use the `onMarketItemsRefreshFinished` event.

---

**How can I test the products that I want to sell in Google Play?**

In testing mode, you should use [Google's test product IDs](http://developer.android.com/google/play/billing/billing_testing.html#billing-testing-static). Please notice that you should use "android.test.purchased" for all the products you want to successfully test, and that you can use this same product ID for more than one product. Once you are done with testing mode you can define your actual product IDs, as explained in our [Google Play IAB](/android/store/Store_GooglePlayIAB) tutorial.

---

## General

**What's the difference between "item IDs" and "product IDs" that SOOMLA requires and can they have the same value?**

Item IDs are internal IDs that SOOMLA uses to identify ALL entities in the economy. Product IDs are IDs you need to provide for products that you want to sell in the market (Google Play, App Store, etc.). These product IDs need to correspond exactly to what you define in the market.

So, every item in your implementation of `CCStoreAssets` will have an item ID, and the items you are selling for money (PurchaseWithMarket) will also have product IDs.

An item's "item ID" and "product ID" can be the same, but it's not recommended as it creates a source of confusion for you.

---

**I have a `LifetimeVG` defined in my game that is available for purchase in the market. Why does this item still appear after I restart my app?**

`LifetimeVG`s that are defined in the market, are defined as non-consumable products. This means that once the user purchases this item, the market saves it for them forever.

The only way to delete this kind of item is to refund it in the market.

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

Use [`CCSoomlaStore`](https://github.com/soomla/cocos2dx-store/blob/master/Soomla/CCSoomlaStore.cpp)'s function `refreshMarketItemDetails` to see the current details of your IAP products. For example, if you update the price of a product in iTunes Connect (or Google Play), you will be able to see the new price after refreshing market item details.

---

## Common Errors

**I updated the names of some of the items in my implementation of `CCStoreAssets`. Strangely, when I try to buy the items with the new names, I get a `VirtualItemNotFoundException`, but when I try to purchase the items with their old names, everything works fine. What's going on?**

When you ran the app for the first time, it saves your assets to the internal DB. In subsequent runs, the Store module loads the assets from the DB, disregarding the assets you passed in the init arguments. UNLESS, you increase the [version of your assets](https://github.com/soomla/cocos2dx-store-example/blob/master/Classes/MuffinRushAssets.cpp#L328), in which case it overrides the assets saved in the DB.

So you can either do the above, or you can delete the app from your device (thus deleting the internal DB) and install again.

<br>

### Android

**When I try to test a purchase after publishing my app on Google Play I get the error message: "The item you were attempting to purchase couldn't be found".**

You need to define your item's product ID exactly the same in Google Play developer console and in your code. If not, you will get this error.

The other case where you will get such an error, is when you haven't waited long enough after publishing your game on Google Play. After publishing the game (to alpha or beta) you must wait a few hours (about 1-2 hours) until you can test your in-app products.

---

**When I try to test purchase my in-app product IDs (real product IDs, not Google's static response IDs), I get the following Google Play error: "This version of the application is not configured for billing through Google Play".**

Follow [this checklist](http://answers.soom.la/t/solved-virtualitemnotfoundexception-for-existing-item-but-strangely-no-error-for-non-existent-item/624/5) and/or read Google's [Testing In-app Billing](http://developer.android.com/google/play/billing/billing_testing.html) document.

<br>

### iOS

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

You need to implement a button and call `soomla::CCSoomlaStore::getInstance()->restoreTransactions();`.

---
