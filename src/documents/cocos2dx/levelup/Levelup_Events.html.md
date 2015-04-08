---
layout: "content"
image: "Events"
title: "Events"
text: "Learn how to observe and handle game progress events triggered by cocos2dx-levelup to customize your game-specific behavior."
position: 3
theme: 'platforms'
collection: 'cocos2dx_levelup'
module: 'levelup'
platform: 'cocos2dx'
---

# Event Handling

## About

LevelUp allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>

## How it Works

Events are triggered when SOOMLA wants to notify you about different things that happen involving LevelUp operations.

For example, when a user completes a World, an `EVENT_WORLD_COMPLETED` event is fired as a result.


## Observing & Handling Events

SOOMLA uses the Cocos2d-x facilities to dispatch its own custom events.
The names of such events are defined in `CCLevelUpConsts`, the meta-data of the event is held in a `__Dictionary`. You can subscribe to any event from anywhere in your code.

When handling the event you can extract meta-data from the dictionary using pre-defined keys, which are also defined in `CCLevelUpConsts`.

### Cocos2d-x v3 Events

** Subscribing **

Subscribe to events through the Cocos2d-x  [`EventDispatcher`](http://www.cocos2d-x.org/wiki/EventDispatcher_Mechanism):

```cpp
cocos2d::Director::getInstance()->getEventDispatcher()->addCustomEventListener(soomla::CCLevelUpConsts::EVENT_WORLD_COMPLETED, CC_CALLBACK_1(ExampleScene::onWorldCompleted, this));
```

** Handling **

Handle the event through your own custom function:

```cpp
void ExampleScene::onWorldCompleted(cocos2d::EventCustom *event) {
  cocos2d::__Dictionary *eventData = (cocos2d::__Dictionary *)event->getUserData();
	// ... get meta-data information from eventData
}
```


### Cocos2d-x v2 Events

** Subscribing **

Subscribe to events through the Cocos2d-x `CCNotificationCenter`:

```cpp
cocos2d::CCNotificationCenter::sharedNotificationCenter()->addObserver(this, callfuncO_selector(ExampleScene::onWorldCompleted), soomla::CCLevelUpConsts::EVENT_WORLD_COMPLETED, NULL);
```

** Handling **

Handle the event through your own custom function:

```cpp
void ExampleScene::onWorldCompleted(cocos2d::CCDictionary *eventData) {
	// ... get meta-data information from eventData
}
```

## LevelUp Events
