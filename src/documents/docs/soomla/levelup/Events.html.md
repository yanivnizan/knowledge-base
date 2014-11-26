---
layout: "content"
image: "Events"
title: "Events"
text: "Throughout LevelUp, events are fired and need to be handled with your game-specific behavior."
position: 4
theme: 'soomla'
collection: 'soomla_levelup'
---

#Event Handling

##About

LevelUp allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

##Triggering Events

In LevelUp, events are fired from various functions throughout the code. Read below to learn how to listen for and handle the various events.

##Observing & Handling Events

Each platform-specific LevelUp module has its own, slightly different, event-handling mechanism, but in any platform you'll need to sign up to be notified of events. Then, once notified, you'll need to handle the different events with your game-specific behavior.

Some of the functions that you'll need to implement in order to handle events are:

- `onGateOpened`

- `onScoreRecordChanged`

- `onWorldCompleted`

- `onGateOpened`

and several others.

###In cocos2dx-levelup

In cocos2dx-levelup, to be notified of events and handle them, you need to create an event handler class that implements `CCLevelUpEventHandler`. Then, to "sign up for" (be notified about) events, add your class to the `CCLevelUpEventDispatcher`.

``` cpp
// Say you called your event handler class "myLevelUpEventHandler"
soomla::CCLevelUpEventDispatcher::getInstance()->addEventHandler(myLevelUpEventHandler);
```

Read more about [cocos2dx-levelup event handling](/cocos2dx/levelup/Levelup_Events).

###In unity3d-levelup

The `LevelUpEvents` class is where all events go through. To listen for and handle various events, just add your game-specific behavior to the delegates in the `LevelUpEvents` class.

``` cs
LevelUpEvents.OnWorldCompleted += onWorldCompleted;
```

Read more about [unity3d-levelup event handling](/unity/levelup/Levelup_Events).

<br>

<div class="info-box">In all platforms, your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>
