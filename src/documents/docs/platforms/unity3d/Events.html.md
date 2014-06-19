---
layout: "content"
image: "Events"
title: "Events"
text: "Event handling in unity3d-store follows the publish-subscribe pattern."
position: 6
theme: 'platforms'
collection: 'platforms_unity3d'
---

#**Event Handling**

SOOMLA provides you with an event handling mechanism that includes subscribing to store events and listening for (getting notified about) specific events. Continue reading to learn how to implement your own application-specific behavior to handle those events.

##How it works

Throughout android-store and iOS-store events are fired.

**For example:** When a user buys a currency pack, his currency balance needs to be update, so a `CurrencyBalanceChangedEvent` is fired.

``` cs
// Taken from android-store's class `VirtualCurrencyStorage`:
BusProvider.getInstance().post(new CurrencyBalanceChangedEvent((VirtualCurrency)item, balance, amountAdded));
```

<div class="info-box">**What will happen next:** A class that "listens" for this event will be notified, and will contain a function that handles the change in currency balance. Read below to learn how to "listen" for and handle events.</div>

##What you need to do

The `StoreEvents` class is where all events go through. To handle various events, just add your game-specific behavior to the delegates in the `StoreEvents` class.

For example, if you want to 'listen' for a `MarketPurchaseStarted` event:

``` cs
StoreEvents.OnMarketPurchaseStarted += onMarketPurchaseStarted;

public void onMarketPurchaseStarted(string message) {
    Utils.LogDebug(TAG, "SOOMLA/UNITY onMarketPurchaseStarted: " + message);
    PurchasableVirtualItem pvi = (PurchasableVirtualItem)StoreInfo.GetItemByItemId(message);
    StoreEvents.OnMarketPurchaseStarted(pvi);
}
```

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>

You can find a full example of an event handler class [here](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Examples/MuffinRush/ExampleEventHandler.cs).

Instantiate your event-handler class BEFORE `StoreController`.  

``` cs
public class ExampleWindow : MonoBehaviour {
    ...
    private static ExampleEventHandler handler;

   void Start () {
        ...
	    handler = new ExampleEventHandler();
	    StoreController.Initialize(new ExampleAssets());
	    ...
    }
}
```
