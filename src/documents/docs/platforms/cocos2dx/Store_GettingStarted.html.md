---
layout: "content"
image: "Tutorial"
title: "STORE: Getting Started"
text: "Get started with cocos2dx-store. Here you can find a basic example of initialization, economy framework integration, and links to downloads and IAP setup."
position: 1
theme: 'platforms'
collection: 'platforms_cocos2dx'
---

#STORE: Getting Started

##Integrate cocos2dx-store

###With pre-built libraries

*If you want to develop with sources, refer to the "Working with Sources" section below.*

<div class="info-box">If you didn't already, clone the Cocos2d-x framework from [here](https://github.com/cocos2d/cocos2d-x), or download it from the [Cocos2d-x website](http://www.cocos2d-x.org/download). Make sure the version you clone is supported by SOOMLA's cocos2dx-store (the tag is the version).</div>

1. Clone [soomla-cocos2dx-core](https://github.com/soomla/soomla-cocos2dx-core) and cocos2dx-store into the `extensions` folder located at the root of your Cocos2d-x framework.

	```
	$ git clone git@github.com:soomla/soomla-cocos2dx-core.git extensions/soomla-cocos2dx-core

  $ git clone git@github.com:soomla/cocos2dx-store.git extensions/cocos2dx-store
	```

2. cocos2dx-store uses a [fork](https://github.com/vedi/jansson) of the jansson library for JSON parsing. Clone it into the `external` directory at the root of your Cocos2d-x framework.

	```
	$ git clone git@github.com:vedi/jansson.git external/jansson
	```

3. Create your own implementation of `CCStoreAssets` that will represent the assets in your specific game. For a brief example, refer to the example below. For a complete example refer to [cocos2dx-store-example](https://github.com/soomla/cocos2dx-store-example/blob/master/Classes/MuffinRushAssets.cpp).

4. Implement your `CCStoreEventHandler` in order to be notified about in-app purchase related events. Refer to the [Event Handling](/docs/platforms/cocos2dx/Events) section for more information.

5. Initialize `CCServiceManager`, `CCStoreService`, `CCStoreAssets` (the the class you just created), a `customSecret` and other params:

	``` cpp
	__Dictionary *commonParams = __Dictionary::create();
	commonParams->setObject(__String::create("ExampleCustomSecret"), "customSecret");

  __Dictionary *storeParams = __Dictionary::create();

	soomla::CCServiceManager::getInstance()->setCommonParams(commonParams);

	storeParams->setObject(__String::create("ExamplePublicKey"), "androidPublicKey");

	soomla::CCStoreService::initShared(assets, storeParams);
	```

	- *Custom Secret* - is an encryption secret you provide that will be used to secure your data.

	- *Android Public Key* - is the public key given to you from Google. (iOS doesn't have a public key).

	<div class="warning-box">Choose the secret wisely. You can't change it after you launch your game!
	Initialize `CCStoreService` ONLY ONCE when your application loads.</div>

6. Make sure to include the `Cocos2dxStore.h` header whenever you use any of the *cocos2dx-store* functions:

    ```cpp
    #include "Cocos2dxStore.h"
    ```

7. Add an instance of your event handler to `CCStoreEventDispatcher` after `CCStoreService` initialization:

    ```cpp
    soomla::CCStoreEventDispatcher::getInstance()->addEventHandler(handler);
    ```

**The next steps are different according to which platform you're using.**

<br>

####**Instructions for iOS**

In your XCode project, perform the following steps:

1. Add `jansson` (**external/jansson/**) to your project (just add it as a source folder).

2. For each of the following XCode projects:

 * `Cocos2dXCore.xcodeproj` (**extensions/soomla-cocos2dx-core/**).

 * `Cocos2dXStore.xcodeproj` (**extensions/cocos2dx-store/**).

    a. Drag the project into your project.

    b. Add its targets to your **Build Phases->Target Dependencies**.

    c. Add its *.a files to **Build Phases->Link Binary With Libraries**.

    ![alt text](/img/tutorial_img/cocos2dx_getting_started/iOS_steps1to4.png "iOS Integration")

3. Add the following directories to **Build Settings->Header Search Paths** (with `recursive` option):
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/soomla-cocos2dx-core/build/ios/headers/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/Soomla/**`
 - `$(SRCROOT)/../cocos2d/extensions/cocos2dx-store/build/ios/headers/**`

4. Add `-ObjC` to your project **Build Settings** > **Other Linker Flags**.

5. To register services on the native application (AppController):

  a. import the following headers:

    ``` cpp
    #import "ServiceManager.h"
    #import "StoreService.h"
    ```

  b. Register the native `StoreService` by adding:

    ```cpp
    [[ServiceManager sharedServiceManager] registerService:[StoreService sharedStoreService]];
    ```

    at the begining of the method `application: didFinishLaunchingWithOptions:` of `AppController`.

6. Make sure you have these 3 Frameworks linked to your XCode project: **Security, libsqlite3.0.dylib, StoreKit**.

**That's it! Now all you have to do is build your XCode project and run your game with cocos2dx-store.**

<br>
####**Instructions for Android**

1. Import cocos2dx-store module into your project's Android.mk by adding the following:

    ``` cpp
    //Add this line along with your other LOCAL_WHOLE_STATIC_LIBRARIES
    LOCAL_WHOLE_STATIC_LIBRARIES += cocos2dx_store_static

	//Add this line at the end of the file, along with the other import-module calls
    $(call import-module, extensions/cocos2dx-store)  
    ```

2. Add the following jars to your android project's classpath:

    From `extensions/soomla-cocos2dx-core/build/android`:

    - SoomlaAndroidCore.jar
    - Cocos2dxAndroidCore.jar
    - square-otto-1.3.2.jar

  From `extensions/cocos2dx-store/build/android`:

    - SoomlaAndroidStore.jar
    - Cocos2dxAndroidStore.jar

3. In your game's main Cocos2dxActivity, call the following in the `onCreateView` method:

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

5. Update your AndroidManifest.xml to include permissions and the SoomlaApp:

    ```xml
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="com.android.vending.BILLING"/>

    <application ...
    	       android:name="com.soomla.SoomlaApp">
    	       ...
    </application>
    ```


###**Working with sources**

SOOMLA appreciates code contributions, so we try to make contributing an easy task. For those of you who want to contribute, please use our "sources environment".

To integrate cocos2dx-store into your game, follow these steps.

1. **Recursively** clone cocos2dx-core and cocos2dx-store.

    ```
    $ git clone --recursivegit@github.com:soomla/soomla-cocos2dx-core.git extensions/soomla-cocos2dx-core

    $ git clone --recursive git@github.com:soomla/cocos2dx-store.git extensions/cocos2dx-store
    ```

	**OR:** If you have already cloned the repositories, to obtain the submodules, use command:

    ```
    $ git submodule update --init --recursive
    ```

	**NOTE:** You should run this command in each repository.

2. **For iOS:** Use sourced versions of Linked projects (`extensions/soomla-cocos2dx-core/development/Cocos2dxCoreFromSources.xcodeproj`, `extensions/cocos2dx-store/development/Cocos2dxStoreFromSources.xcodeproj`)

3. **For Android:** You can use our "sourced" modules for Android Studio (or IntelliJ IDEA) (`extensions/soomla-cocos2dx-core/development/Cocos2dxCoreFromSources.iml`, `extensions/cocos2dx-store/development/Cocos2dxStoreFromSources.iml`), just include them in your project.



##**Select a Billing Service**

SOOMLA's cocos2dx-store knows how to contact Google Play, Amazon Appstore, or Apple App Store for you and will redirect your users to their purchasing system to complete the transaction.

###Google Play

1. Add `AndroidStoreGooglePlay.jar` from `extensions/cocos2dx-store/build/android/billing-services/google-play` to your classpath:

2. Update your AndroidManifest.xml:

	``` xml
	...
	<uses-permission android:name="com.android.vending.BILLING"/>

	<application ...
	    <activity android:name="com.soomla.store.billing.google.GooglePlayIabService$IabActivity"
	              android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen"/>
	    <meta-data android:name="billing.service" android:value="google.GooglePlayIabService" />
	</application>
	```

3. Read our [tutorial](/docs/platforms/android/GooglePlayIAB) on how to define your in-app products in Google Play.

4. Start IAB Service in background **(optional)**

    ``` cpp
    // Start Iab Service
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CCSoomlaStore::getInstance()->startIabServiceInBg();
    #endif

    // Stop Iab Service
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        CCSoomlaStore::getInstance()->stopIabServiceInBg();
    #endif
    ```

    This is not mandatory, your game will work without this, but we recommend it because it enhances performance. The idea here is to preemptively start the in-app billing setup process with Google's servers.

    In many games the user has to navigate into the in-game store, or start a game session in order to reach the point of making purchases. You want the user experience to be fast and smooth and prevent any lag that could be caused by network latency and setup routines you could have done silently in the background.

    <div class="info-box">Don't forget to close the Iab Service when your store is closed.</div>


###Amazon

1. Add `in-app-purchasing-1.0.3.jar` and `AndroidStoreAmazon.jar` from `extensions/cocos2dx-store/build/android/billing-services/amazon` to your classpath:

2. Update your manifest:

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

3. Read our [tutorial](/docs/platforms/android/AmazonIAB) on how to define your in-app products in the Amazon Appstore.

###Apple App Store

1. Read our [tutorial](/docs/platforms/ios/AppStoreIAB) on how to define your in-app products in the App Store.

2. Use SOOMLA's iOS Server Side Verification **(Optional)**

	As you probably know, fraud on IAP is pretty common. Hackers can crack their smartphones to think that a purchase was made when the payment isn't actually transferred to you. To help game developers with this issue, we created a verification server that you can use instantly through the framework.

	All you need to do is let cocos2dx-store know that you want to verify purchases. You can do this by passing an extra parameter to `CCSoomlaStore`:

	```cpp
	storeParams->setObject(Bool::create(true), "SSV");
	soomla::CCStoreService::initShared(assets, storeParams);
	```

**That's it! Now all you have to do is run the *build_native.sh* script and you can begin using cocos2dx-store in your game.**




##**Example**

**Create an example implementation of `CCStoreAssets`:**

Let's call it `ExampleAssets`.

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
