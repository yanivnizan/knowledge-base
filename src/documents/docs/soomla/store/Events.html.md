---
layout: "content"
image: "Events"
title: "Events"
text: "Throughout the SOOMLA SDK events are fired and need to be handled with your game-specific behavior."
position: 4
theme: 'soomla'
collection: 'soomla_store'
---

#**Event Handling**

SOOMLA uses a [publish-subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern for event handling. In order to be notified of store-related events, you can register for events, get notifications on various events, and create your game-specific behavior to handle them, as an addition to the behavior already defined by SOOMLA.

##Android

android-store supplies a package of Events, which contains many classes that represent  store-related events. Some of these are `MarketPurchaseEvent`, `MarketRefundEvent`, `CurrencyBalanceChangeEvent`, and many more. You can see the full list of events [here](https://github.com/soomla/android-store/tree/master/SoomlaAndroidStore/src/com/soomla/store/events).

In addition, android-store provides a singleton class called `BusProvider`, which exposes functions `post`, `register`, and `unregister`. Internally, `BusProvider` uses Square’s open-source project [Otto](http://square.github.io/otto/). Use the singleton instance of `BusProvider` to obtain the bus. Use the functions provided to publish-subscribe and handle the various events:

- `post` - Use to post (publish) a new event, which essentially informs subscribers that an action has occurred.
- `register` - In order to receive events, a class needs to register with the `BusProvider`.
- `unregister` - In order to stop receiving events, a class needs to unregister with the `BusProvider`.

[Learn more...](/docs/platforms/android/Events)

##iOS

iOS-store uses Apple Developer’s NSNotificationCenter to handle events across the SDK. iOS-store contains classes `EventHandling.h` and `EventHandling.m`.

[Learn more...](/docs/platforms/ios/Events)
