---
layout: "content"
image: "Tutorial"
title: "PROFILE: Getting Started"
text: "Get started with cocos2dx-profile. Here you can find a detailed description of how to integrate Profile into your project, as well as a basic example of initialization and social functionality usage."
position: 5
theme: 'platforms'
collection: 'platforms_cocos2dx'
---

#PROFILE: Getting Started

##With pre-built libraries (Recommended)

*If you want to develop with sources, refer to the [Working with sources](#working-with-sources) section below*.

<div class="info-box">Profile depends on SOOMLA's Core module. This document assumes that you are new to SOOMLA and have not worked with any of the other SOOMLA modules. If this is not the case, and you already have **Store**, please follow these directions only for the **Profile** module.</div>

1. If you didn't already, clone the Cocos2d-x framework from [here](https://github.com/cocos2d/cocos2d-x), or download it from the [Cocos2d-x website](http://www.cocos2d-x.org/download). Make sure the version you clone is supported by cocos2dx-store (the tag is the version).

2. Clone [soomla-cocos2dx-core](https://github.com/soomla/soomla-cocos2dx-core) and **cocos2dx-profile** into the `extensions` directory located at the root of your Cocos2d-x framework:

    ```
    $ git clone git@github.com:soomla/soomla-cocos2dx-core.git extensions/soomla-cocos2dx-core

    $ git clone git@github.com:soomla/cocos2dx-profile.git extensions/cocos2dx-profile
    ```

3. We use a [fork](https://github.com/vedi/jansson) of the jansson library for JSON parsing, clone our fork into the `external` directory at the root of your framework:

    ```
    $ git clone git@github.com:vedi/jansson.git external/jansson
    ```

4. Implement your `CCProfileEventHandler` class in order to be notified about social-network-related events. Refer to the [Event Handling](/docs/soomla/storefront/EventHandling) section for more information.

5. Initialize `CCServiceManager` and `CCProfileService` with the class you just created, a `customSecret` and other params:

  ``` cpp
  __Dictionary *commonParams = __Dictionary::create();
  commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");

  __Dictionary *profileParams = __Dictionary::create();

  soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);

  soomla::CCProfileService::initShared(profileParams);
  ```

    <div class="info-box">*Custom Secret* - is an encryption secret you provide that will be used to secure your data. Choose this secret wisely, you can't change it after you launch your game! Initialize `CCProfileService` ONLY ONCE when your application loads.</div>

6. Make sure to include the `Cocos2dxProfile.h` header whenever you use any of the **cocos2dx-profile** functions:

    ``` cpp
    #include "Cocos2dxProfile.h"
    ```

7. Add an instance of your event handler to `CCProfileEventDispatcher` after `CCProfileService` initialization:

    ``` cpp
    soomla::CCProfileEventDispatcher::getInstance()->addEventHandler(handler);
    ```

<br>
<div class="info-box">The next steps are different according to which platform you're using.</div>

####**Instructions for iOS**

In your XCode project, perform the following steps:

1. Add `jansson` (**external/jansson/**) to your project (just add it as a source folder).

2. For each of the following XCode projects:

  * `Cocos2dXCore.xcodeproj` (**extensions/soomla-cocos2dx-core/**).  
  * `Cocos2dXProfile.xcodeproj` (**extensions/cocos2dx-profile/**).

    Perform the following:

    a. Drag the project into your project.

    b. Add its targets to your "Build Phases" > "Target Dependencies".

    c. Add the Products (\*.a) of the project to "Build Phases" > "Link Binary With Libraries".

3. Add the following directories to **Build Settings->Header Search Paths** (with `recursive` option):
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-profile/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-profile/build/ios/headers/**`

4. Register the native `StoreService` by adding:

    ``` cpp
    [[ServiceManager sharedServiceManager] registerService:[ProfileService sharedProfileService]];
    ```
at the begining of the method `application: didFinishLaunchingWithOptions:` of `AppController`.

5. Make sure you have these 3 Frameworks linked to your XCode project: **Security, libsqlite3.0.dylib, StoreKit**.

6. The following steps should be done according to the social network you would like to support (Currently SOOMLA only supports Facebook, but in the future there will be more social providers available):

	**Facebook** - Add the Facebook SDK for iOS to the project's Frameworks and make sure your project links to the project. Refer to [Getting Started with the Facebook iOS SDK](https://developers.facebook.com/docs/ios/getting-started/) for more information.

	That's it! Now all you have to do is build your XCode project and run your game with cocos2dx-profile.

<br>
####**Instructions for Android**

1. Import cocos2dx-profile module into your project's Android.mk by adding the following:

    ```
    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_profile_static # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-profile) # add this line at the end of the file, along with the other import-module calls
    ```

2. Add the following jars to your android project's classpath:

  From `extensions/soomla-cocos2dx-core/build/android`:
  - SoomlaAndroidCore.jar
  - Cocos2dxAndroidCore.jar
  - square-otto-1.3.2.jar

  From `extensions/cocos2dx-profile/build/android`:
  - AndroidProfile.jar
  - Cocos2dxAndroidProfile.jar
  - simple.facebook-2.1.jar

3. In your game's main `Cocos2dxActivity`, call the following in the `onCreateView` method:

	``` java
	public Cocos2dxGLSurfaceView onCreateView() {
		// initialize services
		final ServiceManager serviceManager = ServiceManager.getInstance();
		serviceManager.setActivity(this);
		serviceManager.setGlSurfaceView(glSurfaceView);
		serviceManager.registerService(ProfileService.getInstance());
	}
	```

4. Override `onPause`, `onResume`:

	``` java
    @Override
    protected void onPause() {
        super.onPause();
        ServiceManager.getInstance().onPause();
    }

    @Override
    protected void onResume() {
        ServiceManager.getInstance().onResume();
        super.onResume();
    }
	```

5. Update your AndroidManifest.xml to include permissions and the SoomlaApp:

    ``` xml
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- optional: required for uploadImage from SD card -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

    <application ...
    	       android:name="com.soomla.SoomlaApp">
    	       ...
    </application>
    ```

6. The following steps should be done according to the target social network (Currently, SOOMLA only supports Facebook, but in the future there will be more social providers available):

  **Facebook**
  1. Import the Facebook SDK for Android into your project. Refer to [Facebook SDK for Android](https://developers.facebook.com/docs/android) for more information.
  2. If you are using [Android Studio](https://developer.android.com/sdk/installing/studio.html), like SOOMLA does, you can extract the Facebook SDK into your `proj.android` folder and then it's simply a matter of importing the `iml` file in the Facebook SDK folder into your project.
  3. Update your AndroidManifest.xml:

  ``` xml
  ...
  <application ...
  	<activity android:name="com.soomla.profile.social.facebook.SoomlaFacebook$SoomlaFBActivity" android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen">
  	</activity>
  </application>
  ```

That's it! Don't forget to run the **build_native.sh** script so cocos2dx-profile sources will be built with cocos2d-x.

##Working with sources

For those of you who want to [contribute](#contribution) code, please use our "sources environment".

To integrate cocos2dx-profile into your game, follow these steps:

1. **Recursively** clone cocos2dx-core and cocos2dx-profile

	```
	$ git clone --recursive git@github.com:soomla/soomla-cocos2dx-core.git extensions/soomla-cocos2dx-core

	$ git clone --recursive git@github.com:soomla/cocos2dx-profile.git extensions/cocos2dx-profile
	```

    **OR:** If you have already cloned the repositories, to obtain submodules, use command:

    ```
    $ git submodule update --init --recursive
    ```
	**NOTE:** You should run this command in every repository.

2. For iOS: Use sourced versions of Linked projects (`extensions/soomla-cocos2dx-core/development/Cocos2dxCoreFromSources.xcodeproj`, `extensions/cocos2dx-profile/development/Cocos2dxProfileFromSources.xcodeproj`)

3. For Android: You can use our "sourced" modules for Android Studio (or IntelliJ IDEA) (`extensions/soomla-cocos2dx-core/development/Cocos2dxCoreFromSources.iml`, `extensions/cocos2dx-profile/development/Cocos2dxProfileFromSources.iml`), just including them to your project.


##Contribution

**SOOMLA appreciates code contributions!** You are more than welcome to extend the social capabilities of the SOOMLA Profile module, by adding support to any social provider you wish (Twitter, Google+, etc.), and connect the new provider to SOOMLA's Store module.

<div class="info-box">If you would like to contribute, please follow our [Documentation Guidelines](https://github.com/soomla/cocos2dx-store/blob/master/documentation.md). Clear, consistent comments will make our code easy to understand.</div>

##Example

Here is an example of initializing Profile, logging the user in, and sharing a story on the user's Facebook wall. To see a full example, please see [cocos2dx-profile-example](https://github.com/soomla/cocos2dx-profile-example/tree/master/Classes). To learn about the different entities and functionality of Profile, see [Main Classes & Operations](/docs/platforms/cocos2dx/Profile_MainClasses).

<br>

Initialize ServiceManager and Profile in `AppDelegate.cpp`.
``` cpp
__Dictionary *commonParams = __Dictionary::create();
commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");
soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);

...

__Dictionary *profileParams = __Dictionary::create();
soomla::CCProfileService::initShared(profileParams);
```

<br>
Initialize your event handler (in this example say your event handler class is called MyEventHandler).

``` cpp
soomla::CCMyEventHandler *myHandler = new MyEventHandler();
...
soomla::CCProfileEventDispatcher::getInstance()->addEventHandler(myHandler);
```
<br>
Log the user in.

``` cpp
soomla::CCProfileController::getInstance()->login(soomla::FACEBOOK, loginReward, &profileError);
```
<br>
Share a story on the user's Facebook wall.
``` cpp
soomla::CCProfileController::getInstance()->updateStory(
    soomla::FACEBOOK,
    "Check out this great story by SOOMLA!",
    "SOOMLA is 2 years young!",
    "SOOMLA Story",
    "soomla_2_years",
    "http://blog.soom.la/2014/08/congratulations-soomla-is-2-years-young.html",
    "http://blog.soom.la/wp-content/uploads/2014/07/Birthday-bot-300x300.png",
    soomla::CCBadgeReward::create("sheriff", "Sheriff"), &profileError  
);
```

And that's it! cocos2dx-profile knows how to contact Facebook and perform social actions with the information you provide.
