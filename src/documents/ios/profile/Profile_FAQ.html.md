---
layout: "content"
image: "Tutorial"
title: "FAQ"
text: "Frequently asked questions about ios-profile."
position: 4
theme: 'platforms'
collection: 'ios_profile'
module: 'profile'
platform: 'ios'
---

# ios-profile FAQ

**Where can I find a code example of how to use Profile?**

Please see the [example](https://github.com/soomla/ios-profile/tree/master/SoomlaiOSProfileExample/SoomlaiOSProfileExample) provided with ios-profile.

---

**I want fetch my user's friend list and offer them to invite their friends, challenge them to a game session, etc. How can I do this with SOOMLA Profile?**

You can use `getContacts` to retrieve the user's friend list, and then implement whatever features you want.

``` objectivec
[[SoomlaProfile getInstance] getContactsWithProvider:FACEBOOK
    andReward:nil
];
```

Notice that `getContacts` with Twitter or Google+ supplies ALL of the user's contacts, while `getContacts` with Facebook returns only the contacts that use your app.

---

**Do I need to ask for the user's username and password, and store them somewhere?**

You do not need to ask for the user's username and password, Facebook does that for you, and you should not store the user's username and password, you will only get access to the user's profile after he/she logged in.

---

**I'm getting a `ProviderNotFoundException` when I try to login to Facebook, Twitter or Google+. What am I doing wrong?**

There are extra steps you need to take in order for each of the social providers to work. These steps can be found in our Getting Started guide specifically for [Facebook](/ios/profile/Profile_GettingStarted#facebook), [Twitter](/ios/profile/Profile_GettingStarted#twitter) and [Google+](/ios/profile/Profile_GettingStarted#google-plus).
