---
layout: "content"
image: "Tutorial"
title: "STORE: Getting Started"
text: "Get started with unity3d-store. Here you can find a basic example of initialization, economy framework integration, and links to downloads and IAP setup."
position: 1
theme: 'platforms'
collection: 'platforms_unity'
---

#STORE: Getting Started

##Integrate unity3d-store

1. First, you'll need to either download (RECOMMENDED) the unity3d-store pre-baked packages, or, if you're planning to [contribute](#contribution) code, then you should clone unity3d-store.

  - RECOMMENDED: Download [soomla-unity3d-core](https://github.com/soomla/unity3d-store/blob/master/soomla-unity3d-core.unitypackage?raw=true) and [unity3d-store v1.5.4](https://github.com/soomla/unity3d-store/blob/master/soomla-unity3d-store.unitypackage)

    OR

  - Clone unity3d-store from SOOMLA's github page.

    ```
    $ git clone --recursive git@github.com:soomla/unity3d-store.git
    ```

    <div class="info-box">There are some necessary files in submodules linked with symbolic links. If you're cloning the project make sure to include the `--recursive` flag.</div>

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

6. You'll need an event handler in order to be notified about in-app purchasing related events. Refer to the document about [Event Handling](/docs/platforms/unity/Events) for more information.

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

###Tips for running the app

- In Build Settings, when switching between one platform to another, after clicking on "Switch platform" **WAIT** until the circular motion icon at the bottom right corner of the editor disappears! Only then, click on "Build". If you click on "Build" too early you will be likely to run into problems.

- Click on "**Build**", NOT "Build & Run". SOOMLA has a post-build script that needs to run, and clicking on "Build & Run" doesn't give that script a chance.

  ![alt text](/img/tutorial_img/unity_debugging/switchPlatform.png "Tip")


##Contribution

**SOOMLA appreciates code contributions!** You are more than welcome to extend the capabilities of the SOOMLA Store module. To contribute, make sure that in step 1 of integrating unity3d-store, you cloned and did not download.

<div class="info-box">If you would like to contribute, please follow our [Documentation Guidelines](https://github.com/soomla/unity3d-store/blob/master/documentation.md). Clear, consistent comments will make our code easy to understand.</div>

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
