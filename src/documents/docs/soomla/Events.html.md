---
layout: "content"
image: "Tutorial"
title: "Events"
text: "Throughout the SOOMLA SDK events are fired and need to be handled with your game-specific behavior."
position: 5
---

#**Event Handling**

SOOMLA uses a [publish-subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern for event handling. In order to be notified of store-related events, you can register for events, get notifications on various events, and create your game-specific behavior to handle them, as an addition to the behavior already defined by SOOMLA.

##Android

android-store supplies a package of Events, which contains many classes that represent  economy-related events. Some of these are `MarketPurchaseEvent`, `MarketRefundEvent`, `CurrencyBalanceChangeEvent`, and many more. You can see the full list of events [here](https://github.com/soomla/android-store/tree/master/SoomlaAndroidStore/src/com/soomla/store/events).

In addition, android-store provides a singleton class called `BusProvider`, which exposes functions `post`, `register`, and `unregister`. Internally, `BusProvider` uses Square’s open-source project [Otto](http://square.github.io/otto/). Use the singleton instance of `BusProvider` to obtain the bus. Use the functions provided to publish-subscribe and handle the various events:

- `post` - Use to post (publish) a new event, which essentially informs subscribers that an action has occurred.
- `register` - In order to receive events, a class needs to register with the `BusProvider`.
- `unregister` - In order to stop receiving events, a class needs to unregister with the `BusProvider`.

**How it works:**

1. Throughout the android-store code events are fired, which means they are posted to the singleton instance of the bus. The example below is taken from android-store’s class `VirtualCurrencyStorage`. Here we can see a function that fires a `CurrencyBalanceChangedEvent`.

    ```
    protected void postBalanceChangeEvent(VirtualItem item, int balance, int amountAdded) {
            BusProvider.getInstance().post(new CurrencyBalanceChangedEvent((VirtualCurrency)item, balance, amountAdded)); }
    ```
    What will happen next: The subscriber function that catches this kind of event will be notified, and will handle the change in currency balance.


    <div class="info-box">You can `post` to the bus in any class.</div>

2. You need to create an event-handler class with functions that listen for and handle such events. Annotate these functions with `@subscribe`.

    ```
    @Subscribe
    public void onCurrencyBalanceChanged(CurrencyBalanceChangedEvent event) {
        // handle accordingly…
    }
    ```

<div class="info-box">Any class can have `@subscribe` functions that handle events.</div>

    See a full example of such an event handler class [here](https://github.com/soomla/android-store/blob/master/SoomlaAndroidExample/src/com/soomla/example/ExampleEventHandler.java).

3. In order to receive events: Any class that contains functions that receive events (`@subscribe` functions) needs to register with the bus:

    ```
    BusProvider.getInstance().register(this);
    ```

<div class="info-box">Any class can register to listen for events. If your class is an Activity register in `onResume`.</div>

4. In order to stop receiving events, you’ll need to unregister with the bus:

    ```
    BusProvider.getInstance().unregister(this);
    ```

<div class="info-box">If your class is an Activity unregister in `onPause`.</div>


##iOS

iOS-store uses Apple Developer’s NSNotificationCenter to handle events across the SDK. iOS-store contains classes `EventHandling.h` and `EventHandling.m`.

- `EvenHandling.h` contains a long list of supported events.
- `EventHandling.m` contains implementations of functions that are used to register and post all the supported events. You can use this class to invoke events on handlers when they occur.

**How it works:**

 1. `EventHandling.h` contains functions that post various events. These are used in several classes.

    **For example** `postChangedBalance` is used in `VirtualCurrencyStorage.h`:

    ```
    - (void)postBalanceChangeToItem:(VirtualItem*)item withBalance:(int)balance andAmountAdded:(int)amountAdded {
        [EventHandling postChangedBalance:balance forCurrency:(VirtualCurrency*)item withAmount:amountAdded];
    }
    ```

 2. In order to observe store events you need to import `EventHandling.h` and then you can add a notification to `NSNotificationCenter`:
    ```
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(yourCustomSelector:) name:EVENT_ITEM_PURCHASED object:nil];
    ```

    OR, you can observe all events with the same selector by calling:

    ```
    [EventHandling observeAllEventsWithObserver:self withSelector:@selector(yourCustomSelector:)];
    ```
