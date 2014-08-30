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

`LevelUp` is a dependent module on unity3d-store and unity3d-profile.

First, you'll need to either download the unity packages (recommended) OR clone the repos. Next, you'll need to follow the steps in [unity3d-store Getting Started](/docs/platforms/unity/gettingstarted) in order to set up and initialize the SOOMA SDK.

###**Download packages (Recommended)**

Download the following pre-baked unity packages in this exact order:

[soomla-unity3d-core v1.5.3](https://raw.githubusercontent.com/soomla/unity3d-store/master/soomla-unity3d-core.unitypackage)

[unity3d-store v1.5.3](http://bit.ly/1rc21Zo)

[unity3d-levelup](TODO)

[unity3d-profile](TODO)

###**With Sources**

**RECURSIVELY** clone unity3d-levelup:

  ```
  git clone --recursive https://github.com/soomla/unity3d-levelup.git
  ```

###**Complete the Setup**

1. In the hierarchy panel you should see the following prefabs: `CoreEvents`, `ExampleWindow`, `LevelUpEvents`, and `StoreEvents`. If they are missing, drag them into the scene.

	![alt text](/img/levelup/Unity_prefabs.png "Prefabs")

  <br>

2. Follow steps 3-6 in [unity3d-store Getting Started](/docs/platforms/unity/gettingstarted).

3. Initialize SOOMLA LevelUp, using your own implementation of your game structure:

	``` cs
	World initialWorld = ...
	List<Rewards> rewards = ...
	LevelUp.GetInstance().Initialize(initialWorld, rewards);
	```

  See the full example below.

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
