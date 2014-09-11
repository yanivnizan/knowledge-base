---
layout: "content"
image: "Storage"
title: "Storage"
text: "Profile locally caches user information on the user's device. Read here to learn how to access the data."
position: 2
theme: 'soomla'
collection: 'soomla_storefront'
---

#Storage

The platform-specific Profile modules locally cache user information on the device. User information includes name, email, gender, birthday, language, location, and other useful information that you can use to your benefit. For example, you can retrieve a user's birthday and offer him/her a "birthday special"; Reward them with a coin-pack birthday gift if they upload an image of the "birthday gift" on Facebook.

##Access the data

Notice that the data is available for access only after the user has already logged in.

###In cocos2dx-profile

``` cpp
soomla::CCUserProfile *userProfile = soomla::CCProfileController::getInstance()->getStoredUserProfile(
soomla::FACEBOOK, &profileError);
```

###In unity3d-profile

``` cs
UserProfile userProfile = SoomlaProfile.GetStoredUserProfile(Provider.FACEBOOK);
```

The on-device storage is encrypted and kept in an SQLite database. SOOMLA is preparing a cloud-based storage service that will allow this SQLite to be synced to a cloud-based repository that you'll define.
