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

**Useful Functions:**

###`login / logout`

`login`requires the parameters provider and an optional reward. This function will log the user in to the specified provider, and will give the user a reward if one was provided.

Most of the social actions provided in Profile depend on the user being logged in. Therefore, upon successful login, you'll want to enable the rest of your social action buttons. For example, after the user is successfully logged in, you can display "Like" and "Post Status" buttons.

`logout` simply logs the user out of the specified provider. Don't forget to disable the social action buttons in your UI once your user is logged out.

**Example Usage:**

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

Opens up the provider page to "like" (an external page), and grants the user the supplied reward.

``` cpp
// If the user clicks the "Like" button provided in your game, call the like function:
soomla::CCProfileController::getInstance()->like(
	soomla::FACEBOOK,                     // Provider
	"The.SOOMLA.Project",                 // Page to like
	likePageReward,                       // Reward for liking
	&profileError                         // Used for error handling
);
```

<div class="info-box">`like` opens the page to like, but does not track if the user *actually* liked the page or not. The user is given the reward just for clicking `like` from the application. Hopefully, after he/she is navigated to the page to like, he/she will like the page.</div>

<br>
###`updateStatus`

Updates the user's status on the supplied provider. Upon a successful update, the user will receive the supplied reward.

``` cpp
soomla::CCProfileController::getInstance()->updateStatus(
	soomla::FACEBOOK,                     // Provider
	"I love SOOMLA! http://www.soom.la",  // Message to post as status
	shareReward,                          // Reward for updating status
	&profileError                         // Used for error handling
);
```

![alt text](/img/profile/socialStatus.png "Update Status")

<br>
###`updateStory`
Updates a user's story on the supplied provider. A Story is a more detailed status (very Facebook oriented). Upon a successful update, the user will receive the supplied reward.

For example, once your users reach a high score, you could display a popup that allows them to share their high score on Facebook with a click of a button. Don't forget to give them an awesome reward for doing so.

``` cpp
soomla::CCProfileController::getInstance()->updateStory(
	soomla::FACEBOOK,                          // Provider
	"This is the story.",                      // Story message
	"The story of SOOMBOT (Profile Test App)", // Name (title of the story)
	"SOOMBOT Story",                           // Caption for the story
	"DESCRIPTION",                             // Description
	"http://about.soom.la/soombots",           // Link to post
	"http://about.soom.la/.../spockbot.png",   // Image
	nullptr,                                   // Reward for posting a story
	&profileError                              // Used for error handling
);
```

![alt text](/img/profile/socialStory.png "Post Story")

<br>
###`uploadImage`

Uploads an image to the user's profile in the supplied provider. Upon a successful upload, the user will receive the supplied reward.

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
`getStoredUserProfile` retrieves the user's profile for the given provider from the local device storage. This function allows you to get user information without the user being online.

In addition, you could use `getStoredUserProfile`, for example, to get the user's birthday in order to give him/her a "birthday reward" such as a few extra lives, or free coins.

``` cpp
soomla::CCProfileController::getInstance()->getStoredUserProfile(
	soomla::FACEBOOK,                     // Provider
	&profileError                         // Used for error handling
);
```

<div class="info-box">This functionality is only available if the user has already logged into the provider.</div>

<br>
###`getContacts`
`getContacts` retrieves a list of the user's contacts from the supplied provider who also use your app.

You could use `getContacts`, for example, to show your users a personalized screen where they can see which of their friends are also playing your game. Then you could use that information to allow your users to send their friends a message, or share their best scores with their relevant friends.

``` cpp
soomla::CCProfileController::getInstance()->getContacts(
	soomla::FACEBOOK,                     // Provider
	nullptr,                              // Reward upon success of getting contacts
	&profileError                         // Used for error handling
);
```
