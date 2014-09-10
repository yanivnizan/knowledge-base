---
layout: "content"
image: "Modeling"
title: "PROFILE: Main Classes & Operations"
text: "Read descriptions of the various social entities unity3d-profile provides, and see usage examples of operations that can be done to the different entities."
position: 7
theme: 'platforms'
collection: 'platforms_unity'
---

#PROFILE: Main Classes & Operations

In this document you can find descriptions of most of the main classes and interfaces of unity3d-profile. Some of these classes represent the different social elements used in the Profile module, while others contain functionality to perform social-related operations.

##Provider

This class represents the different social networks that exist today, such as Facebook, Twitter, Linkedin, Google+, and more. Currently, SOOMLA supports only Facebook, but in the near future, more social providers will be available.

The `Provider` class simply holds a string enumeration of the various providers that are available (or *will be* available).

##SocialActionType

This class represents various social actions that can be performed in social networks, such as posting a status, posting a story, uploading an image, and more.

The `SocialActionType` class simply holds a string enumeration of the different social actions.

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

This is the main class that controls the entire SOOMLA Profile module. Use this class to perform various social and authentication operations on users. The `Profile` module will work with the social and authentication plugins you provide and define in AndroidManifest.xml or your iOS project's plist.

**Useful Functions:**

###`login / logout`

`login`requires the parameters: "provider" and an optional "reward". This function will log the user into the specified provider, and will give the user a reward if one was provided.

Most of the social actions provided in Profile depend on the user being logged in. Therefore, upon successful login, you'll want to enable the rest of your social action buttons. For example, after the user is successfully logged in, you can display "Like" and "Post Status" buttons.

`logout` simply logs the user out of the specified provider. Don't forget to disable the social action buttons in your UI once your user is logged out.

``` cs
// If the user clicks on the login button you provide, call the login function:
SoomlaProfile.Login(
	Provider.FACEBOOK                        // Provider
);

// If you'd like to give your users a reward for logging in, use:
SoomlaProfile.Login(
	Provider.FACEBOOK,                       // Provider
	"",                                      // Payload
	new BadgeReward("reward", "Logged In!")  // Reward
);

// If the user would like to logout:
SoomlaProfile.Logout(
	Provider.FACEBOOK                        // Provider
);
```

<br>
###`isLoggedIn`

As its name implies, this function checks if the user is logged in and returns a boolean value.

``` cs
if (SoomlaProfile.IsLoggedIn(Provider.FACEBOOK)) {
    // Here you can (and should) set the screen to match the logged-in state.
    // For example display the logout button, like button, share button, etc.
}
```

<div class="info-box">If the user is not logged in, please notice that `isLoggedIn` will not log the user in, you'll need to call the `login` function yourself. </div>

<br>
###`like`

This function opens up the provider page to "like" (an external page), and grants the user the supplied reward. Note that `like()` opens the page to like, but does not track if the user *actually* liked the page or not. The user is given the reward just for clicking `like` from the application. Hopefully, after he/she is navigated to the page to like, he/she will like the page.

``` cs
// If the user clicks the "Like" button provided in your game, call the like function:
SoomlaProfile.Like(
	Provider.FACEBOOK,                       // Provider  
	"The.Soomla.Project",                    // Page to like
	likePageReward                           // Reward for liking
);
```

<br>
###`updateStatus`

This function updates the user's status, which is simply a message, on the supplied social provider. Upon a successful update, the user will receive the supplied reward.

``` cs
SoomlaProfile.UpdateStatus(
	Provider.FACEBOOK,                       // Provider
	"I LOVE SOOMLA!  http://www.soom.la",    // Message to post as status
	"",                                      // Payload
	statusReward                             // Reward for updating status
);
```

![alt text](/img/profile/socialStatus.png "Update Status")

<br>
###`updateStory`
This function posts a story to the user's profile on the supplied provider. A Story is a more detailed status (very Facebook-oriented). Upon a successful update, the user will receive the supplied reward.

For example, once your user reaches a high score, you could display a popup that allows him/her to share their high score on Facebook with a click of a button. Don't forget to give them an awesome reward for doing so.

``` cs
SoomlaProfile.UpdateStory(
	Provider.FACEBOOK,                       // Provider
	"This is the story.",                    // Text of the story to post
	"The story of SOOMBOT (Profile Test App)", // Name
	"SOOMBOT Story",                         // Caption
	"http://about.soom.la/soombots",         // Link to post
	"http://about.soom.la/.../spockbot.png", // Image URL
	"",                                      // Payload
	storyReward                              // Reward for posting a story
);
```

![alt text](/img/profile/socialStory.png "Post Story")

<br>
###`uploadImage`

This function uploads an image to the user's profile in the supplied provider. Upon a successful upload, the user will receive the supplied reward.

For example, when your user finishes a level in your game, you can offer him/her to upload a screenshot of their screen and be rewarded with 100 coins. This is a win-win situation where the user gets free coins and your game is advertised for free.

``` cs
SoomlaProfile.UploadImage(
	Provider.FACEBOOK,                       // Provider
	new Texture2D(1,1),
	"/path/to/image.png",                    // Name of image file path
	"I love SOOMLA! http://www.soom.la",     // Message to post with image
	"",                                      // Payload
	imageReward                              // Reward for posting a story
);
```

![alt text](/img/profile/socialUpload.png "Upload Image")

<div class="info-box">The image to upload should be on the device already; the path supplied needs to be a full path to the image on the device.</div>

<br>
####`getStoredUserProfile`

This function retrieves the user's profile for the given provider from the local device storage. This function allows you to get user information without the user being online.

For example, you could use `getStoredUserProfile` to get the user's birthday, and if today is their birthday, give him/her a "birthday reward" (extra lives,  free coins, etc.).

``` cs
SoomlaProfile.GetStoredUserProfile(
	Provider.FACEBOOK,                       // Provider
);
```

<div class="info-box">This functionality is only available if the user has already logged into the provider.</div>

<br>
###`getContacts`

This function retrieves a list of the user's contacts from the supplied provider who also use your app.

You could use `getContacts`, for example, to show your users a personalized screen where they can see which of their friends are also playing your game. Then you could use that information to allow your users to send their friends a message, or share their best scores with their relevant friends.

``` cs
SoomlaProfile.GetContacts(
	Provider.FACEBOOK,                       // Provider
);
```
