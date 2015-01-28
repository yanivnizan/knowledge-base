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

For example, when a user completes a World, an `onWorldCompleted` event is fired as a result.

## Observing & Handling Events

The `CCLevelUpEventDispatcher` class is where all events go through. See [CCLevelUpEventDispatcher](https://github.com/soomla/cocos2dx-levelup/blob/master/Soomla/CCLevelUpEventDispatcher.cpp).

To handle various events, create your own event handler class (see [example](#levelup-events) below) that implements `CCLevelUpEventHandler`, and add it to the `CCLevelUpEventDispatcher`:

``` cpp
soomla::CCLevelUpEventDispatcher::getInstance()->addEventHandler(CCExampleEventHandler);
```

## LevelUp Events

### `CCMyEventHandler.h`

``` cpp
class CCMyEventHandler: public soomla::CCLevelUpEventHandler {

	public:

		// This event is triggered when the Soomla LevelUp module is initialized and ready.
		virtual void onLevelUpInitialized();

		// This event is triggered when a World has been completed.
		virtual void onWorldCompleted(CCWorld *world);

		// This event is triggered when a Reward is assigned to a World.
		virtual void onWorldRewardAssigned(CCWorld *world);

		// This event is triggered when a Level has started.
		virtual void onLevelStarted(CCLevel *level);

		// This event is triggered when a Level has been completed.
		virtual void onLevelEnded(CCLevel *level);

		// This event is triggered when a Score's record has been reached.
		virtual void onScoreRecordReached(CCScore *score);

		// This event is triggered when a Score's record has changed.
		virtual void onScoreRecordChanged(CCScore *score);

		// This event is triggered when a Gate has opened.
		virtual void onGateOpened(CCGate* gate);

		// This event is triggered when a Mission has been completed.
		virtual void onMissionCompleted(CCMission* completedMission);

		// This event is triggered when a Mission has been revoked.
		virtual void onMissionCompletionRevoked(CCMission* mission);
};
```

### `CCMyEventHandler.cpp`

``` cpp
#include "CCMyEventHandler.h"
...

void soomla::CCSimpleLevelUpEventHandler::onLevelUpInitialized() {
	// ... your game specific implementation here ...
}

void soomla::CCSimpleLevelUpEventHandler::onWorldCompleted(soomla::CCWorld *world) {
	// world is the world that was completed

	// ... your game specific implementation here ...
}

void soomla::CCSimpleLevelUpEventHandler::onWorldRewardAssigned(soomla::CCWorld *world) {
	// world is the world who had a reward assigned to it

	// ... your game specific implementation here ...
}

void soomla::CCSimpleLevelUpEventHandler::onLevelStarted(soomla::CCLevel *level) {
	// level is the level that has started

	// ... your game specific implementation here ...
}

void soomla::CCSimpleLevelUpEventHandler::onLevelEnded(soomla::CCLevel *level) {
	// level is the level that has ended

	// ... your game specific implementation here ...
}

void soomla::CCSimpleLevelUpEventHandler::onScoreRecordReached(soomla::CCScore *score) {
	// score is the score whose record has been reached

	// ... your game specific implementation here ...
}

void soomla::CCSimpleLevelUpEventHandler::onScoreRecordChanged(CCScore *score) {
	// score is the score whose record has changed

	// ... your game specific implementation here ...
}

void soomla::CCSimpleLevelUpEventHandler::onGateOpened(soomla::CCGate *gate) {
	// gate is the gate that was opened

	// ... your game specific implementation here ...
}

void soomla::CCSimpleLevelUpEventHandler::onMissionCompleted(soomla::CCMission *completedMission) {
	// mission is the mission that was completed

	// ... your game specific implementation here ...
}

void soomla::CCSimpleLevelUpEventHandler::onMissionCompletionRevoked(soomla::CCMission *mission) {
	// mission is the mission that was revoked

	// ... your game specific implementation here ...
}
```
