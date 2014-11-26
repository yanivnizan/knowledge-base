---
layout: "content"
image: "Tutorial"
title: "GROW: Getting Started (Store only)"
text: "Get started with unity3d-grow..."
position: 14
theme: 'platforms'
collection: 'platforms_unity'
---

#GROW: Getting Started (Store only)

<div class="info-box">This tutorial is for SOOMLA users who already have unity3d-store installed in their project. Please verify that your SOOMLA version is at least 1.5. Otherwise more actions will be required to remove the old version prior to installing the new one.</div>

##Getting started

Get started with SOOMLA's Grow. Go to the [Grow dashboard website](dashboard.soom.la) and sign up or login. Upon logging in, you will be directed to the main page of the dashboard. On the left side panel, you can click on "Demo Game" in order to know what to expect to see once you start using Grow.

1. Click on "Demo Game" > "Add New App" and fill in the required fields.

	![alt text](/img/tutorial_img/unity_grow/addNewApp.png "Add new app")

2. Download the packages in the links below and import them into Unity (by double-clicking on the downloaded packages). **Note** that this will override your existing SOOMLA installation; this is expected.

	- [unity3d-store](http://library.soom.la/fetch/unity3d-store/latest )

	- [unity3d-highway](http://library.soom.la/fetch/unity3d-highway/latest)

3. Drag the "CoreEvents" & "StoreEvents" Prefabs from `../Assets/Soomla/Prefabs` into your scene. You should see them listed in the "Hierarchy" panel. [This step is CRITICAL for proper setup]

	![alt text](/img/tutorial_img/unity_grow/prefabsStoreOnly.png "Prefabs")

4. In the menu bar go to **Window->Soomla->Edit Settings**:

	![alt text](/img/tutorial_img/unity_grow/soomlaSettings.png "SOOMLA Settings")

	a. **Change the value for "Soomla Secret"**: "Soomla Secret" is an encryption secret you provide that will be used to secure your data. **NOTE:** Choose this secret wisely, you can't change it after you launch your game!

	b. **Copy the "Game Key" and "Environment Key"** given to you from the [dashboard](dashboard.soom.la) into the fields in the settings pane of the Unity Editor. The "game" and "env" keys allow for your game to distinguish multiple environments for the same game. For example - you can choose to have a playground environment for your game's beta testers which will be segregated from your production environment and will thus prevent analytics data from being mixed between the two.

	![alt text](/img/tutorial_img/unity_grow/dashboardKeys.png "Game key and Env key")

	c. If you're building for Android, click on the "Android Settings" option, and choose your billing provider. If you choose Google Play, you need to provide the Public Key, which is given to you from Google.

5. Initialize Highway:

	``` cs
	using Soomla.Highway;

	// Make sure to make this call before initializing any other SOOMLA components
	SoomlaHighway.Initialize();
	```

6. Once your app is running, you can go back to the SOOMLA [dashboard](dashboard.soom.la) to verify the integration. Just refresh the page, and the environments tab should appear (be patient, this step can take a few minutes).

	![alt text](/img/tutorial_img/unity_grow/verifyIntegration.png "Verify Integration")

##Example

Below is a short example of how to initialize SOOMLA's modules. We suggest you read about the different modules and their entities in SOOMLA's Knowledge Base: [Store](/docs/platforms/unity/EconomyModel), [Profile](/docs/platforms/unity/Levelup_Model), and [LevelUp](/docs/platforms/unity/Profile_MainClasses).

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
