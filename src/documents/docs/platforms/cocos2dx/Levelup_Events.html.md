---
layout: "content"
image: "Events"
title: "LEVELUP: Events"
text: "Sign up to be notified about cocos2dx-levelup events, and handle them with your game-specific behavior."
position: 11
theme: 'platforms'
collection: 'platforms_cocos2dx'
---

#LEVELUP: Event Handling

##About

LevelUp allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

##Triggering Events

The `CCLevelUpEventDispatcher` class is where all events go through. See [CCLevelUpEventDispatcher](https://github.com/soomla/cocos2dx-levelup/blob/master/Soomla/CCLevelUpEventDispatcher.cpp).

Events are triggered throughout cocos2dx-levelup. Read below to learn how to "listen for" and handle these events once they occur.

##Observing & Handling Events

To handle various events, create your own event handler, a class that implements `CCLevelUpEventHandler`, and add it to the `CCLevelUpEventDispatcher`:

``` cpp
soomla::CCLevelUpEventDispatcher::getInstance()->addEventHandler(myLevelUpEventHandler);
```

Some of the functions in `CCLevelUpEventHandler` that you'll need to implement in your event handler class are:

- `onLevelUpInitialized`
- `onScoreRecordReached`
- `onGateOpened`
- `onWorldCompleted`
- `onLevelStarted`

and several others.


**For example:** The event `onGateOpened` is a part of the event handler class `myLevelUpEventHandler`, that has been added to the `CCLevelUpEventDispatcher` class above.  

``` cs
// Handle the event that a gate has been opened.
void LevelUpEventHandler::onGateOpened(soomla::CCGate *gate) {
	log("%s Gate has been opened.", TAG);
	// Handle however you want - maybe you'll want to check
	// which kind of gate this is and handle accordingly.
}
```

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>
