---
layout: "content"
image: "Tutorial"
title: "Getting Started (Store only)"
text: "Using unity3d-store already? Drop in one more package to seamlessly connect your game to GROW open analytics."
position: 2
theme: 'platforms'
collection: 'unity_grow'
module: 'grow'
platform: 'unity'
---

#Getting Started (Store only)

<div class="info-box">This tutorial is for developers who already have unity3d-store imported in their project. Please verify that your SOOMLA version is at least 1.5. Otherwise more actions will be required to remove the old version prior to installing the new one.</div>

##Setup GROW

Go to the [Grow dashboard](http://dashboard.soom.la). Upon signing up, you will be directed to the main page of the dashboard. On the left side panel, you can click on "Demo Game" in order to know what to expect to see once you start using Grow.

1. Click on "Demo Game" > "Add New App" and fill in the required fields.

	![alt text](/img/tutorial_img/unity_grow/addNewApp.png "Add new app")

2. Download the Core, Store and Highway packages in the links below and import them into Unity (by double-clicking on the downloaded packages). **Note** that this will override your existing SOOMLA installation - this is expected.

	- [unity3d-core](http://library.soom.la/fetch/unity3d-core/latest)

	- [unity3d-store](http://library.soom.la/fetch/unity3d-store/latest)

	- [unity3d-highway](http://library.soom.la/fetch/unity3d-highway/latest)

3. Drag the `CoreEvents` & `StoreEvents` Prefabs from `../Assets/Soomla/Prefabs` into your scene. You should see them listed in the "Hierarchy" panel.

	![alt text](/img/tutorial_img/unity_grow/prefabsStoreOnly.png "Prefabs")

4. In the menu bar go to **Window > Soomla > Edit Settings**:

	![alt text](/img/tutorial_img/unity_grow/soomlaSettings.png "SOOMLA Settings")

	a. **Change the value for "Soomla Secret"**: "Soomla Secret" is an encryption secret you provide that will be used to secure your data. **NOTE:** Choose this secret wisely, you can't change it after you launch your game!

	<div class="info-box">If you're already using earlier versions of SOOMLA, make sure that you use the same secret. Changing secrets can cause your users to lose their balances.</div>

	b. **Copy the "Game Key" and "Environment Key"** given to you from the [dashboard](http://dashboard.soom.la) into the fields in the settings pane of the Unity Editor. At this point, you're probably testing your integration and you want to use the **Sandbox** environment key.

	Explanation: The "game" and "env" keys allow for your game to distinguish multiple environments for the same game. The dashboard pre-generates two fixed environments for your game: **Production** and **Sandbox**. When you decide to publish your game, make sure to switch the env key to **Production**.  You can always generate more environments.  For example - you can choose to have a playground environment for your game's beta testers which will be isolated from your production environment and will thus prevent analytics data from being mixed between the two.  Another best practice is to have a separate environment for each version of your game.

	![alt text](/img/tutorial_img/unity_grow/dashboardKeys.png "Game key and Env key")

	c. If you're building for Android, click on the "Android Settings" option, and choose your billing provider. If you choose Google Play, you need to provide the Public Key, which is given to you from Google.

	d. If you're building for iOS, it is highly recommended to enforce receipt validation which is done by our complimentary validation service. Just click the "Receipt Validation" option under "iOS Build Settings"

5. Initialize Highway:

	``` cs
	using Soomla.Highway;

	// Make sure to make this call in your earlieast loading scene,
	// and before initializing any other SOOMLA components
	// i.e. before SoomlaStore.Initialize(...)
	SoomlaHighway.Initialize();
	```

6. Build your app to a target platform (either iOS or Android) and run it once on a device.  Once your app is running, you can go back to the SOOMLA [dashboard](http://dashboard.soom.la) to verify the integration. Just refresh the page, and the active users and game events should appear.

	![alt text](/img/tutorial_img/unity_grow/verifyIntegration.png "Verify Integration")

##Setup Store

<div class="info-box">If you already had unity3d-store installed, and you already had an economy implemented (by implementing `IStoreAssets`) then you've successfully completed the Grow integration and you can skip the rest of this document.</div>

If this is your first time using the store module, we suggest you read about the different modules and their entities in SOOMLA's Knowledge Base: [Store](/docs/platforms/unity/EconomyModel), [Profile](/docs/platforms/unity/Levelup_Model), and [LevelUp](/docs/platforms/unity/Profile_MainClasses).
Below is a short example of how to implement an economy with SOOMLA's store module, which is the basic building block for using the GROW analytics dashboard.  This example isn't complete, but should give you a general idea of what you need to do.

###IStoreAssets

``` cs
public class ExampleAssets : IStoreAssets{

	/** Virtual Currencies **/
	public static VirtualCurrency COIN_CURRENCY = new VirtualCurrency(
	      "Coin currency",                  // Name
	      "Collect coins to buy items",     // Description
	      "currency_coin"                   // Item ID
	 );

    /** Virtual Currency Packs **/
    public static VirtualCurrencyPack TEN_COIN_PACK = new VirtualCurrencyPack(
        "10 Coins",                         // Name
	    "This is a 10-coin pack",           // Description
	    "coins_10",                         // Item ID
        10,                                 // Number of currencies in the pack
        "currency_coin",                    // The currency associated with this pack
        new PurchaseWithMarket(             // Purchase type
            TEN_COIN_PACK_PRODUCT_ID,       // Product ID
            0.99)                           // Initial price
    );

    /** Virtual Goods **/

    // Shield that can be purchased for 150 coins.
    public static VirtualGood SHIELD_GOOD = new SingleUseVG(
        "Shield",                           // Name
	    "Shields you from monsters",        // Description
	    "shield_good",                      // Item ID
        new PurchaseWithVirtualItem(        // Purchase type
            "currency_coin",                // Virtual item to pay with
            150)                            // Payment amount
    );

    // Pack of 5 shields that can be purchased for $2.99.
    public static VirtualGood 5_SHIELD_GOOD = new SingleUsePackVG(
        "5 Shields",                        // Name
	    "This is a 5-shield pack",          // Description
	    "shield_5",                         // Item ID
        new PurchaseWithMarket(             // Purchase type
            SHIELD_PACK_PRODUCT_ID,         // Product ID
            2.99)                           // Initial price
    );

    ...
}
```

<br>
###Initialization

``` cs
public class ExampleWindow : MonoBehaviour {

	// Initialize
	void Start () {
		...
		SoomlaHighway.Initialize ();
		SoomlaStore.Initialize(new ExampleAssets());
	}
}
```
