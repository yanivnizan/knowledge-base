---
layout: "content"
image: "Tutorial"
title: "PROFILE: Getting Started"
text: "Get started with iOS-profile. Here you can find integration instructions and a basic example of initialization."
position: 6
theme: 'platforms'
collection: 'platforms_ios'
---

#PROFILE: Getting Started

##With pre-built libraries (Recommended)

*If you want to develop with sources, refer to the [Working with sources](#working-with-sources) section below.*

<div class="info-box">Profile depends on SOOMLA's Core module. This document assumes that you are new to SOOMLA and have not worked with any of the other SOOMLA modules. If this is not the case, and you already have Core & Store, please follow these directions only for the Profile module.</div>

1. The static libs and headers you need are in the folder [build](https://github.com/soomla/ios-profile/tree/master/build).

  * Set your project's "Library Search Paths" and "Header Search Paths" to that folder.

  * Under the project's properties: **Build Settings > Other Linker Flags**, add `-ObjC -lSoomlaiOSProfile -lSoomlaiOSCore`.

2. Make sure you have the following frameworks in your application's project: **Security, libsqlite3.0.dylib**.

3. Initialize **Soomla** with a secret of your choice to encrypt the user data saved in the DB. (For those who used older versions of SOOMLA, this should be the same as the old "custom secret"):

  ``` objectivec
  [Soomla initializeWithSecret:@"[YOUR CUSTOM GAME SECRET HERE]"];
  ```

4. Initialize SOOMLA Profile:

  ``` objectivec
  [[SoomlaProfile getInstance] initialize];
  ```

5. Refer to the next section for information on selecting social providers and setting them up.

And that's it! You now have social network capabilities. For a brief example that shows how Profile works, see the [example](#example) below. For a full example, click [here](https://github.com/soomla/ios-profile/tree/master/SoomlaiOSProfileExample).

###Select Social Providers

<div class="info-box">**iOS-profile** is structured to support multiple social networks (Facebook, Twitter, etc.). However, currently SOOMLA supports only Facebook, but in the future there will be more social providers available.</div>

<br>
####**Facebook**

Facebook is supported out-of-the-box, you just have to follow the next steps to make it work:

1. Add the Facebook SDK for iOS to the project's Frameworks and make sure your project links to the project.

2. Refer to [Getting Started with the Facebook iOS SDK](https://developers.facebook.com/docs/ios/getting-started/) for more information.

## Working with sources

For those of you who want to [contribute](#contribution) code, please use our "sources environment".

**To integrate ios-profile into your game:**

**Recursively** clone ios-profile

  ```
  $ git clone --recursive git@github.com:soomla/ios-profile.git
  ```

OR: If you have already cloned the repositories, to update submodules, use command:

  ```
  $ git submodule update --init --recursive
  ```

##Contribution

**SOOMLA appreciates code contributions!** You are more than welcome to extend the social capabilities of the SOOMLA Profile module, by adding support to any social provider you wish (Twitter, Google+, etc.), and connect the new provider to SOOMLA's Store module.

If you would like to contribute, please follow our [Documentation Guidelines](https://github.com/soomla/ios-store/blob/master/documentation.md). Clear, consistent comments will make our code easy to understand.

##Example

Here is an example of initializing Profile, logging the user into Facebook, and sharing a story on the user's Facebook wall. To learn about the different entities and functionality of Profile, see [Main Classes & Operations](/docs/platforms/ios/Profile_MainClasses).

<br>
Initialize `SoomlaProfile`.

``` objectivec
[[SoomlaProfile getInstance] initialize];
```

<br>
Log the user into Facebook.

``` objectivec
[[SoomlaProfile getInstance]
  loginWithProvider:FACEBOOK
  andReward:appDelegate.loginReward];
```

<br>
Share a story on the user's Facebook wall.

``` objectivec
[[SoomlaProfile getInstance]
  updateStoryWithProvider:FACEBOOK
                andMessage:@"Message"
                   andName:@"Name"
                andCaption:@"Caption"
            andDescription:@"Description"
                   andLink:@"https://developers.facebook.com/docs/ios/share/"
                andPicture:@"http://i.imgur.com/g3Qc1HN.png"
                 andReward:appDelegate.updateStatusReward];
```
