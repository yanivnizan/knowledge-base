---
layout: "content"
image: "Tutorial"
title: "PROFILE: Main Classes"
text: "Read descriptions of the various social entities android-profile provides, and see usage examples of operations that can be dont to the different entities."
position: 8
theme: 'platforms'
collection: 'platforms_android'
---

#PROFILE: Main Classes & Operations

In this document you can find descriptions of the main classes and interfaces of android-profile. Some of these classes represent the different social elements used in the Profile module, while others contain functionality to perform social-related operations.

##IProvider

This class represents the different social networks that exist today, such as Facebook, Twitter, Linkedin, Google+, and more. Currently, SOOMLA supports only Facebook, but in the future, more social providers will be available.

##UserProfile

This class holds information about the user for a specific `Provider`.

**A `UserProfile` contains the following elements:**

- `ProfileId`
- `Email`
- `Username`
- `FirstName`
- `LastName`
- `AvatarLink`
- `Location`
- `Gender`
- `Language`
- `Birthday`

##SoomlaProfile

This is the main class for the SOOMLA User Profile module. This class should be initialized once, and can be used to perform authentication and social actions on behalf of the user.

<br>
**Useful Functions:**

In the examples below, the following will be used:

``` java
private IProvider.Provider mProvider = IProvider.Provider.FACEBOOK;

Reward exampleReward = new VirtualItemReward("reward", "Example reward", 15, mItemId);
```

<div class="info-box">`Reward`s are a part of SOOMLA's core module and are used in many functions of Profile. For almost every social action, you have the option of giving a reward to your users who complete the action.</div>

###`login / logout`

This function will log the user into the specified provider, and will give the user a reward if one was provided.

Most of the social actions provided in Profile depend on the user being logged in. Therefore, upon successful login, you'll want to enable the rest of your social action buttons. For example, after the user is successfully logged in, you can display "Like" and "Post Status" buttons.

`logout` simply logs the user out of the specified provider. Don't forget to disable the social action buttons in your UI once your user is logged out.

``` java
// If the user clicks on the login button you provide, call the login function.
SoomlaProfile.getInstance().login(
  this,                       // Activity
  mProvider                   // Provider

);

// If you'd like to give your users a reward for logging in, use:
SoomlaProfile.getInstance().login(
  this,                       // Activity
  mProvider,                  // Provider
  exampleReward               // Reward
);

// If the user would like to logout:
SoomlaProfile.getInstance().logout(
  mProvider                   // Provider
);
```

<br>
###`isLoggedIn`

As its name implies, this function checks if the user is logged in and returns a boolean value.

``` java
if (!SoomlaProfile.getInstance().isLoggedIn(this, mProvider)) {
    // Here you can (and should) set the screen to match the logged-in state.
    // For example display the logout button, like button, share button, etc.
}
```

<div class="info-box">If the user is not logged in, please notice that `isLoggedIn` will not log the user in, you'll need to call the `login` function yourself. </div>

<br>
###`like`

This function opens up the provider page to "like" (an external page), and grants the user the supplied reward. Note that `like` opens the page to like, but does not track if the user *actually* liked the page or not. The user is given the reward just for clicking `like` from the application. Hopefully, after he/she is navigated to the page to like, he/she will like the page.

``` java
// If the user clicks the "Like" button provided in your game, call the like function:
SoomlaProfile.getInstance().like(
  this,                       // Activity
  mProvider,                  // Provider
  "The.SOOMLA.Project",       // Page to like
  exampleReward               // Reward
);
```

<br>
###`updateStatus`

This function updates the user's status, which is simply a message, on the supplied social provider. Upon a successful update, the user will receive the supplied reward.

``` java
SoomlaProfile.getInstance().updateStory(
  mProvider,                  // Provider
  "status",                   // Message
  exampleReward               // Reward
);
```

![alt text](/img/profile/socialStatus.png "Update Status")

<br>
###`updateStory`
This function posts a story to the user's profile on the supplied provider. A Story is a more detailed status (very Facebook-oriented). Upon a successful update, the user will receive the supplied reward.

For example, once your user reaches a high score, you could display a popup that allows him/her to share their high score on Facebook with a click of a button. Don't forget to give them an awesome reward for doing so.

``` java
SoomlaProfile.getInstance().updateStory(
  provider,                   // Provider
  "message",                  // Message
  "The SOOMLA Project",       // Name
  "caption",                  // Caption
  "SOOMLA is cool!",          // Description
  "http://soom.la",           // Link
  "http://...bankerbot.png",  // Image
  exampleReward               // Reward
);
```

![alt text](/img/profile/socialStory.png "Post Story")

<br>
###`uploadImage`

This function uploads an image to the user's profile in the supplied provider. Upon a successful upload, the user will receive the supplied reward.

For example, when your user finishes a level in your game, you can offer him/her to upload a screenshot of their screen and be rewarded with 100 coins. This is a win-win situation where the user gets free coins and your game is advertised for free.

``` java
SoomlaProfile.getInstance().uploadImage(
  mProvider,                  // Provider
  "Message",                  // Message to accompany the image
  mImagePath,                 // Path and file name of image
  exampleReward               // Reward
);
```

![alt text](/img/profile/socialUpload.png "Upload Image")

<div class="info-box">The image to upload should be on the device already; the path supplied needs to be a full path to the image on the device.</div>

<br>
####`getStoredUserProfile`

This function retrieves the user's profile for the given provider from the local device storage. This function allows you to get user information without the user being online.

For example, you could use `getStoredUserProfile` to get the user's birthday, and if today is their birthday, give him/her a "birthday reward" (extra lives,  free coins, etc.).

``` java
UserProfile loggedInProfile = SoomlaProfile.getInstance().getStoredUserProfile(mProvider);
```

<div class="info-box">This functionality is only available if the user has already logged into the provider.</div>

<br>
###`getContacts`

This function retrieves a list of the user's contacts from the supplied provider who also use your app.

You could use `getContacts`, for example, to show your users a personalized screen where they can see which of their friends are also playing your game. Then you could use that information to allow your users to send their friends a message, or share their best scores with their relevant friends.

``` java
SoomlaProfile.getInstance().getContacts(mProvider);

// Or, if you'd like to give your user a reward:
SoomlaProfile.getInstance().getContacts(mProvider, exampleReward);
```
