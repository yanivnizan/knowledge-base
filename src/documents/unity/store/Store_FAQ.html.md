---
layout: "content"
image: "Tutorial"
title: "FAQ"
text: "Frequently asked questions about unity3d-store"
position: 7
theme: 'platforms'
collection: 'unity_store'
module: 'store'
platform: 'unity'
---

# unity3d-store FAQ

## Integration

**Can I test unity3d-store in the Unity editor or only on a device?**

unity3d-store can be tested in the Unity editor, however when you want to test in-app purchases you will need to test on a device.

---

**What is the purpose of the "Soomla Secret" and can I change it after launching my game?**

The Soomla Secret is a special string of your choice that the framework uses for encrypting end device data. The rationale here is that you want all the users' balances to be stored securely to prevent malicious users from hacking the numbers.

You should choose this secret wisely and never change it! If you try to change it after you launch your game, old data from the database will become unavailable, meaning that your users will lose their balances.

---

**The prices of the products I want to sell should be set in iTunes Connect, Google Play, etc. Then why does Soomla expect me to supply a price in the code?**

All SOOMLA items require you to provide price by design. The purpose of this is to support displaying of prices in situations of no internet connectivity where you can't query iTunes Connect / Google Play.

The prices used for purchase are the Market Prices defined in Google Play or in iTunes Connect.

To get the updated market prices in your application use `OnMarketItemsRefreshFinished` event:

``` cs
StoreEvents.OnMarketItemsRefreshFinished += your_callback;

void your_callback(List<MarketItem> marketItems)
{
    //marketItems contain the updated market prices,
    //find your marketItem using ProductId and get its price
    ...
}
```

---

**To build my project in the Unity editor, should I use "Build & Run" or "Build"?**

You should click on "Build". The reason for this is that Soomla has a post-build script that needs to run after the build, and if you click on “Build and run” you're not giving that script a chance.

**NOTE:** Before you click on "Build", you'll need to switch to whatever platform you want to run. To avoid problems, after clicking on "Switch platform", you must wait for the little circle at the bottom right corner to disappear.

---

**How can I test the products that I want to sell in Google Play?**

In testing mode, you should use [Google's test product IDs](http://developer.android.com/google/play/billing/billing_testing.html#billing-testing-static). Please notice that you should use "android.test.purchased" for all the products you want to successfully test, and that you can use this same *test* product ID for more than one product. Once you are done with testing mode you can define your actual product IDs, as explained in our [Google Play IAB](/android/store/Store_GooglePlayIAB) tutorial.

---

**iOS: What libraries do I need in my project?**

After you download and import the unity3d-store package, you should see the following static libraries under `Assets/Plugins/iOS`:

- libUnitySoomlaiOSCore.a
- libUnityiOSStore.a
- libSoomlaIOSStore.a
- libSoomlaIOSCore.a

**Android: What jars do I need in my project?**

After you download and import the unity3d-store package, you should see the following jars under `Assets/Plugins/Android`:

- AndroidStore.jar
- AndroidStoreGooglePlay.jar
- SoomlaAndroidCore.jar
- UnityAndroidStore.jar
- UnitySoomlaAndroidCore.jar
- square-otto-1.3.2.jar

---

## General

**What's the difference between "item IDs" and "product IDs" that SOOMLA requires and can they have the same value?**

Item IDs are internal IDs that SOOMLA uses to identify ALL entities in the economy. Product IDs are IDs you need to provide for products that you want to sell in the market (Google Play, App Store, etc.). These product IDs need to correspond exactly to what you define in the market.

So, every item in your implementation of `IStoreAssets` will have an item ID, and the items you are selling for money (PurchaseWithMarket) will also have product IDs.

An item's "item ID" and "product ID" can be the same, but its not recommended as it just creates a source of confusion for you.

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

3. Call `StoreInventory.takeItem("lifetimeVG_ID", 1)` to clear your local inventory.

Note that Google Play caches purchase statuses locally, so you may have to wait a few minutes for the cancellation to actually take place. If you don't want to wait, a faster option is to clear the cache of the "Google Play Store" app and your app manually, to force the non-consumable item refresh.

---

**If I make changes to the products I have defined in iTunes Connect or Google Play, how can I see the updated information in my code?**

Use [SoomlaStore](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/SoomlaStore.cs)'s function `RefreshMarketItemsDetails` to see the current details of your IAP products. For example, if you update the price of a product in iTunes Connect or Google Play, you will be able to see the new price after refreshing market item details.

---

**Are user purchases synced across various devices?**

Purchases you make with coins \ other virtual items, are not synced across devices, however, we are planning to add this functionality in the future. Regarding restoring transactions that were bought with real money in Google Play \ iTunesConnect, are associated per user. Thus they should be available on other devices with the same account and app.

From Google's IAB docs:

> Managed in-app products are items that have their ownership information tracked and managed by Google Play. When a user purchases a managed in-app item, Google Play stores the purchase information for each item on a per-user basis. This enables you to later query Google Play at any time to restore the state of the items a specific user has purchased. This information is persistent on the Google Play servers even if the user uninstalls the application or if they change devices."

Also, see [Apple's docs](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/StoreKitGuide/Chapters/Products.html1) regarding product types and syncing them across devices.

---

## Common Errors

**After cloning unity3d-store from Github, I get the following error: "The type or namespace name "name" could not be found. Are you missing a using directive or an assembly reference?"**

This error usually means that you did not *recursively* clone the project, and therefore you are missing the submodules. The correct way to clone is: `git clone --recursive git@github.com:soomla/unity3d-store.git`

---

**I updated the names of some of the items in my implementation of `IStoreAssets`. Strangely, when I try to buy the items with the new names, I get a `VirtualItemNotFoundException`, but when I try to purchase the items with their old names, everything works fine. What's going on?**

When you ran the app for the first time, it saves your assets to the internal DB. In subsequent runs, the Store module loads the assets from the DB, disregarding the assets you passed in the init arguments. UNLESS, you increase the [version of your assets](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Examples/MuffinRush/MuffinRushAssets.cs#L30), in which case it overrides the assets saved in the DB.

So you can either do the above, or you can delete the app from your device (thus deleting the internal DB) and install again.

---

**I want to upgrade my version of SOOMLA's unity3d-store. How exactly do I do that?**

Downloading and double-clicking on these files should start the import process: (Make sure to import both)

- [unity3d-core](https://github.com/soomla/unity3d-store/blob/master/soomla-unity3d-core.unitypackage1)

- [unity3d-store](https://github.com/soomla/unity3d-store/blob/master/soomla-unity3d-store.unitypackage1)

If that doesn't work for some reason, you'll need to start fresh:

1. Delete these files/folders:

  - Assets/Soomla

  - Assets/Plugins/Soomla

  - Assets/Plugins/Android/SoomlaAndroidCode.jar

  - Assets/Plugins/Android/AndroidStore.jar

  - Assets/Plugins/Android/square-otto-1.3.2.jar

  - Assets/Plugins/iOS/SoomlaiOSStore.a

  - Assets/Plugins/iOS/SoomlaiOSStoreCore.a

2. Reimport the unitypackages above.

---

**After buying one of my app's items, I cleared my app data and restarted the app, and then `GetItemBalance` returns 0. Why is this happening?**

This happens because balances are being saved to an encrypted local database on the device (and PlayerPrefs when in the Unity editor). When you clear the app data, it also clears that database.

---

**It seems that `onSoomlaStoreInitialized()` isn't called and that my store is never set; I get the error: "Object reference not set to an instance of an object".**

Make sure your `IStoreAssets` implementation includes all the necessary functions. You should add all of them as shown in our [Muffin Rush example](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Examples/MuffinRush/MuffinRushAssets.cs3) and just leave them to return empty arrays.

---

**After integrating Chartboost into my project, I noticed that my in-app purchases have stopped working and my billing permissions have been removed. What can be the problem?**

When importing the Chartboost plug-in, it includes the Android Manifest by default, and therefore the billing permissions you have for SOOMLA in your Android Manifest, are overridden. You need to make sure that the Android Manifest is not imported. See [this issue](http://answers.soom.la/t/soomla-completely-stops-working-when-integrating-chartboost/669/2) for more information.

<br>

### Android

**I am getting the error "Can’t run the java command. Add your JDK folder to the PATH environment variable". What does this mean?**

If you are using Windows, this is a known bug in Windows that you can just ignore and everything will work fine.

---

**When I try to test a purchase after publishing my app on Google Play I get the error message: "The item you were attempting to purchase couldn't be found".**

You need to define your item's product ID exactly the same in Google Play developer console and in your code. If not, you will get this error.

The other case where you will get such an error, is when you haven't waited long enough after publishing your game on Google Play. After publishing the game (to alpha or beta) you must wait a few hours (about 1-2 hours) until you can test your in-app products.

---

**When I try to test purchase my in-app product IDs (real product IDs, not Google's static response IDs), I get the following Google Play error: "This version of the application is not configured for billing through Google Play".**

Follow the checklist below and/or read Google's [Testing In-app Billing](http://developer.android.com/google/play/billing/billing_testing.html) document.

- Make sure your APK is built in release mode (exported / signed with release certificate).

- Wait for a few hours (anywhere between 5 to 24 hours) after uploading signed APK with correct version code.

- Publish uploaded / signed APK to either alpha / beta / production channel (NOT draft).

- This APK is what needs to be installed on your device; not run directly through Eclipse on your device.

- You cannot install this APK with your Google account tied to your Google Play Developer console account, being used for developing the app / game, as a developer is not allowed to buy anything from their own account. Use a separate test Google account.

- Make sure this test Google account is added to your Google Play Developer Console (within the Settings screen, "License Testing" section).

- The test Google account needs to be your primary Google account on the test device prior to installing the APK on the device (safest way to do this is to remove your developer Google account from your phone, and add it back again after your testing is done; that way you only have one Google account tied to your test device).

<br>

### iOS

**When I build for iOS, I get the following error: "SoomlaStore: An error occurred for product id "xxxx" with code "0" and description "Cannot connect to iTunes Store"**

Most likely, this is an integration issue with iTunesConnect. Make sure you've done the following:

- Your Bundle Identifier matches the one defined in iTunes Connect (In-App Purchases tab of your app - Bundle ID)

- Your Product Name in Unity matches the app name as defined in iTunes Connect.

- The product ID declared in your `IStoreAssets` implementation matches the Product Id of the corresponding item in iTunes connect.

For more information see our tutorial on [In-app Billing for iOS](/ios/store/Store_AppStoreIAB).

---

**I defined non-consumable items in iTunesConnect, and when I try to `RestoreTransactions` I get the following error: "SOOMLA SoomlaVerification: An error occurred while trying to ge" receipt data. Stopping the purchasing process for: XXX"**

From [Apple's docs](https://developer.apple.com/library/ios/technotes/tn2259/_index.html):

> Calling the payment queue’s restoreCompletedTransactions method may not restore any products in your application for one or more of the following reasons:

> 1. You did not have any previously bought non-consumable, auto-renewable subscriptions, or free subscriptions.

> 2. You were trying to restore non-renewing subscription or consumable products, which are not restorable. The restoreCompletedTransactions method only restores non-consumable, auto-renewable subscriptions, and free subscriptions.

You can also try to create a new test user, buy all the non-consumables, uninstall, re-install, and then restore purchases.

---

**My app was rejected by Apple because it doesn't have a "restore" button. How can I properly implement this?**

You need to implement a button and call `SoomlaStore.RestoreTransactions();`.

---
