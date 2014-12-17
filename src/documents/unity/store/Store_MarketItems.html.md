---
layout: "content"
image: "Tutorial"
title: "Market Items"
text: ""
position: 8
theme: 'platforms'
collection: 'unity_store'
module: 'store'
platform: 'unity'
---

# Market Items 101

This document is aimed at those of you who are using SOOMLA's unity3d-store, and want more information on restoring transactions, updating market item prices, and understanding what `MarketItem`s are and how to use them.

## RefreshInventory, RestoreTransactions and RefreshMarketItemsDetails

Before we dive into `MarketItem`s, there are a few methods you need to be familiar with: `RestoreTransactions`, `RefreshMarketItemsDetails` and `RefreshInventory`, all methods of `SoomlaStore`. This section will sort out the confusion between them and explain how each of them is used.

### `RefreshInventory` [<img class="link-icon-small" src="/img/tutorial_img/linkImg.png">](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/SoomlaStore.cs#L105)

This method runs `RestoreTransactions` followed by `RefreshMarketItemsDetails` (see method explanations below).

If you want to restore transactions AND want your market items details to be refreshed then you should simply call `RefreshInventory`.

**NOTE:** In Android `RefreshInventory` is called upon initialization, while in iOS it's on demand when you want it to happen.

### `RestoreTransactions` [<img class="link-icon-small" src="/img/tutorial_img/linkImg.png">](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/SoomlaStore.cs#L122)

This method retrieves the user's past purchases of non-consumable items from iTunesConnect or Google Play. As their name implies, non-consumable items remain in the user's possession forever, which is why these are the only ones that are kept by iTunesConnect or Google Play. Thus, when restoring transactions, these are the items that will be retrieved.

If you only want to restore transactions (and not as a part of `RefreshInventory`) you should call the `RestoreTransactions` method directly.

<div class="info-box">Notice that Apple requires you to include a "Restore Transactions" button in your app. Apple will reject your app without it! Read more about Apple's [Restoring Purchased Products](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/StoreKitGuide/Chapters/Restoring.html).</div>

### `RefreshMarketItemsDetails` [<img class="link-icon-small" src="/img/tutorial_img/linkImg.png">](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/SoomlaStore.cs#L115)

This method retrieves information about your `MarketItem`s (explained below) from iTunesConnect or Google Play. This information includes prices, currencies, descriptions, etc.

This method is called in `RefreshInventory`, which is called upon initialization.

## MarketItems [<img class="link-icon" src="/img/tutorial_img/linkImg.png">](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/domain/MarketItem.cs)

A `MarketItem` is used to represent an item that you want to sell for money in the App Store, on Google Play, or any other Store.

### Class members

- `ProductId` - The product ID as defined in iTunesConnect or Google Play

- `consumable` - The type of the item associated (`NONCONSUMABLE` or `CONSUMABLE`) with this item on iTunesConnect or Google Play.

- `Price` - A default price for the item in case the fetching of information from iTunesConnect or Google Play fails.

**These variable will contain information about the item as fetched from iTunesConnect or Google Play:**

- `MarketPriceAndCurrency`

- `MarketTitle`

- `MarketDescription`

- `MarketCurrencyCode`

- `MarketPriceMicros`

### Usage

In your implementation of `IStoreAssets`, you need to create the items you want to sell for money with a purchase type of `PurchaseWithMarket`.

**For example:**

``` cs
public static VirtualGood NO_ADS_LTVG = new LifetimeVG(
  "No Ads",                        // Name
  "No More Ads!",                  // Description
  "no_ads",                        // Item ID
  new PurchaseWithMarket(          // Purchase type
	  NO_ADS_LIFETIME_PRODUCT_ID,
	  0.99));
```

**Explanation:**

Internally, `PurchaseWithMarket` creates a `MarketItem` with the product ID and price you provided. See `PurchaseWithMarket`'s [constructor](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Plugins/Soomla/Store/purchaseTypes/PurchaseWithMarket.cs#L44).

<div class="info-box">Reminder: The Product ID you provide in the code needs to exactly match the product ID you enter in the App Store or Google Play.</div>

## MarketItem Prices

You need to supply a price when you define a `MarketItem` and you also provide a price in iTunesConnect / Google Play.

**The reason you need both:** The Soomla price is for display purposes, such as showing the price in your UI, but only in cases of no connectivity. Otherwise, prices are retrieved from the market (Google Play, App Store), and after that happens successfully, those are the ones that should be used.

### How Prices are Retrieved from the Market

Upon initialization of `SoomlaStore`, a process called `RefreshInventory` is called, which updates all the `MarketItem`s with the information from the market. If the `RefreshInventory` process succeeds, an event called `OnMarketItemsRefreshFinished` is fired. You can access the price and other info by catching this event, which will hold a List of `MarketItem`s.

![alt text](/img/tutorial_img/profile/retrievePrices.png "Soomla Economy Model")

**To catch this event, you need to:**

1. Subscribe to the event

  ``` cs
  StoreEvents.OnMarketItemsRefreshFinished+=onMarketItemsRefreshFinished;
  ```

2. Implement an event handler

  ``` cs
  public void onMarketItemsRefreshFinished(List<MarketItem> marketItems){
     foreach (MarketItem mi in marketItems){
        string marketPriceAndCurrency = mi.MarketPriceAndCurrency; //for example $1.99
        string productId = mi.ProductId; //for example no_ads
        // update the associated GUI item's name and price
     }
  }
  ```

### Display Updated Prices

In order to display the correct price, you can *always* display the price retrieved from the Market, unless it's null and in that case you’ll want to display the hard-coded price.

**For example:**

``` cs
public void showStore() {

  // Retrieve market item
  string prodId = MyIStoreAssets.NO_ADS_LIFETIME_PRODUCT_ID;
  PurchasableVirtualItem pvi = StoreInfo.GetPurchasableItemWithProductId(prodId);
  MarketItem mi = ((PurchaseWithMarket)pvi.PurchaseType).MarketItem;

  // Determine the most updated price
  string updatedPrice = (mi.MarketPriceAndCurrency != null ?
                         mi.MarketPriceAndCurrency         :
                         mi.Price.ToString());

  //
  // Your UI code here
  //
}
```

### Currencies

As mentioned above, `MarketItem` has the members `MarketPriceAndCurrency` and `MarketCurrencyCode`.

After the information has been retrieved from the market:

- `MarketPriceAndCurrency` will hold the price with the currency symbol, such as '$1.99'.

- `MarketCurrencyCode` will hold the currency code, such as 'USD'.

You can use regular expressions to display your price and currency in other formats.
