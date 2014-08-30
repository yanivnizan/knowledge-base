---
layout: "content"
image: "Tutorial"
title: "FAQ"
text: "Frequently asked questions about unity3d-store"
position: 7
theme: 'platforms'
collection: 'platforms_unity'
---

#**FAQ: unity3d-store**

<div class="faq-toc">

**INTEGRATION**<br>
<br>
[iOS: What libraries do I need in my project?](#ios-libraries)<br>
[Android: What jars do I need in my project?](#android-libraries)<br>
[Can I test unity3d-store in the Unity editor?](#test-in-editor)<br>
[What is the purpose of the "Soomla Secret"?](#soomla-secret)<br>
[Where should I set item prices?](#set-item-prices)<br>
[Should I use "Build & Run" or "Build" in Unity Editor?](#build-run)<br>
[How can I test the products I want to sell in Google Play?](#test-google-play)<br>
<br>

**GENERAL**<br>
<br>
[The difference between "item IDs" and "product IDs"](#item-ids-product-ids)<br>
[The difference between a `LifetimeVG` and a `NonConsumableItem`](#lifetimevg-nonconsumableitem)<br>
[Items still appear in my game after I restart my app](#items-appear-after-restart)<br>
[How can I test purchases of `NonConsumableItem`s?](#test-purchase-nonconsumableitem)<br>
[Check that information has been updated after changing details in the market](#update-after-changes)<br>

<br>
**COMMON ERRORS**<br>
<br>
[The type or namespace name "name" could not be found...](#namespace-not-found)<br>
[The imported type `SoomSettings' is defined multiple times](#soom-settings)<br>
[Can’t run the java command. Add your JDK folder to the PATH environment variable](#add-jdk)<br>
<br>
</div>

##Integration

<a class="faq-anchor" name="ios-libraries">**iOS: What libraries do I need in my project?**</a>

After you download and import the unity3d-store package, you should see the following static libraries under `Assets/Plugins/iOS`:

- libUnitySoomlaiOSCore.a
- libUnityiOSStore.a
- libSoomlaIOSStore.a
- libSoomlaIOSCore.a

<a class="faq-anchor" name="android-libraries">**Android: What jars do I need in my project?**</a>

After you download and import the unity3d-store package, you should see the following jars under `Assets/Plugins/Android`:

- AndroidStore.jar
- AndroidStoreGooglePlay.jar
- SoomlaAndroidCore.jar
- UnityAndroidStore.jar
- UnitySoomlaAndroidCore.jar
- square-otto-1.3.2.jar

---

<a class="faq-anchor" name="test-in-editor">**Can I test unity3d-store in the Unity editor or only on device?**</a>

Currently unity3d-store can only be tested on a device. In the near future it will be available for testing in the Unity editor.

---

<a class="faq-anchor" name="soomla-secret">**What is the purpose of the "Soomla Secret"?**</a>

The Soomla Secret is a special string of your choice that the framework uses for encrypting end device data. The rationale here is that you want all the users' balances to be stored securely to prevent malicious users from hacking the numbers.

**NOTE:** You should choose this secret wisely and never change it! If you try to change it after you launch your game, old data from the database will become unavailable, meaning that your users will lose their balances.

---

<a class="faq-anchor" name="set-item-prices">**The prices of the products I want to sell should be set in iTunes Connect, Google Play, etc. Then why does Soomla expect me to supply a price in the code?**</a>

All SOOMLA items require you to provide price by design. The purpose of this is to support displaying of prices in situations of no internet connectivity where you can't query iTunes Connect / Google Play.

---

<a class="faq-anchor" name="build-run">**To build my project in the Unity editor, should I use "Build & Run" or "Build"?**</a>

You should click on "Build". The reason for this is that Soomla has a post-build script that needs to run after the build, and if you click on “Build and run” you're not giving that script a chance.

**NOTE:** Before you click on "Build", you'll need to switch to whatever platform you want to run. To avoid problems, after clicking on "Switch platform", you must wait for the little circle at the bottom right corner to disappear.

---

<a class="faq-anchor" name="test-google-play">**How can I test the products that I want to sell in Google Play?**</a>

In testing mode, you should use [Google's test product IDs](http://developer.android.com/google/play/billing/billing_testing.html#billing-testing-static). Please notice that you should use "android.test.purchased" for all the products you want to successfully test, and that you can use this same product ID for more than one product. Once you are done with testing mode you can define your actual product IDs, as explained [here](docs/platforms/android/googleplayiab/).

---

##General

<a class="faq-anchor" name="item-ids-product-ids">**What's the difference between "item IDs" and "product IDs" that Soomla requires and can they have the same value?**</a>

Item IDs are internal IDs that SOOMLA uses to identify ALL entities in the economy. Product IDs are IDs you need to provide for products that you want to sell in the market (Google Play, App Store, etc.). These product IDs need to correspond exactly to what you define in the market.

Yes, a product with an item ID and a product ID can have the same value if you wish.

---

<a class="faq-anchor" name="lifetimevg-nonconsumableitem">**What’s the difference between a `LifetimeVG` and a `NonConsumableItem`?**</a>

A `LifetimeVG` is an item that is bought exactly once and kept forever. A `NonConsumableItem` is a representation of a non-consumable item in the Market (App Store, Google Play, Amazon Appstore). These kinds of items are bought by the user once and kept for him/her forever **in the Market**.

If you want to make a `LifetimeVG` available for purchase in the Market, you will need to declare it as a `NonConsumableItem`.

Notice that `LifetimeVG`s won't be saved on Google's servers, while `NonConsumableItem`s will.

---

<a class="faq-anchor" name="items-appear-after-restart">**Why does the `NonConsumableItem` in my game still appear after I use `RemoveNonConsumableItem` and restart my app?**</a>

Because of the characteristics of `NonConsumableItem`s (kept for him/her forever in the Market), the only way to delete this kind of item is to refund it in the Market.

Using `RemoveNonConsumableItem` only removes the item from the local cache, thus when you restart the app the item will still be there.

---

<a class="faq-anchor" name="test-purchase-nonconsumableitem">**How can I test purchases of `NonConsumableItem`s?**</a>

For testing purposes, you will need to purchase the `NonConsumableItem` and then return it in order to repurchase.

Because of the characteristics of `NonConsumableItem`s (kept for him/her forever in the Market), the only way to purchase the same `NonConsumableItem` a second time, is to refund the first purchase.

Instructions for how to refund items in Google Play:

1. Visit your merchant account through Google's Developer Console (there's a link under the "Financial Reports" tab).
2. Refund the test item. See Google's [Refund an order](https://support.google.com/wallet/business/answer/2741495?hl=en) instructions for how to do this.
3. Call `removeNonConsumableItem` to clear your local inventory. (It will NOT be refreshed by Google Play because the reception has already been removed).

---

<a class="faq-anchor" name="test-purchase-nonconsumableitem">**If I make changes to the products I have defined in iTunes Connect or Google Play, how can I see the updated information in my code?**</a>

Use the function `RefreshMarketItemDetails` to see the current details of your IAP products. For example, if you update the price of a product in iTunes Connect (or Google Play), you will be able to see the new price after refreshing market item details. See more [here](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/SoomlaStore.cs).

---


##Common Errors

<a class="faq-anchor" name="namespace-not-found">**After cloning unity3d-store from Github, I get the following error: "The type or namespace name "name" could not be found. Are you missing a using directive or an assembly reference?"**</a>

This error usually means that you did not *recursively* clone the project, and therefore you are missing the submodules. The correct way to clone is: `git clone --recursive git@github.com:soomla/unity3d-store.git`

---

<a class="faq-anchor" name="soom-settings">**I am using unity3d-store v1.5.1, Soomla Highway, and Storefront. I get the error "Assets/Soomla/Editor/SoomlaSettingsEditor.cs ... The imported type `SoomSettings' is defined multiple times"**</a>

You need to use the unity3d-store version supplied in the dashboard [docs](http://soom.la/docs/#unity-getting-started) and NOT the latest one from Github. The storefront is supported only up to version 1.4.4 of unity3d-store, because the open source project is progressing faster than the storefront.

---

<a class="faq-anchor" name="add-jdk">**I am getting the error "Can’t run the java command. Add your JDK folder to the PATH environment variable". What does this mean?**</a>

If you are using Windows, this is a known bug in Windows that you can just ignore and everything will work fine.
