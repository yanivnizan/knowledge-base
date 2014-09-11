---
layout: "content"
image: "Events"
title: "PROFILE: Events"
text: "Handle unity3d-profile (social-related) events with your game-specific behavior."
position: 8
theme: 'platforms'
collection: 'platforms_unity'
---

#**Event Handling**

##About

unity3d-profile allows you to subscribe to events, be notified when they occur, and implement your own application-specific behavior to handle them once they occur.

##Triggering Events

In the unity-profile code, events are fired in some functions. Of course, you can also fire the events from your code where you see fit.

**For Example:** In `SoomlaProfile.cs` the function `Login` triggers the event `OnLoginStarted`. In case of success the event `OnLoginFinished` is triggered, in case of failure `OnLoginFailed` is triggered, and in case of cancellation `OnLoginCancelled` is triggered.

``` cs
public static void Login(Provider provider, string payload="", Reward reward = null) {
	ProfileEvents.OnLoginStarted(provider, payload);
	providers[provider].Login(
	/* success */	(UserProfile userProfile) => {
							StoreUserProfile(userProfile);
							ProfileEvents.OnLoginFinished(userProfile, payload);
							if (reward != null) {
								reward.Give();
							}
						},
	/* fail */		(string message) => {  ProfileEvents.OnLoginFailed (provider, message, payload); },
	/* cancel */	() => {  ProfileEvents.OnLoginCancelled(provider, payload); }
	);
}
```

<div class="info-box">The parameter `payload` that `OnLoginFinished` receives is information that you provide the function, and is returned to you once the operation is complete (or is failed). You can use it to identify the event with the called action, or for any other use you find suitable.</div>

**What will happen next:** A class that "listens" for this event will be notified, and will contain a function that handles the event that login has finished. Read below to learn how to "listen" for and handle events.

##Observing & Handling Events

The `ProfileEvents` class is where all events go through. To handle various events, just add your game-specific behavior to the delegates in the `ProfileEvents` class.

**For example:** The code below "listens" for an `onLoginFinished` event and handles it.

``` cs
// Sign up to be notified when this event occurs
ProfileEvents.OnLoginFinished += onLoginFinished;

// Handle this event with your game-specific behavior:
public static void onLoginFinished(UserProfile userProfileJson, string payload){
	Soomla.SoomlaUtils.LogDebug("Login finished: " + UserProfile.toJSONObject().print());
	SoomlaProfile.GetContacts(Provider.FACEBOOK);
	string bday = SoomlaProfile.GetStoredUserProfile(Provider.FACEBOOK).Birthday;
}
```

<div class="info-box">Your game-specific behavior is an addition to the default behavior implemented by SOOMLA. You don't replace SOOMLA's behavior.</div>
