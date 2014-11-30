---
layout: "content"
image: "Tutorial"
title: "Getting Started"
text: "Get started with GROW open analytics for Unity. Includes all of SOOMLA's modules: Core, Store, Profile, LevelUp, and Highway. Learn how to easily integrate all that SOOMLA offers into your game."
position: 1
theme: 'platforms'
collection: 'unity_grow'
module: 'grow'
platform: 'unity'
---

#Getting Started

##Overview

Soomla GROW is our flagship community driven analytics dashboard.  Developers using GROW can gain valuable insights about their games' performance and compare the data to benchmarks of other games in the GROW community.

**Note:** GROW analytics use all of Soomla's modules: Store, Profile and LevelUp. This document describes how to incorporate all of these modules as part of the setup.  You may choose to use only specific modules, however, to benefit from the full power of GROW analytics we recommend that you integrate Store, Profile and LevelUp.

##Setup GROW

Go to the [GROW dashboard](http://dashboard.soom.la) and sign up \ login. Upon logging in, you will be directed to the main page of the dashboard. On the left side panel, you can click on "Demo Game" in order to know what to expect to see once you start using Grow.

1. Click on the right pointing arrow next to "Demo Game" > "Add New App" and fill in the required fields.

	  ![alt text](/img/tutorial_img/unity_grow/addNewApp.png "Add new app")

2. Go to the "Download" window on the left side-panel, or click [here](http://dashboard.soom.la/downloads), and choose "Unity". Download the **GROW Bundle**. (NOTE: The "SOOMLA Bundle" contains the modules Store, Profile, & LevelUp, but does not contain Highway, meaning that it doesn't enable you to share data and participate in the data sharing community.)

3. Double-click on the downloaded Unity package, it'll import all the necessary files into your Unity project.

	![alt text](/img/tutorial_img/unity_grow/import.png "import")

4. Open your earliest loading scene.  Drag the `CoreEvents`, `StoreEvents`, `ProfileEvents` and `LevelUpEvents` Prefabs from `Assets/Soomla/Prefabs` into the scene. You should see them listed in the "Hierarchy" panel.

	![alt text](/img/tutorial_img/unity_grow/prefabs.png "Prefabs")

5. In the menu bar go to **Window > Soomla > Edit Settings**:

	![alt text](/img/tutorial_img/unity_grow/soomlaSettingsAll.png "SOOMLA Settings")

	a. **Change the value for "Soomla Secret"**: "Soomla Secret" is an encryption secret you provide that will be used to secure your data. **NOTE:** Choose this secret wisely, you can't change it after you launch your game!

	<div class="info-box">If you're already using earlier versions of SOOMLA, make sure that you use the same secret. Changing secrets can cause your users to lose their balances.</div>

	b. **Copy the "Game Key" and "Environment Key"** given to you from the [dashboard](http://dashboard.soom.la) into the fields in the settings pane of the Unity Editor. At this point, you're probably testing your integration and you want to use the **Sandbox** environment key.

	Explanation: The "game" and "env" keys allow for your game to distinguish multiple environments for the same game. The dashboard pre-generates two fixed environments for your game: **Production** and **Sandbox**. When you decide to publish your game, make sure to switch the env key to **Production**.  You can always generate more environments.  For example - you can choose to have a playground environment for your game's beta testers which will be isolated from your production environment and will thus prevent analytics data from being mixed between the two.  Another best practice is to have a separate environment for each version of your game.

	![alt text](/img/tutorial_img/unity_grow/dashboardKeys.png "Game key and Env key")

	c. **Choose your social platform** by toggling Facebook, twitter or Google in the settings. Follow the directions for integrating [Facebook](/unity/profile/Profile_GettingStarted#facebook), [Twitter](/unity/profile/Profile_GettingStarted#twitter) or [Google+](/unity/profile/Profile_GettingStarted#google-).

	d. If you're building for Android, click on the "Android Settings" option, and choose your billing provider. If you choose Google Play, you need to provide the Public Key, which is given to you from Google.

	e. If you're building for iOS, it is highly recommended to enforce receipt validation which is done by our complimentary validation service. Just click the "Receipt Validation" option under "iOS Build Settings"

6. Initialize Highway:

	``` cs
	using Soomla.Highway;

	// Make sure to make this call in your earlieast loading scene,
	// and before initializing any other SOOMLA components
	// i.e. before SoomlaStore.Initialize(...)
	SoomlaHighway.Initialize();
	```

7. Initialize the rest of the modules: Store, Profile & LevelUp (**AFTER** the initialization of Highway).

	<div class="info-box">Make sure to initialize each module ONLY ONCE when your application loads, in the `Start()` function of a `MonoBehaviour` and **NOT** in the `Awake()` function. SOOMLA has its own `MonoBehaviour` and it needs to be "Awakened" before you initialize.</div>

	a. **Initialize STORE:** Create your own implementation of `IStoreAssets` in order to describe your specific game's assets ([example](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Examples/MuffinRush/MuffinRushAssets.cs)). Initialize SoomlaStore with the class you just created:

	``` cs
	SoomlaStore.Initialize(new YourStoreAssetsImplementation());
	```

	b. **Initialize PROFILE:**

    **NOTE:** SoomlaProfile will initialize the social providers for you. Do NOT initialize them on your own (for example, don't call `FB.Init()`).

	``` cs
	SoomlaProfile.Initialize();
	```

	c. **Initialize LEVELUP:** Create your own _Initial World_ which should contain the entire 'blueprint' of the game (see [Model Overview](/unity/levelup/Levelup_Model)). Initialize _LevelUp_ with the world you just created:

  ``` cs
  SoomlaLevelUp.Initialize(initialWorld);
  ```

8. You'll need to create event handler functions in order to be notified about (and handle) SOOMLA-related events. Refer to the following sections for more information:
	- [Store Event Handling](/unity/store/Store_Events)
	- [Profile Event Handling](/unity/profile/Profile_Events)
	- [LevelUp Event Handling](/unity/levelup/Levelup_Events)

9. Once your app is running, you can go back to the [GROW dashboard](http://dashboard.soom.la) to verify the integration. Just refresh the page, and the environments tab should appear (be patient, this step can take a few minutes).

	![alt text](/img/tutorial_img/unity_grow/verifyIntegration.png "Verify Integration")

And that's it! You have in-app purchasing, social engagement, and game architecture capabilities at your fingertips.

##Example

Below is a short example of how to initialize SOOMLA's modules. We suggest you read about the different modules and their entities in SOOMLA's Knowledge Base: [Store](/unity/store/Store_Model), [Profile](/unity/profile/Profile_MainClasses), and [LevelUp](/unity/levelup/Levelup_Model).

###IStoreAssets

``` cs
public class ExampleAssets : IStoreAssets {

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
using Soomla;
using Soomla.Store;
using Soomla.Profile;
using Soomla.Levelup;
using Soomla.Highway;
...


public class ExampleWindow : MonoBehaviour {

	//
	// Utility method for creating the game's worlds
	// and levels hierarchy
	//
	private World createMainWorld() {
		World worldA = new World("world_a");
		World worldB = new World("world_b");

		Reward coinReward = new VirtualItemReward(
			"coinReward",                       // ID
			"100 Coins",                        // Name
			COIN_CURRENCY.ID,                   // Associated item ID
			100                                 // Amount
		);

		Mission likeMission = new SocialLikeMission(
			"likeMission",                      // ID
			"Like Mission",                     // Name
			new List<Reward>(){coinReward},     // Reward
			Soomla.Profile.Provider.FACEBOOK,   // Social Provider
			"[page name]"                       // Page to "Like"
		);

		// Add 10 levels to each world
		worldA.BatchAddLevelsWithTemplates(10, null,
			null, new List<Mission>(){likeMission});
		worldB.BatchAddLevelsWithTemplates(10, null,
			null, new List<Mission>(){likeMission});

		// Create a world that will contain all worlds of the game
		World mainWorld = new World("main_world");
		mainWorld.InnerWorldsMap.Add(worldA.ID, worldA);
		mainWorld.InnerWorldsMap.Add(worldB.ID, worldB);

		return mainWorld;
	}

	//
	// Various event handling methods
	//
	public void onGoodBalanceChanged(VirtualGood good, int balance, int amountAdded) {
		SoomlaUtils.LogDebug("TAG", good.ID + " now has a balance of " + balance);
	}
	public static void onLoginFinished(UserProfile userProfileJson, string payload){
		SoomlaUtils.LogDebug("TAG", "Logged in as: " + UserProfile.toJSONObject().print());
	}
	public void onLevelStarted(Level level) {
		SoomlaUtils.LogDebug("TAG", "Level started: " + level.toJSONObject().print());
	}


	//
	// Initialize all of SOOMLA's modules
	//
	void Start () {
		...

		// Setup event handlers
		StoreEvents.OnGoodBalanceChanged += onGoodBalanceChanged;
		ProfileEvents.OnLoginFinished += onLoginFinished;
		LevelUpEvents.OnLevelStarted += onLevelStarted;

		SoomlaHighway.Initialize ();
		SoomlaStore.Initialize(new ExampleAssets());
		SoomlaProfile.Initialize();
		SoomlaLevelup.Initialize(createMainWorld());
	}
}
```
