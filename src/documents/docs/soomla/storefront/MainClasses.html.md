---
layout: "content"
image: "Modeling"
title: "Main Classes"
text: "Use the main classes of the Profile module to perform social and authentication operations on users."
position: 1
theme: 'soomla'
collection: 'soomla_storefront'
---

#Main Classes and functionality

Like SOOMLA's Store module, the Profile module is available for platforms iOS, Android, Unity3d, and Cocos2dx. This document gives an overview of the main classes and functionality that you can find in each of the platform-specific Profile modules. Some of these classes represent the different social elements used in the Profile module, while others contain functionality to perform social-related operations.

##Available Social Providers

Each platform-specific Profile module contains a class that represents the different social networks that exist today, such as Facebook, Twitter, Linkedin, Google+, and more. Currently, SOOMLA supports only Facebook, but in the future, more social providers will be available.

##User Profile

The Profile module has a class that holds information about the user for a specific `Provider`.

**The class contains the following information about the user:**

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

##Important Functions

Each platform has a class (its name varies across the platforms) that provides useful functions of Profile. Use these functions to perform various social and authentication operations on users.

###`login / logout`

`login`requires the parameters: "provider" and an optional "reward". This function will log the user into the specified provider, and will give the user a reward if one was provided.

Most of the social actions provided in Profile depend on the user being logged in. Therefore, upon successful login, you'll want to enable the rest of your social action buttons. For example, after the user is successfully logged in, you can display "Like" and "Post Status" buttons.

`logout` simply logs the user out of the specified provider. Don't forget to disable the social action buttons in your UI once your user is logged out.

<br>
###`isLoggedIn`

As its name implies, this function checks if the user is logged in and returns a boolean value.

<div class="info-box">If the user is not logged in, please notice that `isLoggedIn` will not log the user in, you'll need to call the `login` function yourself. </div>

<br>
###`like`

This function is very Facebook-oriented, it opens up the provider page to "like" (an external page), and grants the user the supplied reward. Note that `like()` opens the page to like, but does not track if the user *actually* liked the page or not. The user is given the reward just for clicking `like` from the application.

<br>
###`updateStatus`

This function updates the user's status, which is simply a message, on the supplied social provider. Upon a successful update, the user will receive the supplied reward.

![alt text](/img/profile/socialStatus.png "Update Status")

<br>
###`updateStory`
This function posts a story to the user's profile on the supplied provider. A Story is a more detailed status (very Facebook-oriented). Upon a successful update, the user will receive the supplied reward.

For example, once your user reaches a high score, you could display a popup that allows him/her to share their high score on Facebook with a click of a button. Don't forget to give them an awesome reward for doing so.

![alt text](/img/profile/socialStory.png "Post Story")

<br>
###`uploadImage`

This function uploads an image to the user's profile in the supplied provider. Upon a successful upload, the user will receive the supplied reward.

For example, when your user finishes a level in your game, you can offer him/her to upload a screenshot of their screen and be rewarded with 100 coins. This is a win-win situation where the user gets free coins and your game is advertised for free.

![alt text](/img/profile/socialUpload.png "Upload Image")

<div class="info-box">The image to upload should be on the device already; the path supplied needs to be a full path to the image on the device.</div>

<br>
####`getStoredUserProfile`

This function retrieves the user's profile for the given provider from the local device storage. This function allows you to get user information without the user being online.

For example, you could use `getStoredUserProfile` to get the user's birthday, and if today is their birthday, give him/her a "birthday reward" (extra lives,  free coins, etc.).

<div class="info-box">This functionality is only available if the user has already logged into the provider.</div>

<br>
###`getContacts`

This function retrieves a list of the user's contacts from the supplied provider who also use your app.

You could use `getContacts`, for example, to show your users a personalized screen where they can see which of their friends are also playing your game. Then you could use that information to allow your users to send their friends a message, or share their best scores with their relevant friends.
