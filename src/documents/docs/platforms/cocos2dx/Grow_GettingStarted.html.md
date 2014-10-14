---
layout: "content"
image: "Tutorial"
title: "GROW: Getting Started"
text: "Get started with Grow for Cocos2d-x. GROW includes all of SOOMLA's modules: Core, Store, Profile, LevelUp, and Highway. Learn how to easily integrate all that SOOMLA offers into your game."
position: 12
theme: 'platforms'
collection: 'platforms_cocos2dx'
---

#GROW: Getting Started

**GROW** is a combination of all of SOOMLA's products. It's composed of the different modules that SOOMLA provides: [Store](/docs/soomla/store), [Profile](/docs/soomla/profile), [LevelUp](/docs/soomla/levelup), and [Highway](/docs/soomla/highway). Some of these modules can be used individually, while some are dependent on other modules. If you're new to SOOMLA, we recommend using GROW, because it allows you to enjoy all that SOOMLA has to offer.

##Integrate GROW

###Prerequisites
Before you begin, make sure you have the Cocos2d-x framework. If you don't, either clone it from [here](https://github.com/cocos2d/cocos2d-x), or download it from the [Cocos2d-x website](http://www.cocos2d-x.org/download).

###Clone & Setup

1. Clone all of SOOMLA's modules into the extensions directory located at the root of your Cocos2d-x framework: [soomla-cocos2dx-core](https://github.com/soomla/soomla-cocos2dx-core), [cocos2dx-store](https://github.com/soomla/cocos2dx-store), [cocos2dx-profile](https://github.com/soomla/cocos2dx-profile), [cocos2dx-levelup](https://github.com/soomla/cocos2dx-levelup), and [cocos2dx-highway](https://github.com/soomla/cocos2dx-highway).

    ```
    $ git clone git@github.com:soomla/soomla-cocos2dx-core.git extensions/soomla-cocos2dx-core

	$ git clone git@github.com:soomla/cocos2dx-store.git extensions/cocos2dx-store

	$ git clone git@github.com:soomla/cocos2dx-profile.git extensions/cocos2dx-profile

	$ git clone git@github.com:soomla/cocos2dx-levelup.git extensions/cocos2dx-levelup

	$ git clone git@github.com:soomla/cocos2dx-highway.git extensions/cocos2dx-highway
    ```

2. We use a [fork](https://github.com/vedi/jansson) of the jansson library for JSON parsing. Clone our fork into the `external` directory at the root of your framework:

    ```
    $ git clone git@github.com:vedi/jansson.git external/jansson
    ```

###Create & Initialize

3. You'll need an event handler class in order to be notified about in-app purchasing/social-action/LeveUp - related events. Implement your `CCCoreEventHandler`, `CCStoreEventHandler`, `CCSProfileEventHandler`, and `CCLevelUpEventHandler` classes in order to be notified about Store/Profile/LevelUp -related events.

4. Initialize `CCHighwayService`, `CCServiceManager`, `CCStoreService`, `CCProfileService`, and `CCLevelUpService` with the class you just created, a `customSecret` and other params:

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

  soomla::CCHighwayService::initShared(__String::create(<YOUR MASTER KEY>));
  ```

	<div class="info-box">*Custom Secret* is an encryption secret you provide that will be used to secure your data. Choose this secret wisely, you can't change it after you launch your game! Initialize `CCLevelUpService` ONLY ONCE when your application loads.</div>

5. Make sure to include the relevant headers whenever you use any of SOOMLA's modules' functions:

	``` cpp
	#include "Cocos2dxStore.h"
	#include "Cocos2dxProfile.h"
	#include "Cocos2dxLevelUp.h"
	```

6. Add an instance of your event handler to `CCLevelUpEventDispatcher` after `CCLevelUpService` initialization:

    ``` cpp
    soomla::CCLevelUpEventDispatcher::getInstance()->addEventHandler(handler);
    ```


**The next steps are different according to which platform you're using.**

###Instructions for iOS

In your XCode project, perform the following steps:

1. Add `jansson` (**external/jansson/**) to your project (just add it as a source folder).

2. For each of the following XCode projects:

	- `Cocos2dXCore.xcodeproj` (**extensions/soomla-cocos2dx-core/**)

	- `Cocos2dXStore.xcodeproj` (**extensions/cocos2dx-store/**)

	- `Cocos2dXProfile.xcodeproj` (**extensions/soomla-cocos2dx-profile/**)

	- `Cocos2dXLevelUp.xcodeproj` (**extensions/cocos2dx-levelup/**)

	- `Cocos2dXHighway.xcodeproj` (**extensions/cocos2dx-highway/**)  

    Perform the following:

    a. Drag the project into your project

    b. Add its targets to your **Build Phases->Target Dependencies**

    c. Add the Products (\*.a) of the project to **Build Phases->Link Binary With Libraries**.

3. Add the following directories to **Build Settings->Header Search Paths** (with `recursive` option):
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-profile/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-profile/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-levelup/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-levelup/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-highway/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-highway/build/ios/headers/**`

4. To register services on the native application (AppController):

  a. Import the following headers:

  ``` cpp
  #import "ServiceManager.h"
  #import "StoreService.h"
  #import "ProfileService.h"
  #import "LevelUpService.h"
  #import "Cocos2dXHighwayService.h"
  ```

  b. Register the native `StoreService`, `ProfileService`, and `LevelUpService` by adding:

  ```cpp
  [[ServiceManager sharedServiceManager] registerService:[StoreService sharedStoreService]];
  [[ServiceManager sharedServiceManager] registerService:[ProfileService sharedProfileService]];
  [[ServiceManager sharedServiceManager] registerService:[LevelUpService sharedLevelUpService]];
  [[ServiceManager sharedServiceManager] registerService:[Cocos2dXHighwayService getInstance]];
  ```

    at the beginning of the method `application: didFinishLaunchingWithOptions:` of `AppController`.

5. Drag AFNetworking (extensions/cocos2dx-highway/build/ios/AFNetworking) files to your project.

6. Make sure you have these frameworks linked to your XCode project: Security, libsqlite3.0.dylib, StoreKit, CFNetwork, libicucore, SystemConfiguration, and AdSupport.

7. **Facebook Setup:** See the last step of [cocos2dx-profile instructions for iOS](https://github.com/soomla/cocos2dx-profile#instructions-for-ios) in order to connect the Profile module to a social network provider (in this case Facebook).

That's it! Now all you have to do is build your XCode project and run your game.

###Instructions for Android

1. Import cocos2dx-store, cocos2dx-profile, cocos2dx-levelup,  and cocos2dx-highway into your project's Android.mk by adding the following:

    ```
    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_store_static # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-store) # add this line at the end of the file, along with the other import-module calls

    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_profile_static # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-profile) # add this line at the end of the file, along with the other import-module calls

    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_levelup_static # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-levelup) # add this line at the end of the file, along with the other import-module calls

	LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_highway_static # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

	$(call import-module, extensions/cocos2dx-highway) # add this line at the end of the file, along with the other import-module calls
    ```

2. Add the following jars to your android project's classpath:
	- From `extensions/soomla-cocos2dx-core/build/android`
        1. SoomlaAndroidCore.jar
        2. Cocos2dxAndroidCore.jar
        3. square-otto-1.3.2.jar

    - From `extensions/cocos2dx-store/build/android`
        1. AndroidStore.jar
        2. Cocos2dxAndroidStore.jar

    - From `extensions/cocos2dx-profile/build/android`
    	1. AndroidProfile.jar
        2. Cocos2dxAndroidProfile.jar

	- From `extensions/cocos2dx-levelup/build/android`
        - AndroidLevelUp.jar
        - Cocos2dxAndroidLevelUp.jar

	- From `extensions/cocos2dx-highway/build/android`
		- AndroidViper.jar
		- Cocos2dxAndroidHighway.jar

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
		serviceManager.registerService(Cocos2dXHighwayService.getInstance());
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

	$ git clone --recursive git@github.com:soomla/cocos2dx-highway.git extensions/cocos2dx-highway
	```

    **OR:** If you have already cloned the repositories, to obtain submodules, use command:

    ```
    $ git submodule update --init --recursive
    ```

	**NOTE:** You should run this command in every repository.

2. For iOS: Use sourced versions of Linked projects (`extensions/soomla-cocos2dx-core/development/Cocos2dxCoreFromSources.xcodeproj`, `extensions/cocos2dx-profile/development/Cocos2dxProfileFromSources.xcodeproj`)

3. For Android: You can use our "sourced" modules for Android Studio (or IntelliJ IDEA) (`extensions/soomla-cocos2dx-core/development/Cocos2dxCoreFromSources.iml`, `extensions/cocos2dx-profile/development/Cocos2dxProfileFromSources.iml`), just including them to your project.


##Contribution

**SOOMLA appreciates code contributions!** You are more than welcome to extend the capabilities of the SOOMLA modules.

<div class="info-box">If you would like to contribute, please follow our [Documentation Guidelines](https://github.com/soomla/cocos2dx-store/blob/master/documentation.md). Clear, consistent comments will make our code easy to understand.</div>

##Example

Below is a short example of how to initialize SOOMLA's modules. We suggest you read about the different modules and their entities in SOOMLA's [Knowledge Base](/docs/soomla).

``` cpp
/** ExampleAssets (your implementation of IStoreAssets) **/
CCVirtualCurrency *coinCurrency = CCVirtualCurrency::create(
  CCString::create("Coins"),
  CCString::create(""),
  CCString::create("coin_currency_ID")
);

CCVirtualCurrencyPack *tenmuffPack = CCVirtualCurrencyPack::create(
  CCString::create("50 Coins"),                 // name
  CCString::create("50 Coin pack"),             // description
  CCString::create("coins_50"),                 // item id
  CCInteger::create(50),												// number of currencies in the pack
  CCString::create("coin_currency_ID"),         // the currency associated with this pack
  CCPurchaseWithMarket::create(CCString::create(50_COIN_PACK_PRODUCT_ID), CCDouble::create(0.99))
);

CCVirtualGood *shieldGood = CCSingleUseVG::create(
  CCString::create("Fruit Cake"),                                       // name
  CCString::create("Customers buy a double portion on each purchase of this cake"), // description
  CCString::create("fruit_cake"),                                       // item id
  CCPurchaseWithVirtualItem::create(
          CCString::create(MUFFIN_CURRENCY_ITEM_ID), CCInteger::create(225)
  ) // the way this virtual good is purchased
);

```
 <br>

``` cpp
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
