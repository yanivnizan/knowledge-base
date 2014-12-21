---
layout: "content"
image: "Tutorial"
title: "FAQ"
text: "Frequently asked questions about unity3d-profile."
position: 4
theme: 'platforms'
collection: 'unity_profile'
module: 'profile'
platform: 'unity'
---

# unity3d-profile FAQ

**Where can I find a code example of how to use Profile?**

There is a full example included in the package under the Examples directory (here's a [link](https://github.com/soomla/unity3d-profile/blob/master/Soomla/Assets/Examples/MuffinRush/ExampleWindow.cs) to the code).

---

**I want fetch my user's friend list and offer them to invite their friends, challenge them to a game session, etc. How can I do this with SOOMLA Profile?**

You can use `GetContacts` to retrieve the user's friend list, and then implement whatever features you want.

``` cs
SoomlaProfile.GetContacts(Provider.FACEBOOK);
```

Notice that `GetContacts` with Twitter or Google+ supplies ALL of the user's contacts, while `GetContacts` with Facebook returns only the contacts that use your app.

---

<br>

## Facebook

**Is it necessary that I enter the Facebook App name and ID in the Facebook Edit Settings?**

Yes this is necessary, step 1 of the Facebook section of our [Getting Started](/unity/profile/Profile_GettingStarted#facebook) guide sends you to Facebook's getting started guide to do exactly that.

---

**After successfully logging into Facebook (`SoomlaProfile.Login(Provider.FACEBOOK);`), I try to `UpdateStatus`, and get the following error: "SOOMLA FBSocialProvider UpdateStatusCallback[result.Error]:403 Forbidden ...".**

These 403 messages can result from several Facebook issues, but they are usually the result of a user not having permissions to access a Facebook application. Please follow [Facebook's guide](https://developers.facebook.com/docs/unity/getting-started/canvas#create) to setting up an application, and then use your application ID in unity's Facebook dialog.

Also, make sure to answer 'yes' to the following questions:

- Did you create your own Facebook application and change the settings for Facebook within unity?

- Is your Facebook account set as administrator on the Facebook application?

- For Android did you supply the package name of your unity application? Did you set the same package in the Android Player Preferences?

---

**Do I need to ask for the user's username and password, and store them somewhere?**

You do not need to ask for the user's username and password, Facebook does that for you, and you should not store the user's username and password, you will only get access to the user's profile after he/she logged in.

---

**When I `Login` for the first time, I am asked for a "User Access Token", which I can get from Facebook, but how do I stop this behavior as my users will not have access to this token?**

Your users will not be asked for this token since tokens are only requested while in Editor (Facebook SDK functionality), and once you install the application on devices, you'll get the usual Facebook connect window.

---
