---
layout: "content"
image: "Events"
title: "STORE: Events"
text: "Event handling in cocos2dx-store follows the publish-subscribe pattern."
position: 4
theme: 'platforms'
collection: 'platforms_cocos2dx'
---

#**STORE: Event Handling**

##About

SOOMLA allows you to subscribe to store events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur. SOOMLA's cocos2dx-store's event handling mechanism is based on the event-handling methods of android-store and ios-store. Throughout android-store and ios-store events are fired and in cocos2dx-store they are observed and handled.

###In Android

SOOMLA's android-store supplies a package of Events, which contains many classes that represent economy-related events. Some of these are `MarketPurchaseEvent`, `MarketRefundEvent`, `CurrencyBalanceChangeEvent`, and many more. You can see the full list of events [here](https://github.com/soomla/android-store/tree/master/SoomlaAndroidStore/src/com/soomla/store/events).

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

The `CCStoreEventDispatcher` class is where all events go through. To handle various events, create your own event handler class that implements `CCEventHandler`, and add it to the `CCStoreEventDispatcher` class:

####**For example**


**Handle a "market purchase started" event in the event handler class**
``` cpp
//ExampleEventHandler.h:
class ExampleEventHandler : public soomla::CCStoreEventHandler {
    virtual void onMarketPurchaseStarted(soomla::CCPurchasableVirtualItem *purchasableVirtualItem);
}

//In ExampleEventHandler.cpp:
void ExampleEventHandler::onMarketPurchaseStarted(soomla::CCPurchasableVirtualItem *purchasableVirtualItem) {
    soomla::CCStoreUtils::logDebug(TAG, "MarketPurchaseStarted");
}
```

**Add the event handler class to `CCStoreEventDispatcher`**
``` cpp
//AppDelegate.h:
class  AppDelegate : private cocos2d::Application {
    ...
    soomla::CCStoreEventHandler *handler;
    ...
}

//In AppDelegate.cpp:
bool AppDelegate::applicationDidFinishLaunching() {
    ...
    soomla::CCStoreEventDispatcher::getInstance()->addEventHandler(handler);
    ...
}
```

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>

You can find a full example of an event handler class [here](https://github.com/soomla/cocos2dx-store-example/blob/master/Classes/ExampleEventHandler.h).
