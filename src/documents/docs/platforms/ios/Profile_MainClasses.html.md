---
layout: "content"
image: "Tutorial"
title: "PROFILE: Main Classes"
text: "The main classes of ios-store contain functionality to perform store-related operations, provide you with different storages, and hold the basic assets needed to operate the store."
position: 7
theme: 'platforms'
collection: 'platforms_ios'
---

#PROFILE: Main Classes & Operations

In this document you can find descriptions of most of the main classes and interfaces of iOS-profile. Some of these classes represent the different social elements used in the Profile module, while others contain functionality to perform social-related operations.

##UserProfileUtils

This class represents the different social networks that exist today, such as Facebook, Twitter, Linkedin, Google+, and more. Currently, SOOMLA supports only Facebook, but in the near future, more social providers will be available.

The `UserProfileUtils` class simply holds an enumeration of the various providers that are available (or *will be* available).

##SocialActionUtils

This class represents various social actions that can be performed in social networks, such as posting a status, posting a story, uploading an image, and more.

The `SocialActionUtils` class simply holds an enumeration of the different social actions.

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

This is the main class that controls the entire SOOMLA Profile module. Use this class to perform various social and authentication operations on users. The `Profile` module will work with the social and authentication plugins you provide and define in your project's plist.

<br>
**Useful Functions:**

<div class="info-box">`Reward`s are a part of SOOMLA's core module and are used in many functions of Profile. For almost every social action, you have the option of giving a reward to your users who complete the action.</div>

###`login / logout`

This function will log the user into the specified provider, and will give the user a reward if one was provided.

Most of the social actions provided in Profile depend on the user being logged in. Therefore, upon successful login, you'll want to enable the rest of your social action buttons. For example, after the user is successfully logged in, you can display "Like" and "Post Status" buttons.

`logout` simply logs the user out of the specified provider. Don't forget to disable the social action buttons in your UI once your user is logged out.

``` objectivec
// If the user clicks on the login button you provide, call the login function.
[[SoomlaProfile getInstance] loginWithProvider:FACEBOOK];

// If you'd like to give your users a reward for logging in, use:
[[SoomlaProfile getInstance]
	loginWithProvider:FACEBOOK
	andReward:appDelegate.loginReward];

// If the user would like to logout:
[[SoomlaProfile getInstance] logoutWithProvider:FACEBOOK];
```

<br>
###`isLoggedIn`

As its name implies, this function checks if the user is logged in and returns a boolean value.

``` objectivec
if ([[SoomlaProfile getInstance] isLoggedInWithProvider:FACEBOOK]) {
    // Here you can (and should) set the screen to match the logged-in state.
    // For example display the logout button, like button, share button, etc.
}
```

<div class="info-box">If the user is not logged in, please notice that `isLoggedIn` will not log the user in, you'll need to call the `login` function yourself. </div>

<br>
###`like`

This function opens up the provider page to "like" (an external page), and grants the user the supplied reward. Note that `like` opens the page to like, but does not track if the user *actually* liked the page or not. The user is given the reward just for clicking `like` from the application. Hopefully, after he/she is navigated to the page to like, he/she will like the page.

``` objectivec
// If the user clicks the "Like" button provided in your game, call the like function:
[[SoomlaProfile getInstance]
	like:FACEBOOK
	andPageName:@"The.SOOMLA.Project"
	andReward:appDelegate.likeReward];
```

<br>
###`updateStatus`

This function updates the user's status, which is simply a message, on the supplied social provider. Upon a successful update, the user will receive the supplied reward.

``` objectivec
[[SoomlaProfile getInstance]
	updateStatusWithProvider:FACEBOOK
	andStatus:@"Test status"  
	andReward:appDelegate.updateStatusReward];
```

![alt text](/img/profile/socialStatus.png "Update Status")

<br>
###`updateStory`
This function posts a story to the user's profile on the supplied provider. A Story is a more detailed status (very Facebook-oriented). Upon a successful update, the user will receive the supplied reward.

For example, once your user reaches a high score, you could display a popup that allows him/her to share their high score on Facebook with a click of a button. Don't forget to give them an awesome reward for doing so.

``` objectivec
[[SoomlaProfile getInstance]
	updateStoryWithProvider:FACEBOOK
	andMessage:@"Message"
	andName:@"Name"
	andCaption:@"Caption"
	andDescription:@"Description"
	andLink:@"https://developers.facebook.com/docs/ios/share/"
	andPicture:@"http://i.imgur.com/g3Qc1HN.png"
	andReward:appDelegate.updateStatusReward];
```

![alt text](/img/profile/socialStory.png "Post Story")

<br>
###`uploadImage`

This function uploads an image to the user's profile in the supplied provider. Upon a successful upload, the user will receive the supplied reward.

For example, when your user finishes a level in your game, you can offer him/her to upload a screenshot of their screen and be rewarded with 100 coins. This is a win-win situation where the user gets free coins and your game is advertised for free.

``` objectivec
[[SoomlaProfile getInstance]
	uploadImageWithProvider:FACEBOOK
	andMessage:@"Text photo message"
	andFilePath:filePath
	andReward:appDelegate.uploadImageReward];
```

![alt text](/img/profile/socialUpload.png "Upload Image")

<div class="info-box">The image to upload should be on the device already; the path supplied needs to be a full path to the image on the device.</div>

<br>
####`getStoredUserProfile`

This function retrieves the user's profile for the given provider from the local device storage. This function allows you to get user information without the user being online.

For example, you could use `getStoredUserProfile` to get the user's birthday, and if today is their birthday, give him/her a "birthday reward" (extra lives,  free coins, etc.).

``` objectivec
[[SoomlaProfile getInstance] getStoredUserProfileWithProvider:FACEBOOK];
```

<div class="info-box">This functionality is only available if the user has already logged into the provider.</div>

<br>
###`getContacts`

This function retrieves a list of the user's contacts from the supplied provider who also use your app.

You could use `getContacts`, for example, to show your users a personalized screen where they can see which of their friends are also playing your game. Then you could use that information to allow your users to send their friends a message, or share their best scores with their relevant friends.

``` objectivec
[[SoomlaProfile getInstance]
	getContactsWithProvider:FACEBOOK
	andReward:nil];
```
