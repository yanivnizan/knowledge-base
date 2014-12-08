---
layout: "content"
image: "Events"
title: "Events"
text: "Learn how to observe and handle economy events triggered by cocos2dx-store to customize your game-specific behavior."
position: 4
theme: 'platforms'
collection: 'cocos2dx_store'
module: 'store'
platform: 'cocos2dx'
---


#Event Handling

##About

cocos2dx-store allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>


##How it Works

Events are triggered when SOOMLA wants to notify you about different things that happen involving Store operations.

For example, when a user purchases a Market item, an `onMarketPurchaseStarted` is fired as a result.


##Observing & Handling Events

The `CCStoreEventDispatcher` class is where all events go through. See [CCStoreEventDispatcher](https://github.com/soomla/cocos2dx-store/blob/master/Soomla/CCStoreEventDispatcher.cpp).

To handle various events, create your own event handler (see example below) that implements `CCStoreEventHandler`, and add it to the `CCStoreEventDispatcher` class:

``` cpp
soomla::CCStoreEventDispatcher::getInstance()->addEventHandler(storeEventHandler);
```

## StoreEvents

###`CCMyEventHandler.h`

``` cpp
class ExampleEventHandler : public soomla::CCStoreEventHandler {

  public:

    virtual void onSoomlaStoreInitialized();

    virtual void onBillingSupported();

    virtual void onBillingNotSupported();

    virtual void onCurrencyBalanceChanged(
      soomla::CCVirtualCurrency *virtualCurrency,
      int balance,
      int amountAdded);

    virtual void onGoodBalanceChanged(
      soomla::CCVirtualGood *virtualGood,
      int balance,
      int amountAdded);

    virtual void onGoodEquipped(
      soomla::CCEquippableVG *equippableVG);

    virtual void onGoodUnEquipped(soomla::CCEquippableVG *equippableVG);

    virtual void onGoodUpgrade(
      soomla::CCVirtualGood *virtualGood,
      soomla::CCUpgradeVG *upgradeVG);

    virtual void onItemPurchased(
      soomla::CCPurchasableVirtualItem *purchasableVirtualItem,
      cocos2d::__String *payload);

    virtual void onItemPurchaseStarted(
      soomla::CCPurchasableVirtualItem *purchasableVirtualItem);

    virtual void onMarketPurchaseStarted(
      soomla::CCPurchasableVirtualItem *purchasableVirtualItem);

    virtual void onMarketPurchase(soomla::CCPurchasableVirtualItem *purchasableVirtualItem, cocos2d::__String *token, cocos2d::__String *payload);

    virtual void onMarketPurchaseVerification(soomla::CCPurchasableVirtualItem *purchasableVirtualItem);

    virtual void onMarketPurchaseCancelled(soomla::CCPurchasableVirtualItem *purchasableVirtualItem);

    virtual void onRestoreTransactionsStarted();

    virtual void onRestoreTransactionsFinished(bool success);

    virtual void onMarketItemsRefreshStarted();

    virtual void onMarketItemsRefreshed(cocos2d::__Array *virtualItems);

    virtual void onUnexpectedErrorInStore(cocos2d::__String *errorMessage);

};
```



###`CCMyEventHandler.cpp`

``` cpp

```



You can find a full example of an event handler class [here](https://github.com/soomla/cocos2dx-store-example/blob/master/Classes/ExampleEventHandler.h).
