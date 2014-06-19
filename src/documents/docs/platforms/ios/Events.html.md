---
layout: "content"
image: "Events"
title: "Events"
text: "Event handling in iOS-store follows the publish-subscribe pattern."
position: 5
theme: 'platforms'
collection: 'platforms_ios'
---

#**Event Handling**

iOS-store contains classes [EventHandling.h](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/EventHandling.h) and [EventHandling.m](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/EventHandling.m). `EvenHandling.h` lists all supported events, and `EventHandling.m` contains implementations of functions that are used to register and post all the supported events. SOOMLA uses iOS's `NSNotificationCenter` to handle events across the SDK.

##How it works and what you need to do:

 1. In order to post events use the functions provided in `EventHandling`.

    **Example:** (Taken from [PurchaseWithVirtualItem.m](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/PurchaseTypes/PurchaseWithVirtualItem.m))

    ``` objectivec
    - (void)buy {
        ...
        [EventHandling postItemPurchaseStarted:self.associatedItem];
        ...
    }
    ```

 2. In order to observe store events you need to import `EventHandling.h` and then you can add a notification to `NSNotificationCenter`:

    ``` objectivec
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(yourCustomSelector:) name:EVENT_ITEM_PURCHASED object:nil];
    ```
    OR, you can observe all events with the same selector by calling:

    ``` objectivec
    [EventHandling observeAllEventsWithObserver:self withSelector:@selector(yourCustomSelector:)];
    ```

##Example

``` objectivec
// VirtualCurrencyStorage contains a method that posts a changed-balance event.
// When the add method of VirtualItemStorage is called, the function postBalanceChangeToItem is called, which fires a postChangedBalance event.

@ implementation VirtualItemStorage
...
}
- (int)addAmount:(int)amount toItem:(VirtualItem*)item withEvent:(BOOL)notify {
    ...
    [self postBalanceChangeToItem:item withBalance:balance andAmountAdded:amount];
    }
    ...
}
@end

@implementation VirtualCurrencyStorage
...
- (void)postBalanceChangeToItem:(VirtualItem*)item withBalance:(int)balance andAmountAdded:(int)amountAdded {
    [EventHandling postChangedBalance:balance forCurrency:(VirtualCurrency*)item withAmount:amountAdded];
}
...
@end


// In your game you'll need to listen for the events fired throughout iOS-store and handle them accordingly.
// In our example, we listen for the event of a change in balance...
@implementation VirtualCurrencyPacksViewController
...
- (void)viewDidLoad {
    ...
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(curBalanceChanged:) name:EVENT_CURRENCY_BALANCE_CHANGED object:nil];
    ...
}

// ...and handle it with our game-specific behavior.
- (void)curBalanceChanged:(NSNotification*)notification {
    NSDictionary* userInfo = [notification userInfo];
    currencyBalance.text = [NSString stringWithFormat:@"%d", [(NSNumber*)[userInfo objectForKey:@"balance"] intValue]];
}
...
@end

```
