---
layout: "content"
image: "Tutorial"
title: "STORE: Getting Started"
text: "Get started with iOS-store. Here you can find a basic example of initialization, economy framework integration, and links to downloads and IAP setup."
position: 1
theme: 'platforms'
collection: 'platforms_ios'
---

#**STORE: Getting Started**

Before doing anything, SOOMLA recommends that you go through Apple's [Selling with In-App Purchase](https://developer.apple.com/appstore/in-app-purchase/index.html).

##Integrate iOS-store (sources)

<div class="info-box">We use ARC! Read about ARC [here](http://www.google.com/url?q=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FAutomatic_Reference_Counting&sa=D&sntz=1&usg=AFQjCNHaQBd32glc8dP7HSzlvW1RhjInQA).</div>

1. The static libs and headers you need are in the [build](https://github.com/soomla/ios-store/tree/master/build) folder.

    - Set your project's "Library Search Paths" and "Header Search Paths" to that folder.

    - Add `-ObjC -lSoomlaiOSStore -lSoomlaiOSCore` to the project's "Other Linker Flags".

2. Make sure you have the following frameworks in your application's project: **Security, libsqlite3.0.dylib, StoreKit**.

3. Initialize `Soomla` with a secret that you chose to encrypt the user data saved in the DB. (For those who came from older versions, this should be the same as the old "custom secret"):

    ``` objectivec
    [Soomla initializeWithSecret:@"[YOUR CUSTOM GAME SECRET HERE]"];
    ```

    <div class="info-box">The secret is your encryption secret for data saved in the DB.</div>

4. Create your own implementation of `IStoreAssets` in order to describe your game's specific assets.

  - For a brief example, see the [example](#example) at the bottom.

  - For a more detailed example, see our [Muffin Rush Example](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStoreExample/SoomlaiOSStoreExample/MuffinRushAssets.m).

5. Initialize `SoomlaStore` with the class you just created:

    ``` objectivec
    [[SoomlaStore getInstance] initializeWithStoreAssets:[[YourStoreAssetsImplementation alloc] init]];
    ```

    <div class="warning-box">Initialize `SoomlaStore` ONLY ONCE when your application loads.</div>

And that's it! You have Storage and in-app purchasing capabilities... ALL-IN-ONE.

##In App Purchasing

SOOMLA provides two ways in which you can let your users purchase items in your game:

 1. **PurchaseWithMarket** is a `PurchaseType` that allows users to purchase a `VirtualItem` via the App Store. These products need to be defined in iTunesConnect.

 2. **PurchaseWithVirtualItem** is a `PurchaseType` that lets your users purchase a `VirtualItem` with some amount of a different `VirtualItem`. *For Example:* Buying 1 Sword with 100 Gems.

In order to define the way your various virtual items (Coins, swords, hats...) are purchased, you'll need to create your implementation of `IStoreAssets` (described above in step 5 of [Getting Started](#getting-started)).

##Example

``` objectivec
//Create your own implementation of IStoreAssets
@interface ExampleStoreAssets : NSObject <IStoreAssets>{
}
@end

@implementation ExampleStoreAssets
    ...

    NSString* const COIN_CURRENCY_ITEM_ID = @"currency_coin";
    NSString* const _10_COINS_PACK_ITEM_ID = @"coins_10";
    NSString* const _10_MUFFINS_PRODUCT_ID = @"coins_10";
    NSString* const SHIELD_GOOD_ITEM_ID = @"shield";
    NSString* const _5_SHIELDS_GOOD_ITEM_ID = @"shields_5";

    /** Virtual Currencies **/
    COIN_CURRENCY = [[VirtualCurrency alloc]
        initWithName:@"Coin"
        andDescription:@"Coin currency"
        andItemId:COIN_CURRENCY_ITEM_ID];

    /** Virtual Currency Packs **/
    // This good needs to be made available in the App Store.
    _10_COINS_PACK = [[VirtualCurrencyPack alloc]
        initWithName:@"10 Coins"
        andDescription:@"Pack of 10 coins"
        andItemId:_10_COINS_PACK_ITEM_ID
        andCurrencyAmount:10
        andCurrency:COIN_CURRENCY_ITEM_ID
        andPurchaseType:[[PurchaseWithMarket alloc]
            initWithMarketItem:[[MarketItem alloc]
                initWithProductId:_10_COINS_PRODUCT_ID
                andConsumable:kConsumable
                andPrice:0.99]]];

    /** Virtual Goods **/

    // Shield that can be purchased for 150 coins.
    SHIELD_GOOD = [[SingleUseVG alloc]
        initWithName:@"Shield"
        andDescription:@"A shield to defend you from monsters."
        andItemId:SHIELD_GOOD_ITEM_ID
        andPurchaseType:[[PurchaseWithVirtualItem alloc]
            initWithVirtualItem:COIN_CURRENCY_ITEM_ID
            andAmount:150]];

    // Pack of 5 shields that can be purchased for 500 coins.
    5_SHIELD_GOOD = [[SingleUsePackVG alloc]
        initWithName:@"5 Shields"
        andDescription:@"A pack of 5 shields"
        andItemId:_5_SHIELDS_GOOD_ITEM_ID
        andPurchaseType:[[PurchaseWithVirtualItem alloc]
            initWithVirtualItem:COINS_CURRENCY_ITEM_ID
            andAmount:500]
        andSingleUseGood:SHIELD_GOOD_ITEM_ID
        andAmount:5];

    ...

@end


// Initialization
@implementation AppDelegate
    ...
    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
    {
        ...
        id<IStoreAssets> storeAssets = [[MuffinRushAssets alloc] init];
        [Soomla initializeWithSecret:@"ChangeMe!!"];
        [[SoomlaStore getInstance] initializeWithStoreAssets:storeAssets];
        ...
    }
    ...
@end
```

When your users buy products, iOS-store knows how to contact the App Store for you and redirect the users to their purchasing system to complete the transaction.

Don't forget to subscribe to events of successful or failed purchases (see [Event Handling](/docs/platforms/ios/Events)).

<div class="info-box">To read about iTunes Connect in-app-purchase setup and integration with SOOMLA see our [iOS IAB tutorial](/docs/platforms/ios/AppStoreIAB).</div>
