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

##Getting Started

Get started with SOOMLA's Grow. Go to the [Grow dashboard website](dashboard.soom.la) and sign up or login. Upon logging in, you will be directed to the main page of the dashboard. On the left side panel, you can click on "Demo Game" in order to know what to expect to see once you start using Grow.

<div class="info-box">If you didn't already, clone the Cocos2d-x framework from [here](https://github.com/cocos2d/cocos2d-x), or download it from the [Cocos2d-x website](http://www.cocos2d-x.org/download). Make sure the version you clone is supported by SOOMLA's modules (the tag is the version).</div>

1. Click on **Demo Game->Add New App** and fill in the required fields.

  ![alt text](/img/tutorial_img/unity_grow/addNewApp.png "Add new app")

2. Download the SOOMLA Framework. Go to the "Download" window on the left side-panel, or click [here](dashboard.soom.la/downloads), and choose "Cocos2dx".

3. Download the **GROW Bundle**. (NOTE: The "SOOMLA Bundle" contains the modules Store, Profile, & LevelUp, but does not contain Highway, meaning that you will not be able to participate in the data sharing community.)

4. Unzip the all-in-one file. Copy the contents of its extensions directory (soomla-cocos2dx-core, cocos2dx-core, cocos2dx-profile, cocos2dx-levelup, cocos2dx-highway) into the extensions directory located at the root of your Cocos2d-x framework. Then copy the contents of its external directory (jansson) into the external directory located at the root of your Cocos2d-x framework.

5. In your `AppDelegate.cpp` include `Cocos2dxHighway.h`:

  ``` cpp
  #include "Cocos2dxHighway.h"
  ```

6. Initialize `CCHighwayService` with the "Game Key" and "Env Key" given to you in the [dashboard](dashboard.soom.la):

  ``` cpp
  CCSoomlaHighway::initShared(__String::create("yourGameKey"), __String::create("yourEnvKey"));
  ```

  ![alt text](/img/tutorial_img/cocos_grow/dashboardKeys.png "Keys")

7. Initialize the rest of the SOOMLA modules: `CCServiceManager`, `CCStoreService`, `CCProfileService`, and `CCLevelUpService`. **Custom Secret** is an encryption secret you provide that will be used to secure your data.

  <div class="warning-box">Choose this secret wisely, you can't change it after you launch your game!
  <br>Initialize `CCLevelUpService` ONLY ONCE when your application loads.</div>

  ``` cpp
  __Dictionary *commonParams = __Dictionary::create();
  commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");

  __Dictionary *storeParams = __Dictionary::create();
  storeParams->setObject(__String::create("ExamplePublicKey"), "androidPublicKey");

  __Dictionary *profileParams = __Dictionary::create();

  soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);

  soomla::CCStoreService::initShared(assets, storeParams);

  soomla::CCProfileService::initShared(profileParams);

  soomla::CCLevelUpService::initShared();

  // initialWorld should contain all worlds and levels of the game
  // rewards should contain a list of all rewards of the game
  soomla::CCLevelUp::getInstance()->initialize(initialWorld, rewards);
  ```

8. Make sure to include the relevant headers where needed:

    ```cpp
    #include "Cocos2dxStore.h"

    #include "Cocos2dxProfile.h"

    #include "Cocos2dxLevelUp.h"
    ```

<br>
<div class="info-box">The next steps are different according to which native platform you are building for.</div>

###**Instructions for iOS**

In your XCode project, perform the following steps:

1. Add `jansson` (**external/jansson/**) to your project (just add it as a source folder).

2. For each of the following XCode projects:

  - `Cocos2dXHighway.xcodeproj` (**extensions/cocos2dx-highway/**)
  - `Cocos2dXCore.xcodeproj` (**extensions/soomla-cocos2dx-core/**)  
  - `Cocos2dXStore.xcodeproj` (**extensions/cocos2dx-store/**)
  - `Cocos2dXProfile.xcodeproj` (**extensions/soomla-cocos2dx-profile/**)  
  - `Cocos2dXLevelUp.xcodeproj` (**extensions/cocos2dx-levelup/**)

  perform the following:

    - Drag the project into your project
    - Add its targets to your **Build Phases->Target Dependencies**
    - Add the Products (\*.a) of the project to **Build Phases->Link Binary With Libraries**.

3. Add the following directories to **Build Settings->Header Search Paths** (with the `recursive` option):

  NOTE: This article assumes you have a `cocos2d` folder under your project folder which either contains the Cocos2d-x framework, or links to to its root folder.

 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/Soomla`
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/build/ios/headers`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/Soomla`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/build/ios/headers`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-profile/Soomla`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-profile/build/ios/headers`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-levelup/Soomla`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-levelup/build/ios/headers`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-highway/Soomla`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-highway/build/ios/headers`

4. To register services on the native application (`AppController`):

  a. Import the following headers:
    ```cpp
    #import "ServiceManager.h"
    #import "Cocos2dXSoomlaHighway.h"
    #import "StoreService.h"
    #import "ProfileService.h"
    #import "LevelUpService.h"
    ```

  b. Register the native `Cocos2dXSoomlaHighway`, `StoreService`, `ProfileService`, and `LevelUpService` by adding:

    ```cpp
    [[ServiceManager sharedServiceManager]
      registerService:[Cocos2dXSoomlaHighway sharedCocos2dXSoomlaHighway]];

    [[ServiceManager sharedServiceManager]
      registerService:[StoreService sharedStoreService]];

    [[ServiceManager sharedServiceManager]
      registerService:[ProfileService sharedProfileService]];

    [[ServiceManager sharedServiceManager]
      registerService:[LevelUpService sharedLevelUpService]];
    ```

    at the beginning of the method `application: didFinishLaunchingWithOptions:` of `AppController`.

5. Drag the `AFNetworking` (extensions/cocos2dx-highway/build/ios/AFNetworking) files to your project. Turn on ARC for these files, if it's turned on for your project.

6. Make sure you have these 7 Frameworks linked to your XCode project:

  - Security
  - libsqlite3.0.dylib
  - StoreKit
  - CFNetwork
  - libicucore
  - SystemConfguration
  - AdSupport

7. Connect the Profile module to a social network provider:

  - [Facebook](/docs/platforms/cocos2dx/Profile_GettingStarted#facebook-for-ios)

  - [Google+](/docs/platforms/cocos2dx/Profile_GettingStarted#google+-for-ios)

  - [Twitter](/docs/platforms/cocos2dx/Profile_GettingStarted#twitter-for-ios)

That's it! Now all you have to do is build your XCode project and run your game.

###**Instructions for Android**

1. Import cocos2dx-highway, cocos2dx-store, cocos2dx-profile, and cocos2dx-levelup module into your project's Android.mk by adding the following:

    ```
    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_store_static
    # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-store)
    # add this line at the end of the file, along with the other import-module calls

    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_profile_static
    # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-profile)
    # add this line at the end of the file, along with the other import-module calls

    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_levelup_static
    # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-levelup)
    # add this line at the end of the file, along with the other import-module calls

    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_highway_static
    # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-highway)
    # add this line at the end of the file, along with the other import-module calls
    ```

2. Add the following jars to your android project's classpath:

  From `extensions/cocos2dx-highway/build/android`

    - AndroidViper.jar

    - Cocos2dxAndroidHighway.jar

    - google-play-services.jar

  From `extensions/soomla-cocos2dx-core/build/android`

    - SoomlaAndroidCore.jar

    - Cocos2dxAndroidCore.jar

    - square-otto-1.3.2.jar

  From `extensions/cocos2dx-store/build/android`

    - AndroidStore.jar

    - Cocos2dxAndroidStore.jar

  From `extensions/cocos2dx-profile/build/android`

    - AndroidProfile.jar

    - Cocos2dxAndroidProfile.jar

  From `extensions/cocos2dx-levelup/build/android`

    - AndroidLevelUp.jar

    - Cocos2dxAndroidLevelUp.jar

3. In your game's main `Cocos2dxActivity`, call the following in the `onCreateView` method:

  ``` java
  public Cocos2dxGLSurfaceView onCreateView() {
    ...

    // initialize services
    final ServiceManager serviceManager = ServiceManager.getInstance();
    serviceManager.setActivity(this);
    serviceManager.setGlSurfaceView(glSurfaceView);

    serviceManager.registerService(Cocos2dXHighwayService.getInstance());
    serviceManager.registerService(StoreService.getInstance());
    serviceManager.registerService(ProfileService.getInstance());
    serviceManager.registerService(LevelUpService.getInstance());
    ...
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

5. Update your `AndroidManifest.xml`:

  ``` xml
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <uses-permission android:name="com.android.vending.BILLING"/>

  <!-- optional: required for uploadImage from SD card -->
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

  <application
            ...
            android:name="com.soomla.SoomlaApp">

    <receiver android:name="com.soomla.highway.net.NetworkStateReceiver">
      <intent-filter>
        <action android:name="android.net.conn.CONNECTIVITY_CHANGE"/>
      </intent-filter>
    </receiver>

  </application>
  ```

6. Connect the Store module to your desired billing service:

  - [Google Play](/docs/platforms/cocos2dx/GettingStarted#google-play)

  - [Amazon Appstore](/docs/platforms/cocos2dx/gettingstarted#amazon-appstore)

7. Connect the Profile module to a social network provider:

  - [Facebook](/docs/platforms/cocos2dx/Profile_GettingStarted#facebook-for-android)

  - [Google+](/docs/platforms/cocos2dx/Profile_GettingStarted#google+-for-android)

  - [Twitter](/docs/platforms/cocos2dx/Profile_GettingStarted#twitter-for-android)

That's it! Don't forget to run the **build_native.py** script so that SOOMLA sources will be built with cocos2d-x.

##Example

Below is a short example of how to initialize SOOMLA's modules. We suggest you read about the different modules and their entities in SOOMLA's [Knowledge Base](/docs/platforms/cocos2dx).

``` cpp
/** ExampleAssets (your implementation of IStoreAssets) **/
CCVirtualCurrency *coinCurrency = CCVirtualCurrency::create(
  CCString::create("Coins"),
  CCString::create(""),
  CCString::create("coin_currency_ID")
);

CCVirtualCurrencyPack *tenmuffPack = CCVirtualCurrencyPack::create(
  CCString::create("50 Coins"),                 // Name
  CCString::create("50 Coin pack"),             // Description
  CCString::create("coins_50"),                 // Item ID
  CCInteger::create(50),                        // Number of currencies in the pack
  CCString::create("coin_currency_ID"),         // Currency associated with this pack
  CCPurchaseWithMarket::create(                 // Purchase type
    CCString::create(50_COIN_PACK_PRODUCT_ID),
    CCDouble::create(0.99))
);

CCVirtualGood *shieldGood = CCSingleUseVG::create(
  CCString::create("Fruit Cake"),               // Name
  CCString::create("Delicios fruit cake!"),     // Description
  CCString::create("fruit_cake"),               // Item ID
  CCPurchaseWithVirtualItem::create(            // Purchase type
    CCString::create(MUFFIN_CURRENCY_ITEM_ID),
    CCInteger::create(225))
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
  rewardsList,
  CCString::create("coinScore_ID"),
  CCInteger::create(100)
);

/** Levels **/
// Add 5 levels to the main world with the gate, score, and mission templates we just created.
mainWorld->batchAddLevelsWithTemplates(5, gate, score, mission);

/** Initialize Highway **/
soomla::CCHighwayService::initShared(__String::create("YOUR MASTER KEY"));

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
