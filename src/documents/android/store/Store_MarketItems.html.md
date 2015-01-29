---
layout: "content"
image: "Tutorial"
title: "Market Items"
text: "Understand what MarketItems are, how to use them, how to update market prices and details, and restore transactions."
position: 11
theme: 'platforms'
collection: 'android_store'
module: 'store'
platform: 'android'
---

# Market Items 101

This document is aimed at those of you who are using SOOMLA's android-store, and want more information on restoring transactions, updating market item prices, and understanding what `MarketItem`s are and how to use them.

## RefreshInventory, RestoreTransactions and RefreshMarketItemsDetails

Before we dive into `MarketItem`s, there are a few methods you need to be familiar with: `restoreTransactions`, `refreshMarketItemsDetails` and `refreshInventory`, all methods of `SoomlaStore`. This section will sort out the confusion between them and explain how each of them is used.

###`refreshInventory` <a href="https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/SoomlaStore.java#L306" target="_blank"><img class="link-icon-small" src="/img/tutorial_img/linkImg.png"></a>

This method is called upon initialization, and runs `restoreTransactions` followed by `refreshMarketItemsDetails` (see method explanations below).

If you want to restore transactions AND want your market items details to be refreshed then you should simply call `refreshInventory`.

### `restoreTransactions` <a href="https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/SoomlaStore.java#L150" target="_blank"><img class="link-icon-small" src="/img/tutorial_img/linkImg.png"></a>

This method retrieves the user's past purchases of non-consumable items from Google Play. As their name implies, non-consumable items remain in the user's possession forever, which is why these are the only ones that are kept by Google Play. Thus, when restoring transactions, these are the items that will be retrieved.

If you only want to restore transactions (and not as a part of `refreshInventory`) you should call the `restoreTransactions` method directly.

### `refreshMarketItemsDetails` <a href="https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/SoomlaStore.java#L223" target="_blank"><img class="link-icon-small" src="/img/tutorial_img/linkImg.png"></a>

This method retrieves information about your `MarketItem`s (explained below) from Google Play. This information includes prices, currencies, descriptions, etc.

This method is called in `refreshInventory`, which is called upon initialization.

## MarketItems <a href="https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/domain/MarketItem.java" target="_blank"><img class="link-icon" src="/img/tutorial_img/linkImg.png"></a>

A `MarketItem` is used to represent an item that you want to sell for money in the App Store, on Google Play, or any other Store.

### Class members

- `mProductId` - The product ID as defined in Google Play

- `mManaged` - The managed type of the item associated (`MANAGED` or `UNMANAGED`) with this item on Google Play.

- `mPrice` - A default price for the item in case the fetching of information from Google Play fails.

**These variables will contain information about the item as fetched from Google Play:**

- `mMarketPriceAndCurrency` - A String representation of the market item's price and currency, such as '$1.99'.

- `mMarketTitle` - A String representation of the market item's title.

- `mMarketDescription` - A String representation of the market item's description.

- `mMarketCurrencyCode` - A String representation of the market item's currency code, such as 'USD'.

- `MarketPriceMicros` - The price as a Long, multiplied by 1M currency units (This is the standard in Android - see `price_amount_micros` in [Table 2 of Android's documentation](http://developer.android.com/google/play/billing/billing_reference.html#getSkuDetails)).

### Usage

In your implementation of `IStoreAssets`, you need to create the items you want to sell for money with a purchase type of `PurchaseWithMarket`.

**For example:**

``` java
public static final VirtualGood NO_ADS_GOOD = new LifetimeVG(
  "No Ads",                                 // Name
  "No More Ads!",                           // Description
  "no_ads",                                 // Item ID
  new PurchaseWithMarket(                   // Purchase type
    "noAds_prodID",  
    0.99)
  )  
);
```

**Explanation:**

Internally, `PurchaseWithMarket` creates a `MarketItem` with the product ID and price you provided. See `PurchaseWithMarket`'s [constructor](https://github.com/soomla/android-store/blob/master/SoomlaAndroidStore/src/com/soomla/store/purchaseTypes/PurchaseWithMarket.java#L43).

<div class="info-box">Reminder: The Product ID you provide in the code needs to exactly match the product ID you enter in the App Store or Google Play.</div>

## MarketItem Prices

You need to supply a price when you define a `MarketItem` and you also need to provide a price in Google Play.

**The reason you need both:** The Soomla price is for display purposes, such as showing the price in your UI in cases of no connectivity. Otherwise, prices are retrieved from the market, and after that happens successfully, those are the ones that should be used.

### How Prices are Retrieved from the Market

Upon initialization of `SoomlaStore`, a process called `refreshInventory` is called, which updates all the `MarketItem`s with the information from the market. If the `refreshInventory` process succeeds, an event called `OnMarketItemsRefreshFinished` is fired. You can access the price and other info by catching this event, which will hold a List of `MarketItem`s.

![alt text](/img/tutorial_img/profile/retrievePrices.png "Soomla Economy Model")

<div class="info-box"> To catch this event, you need to subscribe to the `MarketItemsRefreshedFinishedEvent` and create an event handler function for it with your game-specific behavior. Read more about [Event Handling](/android/store/Store_Events). </div>

### Display Updated Prices

In order to display the correct price, you can *always* display the price retrieved from the Market (`mMarketPriceAndCurrency`), unless it's null - in that case you’ll want to display the hard-coded price (`mPrice`).

**For example:**

``` java
public void showStore() {

  PurchasableVirtualItem pvi = null;
  MarketItem mi = null;
  String updatedPrice;

  // Retrieve market item
  try {

    // Determine the most updated price
    pvi = StoreInfo.getPurchasableItem("some_productID");
    mi = ((PurchaseWithMarket)pvi.getPurchaseType()).getMarketItem();

    // Determine the most updated price
    updatedPrice = (mi.getMarketPriceAndCurrency() != null ?
                          mi.getMarketPriceAndCurrency() :
                          new Double(mi.getPrice()).toString());

  } catch (VirtualItemNotFoundException e) {
    e.printStackTrace();
  }

  //
  // Your UI code here
  //
}

```
