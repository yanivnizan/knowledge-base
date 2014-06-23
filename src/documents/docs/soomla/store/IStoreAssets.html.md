---
layout: "content"
image: "Game"
title: "IStoreAssets"
text: "To use SOOMLA, you'll need to create your own implementation of IStoreAssets, an interface that represents your game’s economy."
position: 2
theme: 'soomla'
collection: 'soomla_store'
---

#**IStoreAssets**


##What is IStoreAssets?

`IStoreAssets` is an interface that represents a single game’s economy. When you use SOOMLA to create your game economy, one of the first steps to take is to create your own implementation of `IStoreAssets`. This is where you declare all of your virtual currencies, virtual currency packs, and virtual goods of all kinds.

###Android Example

This brief example (taken from our [MuffinRush](https://github.com/soomla/android-store/blob/master/SoomlaAndroidExample/src/com/soomla/example/MuffinRushAssets.java) example) contains only a few of the in-game economy items available.

```
public class MuffinRushAssets implements IStoreAssets {
    ...

    /** Virtual Currencies **/

    public static final VirtualCurrency MUFFIN_CURRENCY = new VirtualCurrency(
        "Muffins",                 // name
        "",                        // description
        MUFFIN_CURRENCY_ITEM_ID    // item id
    );


    /** Virtual Currency Packs **/

    public static final VirtualCurrencyPack TENMUFF_PACK = new VirtualCurrencyPack(
        "10 Muffins",                                           // name
        "Test refund of an item",                               // description
        "muffins_10",                                           // item id
        10,                                                     // number of currencies in the pack
        MUFFIN_CURRENCY_ITEM_ID,                                // the currency associated with this pack
        new PurchaseWithMarket(TENMUFF_PACK_PRODUCT_ID, 0.99)); // purchase type


    /** Virtual Goods **/

    // SingleUseVG
    public static final VirtualGood PAVLOVA_GOOD = new SingleUseVG(
        "Pavlova",                                                   // name
        "Gives customers a sugar rush and they call their friends",  // description
        "pavlova",                                                   // item id
        new PurchaseWithVirtualItem(MUFFIN_CURRENCY_ITEM_ID, 175)    // purchase type
    );


    /** Market Non-Consumable (MANAGED) Items **/

    public static final NonConsumableItem NO_ADDS_NONCONS  = new NonConsumableItem(
        "No Ads",                                                           // name
        "Test purchase of MANAGED item.",                                   // description
        "no_ads",                                                           // item id
        new PurchaseWithMarket(new MarketItem(
            NO_ADDS_NONCONS_PRODUCT_ID, MarketItem.Managed.MANAGED , 1.99)) // purchase type
    );
    ...
}
```

###iOS Example
This brief example (taken from our [MuffinRush](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStoreExample/SoomlaiOSStoreExample/MuffinRushAssets.m) example) contains only a few of the in-game economy items available.

```
@implementation MuffinRushAssets

+ (void)initialize{

    /** Virtual Currencies **/
    MUFFINS_CURRENCY = [[VirtualCurrency alloc]
      initWithName:@"Muffins"
      andDescription:@""
      andItemId:MUFFINS_CURRENCY_ITEM_ID];


    /** Virtual Currency Packs **/

    _10_MUFFINS_PACK = [[VirtualCurrencyPack alloc]
      initWithName:@"10 Muffins"
      andDescription:@"Test refund of an item"
      andItemId:_10_MUFFINS_PACK_ITEM_ID
      andCurrencyAmount:10
      andCurrency:MUFFINS_CURRENCY_ITEM_ID
      andPurchaseType:[[PurchaseWithMarket alloc]
        initWithMarketItem:[[MarketItem alloc]
        initWithProductId:_10_MUFFINS_PRODUCT_ID
        andConsumable:kConsumable
        andPrice:0.99]]];


    /** Virtual Goods **/

    // SingleUseVG
    CHOCOLATE_CAKE_GOOD = [[SingleUseVG alloc]
      initWithName:@"Chocolate Cake"
      andDescription:@"A classic cake to maximize customer satisfaction"
      andItemId:CHOCOLATE_CAKE_GOOD_ITEM_ID
      andPurchaseType:[[PurchaseWithVirtualItem alloc]
        initWithVirtualItem:MUFFINS_CURRENCY_ITEM_ID
        andAmount:250]];

    // LifetimeVG
    MARRIAGE_GOOD = [[LifetimeVG alloc]
      initWithName:@"Marriage"
      andDescription:@"This is a LIFETIME thing."
      andItemId:MARRIAGE_GOOD_ITEM_ID
      andPurchaseType:[[PurchaseWithMarket alloc]
        initWithMarketItem:[[MarketItem alloc]
        initWithProductId:MARRIAGE_PRODUCT_ID
        andConsumable:kConsumable
        andPrice:9.99]]];

@end
```

After you’ve implemented your version of `IStoreAssets`, you’ll need to initialize `SoomlaStore` with the implementation you just created. All of this is explained in detail in the platform-specific "Getting Started" tutorials.

`IStoreAssets` is transformed into metadata in JSON format and saved in a local SQLite database on the device. After that, the economy is always loaded from the database.


##Functions
<div class="info-box">The names of the functions may vary across the different platforms, but their descriptions are the same.</div>

###getVersion

This value will determine if the saved data in the database will be deleted or not. Bump the version every time you want to delete the old data in the DB. If you don't bump this value, you won't be able to see changes you've made to the objects in your implementation of `IStoreAssets`.

For example: If you previously created a `VirtualGood` with the name "Hat" and you published your application, the name "Hat” will be saved in all of your users' databases. If you want to change the name to "Green_hat" then you'll also have to bump the version (from 0 to 1). Now the new "Green_hat" name will replace the old one.


###getCurrencies

Create an instance of all your desired virtual currencies. For every `VirtualCurrency`, you'll have to provide: name, description and item Id. Use this functions to access your game's currencies.


###getCurrencyPacks

Create an instance of all your desired `VirtualCurrencyPack`s. For every `VirtualCurrencyPack`, you'll have to provide: name, description, item Id, purchase type, currency amount (the amount of currencies in the pack), and currency item Id (the item Id of the associated currency). Use this functions to access your game's currency packs.


###getGoods

Create an instance of all your desired `VirtualGood`s. For every good, you'll have to provide: name, description, item Id and purchase type. Use this functions to access your game's virtual goods.


###getCategories

Create an instance of all your desired virtual categories. For every `VirtualCategory`, you'll have to provide: name and goods item Ids (list of item Ids of the `VirtualGood`s in this category). Use this functions to access your game's categories.

<div class="info-box">If you don't want to categorize your `VirtualGood`s, just add one 'GENERAL' `VirtualCategory`.</div>


###getNonConsumableItems

Create an instance of all your desired `NonConsumableItem`s. For every `NonConsumableItem`, you'll have to provide: name, description, itemId and purchase type. Use this function to access your game's non-consumable items.

<div class="info-box">Make sure to set the type of the items (in `NonConsumableItem[]`) as Non-Consumables according to the Billing service provider that you’re working with (in Google Play store: MANAGED, in Apple App Store: Non-Consumable, etc..). Read more about this in [android-store’s MarketItem](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/MarketItem.java) or [iOS-store’s MarketItem](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/domain/MarketItem.h).</div>
