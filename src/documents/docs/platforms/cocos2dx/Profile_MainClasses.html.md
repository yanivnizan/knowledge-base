---
layout: "content"
image: "Modeling"
title: "PROFILE: Main Classes & Operations"
text: "Read descriptions of the various social entities cocos2dx-profile provides, and see usage examples of operations that can be done to the different entities."
position: 6
theme: 'platforms'
collection: 'platforms_cocos2dx'
---

#PROFILE: Main Classes & Operations

In this document you'll find descriptions of the main entities of cocos2dx-profile, that represent the different social elements used in the Profile module. You will also find descriptions and usage examples of the social-related functionality provided in Profile.

![alt text](/img/profile/ProfileDiagram.png "Profile Diagram")

##CCUserProfileUtils

This class lists the different social networks that exist today, such as *Facebook, Twitter, Linkedin, Google+*, and more. Currently, SOOMLA supports only Facebook, but in the near future, more social providers will be available.

##CCUserProfile

This class represents a profile of a user from a social network (provider). This class holds information about the user for a specific `Provider` (`Provider` is an enum in the `CCUserProfileUtils` class).

**A `CCUserProfile` contains the following elements:**

- `Provider`
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

##CCProfileController

An interface to the native `SoomlaProfile` class, which is the main class that controls the entire SOOMLA Profile module. Use this class access the native `SoomlaProfile` functionality, which allows you to perform various social and authentication operations on users.

<br>
**Useful Functions:**

<div class="info-box">`Reward`s are a part of SOOMLA's core module and are used in many functions of Profile. For almost every social action, you have the option of giving a reward to your users who complete the action.</div>

###`login / logout`

`login`requires the parameters: "provider" and an optional "reward". This function will log the user into the specified provider, and will give the user a reward if one was provided.

Most of the social actions provided in Profile depend on the user being logged in. Therefore, upon successful login, you'll want to enable the rest of your social action buttons. For example, after the user is successfully logged in, you can display "Like" and "Post Status" buttons.

`logout` simply logs the user out of the specified provider. Don't forget to disable the social action buttons in your UI once your user is logged out.

``` cs
// If the user clicks on the login button you provide, call the login function:
soomla::CCProfileController::getInstance()->login(
	soomla::FACEBOOK,                     // Provider
	loginReward,                          // Reward for logging in
	&profileError                         // Used for error handling
);

// If you choose not to give a reward upon login, use this instead:
soomla::CCProfileController::getInstance()->login(
	soomla::FACEBOOK,                     // Provider
	&profileError                         // Used for error handling
);

// If the user would like to logout:
soomla::CCProfileController::getInstance()->logout(
	soomla::FACEBOOK,                     // Provider
	&profileError                         // Used for error handling
);
```

<br>
###`isLoggedIn`

As its name implies, this function checks if the user is logged in and returns a boolean value.

``` cpp
bool isLoggedIn = soomla::CCProfileController::getInstance()->isLoggedIn(
	 soomla::FACEBOOK,                    // Provider
	 &profileError                        // Used for error handling
);
...
if (isLoggedIn) {
    // Here you can (and should) set the screen to match the logged-in state.
    // For example display the logout button, like button, share button, etc.
}
```

<div class="info-box">If the user is not logged in, please notice that `isLoggedIn` will not log the user in, you'll need to call the `login` function yourself. </div>

<br>
###`like`

This function opens up the provider page to "like" (an external page), and grants the user the supplied reward. Note that `like()` opens the page to like, but does not track if the user *actually* liked the page or not. The user is given the reward just for clicking `like` from the application. Hopefully, after he/she is navigated to the page to like, he/she will like the page.

``` cpp
// If the user clicks the "Like" button provided in your game, call the like function:
soomla::CCProfileController::getInstance()->like(
	soomla::FACEBOOK,                     // Provider
	"The.SOOMLA.Project",                 // Page to like
	likePageReward,                       // Reward for liking
	&profileError                         // Used for error handling
);
```

<br>
###`updateStatus`

This function updates the user's status, which is simply a message, on the supplied social provider. Upon a successful update, the user will receive the supplied reward.

``` cpp
soomla::CCProfileController::getInstance()->updateStatus(
	soomla::FACEBOOK,                     // Provider
	"I love SOOMLA! http://www.soom.la",  // Message to post as status
	statusReward,                         // Reward for updating status
	&profileError                         // Used for error handling
);
```

![alt text](/img/profile/socialStatus.png "Update Status")

<br>
###`updateStory`
This function posts a story to the user's profile on the supplied provider. A Story is a more detailed status (very Facebook-oriented). Upon a successful update, the user will receive the supplied reward.

For example, once your user reaches a high score, you could display a popup that allows him/her to share their high score on Facebook with a click of a button. Don't forget to give them an awesome reward for doing so.

``` cpp
soomla::CCProfileController::getInstance()->updateStory(
	soomla::FACEBOOK,                          // Provider
	"This is the story.",                      // Story message
	"The story of SOOMBOT (Profile Test App)", // Name (title of the story)
	"SOOMBOT Story",                           // Caption for the story
	"DESCRIPTION",                             // Description
	"http://about.soom.la/soombots",           // Link to post
	"http://about.soom.la/.../spockbot.png",   // Image
	storyReward,                               // Reward for posting a story
	&profileError                              // Used for error handling
);
```

![alt text](/img/profile/socialStory.png "Post Story")

<br>
###`uploadImage`

This function uploads an image to the user's profile in the supplied provider. Upon a successful upload, the user will receive the supplied reward.

For example, when your user finishes a level in your game, you can offer him/her to upload a screenshot of their screen and be rewarded with 100 coins. This is a win-win situation where the user gets free coins and your game is advertised for free.

``` cpp
// Assume that saveScreenShot() is a private function that returns a string representation of the current screenshot.
std::string screenshotPath = saveScreenshot();

soomla::CCProfileController::getInstance()->uploadImage(
	soomla::FACEBOOK,                     // Provider
	"I love SOOMLA! http://www.soom.la",  // Message
	screenshotPath.c_str(),               // Name of image file path
	uploadReward,                         // Reward for uploading an image
	&profileError                         // Used for error handling
);
```

![alt text](/img/profile/socialUpload.png "Upload Image")

<div class="info-box">The image to upload should be on the device already; the path supplied needs to be a full path to the image on the device.</div>

<br>
####`getStoredUserProfile`

This function retrieves the user's profile for the given provider from the local device storage. This function allows you to get user information without the user being online.

For example, you could use `getStoredUserProfile` to get the user's birthday, and if today is their birthday, give him/her a "birthday reward" (extra lives,  free coins, etc.).

``` cpp
soomla::CCProfileController::getInstance()->getStoredUserProfile(
	soomla::FACEBOOK,                     // Provider
	&profileError                         // Used for error handling
);
```

<div class="info-box">This functionality is only available if the user has already logged into the provider.</div>

<br>
###`getContacts`

This function retrieves a list of the user's contacts from the supplied provider who also use your app.

You could use `getContacts`, for example, to show your users a personalized screen where they can see which of their friends are also playing your game. Then you could use that information to allow your users to send their friends a message, or share their best scores with their relevant friends.

``` cpp
soomla::CCProfileController::getInstance()->getContacts(
	soomla::FACEBOOK,                     // Provider
	contactsReward,                       // Reward upon success of getting contacts
	&profileError                         // Used for error handling
);
```
