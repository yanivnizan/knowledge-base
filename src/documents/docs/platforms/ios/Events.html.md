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

SOOMLA's iOS-store contains classes [EventHandling.h](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/EventHandling.h) and [EventHandling.m](https://github.com/soomla/ios-store/blob/master/SoomlaiOSStore/EventHandling.m). `EvenHandling.h` lists all supported events, and `EventHandling.m` contains implementations of functions that are used to register and post all the supported events. SOOMLA's iOS-store uses iOS's `NSNotificationCenter` to handle events across the SDK.

##How it works

###Triggering Events

In order to post events use the functions provided in `EventHandling`.

``` objectivec
[EventHandling postSomeEvent:self.associatedItem];
```

###Observing Events

In order to observe store events you need to import `EventHandling.h` and then you can add a notification to `NSNotificationCenter`:

``` objectivec
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(yourCustomSelector:) name:EVENT_ITEM_PURCHASED object:nil];
```

OR, you can observe all events with the same selector by calling:

``` objectivec
[EventHandling observeAllEventsWithObserver:self withSelector:@selector(yourCustomSelector:)];
```

###Handling Events

In your code, handle events with your game-specific behavior. These handler functions will be called once the observer gets notified that an event has been triggered.

```
- (void)yourCustomSelector:(NSNotification*)notification {
    // handle accordingly
}
```

##Example Flow

``` objectivec
@ implementation VirtualItemStorage
...
// This method calls VirtualItemStorage's function postBalanceChangeToItem.
- (int)addAmount:(int)amount toItem:(VirtualItem*)item withEvent:(BOOL)notify {
    ...
        [self postBalanceChangeToItem:item withBalance:balance andAmountAdded:amount];
    }
    ...
}
@end

@implementation VirtualCurrencyStorage
...
// This method overrides the method in VirtualItemStorage.
- (void)postBalanceChangeToItem:(VirtualItem*)item withBalance:(int)balance andAmountAdded:(int)amountAdded {

    // A postChangedBalance event is fired.
    [EventHandling postChangedBalance:balance forCurrency:(VirtualCurrency*)item withAmount:amountAdded];
}
...
@end


// In our MuffinRush example, we listen for the event of a change in balance.
@implementation VirtualCurrencyPacksViewController
...
- (void)viewDidLoad {
    ...
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(curBalanceChanged:) name:EVENT_CURRENCY_BALANCE_CHANGED object:nil];
    ...
}

// Once such an event occurs, we handle it with our game-specific behavior.
- (void)curBalanceChanged:(NSNotification*)notification {
    NSDictionary* userInfo = [notification userInfo];
    currencyBalance.text = [NSString stringWithFormat:@"%d", [(NSNumber*)[userInfo objectForKey:@"balance"] intValue]];
}
...
@end

```
