---
layout: "content"
image: "Events"
title: "Events"
text: "Learn how to observe and handle social events triggered by cocos2dx-profile to customize your game-specific behavior."
position: 3
theme: 'platforms'
collection: 'cocos2dx_profile'
module: 'profile'
platform: 'cocos2dx'
---

# Event Handling

## About

Profile allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>

## How it Works

Events are triggered when SOOMLA wants to notify you about different things that happen involving Profile operations.

For example, when a user performs a social action such as uploading a status, an `onSocialActionStartedEvent` is fired as a result.


## Observing & Handling Events

The `CCProfileEventDispatcher` class is where all events go through. See [CCProfileEventDispatcher](https://github.com/soomla/cocos2dx-profile/blob/master/Soomla/CCProfileEventDispatcher.cpp).

To handle various events, create your own event handler (see example below) that implements `CCProfileEventHandler`, and add it to the `CCProfileEventDispatcher` class:

``` cpp
CCMyEventHandler *myEventHandler = new CCMyEventHandler();

soomla::CCProfileEventDispatcher::getInstance()->addEventHandler(myEventHandler);
```

## Profile Events

### `CCMyEventHandler.h`

``` cpp
#include "CCProfileEventHandler.h"

class CCMyEventHandler: public soomla::CCProfileEventHandler {

  public:

    // This event is triggered when Soomla Profile has been initialized.
    virtual void onProfileInitialized();

    // This event is triggered when the page for rating your app is opened.
    virtual void onUserRatingEvent();

    // This event is triggered when the user profile has been updated,
    // after login.
    virtual void onUserProfileUpdatedEvent(
      CCUserProfile *userProfile);

    // This event is triggered when logging into the social provider has started.
    virtual void onLoginStarted(
      CCProvider provider,
      cocos2d::__String *payload);

    // This event is triggered when logging into the social provider has finished
    // successfully.
    virtual void onLoginFinished(
      CCUserProfile *userProfile,
      cocos2d::__String *payload);

    // This event is triggered when logging into the social provider has been cancelled.
    virtual void onLoginCancelledEvent(
      CCProvider provider,
      cocos2d::__String *payload);

    // This event is triggered when logging into the social provider has failed.
    virtual void onLoginFailed(
      CCProvider provider,
      cocos2d::__String *errorDescription,
      cocos2d::__String *payload);

    // This event is triggered when logging out of the social provider has started.
    virtual void onLogoutStarted(CCProvider provider);

    // This event is triggered when logging out of the social provider has finished
    // successfully.
    virtual void onLogoutFinished(CCProvider provider);

    // This event is triggered when logging out of the social provider has failed.
    virtual void onLogoutFailed(
      CCProvider provider,
      cocos2d::__String *errorDescription);

    // This event is triggered when a social action (like, post status, etc..)
    // has started.
    virtual void onSocialActionStartedEvent(
      CCProvider provider,
      CCSocialActionType socialActionType,
      cocos2d::__String *payload);

    // This event is triggered when a social action has finished successfully.
    virtual void onSocialActionFinishedEvent(
      CCProvider provider,
      CCSocialActionType socialActionType,
      cocos2d::__String *payload);

    // This event is triggered when a social action has failed.
    virtual void onSocialActionFailedEvent(
      CCProvider provider,
      CCSocialActionType socialActionType,
      cocos2d::__String *errorDescription,
      cocos2d::__String *payload);

    // This event is triggered when fetching the contacts from the social provider
    // has started.
    virtual void onGetContactsStarted(
      CCProvider provider,
      cocos2d::__String *payload);

    // This event is triggered when fetching the contacts from the social provider
    // has finished successfully.
    virtual void onGetContactsFinished(
      CCProvider provider,
      cocos2d::__Array *contactsDict,
      cocos2d::__String *payload);

    // This event is triggered when fetching the contacts from the social provider
    // has failed.
    virtual void onGetContactsFailed(
      CCProvider provider,
      cocos2d::__String *errorDescription,
      cocos2d::__String *payload);

    // This event is triggered when fetching the feed from the social provider
    // has started.
    virtual void onGetFeedStarted(
      CCProvider provider,
      cocos2d::__String *payload);

    // This event is triggered when fetching the feed from the social provider
    // has finished successfully.
    virtual void onGetFeedFinished(
      CCProvider provider,
      cocos2d::__Array *feedList,
      cocos2d::__String *payload);

    // This event is triggered when fetching the feed from the social provider
    // has failed.
    virtual void onGetFeedFailed(
      CCProvider provider,
      cocos2d::__String *errorDescription,
      cocos2d::__String *payload);

};
```

### `CCMyEventHandler.cpp`

``` cpp
#include "CCMyEventHandler.h"

void onProfileInitialized() {
  // ... your game specific implementation here ...
}

void onUserRatingEvent() {
  // ... your game specific implementation here ...
}

virtual void onLoginFailed(CCProvider provider, cocos2d::__String *errorDescription,
                          cocos2d::__String *payload) {
  // provider is the social provider
  // payload is the identification string sent from the caller of the action

  // ... your game specific implementation here ...
}

virtual void onLoginFinished(CCUserProfile *userProfile, cocos2d::__String *payload) {
  // provider is the social provider
  // payload is an identification string that you can give when you initiate the login
  //  operation and want to receive back upon failure

  // ... your game specific implementation here ...
}

void onLoginStarted(CCProvider provider, cocos2d::__String *payload) {
  // provider is the social provider
  // payload is an identification string that you can give when you initiate the login
  //  operation and want to receive back upon starting

  // ... your game specific implementation here ...
}

void onLogoutFailed(CCProvider provider, cocos2d::__String *errorDescription) {
  // provider is the social provider

  // ... your game specific implementation here ...
}

 void onLogoutFinished(CCProvider provider) {
  // provider is the social provider

  // ... your game specific implementation here ...
}

void onLogoutStarted(CCProvider provider) {
  // provider is the social provider

  // ... your game specific implementation here ...
}

void onGetContactsFailed(CCProvider provider, cocos2d::__String *errorDescription,
                                cocos2d::__String *payload) {
  // provider is the social provider
  // payload is an identification string that you can give when you initiate the get
  //  contacts operation and want to receive back upon failure

  // ... your game specific implementation here ...
}

void onGetContactsFinished(CCProvider provider, cocos2d::__Array *contactsDict,
                                  cocos2d::__String *payload) {
  // provider is the social provider
  // contactsDict is an Array of contacts represented by CCUserProfile
  // payload is an identification string that you can give when you initiate the get
  //  contacts operation and want to receive back upon its completion

  // ... your game specific implementation here ...
}

void onGetContactsStarted(CCProvider provider, cocos2d::__String *payload) {
  // provider is the social provider
  // payload is an identification string that you can give when you initiate the get
  //  contacts operation and want to receive back upon starting

  // ... your game specific implementation here ...
}

void onGetFeedFailed(CCProvider provider, cocos2d::__String *errorDescription,
                            cocos2d::__String *payload) {
  // provider is the social provider
  // payload is an identification string that you can give when you initiate the get feed
  //  operation and want to receive back upon failure

  // ... your game specific implementation here ...
}

void onGetFeedFinished(CCProvider provider, cocos2d::__Array *feedList,
                              cocos2d::__String *payload) {
  // provider is the social provider
  // feedList is an Array of feed entries
  // payload is the identification String sent from the caller of the action

  // ... your game specific implementation here ...
}

void onGetFeedStarted(CCProvider provider, cocos2d::__String *payload) {
  // provider is the social provider
  // payload is the identification String sent from the caller of the action

  // ... your game specific implementation here ...
}

void onSocialActionFailedEvent(CCProvider provider,
                                      CCSocialActionType socialActionType,
                                      cocos2d::__String *errorDescription,
                                      cocos2d::__String *payload) {
  // provider is the social provider
  // socialActionType is the social action that failed (like, upload status, etc..)
  // payload is the identification String sent from the caller of the action

  // ... your game specific implementation here ...
}

void onSocialActionFinishedEvent(CCProvider provider,
                                        CCSocialActionType socialActionType,
                                        cocos2d::__String *payload) {
  // provider is the social provider
  // socialActionType is the social action that finished (like, upload status, etc..)
  // payload is an identification string that you can give when you initiate the social
  //  action operation and want to receive back upon failure

  // ... your game specific implementation here ...
}

void onSocialActionStartedEvent(CCProvider provider,
                                        CCSocialActionType socialActionType,
                                        cocos2d::__String *payload) {
  // provider is the social provider
  // socialActionType is the social action that started (like, upload status, etc..)
  // payload is an identification string that you can give when you initiate the social
  //  action operation and want to receive back upon starting

  // ... your game specific implementation here ...
}

void onLoginCancelledEvent(CCProvider provider, cocos2d::__String *payload) {
  // provider is the social provider
  // payload is an identification string that you can give when you initiate the login
  //  operation and want to receive back upon cancellation

  // ... your game specific implementation here ...
}

void onUserProfileUpdatedEvent(CCUserProfile *userProfile) {
  // userProfile is the user's profile which was updated

  // ... your game specific implementation here ...
}

```
