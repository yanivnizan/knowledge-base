---
layout: "content"
image: "Tutorial"
title: "LEVELUP: Getting Started"
text: "Get started with cocos2dx-levelup. Here you can find a detailed description of how to integrate LevelUp into your game, and see a basic example of initialization and functionality usage."
position: 6
theme: 'platforms'
collection: 'platforms_cocos2dx'
---

#LEVELUP: Getting Started

##With pre-built libraries (Recommended)

*If you want to develop with sources, refer to the [Working with sources](#working-with-sources) section below*.

<div class="info-box">LevelUp depends on SOOMLA's other modules: Core, Store, and Profile. This document assumes that you are new to SOOMLA and have not worked with any of the other SOOMLA modules. If this is not the case, and you already *have* some or all of the other modules, please follow these directions only for the modules you are missing and of course, for the **LevelUp** module. </div>

1. If you didn't already, clone the Cocos2d-x framework from [here](https://github.com/cocos2d/cocos2d-x), or download it from the [Cocos2d-x website](http://www.cocos2d-x.org/download). Make sure the version you clone is supported by cocos2dx-levelup (the tag is the version).

2. Clone [soomla-cocos2dx-core](https://github.com/soomla/soomla-cocos2dx-core), [cocos2dx-store](https://github.com/soomla/cocos2dx-store), [cocos2dx-profile](https://github.com/soomla/cocos2dx-profile), and **cocos2dx-levelup** into the `extensions` directory located at the root of your Cocos2d-x framework:

    ```
    $ git clone git@github.com:soomla/soomla-cocos2dx-core.git extensions/soomla-cocos2dx-core

	$ git clone git@github.com:soomla/cocos2dx-store.git extensions/cocos2dx-store

	$ git clone git@github.com:soomla/cocos2dx-profile.git extensions/cocos2dx-profile

	$ git clone git@github.com:soomla/cocos2dx-levelup.git extensions/cocos2dx-levelup
    ```

3. We use a [fork](https://github.com/vedi/jansson) of the jansson library for JSON parsing, clone our fork into the `external` directory at the root of your framework:

    ```
    $ git clone git@github.com:vedi/jansson.git external/jansson
    ```

4. Implement your `CCLevelUpEventHandler` class in order to be notified about LevelUp-related events.

5. Initialize `CCServiceManager`, `CCStoreService`, `CCProfileService`, and `CCLevelUpService` with the class you just created, a `customSecret` and other params:

  ``` cpp
  __Dictionary *commonParams = __Dictionary::create();
  commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");

  __Dictionary *storeParams = __Dictionary::create();
  storeParams->setObject(__String::create("ExamplePublicKey"), "androidPublicKey");

  __Dictionary *profileParams = __Dictionary::create();

  soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);

  soomla::CCStoreService::initShared(your_IStoreAssets, storeParams);

  soomla::CCProfileService::initShared(profileParams);

  soomla::CCLevelUpService::initShared();
  soomla::CCLevelUp::getInstance()->initialize(initialWorld, NULL);
  ```

	<div class="info-box">*Custom Secret* is an encryption secret you provide that will be used to secure your data. Choose this secret wisely, you can't change it after you launch your game! Initialize `CCLevelUpService` ONLY ONCE when your application loads.</div>

6. Make sure to include the `Cocos2dxLevelUp.h` header whenever you use any of the **cocos2dx-levelup** functions:

    ``` cpp
    #include "Cocos2dxLevelUp.h"
    ```

7. Add an instance of your event handler to `CCLevelUpEventDispatcher` after `CCLevelUpService` initialization:

    ``` cpp
    soomla::CCLevelUpEventDispatcher::getInstance()->addEventHandler(handler);
    ```

**The next steps are different according to which platform you're using.**

###Instructions for iOS

In your XCode project, perform the following steps:

1. Add `jansson` (**external/jansson/**) to your project (just add it as a source folder).

2. For each of the following XCode projects:
	- `Cocos2dXCore.xcodeproj` (**extensions/soomla-cocos2dx-core/**).  
	- `Cocos2dXStore.xcodeproj` (**extensions/cocos2dx-store/**).
	- `Cocos2dXProfile.xcodeproj` (**extensions/soomla-cocos2dx-profile/**).  
	- `Cocos2dXLevelUp.xcodeproj` (**extensions/cocos2dx-levelup/**).

	Perform the following: a) Drag the project into your project, b) Add its targets to your **Build Phases->Target Dependencies**, c) Add the Products (\*.a) of the project to **Build Phases->Link Binary With Libraries**.

3. Add the following directories to **Build Settings->Header Search Paths** (with `recursive` option):
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-profile/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-profile/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-levelup/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-levelup/build/ios/headers/**`

4. To register services on the native application (AppController):

  a. Import the following headers:

  ``` cpp
  #import "ServiceManager.h"
  #import "StoreService.h"
  #import "ProfileService.h"
  #import "LevelUpService.h"
  ```

  b. Register the native `StoreService`, `ProfileService`, and `LevelUpService` by adding:

  ```cpp
  [[ServiceManager sharedServiceManager] registerService:[StoreService sharedStoreService]];
  [[ServiceManager sharedServiceManager] registerService:[ProfileService sharedProfileService]];
  [[ServiceManager sharedServiceManager] registerService:[LevelUpService sharedLevelUpService]];
  ```

    at the beginning of the method `application: didFinishLaunchingWithOptions:` of `AppController`.

5. Make sure you have these 3 Frameworks linked to your XCode project: **Security, libsqlite3.0.dylib, StoreKit**.

6. See the last step of [cocos2dx-profile instructions for iOS](https://github.com/soomla/cocos2dx-profile#instructions-for-ios) in order to connect the Profile module to a social network provider (in this case Facebook).

That's it! Now all you have to do is build your XCode project and run your game with cocos2dx-levelup.

###Instructions for Android

1. Import cocos2dx-store, cocos2dx-profile, and cocos2dx-levelup module into your project's Android.mk by adding the following:

    ```
    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_store_static # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-store) # add this line at the end of the file, along with the other import-module calls

    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_profile_static # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-profile) # add this line at the end of the file, along with the other import-module calls

    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_levelup_static # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-levelup) # add this line at the end of the file, along with the other import-module calls
    ```

2. Add the following jars to your android project's classpath:
    - from `extensions/soomla-cocos2dx-core/build/android`
        1. SoomlaAndroidCore.jar
        2. Cocos2dxAndroidCore.jar
        3. square-otto-1.3.2.jar

    - from `extensions/cocos2dx-store/build/android`
        1. AndroidStore.jar
        2. Cocos2dxAndroidStore.jar

    - from `extensions/cocos2dx-profile/build/android`
    	1. AndroidProfile.jar
        2. Cocos2dxAndroidProfile.jar

	From `extensions/cocos2dx-levelup/build/android`
        - AndroidLevelUp.jar
        - Cocos2dxAndroidLevelUp.jar

3. In your game's main `Cocos2dxActivity`, call the following in the `onCreateView` method:

	``` java
	public Cocos2dxGLSurfaceView onCreateView() {
		// initialize services
		final ServiceManager serviceManager = ServiceManager.getInstance();
		serviceManager.setActivity(this);
		serviceManager.setGlSurfaceView(glSurfaceView);
		serviceManager.registerService(StoreService.getInstance());
		serviceManager.registerService(ProfileService.getInstance());
		serviceManager.registerService(LevelUpService.getInstance());
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

6. See the last step of [cocos2dx-profile instructions for Android](https://github.com/soomla/cocos2dx-profile#instructions-for-android) in order to connect the Profile module to a social network provider (in this case Facebook).

That's it! Don't forget to run the **build_native.sh** script so cocos2dx-levelup sources will be built with cocos2d-x.



##Working with sources

For those of you who would like to [contribute](#contribution), please use our "sources environment":

Integrate cocos2dx-levelup into your game:

1. **Recursively** clone cocos2dx-core, cocos2dx-store, cocos2dx-profile, and cocos2dx-levelup.

	```
	$ git clone --recursive git@github.com:soomla/soomla-cocos2dx-core.git extensions/soomla-cocos2dx-core

	$ git clone --recursive git@github.com:soomla/cocos2dx-store.git extensions/cocos2dx-store

	$ git clone --recursive git@github.com:soomla/cocos2dx-profile.git extensions/cocos2dx-profile

	$ git clone --recursive git@github.com:soomla/cocos2dx-levelup.git extensions/cocos2dx-levelup
	```

    **OR:** If you have already cloned the repositories, to obtain submodules, use command:

    ```
    $ git submodule update --init --recursive
    ```

	**NOTE:** You should run this command in every repository.

2. For iOS: Use sourced versions of Linked projects (`extensions/soomla-cocos2dx-core/development/Cocos2dxCoreFromSources.xcodeproj`, `extensions/cocos2dx-profile/development/Cocos2dxProfileFromSources.xcodeproj`)

3. For Android: You can use our "sourced" modules for Android Studio (or IntelliJ IDEA) (`extensions/soomla-cocos2dx-core/development/Cocos2dxCoreFromSources.iml`, `extensions/cocos2dx-profile/development/Cocos2dxProfileFromSources.iml`), just including them to your project.


##Contribution

**SOOMLA appreciates code contributions!** You are more than welcome to extend the capabilities of the SOOMLA LevelUp module.

<div class="info-box">If you would like to contribute, please follow our [Documentation Guidelines](https://github.com/soomla/cocos2dx-store/blob/master/documentation.md). Clear, consistent comments will make our code easy to understand.</div>

##Example

Below is a short example of how to initialize SOOMLA's LevelUp. We suggest you read about the [LevelUp Game Design Model](/docs/platforms/cocos2dx/Levelup_Model) in order to understand the different entities of `LevelUp`.

``` cpp
/** ExampleAssets (your implementation of IStoreAssets) **/
CCVirtualCurrency *coinCurrency = CCVirtualCurrency::create(
  CCString::create("Coins"),
  CCString::create(""),
  CCString::create("coin_currency_ID")
);

/** World **/
CCWorld* mainWorld = CCWorld::create(
  CCString::create("mainWorld_ID")
);

/** Score **/
CCScore *coinScore = CCVirtualItemScore::create(
  CCString::create("coinScore_ID"),
  CCString::create("coin_currency_ID")
);

/** Gate **/
CCGate *gate = CCScheduleGate::create(
  CCString::create("gate_ID"),
  CCSchedule::createAnyTimeUnLimited()
);

/** Mission **/
CCMission *mission = CCBalanceMission::create(
  CCString::create("mission_ID"),
  CCString::create("Collect 100 coins"),
  NULL,
  CCString::create("coinScore_ID"),
  CCInteger::create(100)
);

/** Levels **/
/// Add 5 levels to the main world with the gate, score, and mission templates we just created.
mainWorld->batchAddLevelsWithTemplates(5, gate, score, mission);

/** Set up and initialize Core, Store, Profile, and LevelUp **/
ExampleAssets *assets = MuffinRushAssets::create();

__Dictionary *commonParams = __Dictionary::create();
commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");

__Dictionary *storeParams = __Dictionary::create();
storeParams->setObject(__String::create("ExamplePublicKey"), "androidPublicKey");

__Dictionary *profileParams = __Dictionary::create();

soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);

soomla::CCStoreService::initShared(assets, storeParams);

soomla::CCProfileService::initShared(profileParams);

soomla::CCLevelUpService::initShared();
soomla::CCLevelUp::getInstance()->initialize(mainWorld, NULL);
```
