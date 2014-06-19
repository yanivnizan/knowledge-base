---
layout: "content"
image: "Tutorial"
title: "Getting Started"
text: "Get started with iOS-store. Here you can find a basic example of initialization, economy framework integration, and links to downloads and IAP setup."
position: 1
theme: 'platforms'
collection: 'platforms_ios'
---

#**Getting Started**

Before doing anything, SOOMLA recommends that you go through [Selling with In-App Purchase](https://developer.apple.com/appstore/in-app-purchase/index.html).

##Get iOS-store (sources)

<div class="info-box">We use ARC! Read about ARC [here](http://www.google.com/url?q=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FAutomatic_Reference_Counting&sa=D&sntz=1&usg=AFQjCNHaQBd32glc8dP7HSzlvW1RhjInQA).</div>

1. Clone ios-store. Copy all files from ../ios-store/SoomlaiOSStore/SoomlaiOSStore into your iOS project:

 `git clone git@github.com:soomla/ios-store.git`

2. Make sure you have the following frameworks in your application's project: **Security, libsqlite3.0.dylib, StoreKit**.

3. Change the value of SOOM_SEC in StoreConfig.m to a secret of your choice. Do this now! **You can't change this value after you publish your game!**

4. We use [OpenUDID](https://github.com/ylechelle/OpenUDID) when we can't use Apple's approved way of fetching the UDID (using 'identifierForVendor'). We use ARC but OpenUDID doesn't use ARC. Open your *Project Properties* -> *Build Phases* -> *Compile Sources* and and add the flag '-fno-objc-arc' to OpenUDID.m.

    ![alt text](/img/tutorial_img/ios_getting_started/compileSources.png "Compile sources")

5. Create your own implementation of `IStoreAssets` in order to describe your game's specific assets.
  - For a brief example, see the [example](#example) at the bottom.
  - For a more detailed example, see our MuffinRush [example](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStoreExample/SoomlaiOSStoreExample/MuffinRushAssets.m).

6. Initialize `_`StoreController`_` with the class you just created:

    > **NOTE:** The custom secret is your encryption secret for data saved in the DB. This secret is NOT the secret from step 3 (select a different value).

    ``` objectivec
    [[StoreController getInstance]
        initializeWithStoreAssets:[[YourStoreAssetsImplementation alloc] init]
        andCustomSecret:@"[YOUR CUSTOM SECRET HERE]"];
    ```

    <div class="warning-box">Initialize `StoreController` ONLY ONCE when your application loads.</div>

And that's it ! You have Storage and in-app purchasing capabilities... ALL-IN-ONE.

###Run the Example App

In order for the MuffinRush Example to run, make sure that in *SoomlaiOSStoreExample > Build Settings > Linking*, the value for “Other Linker Flags” is “-ObjC”. If it’s not, add it.

![alt text](/img/tutorial_img/ios_getting_started/linkerFlags.png "Linker flags")

##What's next? In App Purchasing.

SOOMLA provides two ways in which you can let your users purchase items in your game:

 1. **PurchaseWithMarket** is a `PurchaseType` that allows users to purchase a `VirtualItem` via the App Store.

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


// Initialize StoreController
@implementation AppDelegate
    ...
    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
    {
        ...
        // We initialize StoreController when the application loads!
        id<IStoreAssets> storeAssets = [[ExampleStoreAssets alloc] init];

        // CustomSecret is a secret of your choice. You can't change it after you publish your game.
        [[StoreController getInstance] initializeWithStoreAssets:storeAssets andCustomSecret:@"ChangeMe!!!"];
        ...
    }
    ...
@end
```

When your users buy products, iOS-store knows how to contact the App Store for you and redirect the users to their purchasing system to complete the transaction.

Don't forget to subscribe to events of successful or failed purchases (see [Event Handling](/docs/platforms/ios/Events)).

<div class="info-box">To read about iTunes Connect in-app-purchase setup and integration with SOOMLA see our [iOS IAB tutorial](/docs/platforms/ios/AppStoreIAB).</div>
