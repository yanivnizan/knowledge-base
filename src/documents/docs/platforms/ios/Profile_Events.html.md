---
layout: "content"
image: "Events"
title: "PROFILE: Events"
text: "Handle events in ios-profile with your game-specific behavior."
position: 8
theme: 'platforms'
collection: 'platforms_ios'
---
#**PROFILE: Event Handling**

##About

Profile allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur. The class [UserProfileEventHandling](https://github.com/soomla/ios-profile/blob/master/SoomlaiOSProfile/UserProfileEventHandling.h) contains many event-triggering functions that are called throughout the ios-profile code. You'll need to observe and handle these events once they occur.

##Triggering Events

Events are triggered throughout the different functions of ios-profile. Of course, you can also trigger events where you see fit. Read below to learn how to "listen for" and handle these events once they occur.

**For example:**

``` objectivec
- (void)updateStatusWithProvider:(Provider)provider andStatus:(NSString *)status andReward:(Reward *)reward {
	...
	[UserProfileEventHandling postSocialActionFinished:provider withType:UPDATE_STATUS];
	...
}
```

##Observing & Handling Events

In order to observe store events, you need to import `UserProfileEventHandling.h`:

``` objectivec
#import "UserProfileEventHandling.h"
```

Then you can add a notification to `NSNotificationCenter`:

``` objectivec
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(yourCustomSelector:) name:EVENT_UP_LOGIN_STARTED object:nil];
```

OR, you can observe all events with the same selector by calling:

``` objectivec
[UserProfileEventHandling observeAllEventsWithObserver:self withSelector:@selector(yourCustomSelector:)];
```

Handle the various events however you like, but notice that your behavior is an addition to the default behavior implemented by SOOMLA. You do not replace SOOMLA's behavior.
