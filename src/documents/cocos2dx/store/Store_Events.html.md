---
layout: "content"
image: "Events"
title: "Events"
text: "Learn how to observe and handle economy events triggered by cocos2dx-store to customize your game-specific behavior."
position: 5
theme: 'platforms'
collection: 'cocos2dx_store'
module: 'store'
platform: 'cocos2dx'
---


# Event Handling

## About

cocos2dx-store allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>


## How it Works

Events are triggered when SOOMLA wants to notify you about different things that happen involving Store operations.

For example, when a user purchases a Market item, an `onMarketPurchaseStarted` is fired as a result.


## Observing & Handling Events

The `CCStoreEventDispatcher` class is where all events go through. To handle various events, create your own event handler, a class that implements `CCStoreEventHandler`, and add it to the `CCStoreEventDispatcher` class:

``` cpp
soomla::CCStoreEventDispatcher::getInstance()->addEventHandler(storeEventHandler);
```

## StoreEvents

###`ExampleEventHandler.h`

``` cpp
class ExampleEventHandler : public soomla::CCStoreEventHandler {

  public:

    /**
     Handles an `onSoomlaStoreInitialized` event, which is fired when
     SOOMLA Store is initialized.
     */
    virtual void onSoomlaStoreInitialized();

    /**
     Handles an `onBillingSupported` event, which is fired when SOOMLA
     knows that billing IS supported on the device.
     */
    virtual void onBillingSupported();

    /**
     Handles an `onBillingNotSupported` event, which is fired when SOOMLA
     knows that billing is NOT supported on the device.
     */
    virtual void onBillingNotSupported();

    /**
     Handles an `onCurrencyBalanceChanged` event, which is fired when the
     balance of a specific virtual currency has changed.
     @param virtualCurrency The currency whose balance has changed.
     @param balance The balance of the currency.
     @param amountAdded The amount added to the currency.
     */
    virtual void onCurrencyBalanceChanged(
      soomla::CCVirtualCurrency *virtualCurrency,
      int balance,
      int amountAdded);

    /**
     Handles an `onGoodBalanceChanged` event, which is fired when the
     balance of a specific virtual good has changed.
     @param virtualGood The good whose balance has changed.
     @param balance The balance of the good.
     @param amountAdded The amount added to the good.
     */
    virtual void onGoodBalanceChanged(
      soomla::CCVirtualGood *virtualGood,
      int balance,
      int amountAdded);

    /**
     Handles an `onGoodEquipped` event, which is fired when a specific
     equippable virtual good has been equipped.
     @param equippableVG The good that is being equipped.
     */
    virtual void onGoodEquipped(
      soomla::CCEquippableVG *equippableVG);

    /**
     Handles an `onGoodUnEquipped` event, which is fired when a specific
     equippable virtual good has been unequipped.
     @param equippableVG The good that is being unequipped.
     */
    virtual void onGoodUnEquipped(soomla::CCEquippableVG *equippableVG);

    /**
     Handles an `onGoodUpgrade` event, which is fired when a specific
     virtual good has been upgraded.
     @param virtualGood The virtual good that is being upgraded.
     @param upgradeVG The upgrade.
     */
    virtual void onGoodUpgrade(
      soomla::CCVirtualGood *virtualGood,
      soomla::CCUpgradeVG *upgradeVG);

    /**
     Handles an `onItemPurchased` event, which is fired when when a specific
     virtual good has been purchased.
     @param purchasableVirtualItem The item being purchased.
     */
    virtual void onItemPurchased(
      soomla::CCPurchasableVirtualItem *purchasableVirtualItem,
      cocos2d::__String *payload);

    /**
     Handles an `onItemPurchaseStarted` event, which is fired when a
     purchase process has started.
     @param purchasableVirtualItem The item whose purchase has started.
     */
    virtual void onItemPurchaseStarted(
      soomla::CCPurchasableVirtualItem *purchasableVirtualItem);

    /**
     Handles an `onMarketPurchaseStarted` event, which is fired when a
     purchase process has started, where the item is being purchased from
     the store (App Store, Google Play, etc..).
     @param purchasableVirtualItem The market item whose purchase has
     started.
     */
    virtual void onMarketPurchaseStarted(
      soomla::CCPurchasableVirtualItem *purchasableVirtualItem);

    /**
     Handles an `onMarketPurchase` event, which is fired when a market item
     from the store (App Store, Google Play, etc..) has been purchased.
     @param purchasableVirtualItem The market item being purchased.
     @param receiptUrl Receipt URL from the store.
     */
    virtual void onMarketPurchase(
      soomla::CCPurchasableVirtualItem *purchasableVirtualItem,
      cocos2d::__String *token,
      cocos2d::__String *payload);

    /**
     Handles an `onMarketPurchaseVerification` event, which is fired when a
     market purchase verification process has started.
     @param purchasableVirtualItem The market item whose purchase is being
            verified.
     */
    virtual void onMarketPurchaseVerification(
      soomla::CCPurchasableVirtualItem *purchasableVirtualItem);

    /**
     Handles an `onMarketPurchaseCancelled` event, which is fired when a
     market (App Store, Google Play, etc..) purchase has been cancelled.
     @param purchasableVirtualItem the item whose purchase is being
            cancelled.
     */
    virtual void onMarketPurchaseCancelled(
      soomla::CCPurchasableVirtualItem *purchasableVirtualItem);

    /**
     Handles an `onRestoreTransactionsStarted` event, which is fired when a
     restore transactions process has started.
     */
    virtual void onRestoreTransactionsStarted();

    /**
     Handles an `onRestoreTransactionsFinished` event, which is fired when a
     restore transactions process has finished.
     @param success Indicates if the restore transactions process finished
            successfully.
     */
    virtual void onRestoreTransactionsFinished(bool success);

    /**
     Handles an `onMarketItemsRefreshStarted` event, which is fired when a market
     item refreshed process has started.
     */
    virtual void onMarketItemsRefreshStarted();

    /**
     Handles an `onMarketItemsRefreshed` event, which is fired when a market
     item refreshed process has completed.
     */
    virtual void onMarketItemsRefreshed(cocos2d::__Array *virtualItems);

    /**
     Handles an `onUnexpectedErrorInStore` event, which is fired when an
     unexpected error occurs in the store.
     */
    virtual void onUnexpectedErrorInStore(cocos2d::__String *errorMessage);

};
```

#### Android Specific Events

``` cpp
/**
 Handles an `onMarketRefund` event, which is fired when a market item is
 being refunded.
 @param purchasableVirtualItem The item that is being refunded in the market.
 */
virtual void onMarketRefund(CCPurchasableVirtualItem *purchasableVirtualItem);

/**
 Handles an `onIabServiceStarted` event, which is fired when in-app
 billing service is started.
 */
virtual void onIabServiceStarted();

/**
 Handles an `onIabServiceStopped` event, which is fired when in-app
 billing service is stopped.
 */
virtual void onIabServiceStopped();
```

###`ExampleEventHandler.cpp`

``` cpp

void ExampleEventHandler::onBillingNotSupported() {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onBillingSupported() {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onCurrencyBalanceChanged(CCVirtualCurrency *virtualCurrency, int balance, int amountAdded) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onGoodBalanceChanged(CCVirtualGood *virtualGood, int balance, int amountAdded) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onGoodEquipped(CCEquippableVG *equippableVG) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onGoodUnEquipped(CCEquippableVG *equippableVG) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onGoodUpgrade(CCVirtualGood *virtualGood, CCUpgradeVG *upgradeVG) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onItemPurchased(CCPurchasableVirtualItem *purchasableVirtualItem, cocos2d::__String *payload) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onItemPurchaseStarted(CCPurchasableVirtualItem *purchasableVirtualItem) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onMarketPurchaseCancelled(CCPurchasableVirtualItem *purchasableVirtualItem) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onMarketPurchase(CCPurchasableVirtualItem *purchasableVirtualItem, cocos2d::__String *token, cocos2d::__String *payload) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onMarketPurchaseStarted(CCPurchasableVirtualItem *purchasableVirtualItem) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onMarketPurchaseVerification(CCPurchasableVirtualItem *purchasableVirtualItem) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onRestoreTransactionsStarted() {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onRestoreTransactionsFinished(bool success) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onUnexpectedErrorInStore(cocos2d::__String *errorMessage) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onSoomlaStoreInitialized() {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onMarketItemsRefreshed(cocos2d::__Array *virtualItems) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onMarketItemsRefreshStarted() {
    // ... your game specific implementation here ...
}
```

#### Android Specific Events

``` cpp
void ExampleEventHandler::onMarketRefund(CCPurchasableVirtualItem *purchasableVirtualItem) {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onIabServiceStarted() {
    // ... your game specific implementation here ...
}

void ExampleEventHandler::onIabServiceStopped() {
    // ... your game specific implementation here ...
}
```
