---
layout: "content"
image: "Tutorial"
title: "Market Items"
text: "Understand what MarketItems are, how to use them, how to update market prices and details, and restore transactions."
position: 8
theme: 'platforms'
collection: 'cocos2dx_store'
module: 'store'
platform: 'cocos2dx'
---

# Market Items 101

This document is aimed at those of you who are using SOOMLA's cocos2dx-store, and want more information on restoring transactions, updating market item prices, and understanding what `MarketItem`s are and how to use them.

## RefreshInventory, RestoreTransactions and RefreshMarketItemsDetails

Before we dive into `MarketItem`s, there are a few methods you need to be familiar with: `restoreTransactions`, `refreshMarketItemsDetails` and `refreshInventory`, all methods of `SoomlaStore`. This section will sort out the confusion between them and explain how each of them is used.

###`refreshInventory` <a href="https://github.com/soomla/cocos2dx-store/blob/c04584e3a7aac43d0fe4f72c50189df47d7b63cb/build/ios/headers/SoomlaiOSStore/SoomlaStore.h#L67" target="_blank"><img class="link-icon-small" src="/img/tutorial_img/linkImg.png"></a>

This method runs `restoreTransactions` followed by `refreshMarketItemsDetails` (see method explanations below).

If you want to restore transactions AND want your market items details to be refreshed then you should simply call `refreshInventory`.

**NOTE:** In Android `refreshInventory` is called upon initialization, while in iOS it's on demand when you want it to happen.

### `restoreTransactions` <a href="https://github.com/soomla/cocos2dx-store/blob/c04584e3a7aac43d0fe4f72c50189df47d7b63cb/build/ios/headers/SoomlaiOSStore/SoomlaStore.h#L72" target="_blank"><img class="link-icon-small" src="/img/tutorial_img/linkImg.png"></a>

This method retrieves the user's past purchases of non-consumable items from iTunesConnect or Google Play. As their name implies, non-consumable items remain in the user's possession forever, which is why these are the only ones that are kept by iTunesConnect or Google Play. Thus, when restoring transactions, these are the items that will be retrieved.

If you only want to restore transactions (and not as a part of `refreshInventory`) you should call the `restoreTransactions` method directly.

<div class="info-box">Notice that Apple requires you to include a "Restore Transactions" button in your app. Apple will reject your app without it! Read more about Apple's [Restoring Purchased Products](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/StoreKitGuide/Chapters/Restoring.html).</div>

### `refreshMarketItemsDetails` <a href="https://github.com/soomla/cocos2dx-store/blob/c04584e3a7aac43d0fe4f72c50189df47d7b63cb/build/ios/headers/SoomlaiOSStore/SoomlaStore.h#L86" target="_blank"><img class="link-icon-small" src="/img/tutorial_img/linkImg.png"></a>

This method retrieves information about your `MarketItem`s (explained below) from iTunesConnect or Google Play. This information includes prices, currencies, descriptions, etc.

This method is called in `refreshInventory`, which is called upon initialization.

## CCMarketItems <a href="https://github.com/soomla/cocos2dx-store/blob/master/Soomla/domain/CCMarketItem.h" target="_blank"><img class="link-icon" src="/img/tutorial_img/linkImg.png"></a>

A `CCMarketItem` is used to represent an item that you want to sell for money in the App Store, on Google Play, or any other Store.

### Class members

- `mProductId` - The product ID as defined in iTunesConnect or Google Play.

- `mConsumable` - The type of the item associated (consumable or non-consumable) with this item on iTunesConnect or Google Play.

- `mPrice` - A default price for the item in case the fetching of information from iTunesConnect or Google Play fails.

**These variables will contain information about the item as fetched from iTunesConnect or Google Play:**

- `mMarketPriceAndCurrency` - A String representation of the market item's price and currency, such as '$1.99'.

- `mMarketTitle` - A String representation of the market item's title.

- `mMarketDescription` - A String representation of the market item's description.

- `mMarketCurrencyCode` - A String representation of the market item's currency code, such as 'USD'.

- `mMarketPriceMicros` - The price as an Integer, multiplied by 1M currency units (The reason it's multiplied by 1M is because this is the standard in Android. Therefore, Soomla follows this standard and multiplies iOS prices as well, in order to be aligned with Android. See `price_amount_micros` in [Table 2 of Android's documentation](http://developer.android.com/google/play/billing/billing_reference.html#getSkuDetails) on this subject).

### Usage

In your implementation of `CCStoreAssets`, you need to create the items you want to sell for money with a purchase type of `PurchaseWithMarket`.

**For example:**

``` cpp
CCVirtualGood *noAdsLTVG = CCLifetimeVG::create(
  __String::create("No Ads"),                    // Name
  __String::create("No More Ads!"),              // Description
  __String::create("no_ads"),                    // Item ID
  CCPurchaseWithMarket::createWithMarketItem(    // Purchase type
    __String::create("noAds_ProdID"),
    __Double::create(0.99)
  )
);
```

**Explanation:**

Internally, `CCPurchaseWithMarket` creates a `CCMarketItem` with the product ID and price you provided. See `CCPurchaseWithMarket`'s [constructor](https://github.com/soomla/cocos2dx-store/blob/master/Soomla/PurchaseTypes/CCPurchaseWithMarket.cpp#L28).

<div class="info-box">Reminder: The Product ID you provide in the code needs to exactly match the product ID you enter in the App Store or Google Play.</div>

## CCMarketItem Prices

You need to supply a price when you define a `CCMarketItem` and you also need to provide a price in iTunesConnect / Google Play.

**The reason you need both:** The Soomla price is for display purposes, such as showing the price in your UI in cases of no connectivity. Otherwise, prices are retrieved from the market (Google Play, App Store), and after that happens successfully, those are the ones that should be used.

### How Prices are Retrieved from the Market

Upon initialization of `CCSoomlaStore`, a process called `refreshInventory` is called, which updates all the `CCMarketItem`s with the information from the market. If the `refreshInventory` process succeeds, an event called `onMarketItemsRefreshed` is fired. You can access the price and other info by catching this event, which will hold a List of `CCMarketItem`s.

![alt text](/img/tutorial_img/profile/retrievePrices.png "Soomla Economy Model")

<div class="info-box"> To catch this event, you need to listen for the `onMarketItemsRefreshed` event and create an event handler function for it with your game-specific behavior. Read more about [Event Handling](/cocos2dx/store/Store_Events). </div>

### Display Updated Prices

In order to display the correct price, you can *always* display the price retrieved from the Market (`mMarketPriceAndCurrency`), unless it's null - in that case you’ll want to display the hard-coded price (`mPrice`).

**For example:**

``` cpp
void MainScene::showStore() {

  // Retrieve market item
  soomla::CCError *error = NULL;
  soomla::CCPurchasableVirtualItem *pvi = soomla::CCStoreInfo::sharedStoreInfo()->
                            getPurchasableItemWithProductId("some_productID", &error);
  soomla::CCMarketItem *mi= dynamic_cast<soomla::CCPurchaseWithMarket*>
                            (pvi->getPurchaseType())->getMarketItem();

  // Determine the most updated price
  __String *updatedPrice = (mi->getMarketPriceAndCurrency() != NULL ?
                            mi->getMarketPriceAndCurrency() :
                            dynamic_cast<__String*>(mi->getPrice()));

  //
  // Your UI code here
  //

}
```
