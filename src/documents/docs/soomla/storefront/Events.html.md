---
layout: "content"
image: "Events"
title: "Events"
text: "Throughout Profile, events are fired, and need to be handled with your game-specific behavior."
position: 3
theme: 'soomla'
collection: 'soomla_storefront'
---

#Event Handling

##About

Profile allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

##Triggering Events

In iOS-profile, android-profile, and unity3d-profile, events are fired from various functions throughout the code. In cocos2dx-profile, events are fired from the native side (iOS-profile & android-profile).

##Observing & Handling Events

Each platform-specific Profile module has its own, slightly different, event-handling mechanism, but in all of them, you'll need to sign up to be notified of events. Then, once notified, you'll need to handle the different events according to your game-specific behavior.

Some of the functions that you'll need to implement in order to handle events are:

- `onLoginFailed`
- `onLoginFinished`
- `onSocialActionFailedEvent`
- `onSocialActionFinishedEvent`

and several others.

###In cocos2dx-profile

In cocos2dx-profile, to be notified of events and handle them, you need to create an event handler class that implements [CCProfileEventHandler](https://github.com/soomla/cocos2dx-profile/blob/master/Soomla/CCProfileEventHandler.h). Then, to "sign up for" (be notified about) events, add it to the `CCProfileEventDispatcher`:

``` cpp
// Say you called your event handler class "myProfileEventHandler"
soomla::CCProfileEventDispatcher::getInstance()->addEventHandler(myProfileEventHandler);
```

**Read more about [cocos2dx-profile event handling](/docs/platforms/cocos2dx/Profile_Events).**

###In unity3d-profile

In unity3d-profile, you'll need to create an event handler class that handles events once they occur. To be notified of events, you'll have to "register" each of your event handler functions to listen for the event. The way to register is like so:

``` cs
ProfileEvents.OnLoginFinished += onLoginFinished;
```

**Read more about [unity3d-profile event handling](/docs/platforms/unity/Profile_Events).**

<br>
<div class="info-box">In all platforms, your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>
