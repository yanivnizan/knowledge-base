---
layout: "content"
image: "Tutorial"
title: "Getting Started"
text: "Get started with android-profile. Here you can find integration instructions and a basic example of initialization."
position: 1
theme: 'platforms'
collection: 'android_profile'
module: 'profile'
platform: 'android'
---

#Getting Started

<div class="info-box">Profile depends on SOOMLA's Core module. This document assumes that you are new to SOOMLA and have not worked with any of the other SOOMLA modules. If this is not the case, and you already have Core & Store, please follow these directions only for the Profile module.</div>

##Getting Started

1. Download [android-profile](http://library.soom.la/fetch/android-profile/1.0.1?cf=github).

2. From the downloaded zip, add the following jars to your project.

	- `SoomlaAndroidCore.jar`

	- `AndroidProfile.jar`

	- `square-otto-1.3.2.jar`

3. Make the following changes to your AndroidManifest.xml:

	Set `SoomlaApp` as the main Application by placing it in the `application` tag:

	``` xml
	<application ...
	             android:name="com.soomla.SoomlaApp">
	```

4. Initialize `Soomla` with a "Soomla Secret", a secret of your choice used to encrypt your users' data. (If you used an older version of android-store, this should be the same as the old "custom secret"):

	``` java
	Soomla.initialize("[YOUR CUSTOM GAME SECRET HERE]");
	```

5. Initialize `SoomlaProfile`:

	``` java
	SoomlaProfile.getInstance().initialize();
	```

  NOTE that some social providers need special parameters in initialization - you can supply them like so:

	``` java
	HashMap<IProvider.Provider, HashMap<String, String>> providerParams = new
	            HashMap<IProvider.Provider, HashMap<String, String>>();

	// Fill in the HashMap according to social providers

	SoomlaProfile.getInstance().initialize(providerParams);
	```

  a. **Facebook** - No special parameters needed

  b. **Google+** - No special parameters needed

	c. **Twitter** - Please provide **Consumer Key** and **Consumer Secret** from the "Keys and Access Tokens" section in [Twitter Apps](https://apps.twitter.com/), like so:

		``` java
		HashMap<String, String> twitterParams = new HashMap<String, String>();
		twitterParams.put("consumerKey", "[YOUR CONSUMER KEY]");
		twitterParams.put("consumerSecret", "[YOUR CONSUMER SECRET]");

		providerParams.put(IProvider.Provider.TWITTER, twitterParams);
		```

6. If integrating a virtual economy with the store module, please see [android-store](https://github.com/soomla/android-store) for store setup.

<div class="info-box">The following steps should be done according to the target social network.</div>

### Facebook

Facebook is supported out-of-the-box, you just have to follow the next steps to make it work:

1. From the downloaded zip, Add the following jars to your project.
  1. `AndroidProfileFacebook.jar`
  1. `simple.facebook-2.1.jar`

1. Import the Facebook SDK for Android into your project and setup all the relevant information (Application ID, etc).

    1. For more information regarding this refer to [Facebook SDK for Android](https://developers.facebook.com/docs/android)

    1. SOOMLA uses [Android Studio](https://developer.android.com/sdk/installing/studio.html), in this case you can extract the Facebook SDK into your project folder and then it's simply a case of importing the `iml` file in the Facebook SDK folder into your project
1. Make the following changes in `AndroidManifest.xml`:

      ```xml
      ...

      <application ...
          <activity android:name="com.soomla.profile.social.facebook.SoomlaFacebook$SoomlaFBActivity" android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen">
        </activity>
      </application>
      ```

### Twitter

Twitter is also supported out-of-the-box, authentication is done via web view. Follow the next steps to make it work:

> **android-profile** uses the [Twitter4J](https://github.com/yusuke/twitter4j) library (v 4.0.2) to support Twitter integration

1. From the downloaded zip, Add the following jars to your project.
  1. `AndroidProfileTwitter.jar`
  1. `twitter4j-core-4.0.2.jar`
  1. `twitter4j-asyc-4.0.2.jar`

1. Create your Twitter app at https://apps.twitter.com/

1. Make the following changes in `AndroidManifest.xml`:

      ```xml
      ...

      <application ...
          <activity android:name="com.soomla.profile.social.twitter.SoomlaTwitter$SoomlaTwitterActivity" android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen">
        </activity>
      </application>
      ```

### Google Plus

1. From the downloaded zip, Add the `AndroidProfileGoogle.jar` jar to your project.

1. Follow [Step 1: Enable the Google+ API](https://developers.google.com/+/mobile/android/getting-started#step_1_enable_the_google_api) and create a google+ app for Android.

    > **Note:** Set the PACKAGE NAME of your google+ app to the value the package defined in your `AndroidManifest.xml`.

1. Import `google-play-services_lib` project as module dependency to your project.

    > **Note:** You can either download/copy the existing `google-play-services_lib` project located under [google social provider libs](https://github.com/soomla/android-profile/tree/master/social-providers/android-profile-google/libs) folder or [create one yourself](https://developers.google.com/+/mobile/android/getting-started#step_2_configure_your_eclipse_project).

1. Add `SoomlaGooglePlusActivity` to `AndroidManifest.xml` as following:

      ```xml
      ...

      <application ...
          <activity android:name="com.soomla.profile.social.google.SoomlaGooglePlus$SoomlaGooglePlusActivity" android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen">
        </activity>
      </application>
      ```

1. Add the following permissions in `AndroidManifest.xml`:
    ```xml
      <uses-permission android:name="android.permission.INTERNET" />
      <uses-permission android:name="android.permission.GET_ACCOUNTS" />
      <uses-permission android:name="android.permission.USE_CREDENTIALS" />
    ```











##Caveats

###Facebook Caveats


###Twitter Caveats


###Google Plus Caveats






##Example

Below is a brief example of initializing Profile, logging the user into Facebook, and sharing a story on the user's Facebook wall. To see a full example, check out the [Muffin Rush Example](https://github.com/soomla/unity3d-profile/tree/master/Soomla/Assets/Examples/MuffinRush) that comes with unity3d-profile when you download it.

To learn about the different entities and functionality of Profile, see [Main Classes & Operations](/unity/profile/Profile_MainClasses).

<br>
Initialize `SoomlaProfile`.

``` cs
SoomlaProfile.Initialize();
```

<br>
Log the user into Facebook.

``` cs
SoomlaProfile.Login(
	Provider.FACEBOOK,                        // Social Provider
	new BadgeReward("loggedIn", "Logged In!") // Reward
);
```

<br>
Share a story on the user's Facebook wall.

``` cs
SoomlaProfile.UpdateStory(
	"Check out this great story by SOOMLA!",   // Message
	"SOOMLA is 2 years young!",                // Name
	"SOOMLA is GROWing",                       // Caption
	"soomla_2_years",                          // Desc
	"http://blog.soom.la",                     // Link
	"http://blog.soom.la.../soombot.png",      // Image
	new BadgeReward("sheriff", "Sheriff")      // Reward
);
```
