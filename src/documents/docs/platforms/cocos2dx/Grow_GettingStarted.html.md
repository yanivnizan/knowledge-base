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

Get started with SOOMLA's Grow. Go to the [Grow dashboard website](https://dashboard.soom.la) and sign up or login. Upon logging in, you will be directed to the main page of the dashboard. On the left side panel, you can click on "Demo Game" in order to know what to expect to see once you start using Grow.

// TODO Insert screenshot of demo game data

<div class="info-box">If you didn't already, clone the Cocos2d-x framework from [here](https://github.com/cocos2d/cocos2d-x), or download it from the [Cocos2d-x website](http://www.cocos2d-x.org/download). Make sure the version you clone is supported by SOOMLA's modules (the tag is the version).</div>

1. Click on "Demo Game" > "Add New App" and fill in the required fields.

    ![alt text](/img/tutorial_img/unity_grow/addNewApp.png "Add new app")

2. Download the SOOMLA Framework. Go to the "Download" window on the left side-panel, or click [here](http://dashboard.soom.la/downloads), and choose "Cocos2dx".

3. Choose the "GROW BUNDLE" by clicking the "Download" button. (NOTE: The "SOOMLA Bundle" contains the modules Store, Profile, & LevelUp, but does not contain Highway, meaning that it doesn't enable you to share data and participate in the data sharing community.)

4. Unzip the all-in-one file. Copy the contents of the (cocos2dx-all-in-one) extensions* directory into the extensions directory located at the root of your Cocos2d-x framework, and the contents of the (cocos2dx-all-in-one) external** directory into the external directory located at the root of your Cocos2d-x framework.

  - ***extensions directory contents:** soomla-cocos2dx-core, cocos2dx-core, cocos2dx-profile, cocos2dx-levelup, cocos2dx-highway

  - ****external directory contents:** jansson

5. Implement your `CCLevelUpEventHandler` class in order to be notified about LevelUp-related events.

6. Initialize `CCServiceManager`, `CCStoreService`, `CCProfileService`, and `CCLevelUpService` with the class you just created, a `customSecret` and other params:

  ```cpp
  __Dictionary *commonParams = __Dictionary::create();
    commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");

  __Dictionary *storeParams = __Dictionary::create();
  storeParams->setObject(__String::create("ExamplePublicKey"), "androidPublicKey");

  __Dictionary *profileParams = __Dictionary::create();

    soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);

  soomla::CCStoreService::initShared(assets, storeParams);

  soomla::CCProfileService::initShared(profileParams);

  soomla::CCLevelUpService::initShared();

  // initialWorld - should be created here and contain all worlds and levels of the game
  // rewards - should contain a list of all rewards that are given through LevelUp
  soomla::CCLevelUp::getInstance()->initialize(initialWorld, rewards);

  ```
  - *Custom Secret* is an encryption secret you provide that will be used to secure your data.

  <div class="warning-box">Choose this secret wisely, you can't change it after you launch your game!
  <br>Initialize `CCLevelUpService` ONLY ONCE when your application loads.</div>

7. Make sure to include the `Cocos2dxLevelUp.h` header whenever you use any of the **cocos2dx-levelup** functions:

    ```cpp
    #include "Cocos2dxLevelUp.h"
    ```

8. Add an instance of your event handler to `CCLevelUpEventDispatcher` after `CCLevelUpService` initialization:

    ```cpp
    soomla::CCLevelUpEventDispatcher::getInstance()->addEventHandler(handler);
    ```

<div class="info-box">The next steps are different according to which native platform you are building for.</div>

###**Instructions for iOS**

In your XCode project, perform the following steps:

1. Add `jansson` (**external/jansson/**) to your project (just add it as a source folder).

2. For each of the following XCode projects:

  - `Cocos2dXCore.xcodeproj` (**extensions/soomla-cocos2dx-core/**).  
  - `Cocos2dXStore.xcodeproj` (**extensions/cocos2dx-store/**).
  - `Cocos2dXProfile.xcodeproj` (**extensions/soomla-cocos2dx-profile/**).  
  - `Cocos2dXLevelUp.xcodeproj` (**extensions/cocos2dx-levelup/**).

  Perform the following:

    - Drag the project into your project
    - Add its targets to your **Build Phases->Target Dependencies**
    - Add the Products (\*.a) of the project to **Build Phases->Link Binary With Libraries**.

3. Add the following directories to **Build Settings->Header Search Paths** (with `recursive` option):

  NOTE: This article assumes you have a `cocos2d` folder under your project folder which either contains the Cocos2d-x framework, or links to to its root folder.

 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-profile/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-profile/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-levelup/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-levelup/build/ios/headers/**`

4. To register services on the native application (`AppController`):

  a. Import the following headers:
    ```cpp
    #import "ServiceManager.h"
    #import "StoreService.h"
    #import "ProfileService.h"
    #import "LevelUpService.h"
    ```

  b. Register the native `StoreService`, `ProfileService`, and `LevelUpService` by adding:
    ```cpp
    [[ServiceManager sharedServiceManager]
      registerService:[StoreService sharedStoreService]];

    [[ServiceManager sharedServiceManager]
      registerService:[ProfileService sharedProfileService]];

    [[ServiceManager sharedServiceManager]
      registerService:[LevelUpService sharedLevelUpService]];
    ```
    at the beginning of the method `application: didFinishLaunchingWithOptions:` of `AppController`.

5. Make sure you have these 3 Frameworks linked to your XCode project: **Security**, **libsqlite3.0.dylib**, and **StoreKit**.

6. See the last step of [cocos2dx-profile instructions for iOS](https://github.com/soomla/cocos2dx-profile#instructions-for-ios) in order to connect the Profile module to a social network provider (in this case Facebook).

That's it! Now all you have to do is build your XCode project and run your game with cocos2dx-levelup.

###**Instructions for Android**

1. Import cocos2dx-store, cocos2dx-profile, and cocos2dx-levelup module into your project's Android.mk by adding the following:

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
    ```

2. Add the following jars to your android project's classpath:

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

5. Update your `AndroidManifest.xml` to include permissions and the `SoomlaApp`:

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

6. See the last step in [cocos2dx-store instructions for Android](https://github.com/soomla/cocos2dx-store#instructions-for-android) in order to connect the Store module to the desired billing service.

7. See the last step in [cocos2dx-profile instructions for Android](https://github.com/soomla/cocos2dx-profile#instructions-for-android) in order to connect the Profile module to a social network provider (in this case Facebook).

That's it! Don't forget to run the **build_native.py** script so cocos2dx-levelup sources will be built with cocos2d-x.

###SOOMLA's cocos2dx-store Integration

Please follow the steps in [cocos2dx-store](https://github.com/soomla/cocos2dx-store) for the _Store_ part of the setup.
Then, you can use the **store-related _LevelUp_ classes**, such as _CCVirtualItemScore_ or _CCVirtualItemReward_ or _CCBalanceGate_.

###SOOMLA's cocos2dx-profile Integration

Please follow the steps in [cocos2dx-profile](https://github.com/soomla/cocos2dx-profile) for the _Profile_ part of the setup.
Then, you can use the **profile-related _LevelUp_ classes**, such as _CCSocialLikeMission_.



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

soomla::CCHighwayService::initShared(__String::create("YOUR MASTER KEY"));
```
