---
layout: "content"
image: "Tutorial"
title: "Getting Started"
text: "Get started with unity3d-levelup. Here you'll learn how to easily integrate LevelUp into your game, as well as see a basic example of initialization."
position: 1
theme: 'soomla'
collection: 'soomla_blueprint'
---

#**Getting Started**

##**Integrate unity3d-levelup**

1. `LevelUp` is a dependent module on unity3d-store. First, you need to follow these steps to download [unity3d-store](/docs/unity/#getting-started), if you haven't already. Then, come back to get started with `LevelUp`.

2. **RECURSIVELY** clone unity3d-levelup:

    ```
    git clone --recursive https://github.com/soomla/unity3d-levelup.git
    ```

2. In the hierarchy panel you should see the following prefabs: `CoreEvents`, `ExampleWindow`, `LevelUpEvents`, and `StoreEvents`. If they are missing, drag them into the scene.

	![alt text](/img/tutorial_img/levelup/Unity_prefabs.png "Prefabs")

3. Go to **Window** > **Soomla** > **Edit Settings**

    - Provide a string of your choice in the field "Soomla Secret". This will encrypt any sensitive local data Soomla will store on the device.

    - Check "Debug Messages" if you are in testing mode and want debug messages to be displayed.

	![alt text](/img/tutorial_img/levelup/Unity_SoomlaSettings.png "Soomla Settings")

    **Android**:
    - Under "Android Settings" select your billing service.
    - If your billing service is Google Play, you'll need to provide the Google Play public key found in Google Play developer console. Read more about this [here](/docs/AndroidBilling). Also, if you'd like to allow purchases of [Google's test product IDs](http://developer.android.com/google/play/billing/billing_testing.html#billing-testing-static), check the "Test Purchases" box.

    **iOS**:
    - If you'd like your purchases validated with SOOMLA's Server Side Protection, check the "Reciept Validation" box.

4. Initialize Soomla LevelUp, using your own implementation of your game structure:

	``` cs
	World initialWorld = ...
	List<Rewards> rewards = ...
	LevelUp.GetInstance().Initialize(initialWorld, rewards);
	```
See the [full example](#example) below.

##**In-app Billing**

SOOMLA's unity3d-store knows how to contact Google Play, Amazon Appstore, or Apple App Store for you and will redirect your users to their purchasing system to complete the transaction.

###**Android**

Define your economy in Google Play or Amazon Appstore.

See our tutorials:

- [Google Play](/docs/platforms/android/GooglePlayIAB)
- [Amazon Appstore](/docs/platforms/android/AmazonIAB)

###**iOS**

Define your economy in the App Store.

See our tutorial: [App Store](/docs/platforms/ios/AppStoreIAB)

##**Example**

Below is a short example of how to initialize SOOMLA's LevelUp. We suggest you read about the [LevelUp Game Design Model](TODO) in order to understand the different entities of `LevelUp`.

``` cs
/// This virtual currency needs to be defined in your implementation of IStoreAssets
VirtualCurrency coin = new VirtualCurrency("Coin currency", "Collect coins to buy items", "coin_ID");

/** Worlds **/
World worldA = new World("world_a");
World worldB = new World("world_b");

/** Score **/
Score score = new Score("numberScore");

/** Levels **/
/// Add 10 levels to each world
worldA.BatchAddLevelsWithTemplates(10, null, score, null);
worldB.BatchAddLevelsWithTemplates(10, null, score, null);

///Create a world that will contain all worlds of the game
World mainWorld = new World("main_world");
mainWorld.InnerWorldsMap.Add(worldA.ID, worldA);
mainWorld.InnerWorldsMap.Add(worldB.ID, worldB);

/** Rewards **/
BadgeReward goldMedal = new BadgeReward(
	"gold_medal_ID",			// ID
	"Gold Medal"				// Name
);
VirtualItemReward hundredCoinsReward = new VirtualItemReward(
	"coin_reward_ID",			// ID
	"Hundred Coin Reward",      // Name
	coin.ID,				    // ID of the virtual item associated with this reward
	100							// Amount of virtual item to given in the reward
);

/// Initialize LevelUp
LevelUp.GetInstance().Initialize(mainWorld, new List<Reward>() { goldMedal, hundredCoinsReward });

/// Start on first level of first world
((Level)LevelUp.GetInstance().GetWorld("worldA_level_1")).Start();
```
