---
layout: "content"
image: "Tutorial"
title: "GROW: Getting Started (Store only)"
text: "Using cocos2dx-store already? Drop in one more package to seamlessly connect your game to GROW open analytics."
position: 12
theme: 'platforms'
collection: 'cocos2dx_grow'
module: 'grow'
platform: 'cocos2dx'
---

#GROW: Getting Started (Store only)

<div class="info-box">This tutorial is for developers who want to use SOOMLA Store and Grow (without using the other modules, Profile and LevelUp). If you already have Store, skip the store & core-related steps, and follow only the highway-related ones.</div>

##Integrate STORE & GROW

Get started with SOOMLA's Grow. Go to the [GROW dashboard](http://dashboard.soom.la) and sign up \ login. Upon logging in, you will be directed to the main page of the dashboard. On the left side panel, you can click on "Demo Game" in order to know what to expect to see once you start using Grow.

<div class="info-box">If you didn't already, clone the Cocos2d-x framework from [here](https://github.com/cocos2d/cocos2d-x), or download it from the [Cocos2d-x website](http://www.cocos2d-x.org/download). Make sure the version you clone is supported by SOOMLA's modules (the tag is the version).</div>

1. Click on the right pointing arrow next to "Demo Game" > "Add New App" and fill in the required fields.

  ![alt text](/img/tutorial_img/unity_grow/addNewApp.png "Add new app")

2. Clone [soomla-cocos2dx-core](https://github.com/soomla/soomla-cocos2dx-core), [cocos2dx-store](](https://github.com/soomla/cocos2dx-store)) into the `extensions` folder located at the root of your Cocos2d-x framework.

  ```
  $ git clone git@github.com:soomla/soomla-cocos2dx-core.git extensions/soomla-cocos2dx-core

  $ git clone git@github.com:soomla/cocos2dx-store.git extensions/cocos2dx-store

  $ git clone git@github.com:soomla/cocos2dx-highway.git extensions/cocos2dx-highway
  ```

3. cocos2dx-store uses a [fork](https://github.com/vedi/jansson) of the jansson library for JSON parsing. Clone it into the `external` directory at the root of your Cocos2d-x framework.

  ```
  $ git clone git@github.com:vedi/jansson.git external/jansson
  ```

4. Create your own implementation of `CCStoreAssets` that will represent the assets in your specific game. For a brief example, refer to the example below. For a complete example refer to [cocos2dx-store-example](https://github.com/soomla/cocos2dx-store-example/blob/master/Classes/MuffinRushAssets.cpp).

5. Implement your `CCStoreEventHandler` in order to be notified about in-app purchase related events. Refer to the [Event Handling](/cocos2dx/store/Store_Events) section for more information.

6. Make sure to include the `Cocos2dxStore.h` header whenever you use any of the *cocos2dx-store* functions:

    ```cpp
    #include "Cocos2dxStore.h"
    ```

7. Add an instance of your event handler to `CCStoreEventDispatcher` after `CCStoreService` initialization:

    ```cpp
    soomla::CCStoreEventDispatcher::getInstance()->addEventHandler(handler);
    ```

8. In your `AppDelegate.cpp` include `Cocos2dxHighway.h`:

    ```cpp
    #include "Cocos2dxHighway.h"
    ```

9. Initialize `CCHighwayService` with the "Game Key" and "Env Key" given to you in the [dashboard](http://dashboard.soom.la).

  ![alt text](/img/tutorial_img/cocos_grow/dashboardKeys.png "Keys")

  ``` cpp
  soomla::CCSoomlaHighway::initShared(__String::create("yourGameKey"), __String::create("yourEnvKey"));
  ```

10. Initialize `CCServiceManager`, `CCStoreService`, `CCStoreAssets` (the the class you just created), a `customSecret` and other params.

  - **Custom Secret** is an encryption secret you provide that will be used to secure your data. **NOTE:** Choose this secret wisely, you can't change it after you launch your game!

  - **Android Public Key** - is the public key given to you from Google. (iOS doesn't have a public key).

  ``` cpp
  __Dictionary *commonParams = __Dictionary::create();
  commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");

  __Dictionary *storeParams = __Dictionary::create();
  storeParams->setObject(__String::create("ExamplePublicKey"), "androidPublicKey");

  soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);

  soomla::CCStoreService::initShared(assets, storeParams);
  ```

11. Once your app is running, you can go back to the [GROW dashboard](http://dashboard.soom.la) to verify the integration. Just refresh the page, and the environments tab should appear (be patient, this step can take a few minutes).

  ![alt text](/img/tutorial_img/unity_grow/verifyIntegration.png "Verify Integration")


<br>
<div class="info-box">The next steps are different according to which native platform you are building for.</div>

###**Instructions for iOS**

In your XCode project, perform the following steps:

1. Add `jansson` (**external/jansson/**) to your project (just add it as a source folder).

2. For each of the following XCode projects:

  - `Cocos2dXHighway.xcodeproj` (**extensions/cocos2dx-highway/**)
  - `Cocos2dXCore.xcodeproj` (**extensions/soomla-cocos2dx-core/**)  
  - `Cocos2dXStore.xcodeproj` (**extensions/cocos2dx-store/**)

  perform the following:

    - Drag the project into your project
    - Add its targets to your **Build Phases->Target Dependencies**
    - Add the Products (\*.a) of the project to **Build Phases->Link Binary With Libraries**.

3. Add the following directories to **Build Settings->Header Search Paths** (with the `recursive` option):

  NOTE: This article assumes you have a `cocos2d` folder under your project folder which either contains the Cocos2d-x framework, or links to to its root folder.

  - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-highway/Soomla`
  - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-highway/build/ios/headers`
  - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/Soomla`
  - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/build/ios/headers`
  - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/Soomla`
  - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/build/ios/headers`

4. To register services on the native application (`AppController`):

  a. Import the following headers:
    ```cpp
    #import "ServiceManager.h"
    #import "Cocos2dXSoomlaHighway.h"
    #import "StoreService.h"
    ```

  b. Register the native `Cocos2dXSoomlaHighway`, `StoreService`, `ProfileService`, and `LevelUpService` by adding:

    ```cpp
    [[ServiceManager sharedServiceManager]
      registerService:[Cocos2dXSoomlaHighway sharedCocos2dXSoomlaHighway]];

    [[ServiceManager sharedServiceManager]
      registerService:[Cocos2dXSoomlaHighway sharedCocos2dXSoomlaHighway]];

    [[ServiceManager sharedServiceManager]
      registerService:[StoreService sharedStoreService]];
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

That's it! Now all you have to do is build your XCode project and run your game.

###**Instructions for Android**

1. Import cocos2dx-highway, cocos2dx-store, cocos2dx-profile, and cocos2dx-levelup module into your project's Android.mk by adding the following:

    ```
    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_highway_static
    # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-highway)
    # add this line at the end of the file, along with the other import-module calls

    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_store_static
    # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-store)
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

  - [Google Play](/cocos2dx/store/Store_GettingStarted#google-play)

  - [Amazon Appstore](/cocos2dx/store/Store_GettingStarted#amazon-appstore)

That's it! Don't forget to run the **build_native.py** script so that SOOMLA sources will be built with cocos2d-x.

##Example

Below is a short example of how to initialize SOOMLA's modules. We suggest you read about the different modules and their entities in SOOMLA's [Knowledge Base](/cocos2dx).

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
soomla::CCHighwayService::initShared(__String::create("YOUR MASTER KEY"));


ExampleAssets *assets = MuffinRushAssets::create();

__Dictionary *commonParams = __Dictionary::create();
commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");

__Dictionary *storeParams = __Dictionary::create();
storeParams->setObject(__String::create("ExamplePublicKey"), "androidPublicKey");

__Dictionary *profileParams = __Dictionary::create();

soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);

soomla::CCStoreService::initShared(assets, storeParams);
```
