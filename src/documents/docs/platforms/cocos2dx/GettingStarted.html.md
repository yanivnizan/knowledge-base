---
layout: "content"
image: "Tutorial"
title: "Getting Started & In-app Billing"
text: "Get started with cocos2dx-store. Here you can find a basic example of initialization, economy framework integration, and links to downloads and IAP setup."
position: 1
theme: 'platforms'
collection: 'platforms_cocos2dx'
---

#**Getting Started (C++)**

##Integrate cocos2dx-store

1. As with all Cocos2d-x projects, you need to clone the Cocos2d-x framework from [here](https://github.com/cocos2d/cocos2d-x) or download it from the [Cocos2d-x website](http://www.cocos2d-x.org/download).  

    <div class="info-box">Make sure the version you clone is supported by SOOMLA's cocos2dx-store (the tag is the version).</div>

2. Go into your cocos2d-x project and **recursively** clone cocos2dx-core into the `extensions` directory located at the root of your Cocos2d-x framework.

    ```
    $ git clone --recursive git@github.com:soomla/cocos2dx-core.git extensions/soomla-cocos2dx-core
    ```

3. Perform the same action for cocos2dx-store.

    ```
    $ git clone --recursive git@github.com:soomla/cocos2dx-store.git extensions/cocos2dx-store
    ```

4. We use a [fork](https://github.com/vedi/jansson) of the jansson library for JSON parsing. Clone our fork into the `external` directory at the root of your framework.

    ```
    $ git clone git@github.com:vedi/jansson.git external/jansson
    ```

5. Make sure to include the `Cocos2dxStore.h` header whenever you use any of the *cocos2dx-store* functions:

    ``` cpp
    #include "Cocos2dxStore.h"
    ```

6. Create your own implementation of `CCStoreAssets` that will represent the assets in your specific game. For a brief example, refer to the [example below](#example). For a complete example refer to [cocos2dx-store-example](https://github.com/soomla/cocos2dx-store-example/blob/master/Classes/MuffinRushAssets.cpp).

7. Implement your `CCStoreEventHandler` in order to be notified about in-app purchasing related events. Refer to the [Event Handling](docs/platforms/cocos2dx/events) section for more information.

8. Initialize `CCServiceManager` with common params, setting your `customSecret` there:

    ``` cpp
    __Dictionary *commonParams = __Dictionary::create();
    commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");
    soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);
    ```

9. Initialize `CCStoreService` with your assets class (instance of `CCStoreAssets`), and a `__Dictionary` containing various parameters for it:

    ``` cpp
    __Dictionary *storeParams = __Dictionary::create();
    storeParams->setObject(__String::create("ExamplePublicKey"), "androidPublicKey");

    soomla::CCStoreService::initShared(assets, storeParams);
    ```
    - *Custom Secret* - is an encryption secret you provide that will be used to secure your data.
    - *Android Public Key* - is the public key given to you from Google. (iOS doesn't have a public key).

    **Choose the secret wisely. You can't change it after you launch your game!**

    > Initialize `CCStoreService` ONLY ONCE when your application loads.

10. Add instance of your event handler to `CCStoreEventDispatcher` after `CCStoreService` initialization:

    ``` cpp
    soomla::CCStoreEventDispatcher::getInstance()->addEventHandler(handler);
    ```

And that's it! You now have storage and in-app purchasing capabilities.

##Integrate cocos2dx-store into your project

###Instructions for iOS

If you're building your application for iOS, follow these instructions on how to integrate cocos2dx-store into your iOS project:

![alt text](/img/tutorial_img/cocos2dx_getting_started/iOS_steps1to4.png "iOS Integration")
(Image relevant for steps 1 - 4)

1. Add `Cocos2dXCore.xcodeproj` (**extensions/soomla-cocos2dx-core/**) as linked project to your project.

2. Add `Cocos2dXStore.xcodeproj` (**extensions/cocos2dx-store/**) as linked project to your project.

3. Add **targets** of these projects to **Build Phases->Target Dependencies**.

4. Add *.a of these projects to **Build Phases->Link Binary With Libraries**.

5. Add to Build Settings->Header Search Paths:
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/Soomla`
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/soomla-native/compilations/ios/headers`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/Soomla`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/soomla-native/compilations/ios/headers` with `recursive` option.

  ![alt text](/img/tutorial_img/cocos2dx_getting_started/iOS_step5.png "iOS Integration")

6. Register native StoreService, adding:

    ``` cpp
    [[ServiceManager sharedServiceManager] registerService:[StoreService sharedStoreService]];
    ```
at the begining of the method `application: didFinishLaunchingWithOptions:` of `AppController`.

<div class="info-box">Make sure you have these 3 Frameworks linked to your XCode project: Security, libsqlite3.0.dylib, StoreKit.</div>

That's it! Now all you have to do is build your XCode project and run your game with cocos2dx-store.

###Instructions for Android

If you're building your application for Android, follow these instructions on how to integrate cocos2dx-store into your Android project:

1. Import the cocos2dx-store library into your project's Android.mk by adding the following lines in their appropriate places.

    ``` cpp
    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_store_static        # add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES

    $(call import-module, extensions/cocos2dx-store/android/jni) # add this line at the end of the file, along with the other import-module calls
    ```

    ![alt text](/img/tutorial_img/cocos2dx_getting_started/Android_step1.png "Android Integration")

2. Add the following jars from the folder `extensions/cocos2dx-store/soomla-native/compilations/android` to your classpath:
    - SoomlaAndroidCore.jar
    - Cocos2dxAndroidCore.jar
    - SoomlaAndroidStore.jar
    - Cocos2dxAndroidStore.jar

3. In your main Cocos2dxActivity (The one your Cocos2d-x application runs in), call the following in the `onCreateView` method:

    ``` java
    public Cocos2dxGLSurfaceView onCreateView() {

        // initialize services
        final ServiceManager serviceManager = ServiceManager.getInstance();
        serviceManager.setActivity(this);
        serviceManager.setGlSurfaceView(glSurfaceView);
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

1. Update your manifest to include internet premission and SoomlaApp:

    ``` xml
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="com.android.vending.BILLING"/>

    <application ...
    	       android:name="com.soomla.store.SoomlaApp">
        <activity android:name="com.soomla.store.StoreController$IabActivity"
                  android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen"/>
    </application>
    ```

##Android: Select a Billing Service

###Google Play

1. Add `AndroidStoreGooglePlay.jar` from the folder `extensions/cocos2dx-store/soomla-native/compilations/android` to your classpath:

2. Update your manifest:

    ``` xml
    ...
    <uses-permission android:name="com.android.vending.BILLING"/>

    <application ...
        <activity android:name="com.soomla.store.billing.google.GooglePlayIabService$IabActivity"
                  android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen"/>
        <meta-data android:name="billing.service" android:value="google.GooglePlayIabService" />
    </application>
    ```

####**If you have an in-game storefront**

SOOMLA recommends that you open the IAB Service and keep it open in the background.

``` cpp
// Start Iab Service
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
	CCStoreController::sharedStoreController()->startIabServiceInBg();
#endif

// Stop Iab Service
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
	CCStoreController::sharedStoreController()->stopIabServiceInBg();
#endif
```

This is not mandatory, your game will work without this, but we *do* recommend it because it enhances performance. The idea here is to preemptively start the in-app billing setup process with Google's servers.

In many games the user has to navigate into the in-game store, or start a game session in order to reach the point of making purchases. You want the user experience to be fast and smooth and prevent any lag that could be caused by network latency and setup routines you could have done silently in the background.


<div class="warning-box">Don't forget to close the Iab Service when your store is closed.</div>

###Amazon Appstore

1. Add `in-app-purchasing-1.0.3.jar` and `AndroidStoreAmazon.jar` from the folder `extensions/cocos2dx-store/soomla-native/compilations/android` to your classpath:

1. Update your manifest:

    ``` xml
    ...
    <receiver android:name = "com.amazon.inapp.purchasing.ResponseReceiver" >
    <intent-filter>
        <action android:name = "com.amazon.inapp.purchasing.NOTIFY"
                android:permission = "com.amazon.inapp.purchasing.Permission.NOTIFY" />
    </intent-filter>
    </receiver>
    <meta-data android:name="billing.service" android:value="amazon.AmazonIabService" />
    ```

That's it! Now all you have to do is run the **build_native.sh** script and you can begin using cocos2dx-store in your game.

##In App Purchasing

SOOMLA provides two purchase types: `CCPurchaseWithMarket` and `CCPurchaseWithVirtualItem`.

- **CCPurchaseWithMarket** is a purchase type that allows users to purchase a `CCVirtualItem` via Google Play or the App Store.
- **CCPurchaseWithVirtualItem** is a purchase type that lets  users purchase a `CCVirtualItem` with another `CCVirtualItem`. For example: Buying a sword with 100 gems.

In order to define the way your various virtual items are purchased, you'll need to create your implementation of `CCIStoreAssets` (the same one from step 5 [above](#get-cocos2dx-store) section above).

##Example

**Create your implementation of `CCIStoreAssets`**

In this example we'll call it ExampleAssets.

``` cpp
#define COIN_CURRENCY_ITEM_ID "coin_currency"
#define TEN_COIN_PACK_ITEM_ID "ten_coin_pack"
#define TEN_COIN_PACK_PRODUCT_ID "10_coins_pack"

/** Virtual Currencies **/
CCVirtualCurrency *COIN_CURRENCY = CCVirtualCurrency::create(
	String::create("COIN_CURRECY"),                             // name
	String::create(""),                                         // description
	String::create(COIN_CURRENCY_ITEM_ID)                       // item ID
);

/** Virtual Currency Packs **/
CCVirtualCurrencyPack *TEN_COIN_PACK = CCVirtualCurrencyPack::create(
	String::create("10 Coins"),                                 // name
	String::create("A pack of 10 coins"),                       // description
	String::create(TEN_COIN_PACK_ITEM_ID),                      // item ID
	Integer::create(10),                                        // number of currency units in this pack
	String::create(COIN_CURRENCY_ITEM_ID),                      // ID of the currency associated with this pack
	CCPurchaseWithMarket::create(String::create(                // purchase type
	    TEN_COIN_PACK_PRODUCT_ID),                              // ID as defined in the Market
	    Double::create(0.99))                                   // amount
);

/** Virtual Goods **/

CCVirtualGood *shieldGood = CCSingleUseVG::create(
    CCString::create("Shield"),                                 // name
    CCString::create("Defend yourself!"),                       // description
    CCString::create("shield_good"),                            // item ID
    CCPurchaseWithVirtualItem::create(CCString::create(         // purchase type
        COIN_CURRENCY_ITEM_ID),                                 // currency
        CCInteger::create(50))                                  // price
);

CCVirtualGood *tenShieldGoods = CCSingleUsePackVG::create(
    CCString::create("shield_good"),                            // ID of the Single Use item associated with this Pack
    CCInteger::create(10),                                      // number of items in the Pack
    CCString::create("10 Shields"),                             // name
    CCString::create("Defend yourself!"),                       // description
    CCString::create("shield_good_10"),                         // item ID
    CCPurchaseWithVirtualItem::create(CCString::create(         // purchase type
        COIN_CURRENCY_ITEM_ID),                                 // currency
        CCInteger::create(300)));                               // price
```

**Initialize SOOMLA SDK**
In `AppDelegate.cpp`:
``` cpp
#include "ExampleAssets.h"

bool AppDelegate::applicationDidFinishLaunching() {
    __Dictionary *commonParams = __Dictionary::create();
    commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");

    soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);

    ExampleAssets *assets = ExampleAssets::create();

    __Dictionary *storeParams = __Dictionary::create();
    storeParams->setObject(__String::create("ExamplePublicKey"), "androidPublicKey");

    soomla::CCStoreService::initShared(assets, storeParams);
    ...
}
```

And that's it! cocos2dx-store knows how to contact Google Play or the App Store for you and will redirect your users to the purchasing system to complete the transaction. Don't forget to subscribe to store events in order to get notified of successful or failed purchases (see [Event Handling](https://github.com/soomla/cocos2dx-store#event-handling)).


##In-app Billing

SOOMLA's cocos2dx-store knows how to contact Google Play, Amazon Appstore, or Apple App Store for you and will redirect your users to their purchasing system to complete the transaction.

###Android

Define your economy in Google Play or Amazon Appstore.

See our tutorials:

- [Google Play](/docs/platforms/android/GooglePlayIAB)
- [Amazon Appstore](/docs/platforms/android/AmazonIAB)

###iOS

Define your economy in the App Store.

See our tutorial: [App Store](/docs/platforms/ios/AppStoreIAB)
