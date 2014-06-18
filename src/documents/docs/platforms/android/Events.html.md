---
layout: "content"
image: "Tutorial"
title: "Events"
text: "Event handling in android-store follows the publish-subscribe pattern."
position: 5
theme: 'platforms'
collection: 'soomla_store'
---

#**Event Handling**

android-store supplies a package of Events, which contains many classes that represent  store-related events. Some of these are `MarketPurchaseEvent`, `MarketRefundEvent`, `CurrencyBalanceChangeEvent`, and many more. You can see the full list of events [here](https://github.com/soomla/android-store/tree/master/SoomlaAndroidStore/src/com/soomla/store/events).

In addition, android-store provides a singleton class called `BusProvider`, which exposes functions `post`, `register`, and `unregister`. Internally, `BusProvider` uses Square’s open-source project Otto. Use the singleton instance of `BusProvider` to obtain the bus. Use the functions provided to publish-subscribe and handle the various events:

- `post` - Use to publish a new event, which essentially informs subscribers that an action has occurred.

- `register` - In order to receive events, a class needs to register with the `BusProvider`.

- `unregister` - In order to stop receiving events, a class needs to unregister with the `BusProvider`.

##How it works and what you need to do:

1. Throughout the android-store code events are fired, which means they are posted to the singleton instance of the bus. The example below is taken from android-store’s class `VirtualCurrencyStorage`. Here we can see a function that fires a `CurrencyBalanceChangedEvent`.

    ``` java
    protected void postBalanceChangeEvent(VirtualItem item, int balance, int amountAdded) {
        BusProvider.getInstance().post(new CurrencyBalanceChangedEvent((VirtualCurrency)item, balance, amountAdded));
    }
    ```

    **What will happen next:** the subscriber function that catches this kind of event will be notified, and will handle the change in currency balance.

    <div class="info-box">You can `post` to the bus where you need to.</div>

2. You need to create an event-handler class with functions that listen for and handle such events. Annotate these functions with `@subscribe`.

    ``` java
    @Subscribe
    public void onCurrencyBalanceChanged(CurrencyBalanceChangedEvent event) {
        // handle accordingly...
    }
    ```

    <div class="info-box">Any class can have `@subscribe` functions that handle events.</div>

    You can see a full example of such an event handler class [here](https://github.com/soomla/android-store/blob/master/SoomlaAndroidExample/src/com/soomla/example/ExampleEventHandler.java).

3. In order to receive events, any class that contains functions that receive events (`@subscribe` functions) needs to register with the bus:
    ``` java
    BusProvider.getInstance().register(this);
    ```

    <div class="info-box">Any class can register to listen for events. If your class is an Activity register in `onResume`.</div>

4. In order to stop receiving events, you’ll need to unregister with the bus:

    ``` java
    BusProvider.getInstance().unregister(this);
    ```

    <div class="info-box">If your class is an Activity unregister in `onPause`.</div>
