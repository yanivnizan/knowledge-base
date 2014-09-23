---
layout: "content"
image: "Events"
title: "PROFILE: Events"
text: "Event handling in android-profile follows the publish-subscribe pattern. Handle social-related events with your game-specific behavior."
position: 9
theme: 'platforms'
collection: 'platforms_android'
---

#PROFILE: Event Handling

##About

For event handling, android-profile uses Square's great open-source project [otto](http://square.github.io/otto/). In order to be notified of profile-related events, you can register for specific events. Once these events occur, you can handle them with your game-specific behavior.

##Triggering Events

Various events are triggered throughout the different functions of android-profile. Of course, you can also trigger events where you see fit.

**For example:** In the function `updateStatus`, a `SocialActionStartedEvent` is triggered at the beginning.

``` java
public void updateStatus(final IProvider.Provider provider, String status, final Reward reward) throws ProviderNotFoundException {
    ...
    final ISocialProvider.SocialActionType updateStatusType = ISocialProvider.SocialActionType.UPDATE_STATUS;
    BusProvider.getInstance().post(new SocialActionStartedEvent(provider, updateStatusType));
    ...
}
```

Read below to learn how to "listen for" and handle these events once they occur.

##Observing & Handling Events

In order to "listen for" and handle events, create an event-handling function with the annotation `@Subscribe` in the class that should receive the event.

``` java
@Subscribe
public void onLoginFinishedEvent(LoginFinishedEvent loginFinishedEvent) {
    // handle the event
}
```

Also, you'll have to register that class to the event bus (and unregister when needed). If your class is an Activity, register in `onStart` and unregister in `onStop`.

``` java
protected void onStart() {
    ...
    BusProvider.getInstance().register(this);
}

protected void onStop() {
    ...
    BusProvider.getInstance().unregister(this);
}
```

<div class="info-box">Handle the various events however you like, but notice that your behavior is an addition to the default behavior implemented by SOOMLA. You do not replace SOOMLA's behavior. You can find a full event handler example [here](https://github.com/soomla/android-profile/blob/master/SoomlaAndroidExample/src/com/soomla/example/ExampleEventHandler.java).</div>
