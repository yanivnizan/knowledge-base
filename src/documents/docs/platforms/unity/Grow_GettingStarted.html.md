---
layout: "content"
image: "Tutorial"
title: "GROW: Getting Started"
text: "Get started with Grow for Unity3d. GROW includes all of SOOMLA's modules: Core, Store, Profile, LevelUp, and Highway. Learn how to easily integrate all that SOOMLA offers into your game."
position: 14
theme: 'platforms'
collection: 'platforms_unity'
---

#GROW: Getting Started

**GROW** is a combination of all of SOOMLA's products. It's composed of the different modules that SOOMLA provides: [Store](/docs/soomla/store), [Profile](/docs/soomla/profile), [LevelUp](/docs/soomla/levelup), and [Highway](/docs/soomla/highway). Some of these modules can be used individually, while some are dependent on other modules. If you're new to SOOMLA, we recommend using GROW, because it allows you to enjoy all that SOOMLA has to offer.

##Integrate GROW

###Download

1. Download the [all-in-one package](https://github.com/soomla/unity3d-levelup/raw/master/soomla-unity3d-all-in-one.unitypackage). This package contains all of the SOOMLA modules you need: Core, Store, Profile, and LevelUp.

2. When the download is finished, double-click on the project and it'll import all the necessary files into your project.

3. Drag the "CoreEvents", "StoreEvents", "ProfileEvents", and "LevelUpEvents" Prefabs from ../Assets/Soomla/Prefabs into your scene. You should see all four of them listed in the "Hierarchy" panel.

  ![alt text](/img/tutorial_img/grow/prefabs.png "Prefabs")

4. Download and import [unity3d-highway](https://github.com/soomla/unity3d-highway/blob/master/soomla-unity3d-highway.unitypackage) into your project.

  ![alt text](/img/tutorial_img/grow/importHW.png "Import Highway")

###Setup

5. **Facebook Setup**:

	a. Download and import the [Official Facebook SDK](https://developers.facebook.com/docs/unity/getting-started/canvas). **NOTE:** You don't need to initialize FB, SoomlaProfile will initialize it for you!

	b. Create an empty folder named "Facebook" under Assets/Plugins.

	c. Move the folder Scripts from Assets/Facebook to Assets/Plugins/Facebook - SOOMLA works from the Plugins folder in order to be available to UnityScript developers. So, you'll have to move Facebook in there as well.

  ![alt text](/img/tutorial_img/grow/FBfolder.png "Facebook folder")

	<div class="info-box">
	**iOS users:** When working with Unity version > 4.5.0 follow these extra steps: <br>

	1. Edit the file Assets/Facebook/Editor/iOS/fixup.projmods <br>

	2. Under headerpaths, change Facebook/Scripts to Plugins/Facebook/Scripts
  </div>

6. In the Unity editor menu bar, click "Window" -> "Soomla" -> "Edit Settings".

  ![alt text](/img/tutorial_img/grow/soomlaSettings.png "Soomla Settings")

	a. Change the value for "Soomla Secret" to a secret of your choice. This is an encryption secret you must provide that will be used to secure your data. **Choose this secret wisely** - you cannot change it after you launch your game!

	b. Change the "Game Key" and "Env Key". These keys define the Highway.

	c. Under Android Settings, setup the "Android Public Key" if you're building for Google Play. This is the public key given to you from Google. (iOS doesn't have a public key).

	d. Under iOS Build Settings, check "Receipt Validation" to validate your purchases with SOOMLA's Server Side Protection Service.

###Create & Initialize

7. Create your own implementation of `IStoreAssets` in order to describe your game's specific assets (see the [example](#example) below).

8. Create your own Initial World which should contain all the LevelUp entities of the game (see the [example](#example) below.)

9.  Initialize all modules: Highway, Store (with the `IStoreAssets` you just created),  Profile, and LevelUp (with the class you just created):

	``` cs
	SoomlaHighway.Initialize ();
	SoomlaStore.Initialize(new yourStoreAssets());
	SoomlaProfile.Initialize();
	LevelUp.GetInstance().Initialize(yourInitialWorld);
	```

10. You'll need an event handler class in order to be notified about in-app purchasing/social-action/LeveUp - related events. You can choose to create *one* class with functions that handle events from all modules (Store, Profile, LevelUp), or create an event handler class for each module. Refer to the [Event Handling]() section for more information.

11. Once you've created your event handler(s), you'll need to initialize them:

	``` cs
	private static LevelUpEventHandler h1 = new LevelUpEventHandler();
	private static ExampleEventHandler h2 = new ExampleEventHandler();
	```

##Example

Below is a short example of how to initialize SOOMLA's modules. We suggest you read about the different modules and their entities in SOOMLA's [Knowledge Base](/docs/soomla).

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

``` cs
public class ExampleWindow : MonoBehaviour {

	World worldA = new World("world_a");
	World worldB = new World("world_b");

	Score score = new Score("numberScore");

	/// Add 10 levels to each world
	worldA.BatchAddLevelsWithTemplates(10, null, score, null);
	worldB.BatchAddLevelsWithTemplates(10, null, score, null);

	///Create a world that will contain all worlds of the game
	World mainWorld = new World("main_world");
	mainWorld.InnerWorldsMap.Add(worldA.ID, worldA);
	mainWorld.InnerWorldsMap.Add(worldB.ID, worldB);

	void Start () {
		...
		SoomlaHighway.Initialize ();
		SoomlaStore.Initialize(new ExampleAssets());
		SoomlaProfile.Initialize();
		LevelUp.GetInstance().Initialize(mainWorld);
	}
}
```
