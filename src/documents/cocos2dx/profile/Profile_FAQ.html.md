---
layout: "content"
image: "Tutorial"
title: "FAQ"
text: "Frequently asked questions about cocos2dx-profile."
position: 4
theme: 'platforms'
collection: 'cocos2dx_profile'
module: 'profile'
platform: 'cocos2dx'
---

# cocos2dx-profile FAQ

**Where can I find a code example of how to use Profile?**

There is a full example included in the package under the Examples directory (here's a [link](https://github.com/soomla/cocos2dx-profile-example/blob/master/Classes/ProfileScreen.cpp) to the code).

---

**I want fetch my user's friend list and offer them to invite their friends, challenge them to a game session, etc. How can I do this with SOOMLA Profile?**

You can use `getContacts` to retrieve the user's friend list, and then implement whatever features you want.

``` cpp
soomla::CCSoomlaProfile::getInstance()->getContacts(
    soomla::FACEBOOK,                     // Provider
    contactsReward,                       // Reward upon success of getting contacts
    &profileError                         // Used for error handling
);
```

Notice that `getContacts` with Twitter or Google+ supplies ALL of the user's contacts, while `getContacts` with Facebook returns only the contacts that use your app.

---

<br>

## Facebook

**Is it necessary that I enter the Facebook App name and ID in the Facebook Edit Settings?**

Yes this is necessary, step 2 of "Facebook for iOS" of our [Getting Started](/cocos2dx/profile/Profile_GettingStarted/#facebook-for-ios) guide sends you to Facebook's getting started guide to do exactly that.

---

**Do I need to ask for the user's username and password, and store them somewhere?**

You do not need to ask for the user's username and password, Facebook does that for you, and you should not store the user's username and password, you will only get access to the user's profile after he/she logged in.

---
