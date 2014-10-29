---
layout: "content"
image: "Events"
title: "LEVELUP: Events"
text: "Event handling in unity3d-levelup follows the publish-subscribe pattern. Throughout the SOOMLA SDK, events are fired and need to be handled with your game-specific behavior."
position: 13
theme: 'platforms'
collection: 'platforms_unity'
---


You need to talk in Unity-speak - talk about adding these lines of code to your monobehavior, mention
the events prefabs that need to be added to your earliest loading scene. Mention that it is a best
practice to register all events before initializing levelup, just like the other modules. You get the
idea.


#LEVELUP: Event Handling

##About

LevelUp allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>

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

// Handle the event with your game-specific behavior:
public void onWorldCompleted(string message) {
  // do something
}
```

##All LevelUp Events

Below are the available events for LevelUp, each with a code example of how to sign up for the event and an event handler function.

###OnGateOpened

**Example**

``` cs
public void onGateOpened(Gate gate) {
  String s = gate.toJSONobject().ToString();
  SoomlaUtils.LogDebug("", s);
}
```

We need to have a comprehensive list of all events here, with really short code examples for each
one. Something concise and easy to digest - for example show for each event an event handler that takes
the entity's ID, fetches it from the SoomlaLevelUp class, and prints it's JSON representation.

public void onMarketPurchase(PurchasableVirtualItem pvi, string purchaseToken, string payload, string orderId) {


}
public static Action<PurchasableVirtualItem, string, string, string> OnMarketPurchase = delegate {};
