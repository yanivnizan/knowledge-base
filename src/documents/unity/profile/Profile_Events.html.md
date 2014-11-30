---
layout: "content"
image: "Events"
title: "Events"
text: "Handle unity3d-profile (social-related) events with your game-specific behavior."
position: 3
theme: 'platforms'
collection: 'unity_profile'
module: 'profile'
platform: 'unity'
---

#Event Handling

##About

Profile allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>

###Tips & Reminders

- As mentioned in [Getting Started](/unity/profile/Profile_GettingStarted), make sure you add the event prefabs (ProfileEvents and CoreEvents) to your earliest loading scene.

- It is recommended that you register all events before initializing Profile.


##How it Works

Events are triggered when SOOMLA wants to notify you about different things that happen involving Profile operations.

For example, when a user posts a status, an `OnSocialActionStartedEvent` is fired as a result.


##Observing & Handling Events

The `ProfileEvents` class is where all events go through. To handle various events, just add your game-specific behavior to the delegates in the `ProfileEvents` class.

**For example:** To "listen" for an `onLoginFinished` event:

``` cs
// Sign up for the event
ProfileEvents.OnLoginFinished += onLoginFinished;

// Handle this event with your game-specific behavior:
public static void onLoginFinished(UserProfile userProfileJson, string payload){
	Soomla.SoomlaUtils.LogDebug("Login finished: " + UserProfile.toJSONObject().print());
	SoomlaProfile.GetContacts(Provider.FACEBOOK);
	string bday = SoomlaProfile.GetStoredUserProfile(Provider.FACEBOOK).Birthday;
}
```

##Profile Events

###OnSoomlaProfileInitialized

This event will be thrown when Soomla Profile has been initialized.

``` cs
public void onSoomlaProfileInitialized() {
	// ... your game specific implementation here ...
}
```

###OnUserRatingEvent

This event will be thrown when the page for rating your app is opened.

``` cs
public void onUserRatingEvent() {
	// ... your game specific implementation here ...
}
```

###OnUserProfileUpdated

This event will be thrown when the user profile has been updated, after login.

``` cs
public void onUserProfileUpdated(UserProfile userProfileJson) {
	// userProfileJson is the user's profile from the logged in provider

	// ... your game specific implementation here ...
}
```

###OnLoginStarted

This event will be thrown when logging in to the social provider has started.

``` cs
public void onLoginStarted(Provider provider, string payload) {
	// provider is the social provider
	// payload is an identification string that you can give when you initiate the login operation and want to receive back upon starting

	// ... your game specific implementation here ...
}
```

###OnLoginFinished

This event will be thrown when logging in to the social provider has finished **successfully**.

``` cs
public void onLoginFinished(UserProfile userProfileJson, string payload) {
	// userProfileJson is the user's profile from the logged in provider
	// payload is an identification string that you can give when you initiate the login operation and want to receive back upon its completion

	// ... your game specific implementation here ...
}
```

###OnLoginCancelled

This event will be thrown when logging in to the social provider has been cancelled.

``` cs
public void onLoginCancelled(Provider provider, string payload) {
	// provider is the social provider
	// payload is an identification string that you can give when you initiate the login operation and want to receive back upon cancellation

	// ... your game specific implementation here ...
}
```

###OnLoginFailed

This event will be thrown when logging in to the social provider has failed.

``` cs
public void onLoginFailed(Provider provider, string message, string payload) {
	// provider is the social provider
	// message is the failure message
	// payload is an identification string that you can give when you initiate the login operation and want to receive back upon failure

	// ... your game specific implementation here ...
}
```

###OnLogoutStarted

This event will be thrown when logging out of the social provider has started.

``` cs
public void onLogoutStarted(Provider provider) {
	// provider is the social provider

	// ... your game specific implementation here ...
}
```

###OnLogoutFinished

This event will be thrown when logging out of the social provider has finished **successfully**.

``` cs
public void onLogoutFinished(Provider provider) {
	// provider is the social provider

	// ... your game specific implementation here ...
}
```

###OnLogoutFailed

This event will be thrown when logging out of the social provider has failed.

``` cs
public void onLogoutFailed(Provider provider, string payload) {
	// provider is the social provider
	// payload is an identification string that you can give when you initiate the logout operation and want to receive back upon failure

	// ... your game specific implementation here ...
}
```


###OnSocialActionStarted

This event will be thrown when a social action has started.

``` cs
public void onSocialActionStarted(Provider provider, SocialActionType action, string payload) {
	// provider is the social provider
	// action is the social action (like, post status, etc..) that started
	// payload is an identification string that you can give when you initiate the social action operation and want to receive back upon starting

	// ... your game specific implementation here ...
}
```


###OnSocialActionFinished

This event will be thrown when a social action has finished **successfully**.

``` cs
public void onSocialActionFinished(Provider provider, SocialActionType action, string payload) {
	// provider is the social provider
	// action is the social action (like, post status, etc..) that finished
	// payload is an identification string that you can give when you initiate the social action operation and want to receive back upon its completion

	// ... your game specific implementation here ...
}
```

###OnSocialActionCancelled

This event will be thrown when a social action has been cancelled.

``` cs
public void onSocialActionCancelled(Provider provider, SocialActionType action, string payload) {
	// provider is the social provider
	// action is the social action (like, post status, etc..) that has been cancelled
	// payload is an identification string that you can give when you initiate the social action operation and want to receive back upon cancellation

	// ... your game specific implementation here ...
}
```

###OnSocialActionFailed

This event will be thrown when a social action has failed.

``` cs
public void onSocialActionFailed(Provider provider, SocialActionType action, string message, string payload) {
	// provider is the social provider
	// action is the social action (like, post status, etc..) that failed
	// message is the failure message
	// payload is an identification string that you can give when you initiate the social action operation and want to receive back upon failure

	// ... your game specific implementation here ...
}
```


###OnGetContactsStarted

This event will be thrown when fetching the contacts from the social provider has started.

``` cs
public void onGetContactsStarted(Provider provider, string payload {
	// provider is the social provider
	// payload is an identification string that you can give when you initiate the get contacts operation and want to receive back upon starting

	// ... your game specific implementation here ...
}
```

###OnGetContactsFinished

This event will be thrown when fetching the contacts from the social provider has finished **successfully**.

``` cs
public void onGetContactsFinished(Provider provider, List<UserProfile> userProfiles, string payload) {
	// provider is the social provider
	// userProfiles is a List of user profiles that have been fetched in the get contacts operation
	// payload is an identification string that you can give when you initiate the get contacts operation and want to receive back upon its completion

	// ... your game specific implementation here ...
}
```

###OnGetContactsFailed

This event will be thrown when fetching the contacts from the social provider has failed.

``` cs
public void onGetContactsFailed(Provider provider, string payload) {
	// provider is the social provider
	// payload is an identification string that you can give when you initiate the get contacts operation and want to receive back upon failure

	// ... your game specific implementation here ...
}
```

###OnGetFeedStarted

This event will be thrown when fetching the feed from the social provider has started.

``` cs
public void onGetFeedStarted(Provider provider) {
	// provider is the social provider

	// ... your game specific implementation here ...
}
```

###OnGetFeedFinished

This event will be thrown when fetching the feed from the social provider has finished **successfully**.

``` cs
public void onGetFeedFinished(Provider provider, List<string> feed) {
	// provider is the social provider
	// feed is the user's feed that has been fetched in the get feed operation

	// ... your game specific implementation here ...
}
```

###OnGetFeedFailed

This event will be thrown when fetching the feed from the social provider has failed.

``` cs
public void onGetFeedFailed(Provider provider, string payload) {
	// provider is the social provider
	// payload is an identification string that you can give when you initiate the get feed operation and want to receive back upon failure

	// ... your game specific implementation here ...
}
```
