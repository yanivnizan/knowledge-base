---
layout: "content"
image: "Tutorial"
title: "Getting Started"
text: "Explanation of how to get started with android-store. Here you can find a basic example of initialization, store framework integration, and links to downloads and IAP setup."
position: 1
theme: 'platforms'
collection: 'platforms_android'
---

#**Getting Started**

Before doing anything, SOOMLA recommends that you go through [Android In-app Billing](http://developer.android.com/guide/google/play/billing/index.html) or [Amazon In App Purchasing](https://developer.amazon.com/public/apis/earn/in-app-purchasing).

##Get android-store

###With sources

1. Clone android-store. Copy all files from android-store/SoomlaAndroidStore subfolders to their equivalent folders in your Android project:

     `git clone git@github.com:soomla/android-store.git`

2. Make the following changes to your AndroidManifest.xml:

      Set `SoomlaApp` as the main Application by placing it in the `application` tag:

    ``` xml
    <application ...
        android:name="com.soomla.store.SoomlaApp">
    ```

3. Change the value of `StoreConfig.SOOM_SEC` to a secret of your choice. Do this now!
   **You can't change this value after you publish your game!**

4. Create your own implementation of *IStoreAssets* in order to describe your specific game's assets ([example](https://github.com/soomla/android-store/blob/master/SoomlaAndroidExample/src/com/soomla/example/MuffinRushAssets.java)). Initialize *StoreController* with the class you just created:

    ``` java
    StoreController.getInstance().initialize(new YourStoreAssetsImplementation(), "[YOUR CUSTOM GAME SECRET HERE]");
    ```

    > The custom secret is your encryption secret for data saved in the DB. This secret is NOT the secret from step 3 (select a different value).
    >
    > Initialize `StoreController` ONLY ONCE when your application loads.

5. Refer to the [next section](#whats-next-select-a-billing-service) for information on selecting your Billing Service and setting it up.

And that's it ! You have storage and in-app purchasing capabilities... ALL-IN-ONE.

###With jars

 1. Download the .jar file from our downloads page.
 2. Add the .jar file to your libs directory
 3. In Android Studio, add the .jar file as a dependency to your project:

  - Click on the “Project Structure” icon in Android Studio.
  - In the left side navigation bar click on the Modules tab. Then click on the Dependencies tab at the top.
  - Click the “+” button at the bottom of the screen and choose “Jars and directories”.
  - Find and add the relevant jar file.

    ![alt text](/img/tutorial_img/android_getting_started/1.png "android-store with jars")

##What's next? Select a Billing Service

android-store can be used on all Android based devices meaning that you might want to use IAP with different billing services.

We've created two billing services for you: Google Play and Amazon (according to your demand).

The billing service is automatically started and stopped for every operation you're running on `StoreContoroller` (`buyWithMarket`, `restoreTransactions` ...).

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

3. After you initialize `StoreController`, let the plugin know your public key from [Google play Developer Console](https://play.google.com/apps/publish/):

  ``` java
      GooglePlayIabService.getInstance().setPublicKey("[YOUR PUBLIC KEY FROM THE MARKET]");
  ```


4. If you want to allow the test purchases, all you need to do is tell that to the plugin:

  ``` java
      GooglePlayIabService.AllowAndroidTestPurchases = true;
  ```

For Google Play, we recommend that you open the IAB Service and keep it open in the background in cases where you have an in-game storefront. This is how you do that:

When you open the store, call:  
``` java
StoreController.getInstance().startIabServiceInBg();
```

When the store is closed, call:  
``` java
StoreController.getInstance().stopIabServiceInBg();
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
            TEN_COIN_PACK_PRODUCT_ID,       // product id
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
            SHIELD_PACK_PRODUCT_ID,         // product id
            2.99)                           // initial price
    );

    ...
}

// Initialize StoreController
public class StoreExampleActivity extends Activity {
    ...

    protected void onCreate(Bundle savedInstanceState) {
        ...

        IStoreAssets storeAssets = new ExampleStoreAssets();

        // This value is a secret of your choice. You can't change it after you publish your game.
        StoreController.getInstance().initialize(storeAssets, "[CUSTOM SECRET HERE]");

        /** The following are relevant only if your Billing Provider is Google Play **/

        // When you create your app in Google play Developer Console, you'll find this key under the "Services & APIs" tab.
        GooglePlayIabService.getInstance().setPublicKey("[YOUR PUBLIC KEY FROM THE MARKET]");

        GooglePlayIabService.AllowAndroidTestPurchases = true;
    }

    ...
}
```
