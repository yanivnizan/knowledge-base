---
layout: "content"
image: "Tutorial"
title: "GROW: Getting Started"
text: "Get started with unity3d-grow..."
position: 14
theme: 'platforms'
collection: 'platforms_unity'
---

#GROW: Getting Started

##Getting started

Get started with SOOMLA's Grow. Go to the [Grow dashboard website](https://dashboard.soom.la) and sign up or login. Upon logging in, you will be directed to the main page of the dashboard. On the left side panel, you can click on "Demo Game" in order to know what to expect to see once you start using Grow.

1. Click on "Demo Game" > "Add New App" and fill in the required fields.

	  ![alt text](/img/tutorial_img/unity_grow/addNewApp.png "Add new app")

2. Download the SOOMLA Framework. Go to the "Download" window on the left side-panel, or click [here](http://dashboard.soom.la/downloads), and choose "Unity".

3. Choose the "GROW BUNDLE" by clicking the "Download" button. (NOTE: The "SOOMLA Bundle" contains the modules Store, Profile, & LevelUp, but does not contain Highway, meaning that it doesn't enable you to share data and participate in the data sharing community.)

4. Download the package and double-click on the downloaded link, it'll import all the necessary files into your project.

	![alt text](/img/tutorial_img/unity_grow/import.png "import")

5. Download and import the official [Facebook SDK](https://developers.facebook.com/docs/unity/getting-started/canvas).

	<div class="info-box">Currently, SOOMLA supports **[Facebook Unity SDK v5.1](https://www.facebook.com/campaign/landing.php?campaign_id=282184128580929&placement=SDK_5.0.4&url=https%3A%2F%2Fdevelopers.facebook.com%2Fresources%2FFacebookSDK-140401.unitypackage)** so make sure to use this one!</div>

	Double-click on the downloaded link, it'll import the Facebook SDK into your project.

6. Move the "Facebook" folder from "Assets" to "Assets/Plugins" - SOOMLA works from the "Plugins" folder so that it'll be available to UnityScript developers. This is why you need to move "Facebook" into "Plugins" as well.

    <div class="info-box">**NOTE:** When working with Unity version > 4.5.0 (targeting iOS) please follow these extra steps:<br>

    1. Edit the file `Assets/Facebook/Editor/iOS/fixup.projmods`<br>

    2. Under `headerpaths` change `Facebook/Scripts` to `Plugins/Facebook/Scripts`</div>

7. Drag the "CoreEvents", "StoreEvents", "ProfileEvents" and "LevelUpEvents" Prefabs from `../Assets/Soomla/Prefabs` into your scene. You should see them listed in the "Hierarchy" panel. [This step is CRITICAL for proper setup]

	![alt text](/img/tutorial_img/unity_grow/prefabs.png "Prefabs")

8. In the menu bar go to "Window -> Soomla -> Edit Settings" and change the value for "Soomla Secret" (also setup Public Key if you're building for Google Play):

    - _Soomla Secret_ - is an encryption secret you provide that will be used to secure your data. (If you used versions before v1.5.2 this secret MUST be the same as Custom Secret)  
    **Choose this secret wisely, you can't change it after you launch your game!**

    - _Public Key_ - is the public key given to you from Google (iOS doesn't have a public key).

9. Initialize Highway:

	``` cs
	using Soomla.Highway;

	// Make sure to make this call before initializing any other SOOMLA components
	SoomlaHighway.Initialize();

	// Initialization of store, profile and levelup to come after.
	```

10. Initialize the rest of the modules: Store, Profile and LevelUp. Make sure to initialize each module ONLY ONCE when your application loads, in the "Start()" function of a 'MonoBehaviour' and **NOT** in the "Awake()" function. SOOMLA has its own 'MonoBehaviour' and it needs to be "Awakened" before you initialize.

	a. **Initialize STORE:** Create your own implementation of `IStoreAssets` in order to describe your specific game's assets ([example](https://github.com/soomla/unity3d-store/blob/master/Soomla/Assets/Examples/MuffinRush/MuffinRushAssets.cs)). Initialize SoomlaStore with the class you just created:

		``` cs
		SoomlaStore.Initialize(new YourStoreAssetsImplementation());
		```

	b. **Initialize PROFILE:** SoomlaProfile will initialize the social providers for you. IMPORTANT: Do not initialize them on your own (for example, don't call FB.Init() !).

	``` cs
	SoomlaProfile.Initialize();
	```

	c. **Initialize LEVELUP:** Create your own _Initial World_ which should contain the entire 'blueprint' of the game (see [Model Overview](/docs/platforms/unity/Levelup_Model)). Initialize _LevelUp_ with the class you just created:

    ``` cs
    SoomlaLevelUp.Initialize(initialWorld);
    ```

11. You'll need to create event handler functions in order to be notified about (and handle) SOOMLA-related events. Refer to the following sections for more information:
	- [Store Event Handling](/docs/...TODO)
	- [Profile Event Handling](/docs/...TODO)
	- [LevelUp Event Handling](/docs/...TODO)

And that's it! You have in-app purchasing capabilities, social and game architecture capabilities at your fingertips.



##Example

Below is a short example of how to initialize SOOMLA's modules. We suggest you read about the different modules and their entities in SOOMLA's Knowledge Base: [Store](/docs/platforms/unity/EconomyModel), [Profile](/docs/platforms/unity/Levelup_Model), and [LevelUp](/docs/platforms/unity/Profile_MainClasses).

###IStoreAssets

``` cs
public class ExampleAssets : IStoreAssets{

	/** Virtual Currencies **/
	public static VirtualCurrency COIN_CURRENCY = new VirtualCurrency(
	      "Coin currency",                  // name
	      "Collect coins to buy items",     // description
	      "currency_coin"                   // item ID
	 );

    /** Virtual Currency Packs **/
    public static VirtualCurrencyPack TEN_COIN_PACK = new VirtualCurrencyPack(
        "10 Coins",                         // name
	    "This is a 10-coin pack",           // description
	    "coins_10",                         // item ID
        10,                                 // number of currencies in the pack
        "currency_coin",                    // the currency associated with this pack
        new PurchaseWithMarket(             // purchase type
            TEN_COIN_PACK_PRODUCT_ID,          // product ID
            0.99)                              // initial price
    );

    /** Virtual Goods **/

    // Shield that can be purchased for 150 coins.
    public static VirtualGood SHIELD_GOOD = new SingleUseVG(
        "Shield",                           // name
	    "Shields you from monsters",        // description
	    "shield_good",                      // item ID
        new PurchaseWithVirtualItem(        // purchase type
            "currency_coin",                // virtual item to pay with
            150)                            // payment amount
    );

    // Pack of 5 shields that can be purchased for $2.99.
    public static VirtualGood 5_SHIELD_GOOD = new SingleUsePackVG(
        "5 Shields",                        // name
	    "This is a 5-shield pack",          // description
	    "shield_5",                         // item ID
        new PurchaseWithMarket(             // purchase type
            SHIELD_PACK_PRODUCT_ID,         // product ID
            2.99)                           // initial price
    );

    ...
}
```

<br>
###Initialization

``` cs
public class ExampleWindow : MonoBehaviour {

	World worldA = new World("world_a");
	World worldB = new World("world_b");

	Score score = new Score("numberScore");

    SocialActionGate likeGate = new SocialLikeGate(
      "likeGate",                           // ID
      Soomla.Profile.Provider.FACEBOOK,     // Social Provider
      "[page name]"                         // Page to "Like"
    );

	// Add 10 levels to each world
	worldA.BatchAddLevelsWithTemplates(10, likeGate, score, null);
	worldB.BatchAddLevelsWithTemplates(10, likeGate, score, null);

	// Create a world that will contain all worlds of the game
	World mainWorld = new World("main_world");
	mainWorld.InnerWorldsMap.Add(worldA.ID, worldA);
	mainWorld.InnerWorldsMap.Add(worldB.ID, worldB);

	void Start () {
		...
		SoomlaHighway.Initialize ();
		SoomlaStore.Initialize(new ExampleAssets());
		SoomlaProfile.Initialize();
		SoomlaLevelup.Initialize(mainWorld);
	}
}
```
