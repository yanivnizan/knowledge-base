---
layout: "content"
image: "Tutorial"
title: "Getting Started & In-app Billing"
text: "Get started with unity3d-store. Here you can find a basic example of initialization, economy framework integration, and links to downloads and IAP setup."
position: 1
theme: 'platforms'
collection: 'platforms_unity'
---

#**Getting Started**

##Integrate unity3d-store

1. Either download or clone unity3d-store from SOOMLA's github page.

  - Download [unity3d-store v1.5.3](http://bit.ly/1rc21Zo) and double-click on it. It'll import all the necessary files into your project.

  - OR clone the project.

  ```
  $ git clone --recursive git@github.com:soomla/unity3d-store.git
  ```

2. Drag the "StoreEvents" and "CoreEvents" Prefabs from `../Assets/Soomla/Prefabs` into your scene. You should see them listed in the "Hierarchy" panel.

  ![alt text](/img/tutorial_img/unity_getting_started/hierarchyPanel.png "Hierarchy")

3. On the menu bar click "Window" > "Soomla" > "Edit Settings" and change the values for "Soomla Secret" and "Public Key":

  - **Soomla Secret** - This is an encryption secret you provide that will be used to secure your data. (If you used versions before v1.5.2 this secret MUST be the same as Custom Secret)

  - **Public Key** - If your billing service provider is Google Play, you'll need to insert the public key given to you from Google. (Learn more in step 4 [here](/docs/platforms/android/GooglePlayIAB)). **Choose both secrets wisely. You can't change them after you launch your game!**

  ![alt text](/img/tutorial_img/unity_getting_started/soomlaSettings.png "Soomla Settings")

4. Create your own implementation of `IStoreAssets` in order to describe your game's specific assets.

  - For a brief example, see the [example](#example) at the bottom.

  - For a more detailed example, see our MuffinRush [example](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Examples/MuffinRush/MuffinRushAssets.cs).

5. Initialize `SoomlaStore` with the class you just created:

    ``` cs
    SoomlaStore.Initialize(new YourStoreAssetsImplementation());
    ```

    Initialize SoomlaStore in the `Start` function of `MonoBehaviour` and NOT in the `Awake` function. SOOMLA has its own `MonoBehaviour` and it needs to be "Awakened" before you initialize.

    <div class="warning-box">Initialize SoomlaStore ONLY ONCE when your application loads.</div>

5. You'll need an event handler in order to be notified about in-app purchasing related events. Refer to the [Event Handling](/docs/platforms/unity3d/Events) section for more information.

That's it! You now have storage and in-app purchasing capabilities ALL-IN-ONE!

###Unity & Android

**Starting IAB Service in background**

If you have your own storefront implemented inside your game, it's recommended that you open the IAB Service in the background when the store opens and close it when the store is closed.

``` cs
// Start Iab Service
SoomlaStore.StartIabServiceInBg();

// Stop Iab Service
SoomlaStore.StopIabServiceInBg();
```

This is not mandatory, your game will work without this, but we do recommend it because it enhances performance. The idea here is to preemptively start the in-app billing setup process with Google's (or Amazon's) servers.

In many games the user has to navigate into the in-game store, or start a game session in order to reach the point of making purchases. You want the user experience to be fast and smooth and prevent any lag that could be caused by network latency and setup routines you could have done silently in the background.


## Example

``` cs
//Create your implementation of IStoreAssets
public class ExampleAssets : IStoreAssets{
    ...

    /** Virtual Currencies **/
    public static VirtualCurrency COIN_CURRENCY = new VirtualCurrency(
        ...
        "currency_coin"                     // item id
  );

    /** Virtual Currency Packs **/
    public static VirtualCurrencyPack TEN_COIN_PACK = new VirtualCurrencyPack(
        ...
        10,                                 // number of currencies in the pack
        "currency_coin",                    // the currency associated with this pack
        new PurchaseWithMarket(             // purchase type
            TEN_COIN_PACK_PRODUCT_ID,       // product ID
            0.99)                           // initial price
    );

    /** Virtual Goods **/

    // Shield that can be purchased for 150 coins.
    public static VirtualGood SHIELD_GOOD = new SingleUseVG(
        ...
        new PurchaseWithVirtualItem(        // purchase type
            "currency_coin",                // virtual item to pay with
            150)                            // payment amount
    );

    // Pack of 5 shields that can be purchased for $2.99.
    public static VirtualGood 5_SHIELD_GOOD = new SingleUsePackVG(
        ...
        new PurchaseWithMarket(             // purchase type
            SHIELD_PACK_PRODUCT_ID,         // product ID
            2.99)                           // initial price
    );

    ...
}

// Initialize SoomlaStore
public class ExampleWindow : MonoBehaviour {
    ...
    void Start () {
    ...
    SoomlaStore.Initialize(new ExampleAssets());
    ...
  }
}
```

##In-app Billing

SOOMLA's unity3d-store knows how to contact Google Play, Amazon Appstore, or Apple App Store for you and will redirect your users to their purchasing system to complete the transaction.

###Android

Define your economy in Google Play or Amazon Appstore.

See our tutorials:

- [Google Play](/docs/platforms/android/GooglePlayIAB)
- [Amazon Appstore](/docs/platforms/android/AmazonIAB)

###iOS

Define your economy in the App Store.

See our tutorial: [App Store](/docs/platforms/ios/AppStoreIAB)
