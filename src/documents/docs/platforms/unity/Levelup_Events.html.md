---
layout: "content"
image: "Events"
title: "LEVELUP: Events"
text: "Event handling in unity3d-levelup follows the publish-subscribe pattern. Throughout the SOOMLA SDK, events are fired and need to be handled with your game-specific behavior."
position: 13
theme: 'platforms'
collection: 'platforms_unity'
---

#LEVELUP: Event Handling

##About

LevelUp allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

##Triggering Events

In the LevelUp code events are fired in some functions. Of course, you can also fire the events from your code where you see fit.

**For Example:** In `WorldStorage.cs` the function `_setCompleted` triggers the event `OnWorldCompleted`.

``` cs
protected virtual void _setCompleted(World world, bool completed, bool notify) {
  ...
  if (notify) {
    LevelUpEvents.OnWorldCompleted(world);
  }
  ...
}
```

<div class="info-box">**What will happen next:** A class that "listens" for this event will be notified, and will contain a function that handles the event of world completion. Read below to learn how to "listen" for and handle events.</div>

##Observing & Handling Events

The `LevelUpEvents` class is where all events go through. To handle various events, just add your game-specific behavior to the delegates in the `LevelUpEvents` class.

**For example:** The code below "listens" for an `onWorldCompleted` event and handles it.

``` cs
// Observe
LevelUpEvents.OnWorldCompleted += onWorldCompleted;

// Handle
public void onWorldCompleted(string message) {
  SoomlaUtils.LogDebug(TAG, "SOOMLA/UNITY onWorldCompleted with message: " + message);

  // message is World as JSON
  JSONObject json = new JSONObject (message);
  World world = World.fromJSONObject (json);

  LevelUpEvents.OnWorldCompleted(world);
}

// Add your game-specific behavior:
public static Action<World> OnWorldCompleted = delegate {};
```

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>
