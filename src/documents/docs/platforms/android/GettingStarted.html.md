---
layout: "content"
image: "Tutorial"
title: "Getting Started"
text: "Get started with android-store. Here you can find a basic example of initialization, economy framework integration, and links to downloads and IAP setup."
position: 1
theme: 'platforms'
collection: 'platforms_android'
---

#**Getting Started**

Before doing anything, SOOMLA recommends that you go through [Android In-app Billing](http://developer.android.com/guide/google/play/billing/index.html) or [Amazon In App Purchasing](https://developer.amazon.com/public/apis/earn/in-app-purchasing) according to the billing service provider you choose.

##Integrate android-store

1. Add the jars from the [build](https://github.com/soomla/android-store/tree/master/build) folder to your project.

    > **NOTE:** You can choose to clone android-store instead. If you choose this option, you need to add the jars from the [build](https://github.com/soomla/android-store/tree/master/build) folder, except for AndroidStore.jar.

    > `git clone git@github.com:soomla/android-store.git`

2. Make the following changes to your AndroidManifest.xml:

    Set `SoomlaApp` as the main Application by placing it in the `application` tag:

    ``` xml
    <application ...
        android:name="com.soomla.store.SoomlaApp">
    ```

3. Initialize Soomla with a secret that you chose to encrypt the user data. (For those who came from older versions, this should be the same as the old "customSec"):

    ``` java
    Soomla.initialize("[YOUR CUSTOM GAME SECRET HERE]");
    ```

    <div class="info-box">This secret is your encryption secret for data saved in the DB.</div>

4. Create your own implementation of `IStoreAssets` in order to describe your game's specific assets.
  - See the brief [example](#example) at the bottom.
  - See a more detailed example, our MuffinRush [example](https://github.com/soomla/android-store/blob/master/SoomlaAndroidExample/src/com/soomla/example/MuffinRushAssets.java).

5. Initialize `SoomlaStore` with the class you just created:

    ``` java
    SoomlaStore.getInstance().initialize(new YourStoreAssetsImplementation());
    ```

    <div class="warning-box">Initialize `SoomlaStore` ONLY ONCE when your application loads.</div>

And that's it! You have storage and in-app purchasing capabilities... ALL-IN-ONE.

Refer to the next section for information on selecting your Billing Serviceprovider and setting it up.

##Select a Billing Service

SOOMLA's android-store can be used on all Android based devices meaning that you might want to use IAP with different billing services.

We've created two billing services for you: Google Play and Amazon (according to your demand).

The billing service is automatically started and stopped for every operation you're running on `SoomlaStore` (`buyWithMarket`, `restoreTransactions`, etc...).

Be careful with that. Don't leave the service running in the background without closing it.

You must select a billing service for android-store to work properly. The integration of a billing service is very easy:

### [Google Play](https://github.com/soomla/android-store-google-play)

Once you complete the following steps, see the [Google Play IAB](/docs/platforms/android/soomla/billing_providers/GooglePlayIAB) tutorial for information about in-app-purchase setup, integration with SOOMLA, and how to define your in-app purchase items.

1. Add `AndroidStoreGooglePlay.jar` from the folder `billing-services/google-play` to your project.

2. Make the following changes in `AndroidManifest.xml`:

  Add the following permission (for Google Play):

  ``` xml
  <uses-permission android:name="com.android.vending.BILLING" />
  ```

  Add the `IabActivity` to your `application` element, the plugin will spawn a transparent activity to make purchases. Also, you need to tell us what plugin you're using so add a meta-data tag for that:

  ``` xml
  <activity android:name="com.soomla.store.billing.google.GooglePlayIabService$IabActivity"
            android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen"/>
  <meta-data android:name="billing.service" android:value="google.GooglePlayIabService" />
  ```

3. After you initialize `SoomlaStore`, let the plugin know your public key from [Google play Developer Console](https://play.google.com/apps/publish/):

  ``` java
  public class StoreExampleActivity extends Activity {
      ...
      protected void onCreate(Bundle savedInstanceState) {
          ...
          GooglePlayIabService.getInstance().setPublicKey("[YOUR PUBLIC KEY FROM GOOGLE PLAY]");
      }
  }
  ```

4. If you want to allow Android's test purchases, all you need to do is tell that to the plugin:

  ``` java
  public class StoreExampleActivity extends Activity {
      ...
      protected void onCreate(Bundle savedInstanceState) {
          ...
          GooglePlayIabService.AllowAndroidTestPurchases = true;
      }
  }
  ```

####**If you have an in-game storefront**

We recommend that you open the IAB Service and keep it open in the background. This how to do that:

When you open the store, call:  
``` java
SoomlaStore.getInstance().startIabServiceInBg();
```

When the store is closed, call:  
``` java
SoomlaStore.getInstance().stopIabServiceInBg();
```

### [Amazon](https://github.com/soomla/android-store-amazon)

Once you complete the following steps, see the [Amazon IAB](/docs/platforms/android/soomla/billing_providers/AmazonIAB) tutorial for information about in-app-purchase setup, integration with SOOMLA, and how to define your in-app purchase items.

1. Add `in-app-purchasing-1.0.3.jar` and `AndroidStoreAmazon.jar` from the folder `billing-services/amazon` to your project.

2. Make the following changes in `AndroidManifest.xml`:

  Add Amazon's `ResponseReceiver` to your `application` element. Also, you need to tell us what plugin you're using so add a meta-data tag for that:

  ``` xml
  <receiver android:name = "com.amazon.inapp.purchasing.ResponseReceiver" >
    <intent-filter>
        <action android:name = "com.amazon.inapp.purchasing.NOTIFY"
            android:permission = "com.amazon.inapp.purchasing.Permission.NOTIFY" />
    </intent-filter>
  </receiver>
  <meta-data android:name="billing.service" android:value="amazon.AmazonIabService" />
  ```

##Example

``` java
//Create your implementation of IStoreAssets
public class ExampleStoreAssets extends IStoreAssets {
    ...

    /** Virtual Currencies **/
    public static final VirtualCurrency COIN_CURRENCY = new VirtualCurrency(
            ...
            "currency_coin"                 // item id
    );


    /** Virtual Currency Packs **/
    public static final VirtualCurrencyPack TEN_COIN_PACK = new VirtualCurrencyPack(
        ...
        10,                                 // number of currencies in the pack
        "currency_coin",                    // the currency associated with this pack
        new PurchaseWithMarket(             // purchase type
            TEN_COIN_PACK_PRODUCT_ID,       // product ID
            0.99)                           // initial price
    );

    /** Virtual Goods **/

    // Shield that can be purchased for 150 coins.
    public static final VirtualGood SHIELD_GOOD = new SingleUseVG(
        ...
        new PurchaseWithVirtualItem("currency_coin", 150)     // purchase type
    );

    // Pack of 5 shields that can be purchased for $2.99.
    public static final VirtualGood 5_SHIELD_GOOD = new SingleUsePackVG(
        ...
        new PurchaseWithMarket(             // purchase type
            SHIELD_PACK_PRODUCT_ID,         // product ID
            2.99)                           // initial price
    );

    ...
}

// Initialization
public class StoreExampleActivity extends Activity {
    ...

    protected void onCreate(Bundle savedInstanceState) {
        ...

        IStoreAssets storeAssets = new ExampleStoreAssets();

        // This value is a secret of your choice.
        // You can't change it after you publish your game.
        Soomla.initialize("[CUSTOM SECRET HERE]");
        SoomlaStore.getInstance().initialize(storeAssets);

        /** The following are relevant only if your Billing Provider is Google Play **/

        // When you create your app in Google play Developer Console,
        // you'll find this key under the "Services & APIs" tab.
        GooglePlayIabService.getInstance().setPublicKey("[YOUR PUBLIC KEY FROM THE MARKET]");
        GooglePlayIabService.AllowAndroidTestPurchases = true;
        ...
    }

    ...
}
```
