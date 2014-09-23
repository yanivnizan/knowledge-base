---
layout: "content"
image: "Tutorial"
title: "PROFILE: Getting Started"
text: "Get started with android-profile. Here you can find integration instructions and a basic example of initialization."
position: 7
theme: 'platforms'
collection: 'platforms_android'
---

#Getting Started

##With jars (Recommended)

If you want to develop with sources, refer to the [Working with sources](#working-with-sources) section below.

<div class="info-box">Profile depends on SOOMLA's Core module. This document assumes that you are new to SOOMLA and have not worked with any of the other SOOMLA modules. If this is not the case, and you already have Core & Store, please follow these directions only for the Profile module.</div>

1. Add the jars from the [build](https://github.com/soomla/android-profile/tree/master/build) folder to your project.

2. Make the following changes to your AndroidManifest.xml:

  Set `SoomlaApp` as the main Application by placing it in the `application` tag:

    ``` xml
    <application ...
                 android:name="com.soomla.SoomlaApp">
    ```

3. Initialize SOOMLA with a secret of your choice to encrypt the user data saved in the DB. (For those who used older versions of SOOMLA, this should be the same as the old "custom secret"):

    ``` java
     Soomla.initialize("[YOUR CUSTOM GAME SECRET HERE]");
    ```

4. Initialize `SoomlaProfile`

  ``` java
    SoomlaProfile.getInstance().initialize();
  ```

5. Refer to the [next section](#select-social-providers) for information of selecting social providers and setting them up.

Cool, almost there, on to provider selection!

###Select Social Providers

<div class="info-box">**android-profile** is structured to support multiple social networks (Facebook, Twitter, etc.), at the time of writing this the framework only supports Facebook integration. We use the [Simple Facebook project](https://github.com/sromku/android-simple-facebook) to support this integration.</div>

####**Facebook**

Facebook is supported out-of-the-box, you just have to follow the next steps to make it work:

1. Import the Facebook SDK for Android into your project and setup all the relevant information (Application ID, etc).

    a. For more information regarding this refer to [Facebook SDK for Android](https://developers.facebook.com/docs/android)

    b. SOOMLA uses [Android Studio](https://developer.android.com/sdk/installing/studio.html), in this case you can extract the Facebook SDK into your project folder and then it's simply a case of importing the `iml` file in the Facebook SDK folder into your project

2. Make the following changes in `AndroidManifest.xml`:

      ``` xml
      ...

      <application ...
          <activity android:name="com.soomla.profile.social.facebook.SoomlaFacebook$SoomlaFBActivity" android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen">
        </activity>
      </application>
      ```

##Working with sources

For those of you who want to [contribute](#contribution) code, please use our "sources environment".

**To integrate android-profile into your game:**

**Recursively** clone android-profile

  ```
  $ git clone --recursive git@github.com:soomla/android-profile.git
  ```

OR: If you have already cloned the repositories, to update submodules, use command:

  ```
  $ git submodule update --init --recursive
  ```

##Contribution

**SOOMLA appreciates code contributions!** You are more than welcome to extend the social capabilities of the SOOMLA Profile module, by adding support to any social provider you wish (Twitter, Google+, etc.), and connect the new provider to SOOMLA's Store module.

If you would like to contribute, please follow our [Documentation Guidelines](https://github.com/soomla/android-store/blob/master/documentation.md). Clear, consistent comments will make our code easy to understand.

##Example

Here is an example of initializing Profile, logging the user into Facebook, and sharing a story on the user's Facebook wall. To learn about the different entities and functionality of Profile, see [Main Classes & Operations](/docs/platforms/android/Profile_MainClasses).

``` java
public class ExampleActivity extends Activity {
  ...
  protected void onCreate(Bundle savedInstanceState) {
    ...
    // Initialize `SoomlaProfile`.
    SoomlaProfile.getInstance().initialize();
  }
}


public class ExampleSocialActivity extends Activity {

  private IProvider.Provider provider = IProvider.Provider.FACEBOOK;

  Reward exampleReward = new VirtualItemReward(
    "reward_login",             // item ID
    "Login for VG",             // description
    15,                         // amount of virtual good to give
    associatedItemId            // item ID of virtual good to give
  );

  protected void onCreate(Bundle savedInstanceState) {
    ...

    // Log the user into Facebook.
    SoomlaProfile.getInstance().login(this, provider, exampleReward);


    // Share a story on the user's Facebook wall.
    SoomlaProfile.getInstance().updateStory(
      provider,                   // provider
      "message",                  // message
      "The SOOMLA Project",       // name
      "caption",                  // caption
      "SOOMLA is cool!",          // description
      "http://soom.la",           // link
      "http://...bankerbot.png",  // image
      exampleReward               // reward
    );
  }
}
```
