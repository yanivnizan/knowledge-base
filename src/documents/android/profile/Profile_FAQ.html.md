---
layout: "content"
image: "Tutorial"
title: "Getting Started"
text: "Get started with android-profile. Here you can find integration instructions and a basic example of initialization."
position: 4
theme: 'platforms'
collection: 'android_profile'
module: 'profile'
platform: 'android'
---


# android-profile FAQ

**Where can I find a code example of how to use Profile?**

Please see the [example](https://github.com/soomla/android-profile/blob/master/SoomlaAndroidExample/src/com/soomla/example/ExampleSocialActivity.java) provided with android-profile.

---

**I want fetch my user's friend list and offer them to invite their friends, challenge them to a game session, etc. How can I do this with SOOMLA Profile?**

You can use `getContacts` to retrieve the user's friend list, and then implement whatever features you want.

``` cs
SoomlaProfile.getInstance().getContacts(IProvider.Provider.FACEBOOK, null);
```

Notice that `getContacts` with Twitter or Google+ supplies ALL of the user's contacts, while `getContacts` with Facebook returns only the contacts that use your app.

---

<br>

## Facebook

**Is it necessary that I enter the Facebook App name and ID in the Facebook Edit Settings?**

Yes this is necessary, step 1 of our [Getting Started](/android/profile/Profile_GettingStarted) guide sends you to Facebook's getting started guide to do exactly that.

---

**After successfully logging into Facebook (`SoomlaProfile.Login(Provider.FACEBOOK);`), I try to `UpdateStatus`, and get the following error: "SOOMLA FBSocialProvider UpdateStatusCallback[result.Error]:403 Forbidden ...".**

These 403 messages can result from several Facebook issues, but they are usually the result of a user not having permissions to access a Facebook application. Please follow [Facebook's guide](https://developers.facebook.com/docs/unity/getting-started/canvas#create) to setting up an application.

Also, make sure that your Facebook account is set as administrator on the Facebook application.

---

**Do I need to ask for the user's username and password, and store them somewhere?**

You do not need to ask for the user's username and password, Facebook does that for you, and you should not store the user's username and password, you will only get access to the user's profile after he/she logged in.

---

**When I `Login` for the first time, I am asked for a "User Access Token", which I can get from Facebook, but how do I stop this behavior as my users will not have access to this token?**

Your users will not be asked for this token since tokens are only requested while in Editor (Facebook SDK functionality), and once you install the application on devices, you'll get the usual Facebook connect window.

---
