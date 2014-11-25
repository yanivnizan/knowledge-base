---
layout: "content"
image: "Tutorial"
title: "LEVELUP: Getting Started"
text: "Get started with unity3d-levelup. Here you'll learn how to easily integrate LevelUp into your game, as well as see a basic example of initialization."
position: 8
theme: 'platforms'
collection: 'unity_levelup'
module: 'levelup'
platform: 'unity'
---

#LEVELUP: Getting Started

##Getting Started

  <div class="info-box">LevelUp depends on SOOMLA's other modules: Core, Store, and Profile. This document assumes that you are new to SOOMLA and have not worked with any of the other SOOMLA modules. If this is not the case, and you already *have* some or all of the other modules, please follow these directions only for the modules you are missing and of course, for the **LevelUp** module.</div>

1. Download the following unity-packages:
    - [soomla-unity3d-core](https://github.com/soomla/unity3d-levelup/raw/master/soomla-unity3d-core.unitypackage)
    - [unity3d-store](https://github.com/soomla/unity3d-levelup/raw/master/soomla-unity3d-store.unitypackage)
    - [unity3d-profile](https://github.com/soomla/unity3d-levelup/raw/master/soomla-unity3d-profile.unitypackage)
    - [unity3d-levelup](https://github.com/soomla/unity3d-levelup/raw/master/soomla-unity3d-levelup.unitypackage)

  **OR** if you would like to work with sources, you should **recursively** clone the repo (instead of downloading):

  ``` cs
  git clone --recursive https://github.com/soomla/unity3d-levelup.git
  ```
  
2. Double-click on them following the order they appear above. It'll import all the necessary files into your project.

  <div class="info-box">If you are completely new to SOOMLA you can use the [All-in-One](https://github.com/soomla/unity3d-levelup/raw/master/soomla-unity3d-all-in-one.unitypackage) unitypackage which contains all the above packages in one package. Importing it is equivalent to preforming the above steps.</div>

3. Drag the "CoreEvents", "StoreEvents", "ProfileEvents" and "LevelUpEvents" Prefabs from `../Assets/Soomla/Prefabs` into your scene. You should see it listed in the "Hierarchy" panel. [This step MUST be done for unity3d-levelup to work properly]

  ![alt text](/img/tutorial_img/unity_levelup/prefabs.png "Hierarchy")

4. In the menu bar go to "Window -> Soomla -> Edit Settings" and change the value for "Soomla Secret" (also setup Public Key if you're building for Google Play):

    - _Soomla Secret_ - is an encryption secret you provide that will be used to secure your data. (If you used versions before v1.5.2 this secret MUST be the same as Custom Secret)  
    **Choose this secret wisely, you can't change it after you launch your game!**

    - _Public Key_ - is the public key given to you from Google (iOS doesn't have a public key).

5. Create your own _Initial World_ which should contain the entire 'blueprint' of the game (see [Model Overview](/docs/platforms/unity/Levelup_Model)). Initialize _LevelUp_ with the class you just created:

    ```cs
    SoomlaLevelUp.Initialize (initialWorld);
    ```

  <div class="warning-box">Initialize _LevelUp_ ONLY ONCE when your application loads, in the "Start()" function of a 'MonoBehaviour' and **NOT** in the "Awake()" function. SOOMLA has its own 'MonoBehaviour' and it needs to be "Awakened" before you initialize.</div>

6. You'll need to create event handler functions in order to be notified about (and handle) _LevelUp_ related events. Refer to the [Event Handling](/docs/platforms/unity/LevelUp_Events) section for more information.

And that's it! You have game architecture capabilities at your fingertips.


###SOOMLA's unity3d-store Integration

Please follow the steps in [unity3d-store](https://github.com/soomla/unity3d-store) for the _Store_ part of the setup.
Then, you can use the **store-related _LevelUp_ classes**, such as `VirtualItemScore` or `VirtualItemReward` or `BalanceGate`.

###SOOMLA's unity3d-profile Integration

Please follow the steps in [unity3d-profile](https://github.com/soomla/unity3d-profile) for the _Profile_ part of the setup.
Then, you can use the **profile-related _LevelUp_ classes**, such as `SocialLikeMission`.

##Example Usages

Examples using virtual items are dependent on unity3d-store module, with proper `SoomlaStore` initialization and `IStoreAssets` definitions. See the unity3d-store integration section above for more details.

* `Mission` with `Reward` (collect 5 stars to get 1 mega star)

	```cs
  VirtualItemReward virtualItemReward = new VirtualItemReward("mega_star_reward_id",
      "MegaStarReward", megaStarItemId, 1);

  List<Reward> rewards = new List<Reward>();
  rewards.Add(virtualItemReward);

  BalanceMission balanceMission = new BalanceMission("star_balance_mission_id",
      "StarBalanceMission", rewards, starItemId, 5);

  // Use the store to give the items out, usually this will be called from in-game
  // events such as player collecting the stars.
  StoreInventory.GiveItem(starItemId, 5);

  // events posted:
  // 1. OnGoodBalanceChanged (Store events)
  // 2. OnMissionCompleted (LevelUp events)
  // 3. OnRewardGivenEvent (Core events)

  // now the mission is complete, and reward given
  balanceMission.IsCompleted(); // true
  virtualItemReward.Owned; // true
	```

* `RecordGate` with `RangeScore`

	```cs
  Level lvl1 = new Level("lvl1_recordgate_rangescore");
  Level lvl2 = new Level("lvl2_recordgate_rangescore");

  string scoreId = "range_score";
  RangeScore rangeScore = new RangeScore(scoreId, new RangeScore.SRange(0.0, 100.0));

  string recordGateId = "record_gate";
  RecordGate recordGate = new RecordGate(recordGateId, scoreId, 100.0);

  lvl1.AddScore(rangeScore);

  // Lock level 2 with record gate
  lvl2.Gate = recordGate;

  // the initial world
  world.AddInnerWorld(lvl1);
  world.AddInnerWorld(lvl2);

  SoomlaLevelUp.Initialize(world);

  lvl1.Start();

  // events posted:
  // OnLevelStarted (LevelUp events)

  rangeScore.Inc(100.0);

  lvl1.End(true);

  // events posted:
  // OnLevelEnded (LevelUp events)
  // OnWorldCompleted (lvl1) (LevelUp events)
  // OnGateOpened (LevelUp events)
  // [OnScoreRecordReached] - if record was broken (LevelUp events)

  recordGate.IsOpen(); // true

  lvl2.CanStart(); // true
  lvl2.Start();
  lvl2.End(true);

  // events posted:
  // OnWorldCompleted (lvl2) (LevelUp events)

  lvl2.IsCompleted(); // true
	```

* `VirtualItemScore`

	```cs
  Level lvl1 = new Level("lvl1_viscore");
  string itemId = ITEM_ID_VI_SCORE;
  string scoreId = "vi_score";
  VirtualItemScore virtualItemScore = new VirtualItemScore(scoreId, itemId);
  lvl1.AddScore(virtualItemScore);

  world.AddInnerWorld(lvl1);

  SoomlaLevelUp.Initialize(world);

  lvl1.Start();
  // events posted:
  // OnLevelStarted (LevelUp events)

  virtualItemScore.Inc(2.0);
  // events posted:
  // OnGoodBalanceChanged (Store events)

  lvl1.End(true);
  // events posted:
  // OnLevelEnded (LevelUp events)
  // OnWorldCompleted (lvl1) (LevelUp events)
  // [OnScoreRecordChanged] - if record was broken (LevelUp events)

  int currentBalance = StoreInventory.GetItemBalance(ITEM_ID_VI_SCORE);
  // currentBalance == 2
	```

* `Challenge` (Multi-Mission)

  ```cs
  string scoreId = "main_score";
	Score score = new Score(scoreId);

	Mission mission1 = new RecordMission("record1_mission", "Record 1 mission",
	                                     scoreId, 10.0);
	Mission mission2 = new RecordMission("record2_mission", "Record 2 mission",
	                                     scoreId, 100.0);
	List<Mission> missions = new List<Mission>() { mission1, mission2 };

	BadgeReward badgeReward = new BadgeReward("challenge_badge_reward_id",
	                                          "ChallengeBadgeRewardId");
	List<Reward> rewards = new List<Reward>() { badgeReward };

	Challenge challenge = new Challenge("challenge_id", "Challenge", missions, rewards);

	challenge.IsCompleted(); //false

	World world = new World("initial_world");
	world.AddMission(challenge);
	world.AddScore(score);

	SoomlaLevelUp.Initialize(world);

	score.SetTempScore(20.0);
	score.Reset(true);

	// events:
	// OnMissionCompleted (mission1) (LevelUp events)
	// [OnScoreRecordReached] - if record is broken

	score.SetTempScore(120.0);
	score.Reset(true);

	// events:
	// OnMissionCompleted (mission2) (LevelUp events)
	// OnMissionCompleted (challenge) (LevelUp events)
	// OnRewardGivenEvent (badgeReward) (Core events)

	challenge.IsCompleted(); // true
	badgeReward.Owned; // true
  ```

* `GatesList`

  Note that currently a `GatesList` gate is automatically opened when its sub-gates fulfill the `GatesList` requirement.

  ```cs
  string recordGateId1 = "gates_list_record_gate_id1";
  string scoreId1 = "gates_list_score_id1";
  double desiredRecord1 = 10.0;
  string recordGateId2 = "gates_list_record_gate_id2";
  string scoreId2 = "gates_list_score_id2";
  double desiredRecord2 = 20.0;

  Score score1 = new Score(scoreId1);
  Score score2 = new Score(scoreId2);

  World world = new World("initial_world");
  Level lvl1 = new Level("level1_id");
  lvl1.AddScore(score1);
  lvl1.AddScore(score2);
  world.AddInnerWorld(lvl1);

  RecordGate recordGate1 = new RecordGate(recordGateId1, scoreId1, desiredRecord1);
  RecordGate recordGate2 = new RecordGate(recordGateId2, scoreId2, desiredRecord2);

  List<Gate> gates = new List<Gate>() { recordGate1, recordGate2 };

  GatesListOR gatesListOR = new GatesListOR("gate_list_OR_id", gates);

  GatesListAND gatesListAND = new GatesListAND("gate_list_AND_id", gates);

  SoomlaLevelUp.Initialize(world);

  score1.SetTempScore(desiredRecord1);
  score1.Reset(true);

  recordGate1.IsOpen(); // true
  gatesListOR.IsOpen(); // true

  gatesListAND.CanOpen(); // false (all sub-gates need to be open for AND)
  gatesListAND.IsOpen(); // false

  score2.SetTempScore(desiredRecord2);
  score2.Reset(true);

  recordGate2.IsOpen(); // true
  gatesListOR.IsOpen(); // still true
  gatesListAND.IsOpen(); // true
  ```
