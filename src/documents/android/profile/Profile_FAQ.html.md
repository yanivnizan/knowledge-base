---
layout: "content"
image: "Tutorial"
title: "FAQ"
text: "Frequently asked questions about android-profile."
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

``` java
SoomlaProfile.getInstance().getContacts(IProvider.Provider.FACEBOOK, null);
```

Notice that `getContacts` with Twitter or Google+ supplies ALL of the user's contacts, while `getContacts` with Facebook returns only the contacts that use your app.

---

**After successfully logging into Facebook, I try to `updateStatus`, and get the following error: "SOOMLA FBSocialProvider UpdateStatusCallback[result.Error]:403 Forbidden ...".**

These 403 messages can result from several Facebook issues, but they are usually the result of a user not having permissions to access a Facebook application. Please follow [Facebook's guide](https://developers.facebook.com/roadblock/?logout=0&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fios%2Fgetting-started%2F) to setting up an application.

Also, make sure that your Facebook account is set as administrator on the Facebook application.

---

**Do I need to ask for the user's username and password, and store them somewhere?**

You do not need to ask for the user's username and password, Facebook does that for you, and you should not store the user's username and password, you will only get access to the user's profile after he/she logged in.

---

**I'm getting a `ProviderNotFoundException` when I try to login to Facebook, Twitter or Google+. What am I doing wrong?**

There are extra steps you need to take in order for each of the social providers to work. These steps can be found in our Getting Started guide specifically for [Facebook](/android/profile/Profile_GettingStarted#facebook), [Twitter](/android/profile/Profile_GettingStarted#twitter) and [Google+](/android/profile/Profile_GettingStarted#google-plus).
