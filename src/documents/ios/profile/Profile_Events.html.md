---
layout: "content"
image: "Events"
title: "Events"
text: "Learn how to observe and handle social events triggered by ios-profile to customize your game-specific behavior."
position: 3
theme: 'platforms'
collection: 'ios_profile'
module: 'profile'
platform: 'ios'
---

# Event Handling

## About

Profile allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>


## How it Works

Events are triggered when SOOMLA wants to notify you about different things that happen involving Profile operations.

For example, when a user performs a social action such as uploading a status, an event is fired as a result.


## Observing & Handling Events

In order to observe store events you need to import `ProfileEventHandling.h` and then you can add a notification to `NSNotificationCenter`:

``` objectivec
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(yourCustomSelector:)
name:EVENT_UP_LOGIN_STARTED object:nil];
```

OR, you can observe all events with the same selector by calling:

``` objectivec
[UserProfileEventHandling observeAllEventsWithObserver:self
  withSelector:@selector(yourCustomSelector:)];
```

## Profile Events

### EVENT_UP_PROFILE_INITIALIZED  

This event will be posted when Soomla Profile has been initialized.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(profileInitialized:)
:EVENT_UP_PROFILE_INITIALIZED object:nil];

// your handler:
- (void)profileInitialized:(NSNotification*)notification {
  // ... your game specific implementation here ...
}
```

### EVENT_UP_USER_RATING

This event will be thrown when the page for rating your app is opened.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(userRating:)
name:EVENT_UP_USER_RATING object:nil];

// your handler:
- (void)userRating:(NSNotification*)notification {
  // ... your game specific implementation here ...
}
```

### EVENT_UP_USER_PROFILE_UPDATED

This event will be thrown when the user profile has been updated, after login.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(userProfileUpdated:)
name:EVENT_UP_USER_PROFILE_UPDATED object:nil];

// your handler:
- (void)userProfileUpdated:(NSNotification*)notification {
  // notification contains:
  // DICT_ELEMENT_USER_PROFILE = the user's profile from the logged in provider

  // ... your game specific implementation here ...
}
```

### EVENT_UP_LOGIN_STARTED

This event will be thrown when logging in to the social provider has started.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loginStarted:)
name:EVENT_UP_LOGIN_STARTED object:nil];

// your handler:
- (void)loginStarted:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER = the provider where the login has started
  // DICT_ELEMENT_PAYLOAD  = an identification String that you can give when you initiate the
  //                         login operation and want to receive back upon starting

  // ... your game specific implementation here ...
}
```

### EVENT_UP_LOGIN_FINISHED

This event will be thrown when logging in to the social provider has finished successfully.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loginFinished:)
name:EVENT_UP_LOGIN_FINISHED object:nil];

// your handler:
- (void)loginFinished:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_USER_PROFILE = the user's profile from the logged in provider
  // DICT_ELEMENT_PAYLOAD      = an identification string that you can give when you initiate the
  //                             login operation and want to receive back upon its completion

  // ... your game specific implementation here ...
}
```

### EVENT_UP_LOGIN_CANCELLED

This event will be thrown when logging in to the social provider has been cancelled.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loginCancelled:)
name:EVENT_UP_LOGIN_CANCELLED object:nil];

// your handler:
- (void)loginCancelled:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER = the provider which the user has cancelled login to
  // DICT_ELEMENT_PAYLOAD  = an identification string that you can give when you initiate the
  //            login operation and want to receive back upon cancellation

  // ... your game specific implementation here ...
}
```

### EVENT_UP_LOGIN_FAILED

This event will be thrown when logging in to the social provider has failed.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loginFailed:)
name:EVENT_UP_LOGIN_FAILED object:nil];

// your handler:
- (void)loginFailed:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER = the provider on which the login has failed
  // DICT_ELEMENT_MESSAGE  = description of the reason for failure
  // DICT_ELEMENT_PAYLOAD  = an identification string that you can give when you initiate
  //                         the login operation and want to receive back upon failure

  // ... your game specific implementation here ...
}
```

### EVENT_UP_LOGOUT_STARTED

This event will be thrown when logging out of the social provider has started.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(logoutStarted:)
name:EVENT_UP_LOGOUT_STARTED object:nil];

// your handler:
- (void)logoutStarted:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER = the provider on which the login has started

  // ... your game specific implementation here ...
}
```

### EVENT_UP_LOGOUT_FINISHED

This event will be thrown when logging out of the social provider has finished successfully.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(logoutFinished:)
name:EVENT_UP_LOGOUT_FINISHED object:nil];

// your handler:
- (void)logoutFinished:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER = the provider on which the logout has finished

  // ... your game specific implementation here ...
}
```

### EVENT_UP_LOGOUT_FAILED

This event will be thrown when logging out of the social provider has failed.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(logoutFailed:)
name:EVENT_UP_LOGOUT_FAILED object:nil];

// your handler:
- (void)logoutFailed:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER = the provider on which the logout has failed
  // DICT_ELEMENT_MESSAGE  = description of the reason for failure

  // ... your game specific implementation here ...
}
```

### EVENT_UP_SOCIAL_ACTION_STARTED

This event will be thrown when a social action (like, post status, etc..) has started.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(socialActionStarted:)
name:EVENT_UP_SOCIAL_ACTION_STARTED object:nil];

// your handler:
- (void)socialActionStarted:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER           = the provider on which the social action has started
  // DICT_ELEMENT_SOCIAL_ACTION_TYPE = the social action (like, post status, etc..) that started
  // DICT_ELEMENT_PAYLOAD            = an identification string that you can give when you initiate the
  //                                   social action operation and want to receive back upon starting

  // ... your game specific implementation here ...
}
```

### EVENT_UP_SOCIAL_ACTION_FINISHED

This event will be thrown when a social action has finished successfully.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(socialActionFinished:)
name:EVENT_UP_SOCIAL_ACTION_FINISHED object:nil];

// your handler:
- (void)socialActionFinished:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER           = the provider on which the social action has finished
  // DICT_ELEMENT_SOCIAL_ACTION_TYPE = the social action (like, post status, etc..) that finished
  // DICT_ELEMENT_PAYLOAD            = an identification string that you can give when you
  //         initiate the social action operation and want to receive back upon completion

  // ... your game specific implementation here ...
}
```

### EVENT_UP_SOCIAL_ACTION_CANCELLED

This event will be thrown when a social action has been cancelled.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(socialActionCancelled:)
name:EVENT_UP_SOCIAL_ACTION_CANCELLED object:nil];

// your handler:
- (void)socialActionCancelled:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER           = the provider on which a social action was cancelled
  // DICT_ELEMENT_SOCIAL_ACTION_TYPE = the social action (like, post status, etc..) that has been cancelled
  // DICT_ELEMENT_PAYLOAD            = an identification string that you can give when you initiate the
  //                                 social action operation and want to receive back upon cancellation


  // ... your game specific implementation here ...
}
```

### EVENT_UP_SOCIAL_ACTION_FAILED

This event will be thrown when a social action has failed.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(socialActionFailed:)
name:EVENT_UP_SOCIAL_ACTION_FAILED object:nil];

// your handler:
- (void)socialActionFailed:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER           = the provider on which the social action has failed
  // DICT_ELEMENT_SOCIAL_ACTION_TYPE = the social action (like, post status, etc..) that failed
  // DICT_ELEMENT_MESSAGE            = description of the reason for failure
  // DICT_ELEMENT_PAYLOAD            = an identification string that you can give when you
  //            initiate the social action operation and want to receive back upon failure

  // ... your game specific implementation here ...
}
```

### EVENT_UP_GET_CONTACTS_STARTED

This event will be thrown when fetching the contacts from the social provider has started.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(getContactsStarted:)
name:EVENT_UP_GET_CONTACTS_STARTED object:nil];

// your handler:
- (void)getContactsStarted:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER           = the provider on which the get contacts process started
  // DICT_ELEMENT_SOCIAL_ACTION_TYPE = the social action preformed
  // DICT_ELEMENT_PAYLOAD            = an identification string that you can give when you
  //            initiate the get contacts operation and want to receive back upon starting

  // ... your game specific implementation here ...
}
```

### EVENT_UP_GET_CONTACTS_FINISHED

This event will be thrown when fetching the contacts from the social provider has finished successfully.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(getContactsFinished:)
name:EVENT_UP_GET_CONTACTS_FINISHED object:nil];

// your handler:
- (void)getContactsFinished:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER           = the provider on which the get contacts process finished
  // DICT_ELEMENT_SOCIAL_ACTION_TYPE = the social action preformed
  // DICT_ELEMENT_CONTACTS           = an Array of contacts represented by UserProfile
  // DICT_ELEMENT_PAYLOAD            = an identification string that you can give when you
  //      initiate the get contacts operation and want to receive back upon its completion


  // ... your game specific implementation here ...
}
```

### EVENT_UP_GET_CONTACTS_FAILED

This event will be thrown when fetching the contacts from the social provider has failed.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(getContactsFailed:)
name:EVENT_UP_GET_CONTACTS_FAILED object:nil];

// your handler:
- (void)getContactsFailed:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER           = the provider on which the get contacts process has failed
  // DICT_ELEMENT_SOCIAL_ACTION_TYPE = the social action preformed
  // DICT_ELEMENT_MESSAGE            = description of the reason for failure
  // DICT_ELEMENT_PAYLOAD            = an identification string that you can give when you
  //             initiate the get contacts operation and want to receive back upon failure

  // ... your game specific implementation here ...
}
```

### EVENT_UP_GET_FEED_STARTED

This event will be thrown when fetching the feed from the social provider has started.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(getFeedStarted:)
name:EVENT_UP_GET_FEED_STARTED object:nil];

// your handler:
- (void)getFeedStarted:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER           = the provider on which the get feed process started
  // DICT_ELEMENT_SOCIAL_ACTION_TYPE = the social action preformed
  // DICT_ELEMENT_PAYLOAD            = an identification string that you can give when you
  //                initiate the get feed operation and want to receive back upon starting

  // ... your game specific implementation here ...
}
```

### EVENT_UP_GET_FEED_FINISHED

This event will be thrown when fetching the feed from the social provider has finished successfully.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(getFeedFinished:)
name:EVENT_UP_GET_FEED_FINISHED object:nil];

// your handler:
- (void)getFeedFinished:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER           = the provider on which the get feed process finished
  // DICT_ELEMENT_SOCIAL_ACTION_TYPE = the social action preformed
  // DICT_ELEMENT_FEEDS              = an Array of feed entries represented by strings
  // DICT_ELEMENT_PAYLOAD            = an identification string that you can give when you
  //               initiate the get feed operation and want to receive back upon completion

  // ... your game specific implementation here ...
}
```

### EVENT_UP_GET_FEED_FAILED

This event will be thrown when fetching the feed from the social provider has failed.

``` objectivec
// observe the event:
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(getFeedFailed:)
name:EVENT_UP_GET_FEED_FAILED object:nil];

// your handler:
- (void)getFeedFailed:(NSNotification*)notification {
  // notification contains the following:
  // DICT_ELEMENT_PROVIDER           = the provider on which the get feed process has
  // DICT_ELEMENT_SOCIAL_ACTION_TYPE = the social action preformed
  // DICT_ELEMENT_MESSAGE            = description of the reason for failure
  // DICT_ELEMENT_PAYLOAD            = an identification string that you can give when you
  //                 initiate the get feed operation and want to receive back upon failure

  // ... your game specific implementation here ...
}
```
