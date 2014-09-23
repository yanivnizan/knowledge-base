---
layout: "content"
image: "Events"
title: "PROFILE: Events"
text: "Handle cocos2dx-profile (social-related) events with your game-specific behavior."
position: 7
theme: 'platforms'
collection: 'platforms_cocos2dx'
---

#PROFILE: Event Handling

##About

Profile allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

##Triggering Events

The `CCProfileEventDispatcher` class is where all events go through. See [CCProfileEventDispatcher](https://github.com/soomla/cocos2dx-profile/blob/master/Soomla/CCProfileEventDispatcher.cpp).

Events are triggered from the native side (ios-profile and android-profile), and in turn are triggered in cocos2dx-profile. Read below to learn how to "listen for" and handle these events once they occur.

##Observing & Handling Events

To handle various events, create your own event handler, a class that implements [CCProfileEventHandler](https://github.com/soomla/cocos2dx-profile/blob/master/Soomla/CCProfileEventHandler.h). Then, to "sign up for" (be notified about) events, add it to the `CCProfileEventDispatcher`:

``` cpp
soomla::CCProfileEventDispatcher::getInstance()->addEventHandler(myProfileEventHandler);
```

Some of the functions in `CCProfileEventHandler` that you'll need to implement in your event handler class are:

- `onLoginFailed`
- `onLoginFinished`
- `onSocialActionFailedEvent`
- `onSocialActionFinishedEvent`

and several others.


**For example:** The function `onGetContactsFinished` is a part of the example event handler class `myProfileEventHandler` (added to the `CCProfileEventDispatcher` class above).

``` cs
// Handle the event that `getContacts` has finished.
void ProfileEventHandler::onGetContactsFinished(soomla::CCProvider provider, cocos2d::__Array *contactsDict) {
    log("%s Get contacts from %s has finished", TAG, soomla::CCUserProfileUtils::providerEnumToString(provider)->getCString());

    for (int i = 0; i < contactsDict->count(); ++i){
        soomla::CCUserProfile * contact = dynamic_cast<soomla::CCUserProfile *>(contactsDict->getObjectAtIndex(i));

        log("%s CONTACT %s %s", TAG, contact->getFirstName()->getCString(), contact->getLastName()->getCString());
    }
}
```

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>

<br>
**You can find a full example of an event handler class [here](https://github.com/soomla/cocos2dx-profile-example/blob/master/Classes/ProfileEventHandler.cpp).**
