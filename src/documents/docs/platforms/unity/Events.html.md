---
layout: "content"
image: "Events"
title: "Events"
text: "Event handling in unity3d-store follows the publish-subscribe pattern."
position: 4
theme: 'platforms'
collection: 'platforms_unity'
---

#**Event Handling**

##About

SOOMLA allows you to subscribe to store events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur. SOOMLA's unity3d-store's event handling mechanism is based on the event-handling methods of android-store and ios-store. Throughout android-store and iOS-store events are fired and in unity3d-store they are observed and handled.

###In Android

SOOMLA's android-store supplies a package of Events, which contains many classes that represent  economy-related events. Some of these are `MarketPurchaseEvent`, `MarketRefundEvent`, `CurrencyBalanceChangeEvent`, and many more. You can see the full list of events [here](https://github.com/soomla/android-store/tree/master/SoomlaAndroidStore/src/com/soomla/store/events).

In addition, android-store provides a singleton class called `BusProvider`, which exposes functions `post`, `register`, and `unregister`. Internally, `BusProvider` uses Square’s open-source project [Otto](http://square.github.io/otto/). Use the singleton instance of `BusProvider` to obtain the bus. Use the functions provided to publish-subscribe and handle the various events:

###In iOS

SOOMLA's iOS-store contains classes [StoreEventHandling.h](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/StoreEventHandling.h) and [StoreEventHandling.m](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/StoreEventHandling.m). `EvenHandling.h` lists all supported events, and `EventHandling.m` contains implementations of functions that are used to register and post all the supported events. SOOMLA's iOS-store uses iOS's `NSNotificationCenter` to handle events across the SDK.

##How it works

###Triggering Events

Throughout android-store and iOS-store events are fired.

**For example:** When a user buys a currency pack, his currency balance needs to be updated, so a `CurrencyBalanceChangedEvent` is fired.

``` cs
// Taken from android-store's class `VirtualCurrencyStorage`:
BusProvider.getInstance().post(new CurrencyBalanceChangedEvent((VirtualCurrency)item, balance, amountAdded));
```

<div class="info-box">**What will happen next:** A class that "listens" for this event will be notified, and will contain a function that handles the change in currency balance. Read below to learn how to "listen" for and handle events.</div>

###Observing & Handling Events

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

Make sure to instantiate your event-handler class BEFORE `SoomlaStore`.  

``` cs
public class ExampleWindow : MonoBehaviour {
    ...
    private static ExampleEventHandler handler;

   void Start () {
        ...
	    handler = new ExampleEventHandler();
	    SoomlaStore.Initialize(new ExampleAssets());
	    ...
    }
}
```
