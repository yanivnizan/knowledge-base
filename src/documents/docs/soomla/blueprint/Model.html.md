---
layout: "content"
image: "Modeling"
title: "Game Design Model"
text: "Learn about the different entities of LevelUp. See examples of how to initialize and use the entities."
position: 2
theme: 'soomla'
collection: 'soomla_blueprint'
---

#**LevelUp Model & Operations**

##**About**

###Prerequisite: SOOMLA Store

SOOMLA Store provides game developers with an economy model that every game economy can be based upon. The economy model includes currencies, packs of currencies, and several types of virtual items that can be sold for money or in exchange for other items. You need to understand the [Economy Model](/docs/soomla/EconomyModel) before continuing to read about `LevelUp`.

###LevelUp

`LevelUp` models out worlds, levels, scores, missions, and more, all in one framework that allows game developers to build their game structure and progressions behavior easily and effectively. The sense of progress that users feel in a game is what creates retention and long-term use, which usually lead to monetization.

In this document, you will find definitions of each of the entities of `LevelUp`, the connections between them, and code examples that demonstrate how to use them.

###LevelUp Hierarchy

After observing dozens of games, the SOOMLA team realized that most game progress and accomplishment can be packed into worlds. Worlds can contain both levels and other worlds, and can have a gate that needs to be unlocked in order to enter the next world. More progress mechanisms are available under levels, which include scores, challenges, missions, and records.

![alt text](/img/tutorial_img/soomla_diagrams/LevelUpModel.png "Soomla LevelUp Model")

###Schedule

Before we begin, let's define what a `Schedule` is, as you will see it used a few times in the descriptions below. A `Schedule` defines any time restrictions that an entity may have.

**A `Schedule` contains the following restrictions:**

- `RequiredRecurrence` - How often is this entity available? Every month, week, day, hour? **For example:** A `Gate` that can be unlocked every hour.

- `TimeRanges` - A range of time that this entity is available, with a start time and an end time. **For example:** A `Reward` that can be given starting when the user finishes a certain `Level` and ending 8 seconds later.

- `ActivationLimit` - The number of times that this entity is available for use. **For example:** A `Mission` that can be attempted 10 times throughout gameplay.

<br>

---

##**Level**

One of the most common ways to create a sense of progress and accomplishment in games is to have levels. Every `Level` has a state, that is always one of: "Idle", "Running", "Paused", "Ended", or "Completed". To use levels correctly, you need to use the provided `Start`, `Pause`, and `End` functions, in order for the level to keep an updated record of what its state is.

**A `Level` contains the following elements:**

- `StartTime` - The start time of this level.

- `Elapsed` -  The duration of the play time for this level. This can be used for games that need to keep track of how long the user has been playing the level in order to calculate his [`Score`](#score) at the end.

- `State` - The state of the level is initially "Idle". While the user is playing the level is in "Running" mode, and can later be one of "Paused", "Ended", or "Completed".

<br>
####**HOW TO DEFINE**

`Level` has a few different constructors, the simplest one shown here. The section about `World`s, below, demonstrates the use of a function called `BatchAddLevelsWithTemplates` which is much more convenient to use than the `Level` constructors.

``` cs
Level lvl1 = new Level("level1_ID");
```

<br>
####**COMMON USE**

**Retrieve a specific `Level` according to its ID:**

To get a `Level`, use `LevelUp`'s function `GetWorld()` and use casting, because `Level` IS A (extends) `World`.

``` cs
Level level1 = (Level)LevelUp.GetInstance().GetWorld("worldA_level_1");
```

<br>
**Start, pause, or end this `Level`:**

``` cs
level1.Start();
level1.Pause();
level1.Start();
level1.End();
```

<br>
**Manipulate a specific `Level`:**

Get the number of times this `Level` has been played, the number of times started, the slowest / fastest duration of play, or set the `Level`as completed.

``` cs
int timesPlayed = level1.getTimesPlayed();
int timesStarted = level1.getTimesStarted();
long slowDuration = level1.getSlowestDurationMillis();
level1.setCompleted(true);
```

<br>
**Get the number of `Level`s in the game:**

``` cs
int totalLevels = LevelUp.GetInstance().GetLevelCount();
```

<br>
**Get the number of completed `Level`s:**

``` cs
int completedLevels = LevelUp.GetInstance().GetCompletedLevelCount();
```

<br>

---

##**World**

A game can have multiple `World`s or a single one, and `World`s can also contain other `World`s in them. In some games, these are referred to as level packs. Often, a `World` contains a set of `Level`s, or multiple sets. A `World` can also have a potential `Gate` that defines the criteria to enter it. Games that don’t have the concept of `World`s can be modeled as single `World` games (SLM games).

**A `World` contains the following elements:**

- `Gate` - The [Gate](#gate) that defines the criteria to enter this `World`.

- `InnerWorldsMap` - The `World`s contained in this `World`.

- `Scores` - A list of [Score](#score)(s) that this `World` contains . In the class `World`, you can add, retrieve, set, increase, decrease, and reset `Score`s, whether there are multiple `Score`s, or a single one.

- `Missions` - A list of `Mission`s that this `World` contains. In the class `World` you can add more `Mission`s.

<br>
####**HOW TO DEFINE**

For your convenience, there are multiple ways to define a `World`.

``` cs
/// Simple constructor that receives only an ID.
World jungleWorld = new World("jungleWorld");

/// Instantiation of gates, scores, and missions will
/// be demonstrated in the relevant sections below.
World lakeWorld = new World(
	"lakeWorld",				// ID
	null, 							// Gate to enter this world
	null, 							// Inner worlds	(or levels)
	null, 							// Scores of this world
	null, 							// Missions of this world
);
```

<br>
####**COMMON USE**

**Add `Levels` to a `World`**:
`BatchAddLevelsWithTemplates` creates a batch of `Level`s and adds them to the `World`. This function will save you a lot of time. Instead of creating many levels one by one, you can create them all at once.

``` cs
jungleWorld.BatchAddLevelsWithTemplates(
	10, 									// Number of levels in this world
	some_gate, 						// Gate for each of the levels
	new List<Score>() { ... }, 				// Scores for each of the levels
	new List<Mission>() { ... }				// Missions for each of levels
);
```

<br>
**Get/Set completion status:**

``` cs
jungleWorld.SetCompleted(true); //set as completed

bool isComplete = jungleWorld.IsCompleted(); //check if complete
```

<br>
**Add elements to a `World`:**
You can add `Mission`s and `Score`s to an existing `World`.

``` cs
BalanceMission mission = new ... ;
jungleWorld.AddMission(mission);

Score score = new ... ;
jungleWorld.AddScore(score);
```

<br>
**Manipulate `Score`(s) of a `World`:**

Use the different functions provided in `World` to get, set, increase, and decrease its `Score`s.  You can use `SumInnerWorldsRecords()` to sum up the `Score`s of the inner `World`s or `Level`s. Some functions are intended for a single `Score`, while others are for multiple `Score`s - you can differentiate between them according to their names and signatures.

``` cs
/** For single scores: **/

jungleWorld.SetSingleScoreValue(300); //set score to 300

jungleWorld.IncSingleScore(100); //increase score by 100

Score score =  jungleWorld.getSingleScore(); //get score - value is 400

double total = jungleWorld.SumInnerWorldsRecords(); //get the total score of all inner world (levels) scores


/** For multiple scores: **/

jungleWorld.SetScoreValue(someScore.ID, 200); //set SomeScore to 200

jungleWorld.ResetScores(true); //reset score values
```


<br>
**Manipulate `Rewards` of a `World`:**

``` cs
Reward coinReward = new ...
jungleWorld.AssignReward(coinReward); //assign this reward to this World

String rewardID = jungleWorld.getAssignedRewardID(); //get reward ID
```

<br>
**Retrieve information about the `World`s in your game:**

``` cs
///number of Worlds in the game (the given bool signifies if to include all levels in the count)
int numOfWorlds = LevelUp.GetInstance().GetWorldCount(true);

///number of completed Worlds in the game
int numOfCompletedWorlds = LevelUp.GetInstance().GetCompletedWorldCount();

///retrieve World by its ID
World world = LevelUp.GetInstance().GetWorld("worldA");

///number of Levels in the given World
int d = LevelUp.GetInstance().GetLevelCountInWorld(jungleWorld);
```

<br>

---

##**Score**

Represents a score in the game. A simple game usually has one generic numeric score which grows as the user progresses in the game. A game can also have multiple scores for different aspects such as time, speed, points, etc.

**A `Score` contains the following elements:**

- `StartValue` - The initial `Score` value in the game.

- `HigherBetter`- This field defines whether it's better that the score is higher or lower. A `Score` can be ascending in nature such as regular points (higher is better) or can be descending such as time-to-complete level (lower is better).


<br>
####**HOW TO DEFINE**

For your convenience, there are multiple ways to define a `Score`.

``` cs
Score score = new Score("score_ID");

Score numberScore = new Score(
	"numberScore", 					// ID
	"Number Score", 				// Name
	true							      // Higher is better
);
```

<br>
####**COMMON USE**

**Check if the `Score` in the current game session has reached a certain value:**

``` cs
BadgeReward badgeReward = new ...

// If the score has reached 5000 give the user a badge.
if (numberScore.HasTempReached(5000)) {
	badgeReward.Give();
}
```

<br>
**Check if the `Score` has reached a record:**

``` cs
//Checks if a value of 300 breaks numberScore's record.
if (numberScore.HasRecordReached(300)) {
	//do something...
}
```

<br>
**Manipulate a `Score` by using its functions to get, set, increase, and decrease it.**

``` cs
numberScore.dec(100); // decrease by 100

numberScore.setTempScore(250); // set a temporary score
```

<br>
**Retrieve a `Score` according to its ID:**

``` cs
Score score = LevelUp.GetInstance().GetScore(numberScore.ID);
```

###**RangeScore**

A specific type of `Score` that has an associated range. The `Score`'s  value can be only inside that range of values. **For example:** A puzzle or quiz can measure the user's success on a scale of 1 - 10, or a shooting `Score` can be on a scale of 10 to 100 according to the user's performance in the game.

<br>
####**HOW TO DEFINE**

``` cs
RangeScore quizScore = new RangeScore(
	"quizGrade", 						        // ID
	new RangeScore.SRange(0, 10)		// Range
);

RangeScore shootingScore = new RangeScore(
	"shootingRange", 					      // ID
	"Shooting Range Score",				  // Name
	true, 								          // Higher is better
	new RangeScore.SRange(10, 100)  // Range
);
```

<br>
###**VirtualItemScore**

A specific type of `Score` that has an associated virtual item. The score is related to the specific item ID. **For example:** In a game that has diamonds that the user needs to collect, you would define a virtual currency diamond and a `VirtualItemScore` based upon it.  

<br>
####**HOW TO DEFINE**

For your convenience, there are multiple ways to define a `VirtualItemScore`.

``` cs
VirtualCurrency diamond = new VirtualCurrency("Diamond", "", "diamond");
VirtualItemScore diamondScore = new VirtualItemScore(
	"diamondScore1",					      // ID
	diamond.ID							        // Associated item ID
);

VirtualCurrency coin = new VirtualCurrency("Coin", "", "coin_currency");
VirtualItemScore coinScore = new VirtualItemScore(
	"coinScore", 						        // ID
	"Coin Score", 						      // Name
	true, 								          // Higher is better
	coin.ID								          // Associated item ID
);
```

<br>

---

##**Gate**

A `Gate` is an object that defines certain criteria for progressing between the game's `World`s or `Level`s. The `Gate` is a criteria or list of rules which which must be met in order to enter the `World` or `Level`. The rules are based on components of the previous `World` or `Level`: scores achieved, missions completed, etc. The `Gate` is opened once the logical conditions are met. In some games, `Gate`s can be opened with a payment or social task, such as sharing the game on Facebook.

<div class="info-box">`Gate` is an abstract class. Below are explanations of several types of `Gate`s that implement `Gate` and how to instantiate them.</div>

<br>
####**COMMON USE**

All gates have the same functionality.

**Check if the `Gate` is open:**

``` cs
if (someGate.IsOpen()) {
	//do something
}
```

**Retrieve a specific `Gate`:**

``` cs
PurchasableGate gate1 = new PurchasableGate("", "");

Gate myGate = LevelUp.GetInstance().GetGate(gate1.ID);
```

###**BalanceGate**

 A specific type of `Gate` that has an associated virtual item and a desired balance. The`Gate` opens once the item's balance has reached the desired balance.

**A `BalanceGate` contains the following elements:**

- `AssociatedItemId` - The ID of the virtual item whose balance is examined.

- `DesiredBalance` - The balance of the associated item that needs to be reached in order to unlock the `Gate`.

<br>
####**HOW TO DEFINE**

``` cs
VirtualCurrency muffin = new VirtualCurrency("Muffin", "", "muffin");

// Collect 5 muffins to unlock the gate
BalanceGate bGate = new BalanceGate(
	"bGate",							      // ID
	muffin.ID,							    // Associated Item ID
	5									          // Desired balance
);
```

###**PurchasableGate**

A specific type of `Gate` that has an associated market item. The `Gate` opens once the item has been purchased. This `Gate` is useful when you want to allow unlocking of certain `Level`s or `World`s only if they are purchased with real money.

**A `PurchasableGate` contains the following elements:**

- `AssociatedItemId` - The ID of the virtual item who needs to be purchased in order to unlock the `Gate`.

<br>
####**HOW TO DEFINE**

``` cs
SingleUseVG itemToBuy = new SingleUseVG(
	"name", "description", "ID",
	new PurchaseWithMarket("product_ID", 1.99)
);

//The user must buy the 'itemToBuy' in order to unlock this Gate.
PurchasableGate pGate = new PurchasableGate(
	"purchaseGate", 					    // ID
	itemToBuy.ID						      // Associated item ID
);
```

###**RecordGate**

A RecordGate has an associated score and a desired record. The `Gate` opens once the player achieves the desired record for the given score.

**A `RecordGate` contains the following elements:**

- `AssociatedScoreId` - The ID of the `Score` that's examined.
- `DesiredRecord` - The value that the associated `Score` needs to reach in order to unlock the `Gate`.

<br>
####**HOW TO DEFINE**

``` cs
Score numberScore = new Score("numberScore", "Score", true);

//The user needs to reach a record of 5000 for numberScore in order to unlock this Gate.
RecordGate rGate = new RecordGate(
	"rGate",
	numberScore.ID,
	5000
);
```

###**ScheduleGate**

A specific type of `Gate` that has a schedule that defines when the `Gate` can be opened. The `Gate` opens once the player tries to open it in the time frame of the defined schedule.

**A `ScheduleGate` contains the following elements:**

- `Schedule` - The [schedule](#schedule) that defines when this `Gate` can be unlocked.

<br>
####**HOW TO DEFINE**

``` cs
Schedule schedule = new Schedule(DateTime.Now, DateTime.Now.AddHours(2), Schedule.Recurrence.EVERY_DAY, 1);

//The user can unlock this Gate if he/she is attempting to do so in the time frame defined in schedule.
ScheduleGate sGate = new ScheduleGate("ID", schedule);
```

###**WorldCompletionGate**

A `WorldCompletionGate` has an associated `World` that, once complete, the `Gate` becomes unlocked.

**A `WorldCompletionGate` contains the following elements:**

- `AssociatedWorldId` - The `World` that needs to be completed in order to unlock the Gate.

<br>
####**HOW TO DEFINE**

``` cs
World worldA = new World("worldA");

//The user must complete worldA in order to unlock this Gate.
WorldCompletionGate wGate = new WorldCompletionGate(
	"wGate", 							    // ID
	worldA.ID							    // Associated World ID
);
```

###**GatesList**

A list of one or more `Gate`s that together define a composite criteria for progressing between the game's `World`s or `Level`s.

There are two kinds of `GatesList`:

####**GatesListAND**

A specific type of `GatesList` that can be opened only if ALL `Gate`s in its list are open.

<br>
####**HOW TO DEFINE**

``` cs
///The user needs to meet the criteria of bGate AND of sGate in order to open this Gate.
///For the definitions of bGate and sGate, see the topics BalanceGate and ScheduleGate above.
GatesListAND bGateANDsGate = new GatesListAND(
	"", 								                // ID
	new List<Gate>() { bGate, sGate } 	// List of Gates
);


```

####**GatesListOR**
A specific type of `GatesList` that can be opened if AT LEAST ONE `Gate`s in its list is open.

<br>
####**HOW TO DEFINE**

``` cs
///The user needs to meet the criteria of wGate OR of pGate in order to open this Gate.
///For the definitions of wGate and pGate, see the topics WorldCompletionGate and PurchasableGate above.
GatesListOR wGateORpGate = new GatesListOR(
	"", 								                // ID
	new List<Gate>() { wGate, pGate } 	// List of Gates
);
```

###**SocialActionGate**

`SocialActionGate`s require the user to perform a specific social action in order to unlock the `Gate`s. Currently, the social provider that's available is Facebook, so the `Gate`s are FB-oriented. In the future, more social providers will be added.

<div class="info-box">`SocialActionGate` is an abstract class. Below are explanations of the four types of social `Gate`s that implement `SocialActionGate`. All types of `Gate`s implement the superclass `Gate` and therefore, implement its functionality and behavior.</div>

<br>
###**SocialLikeGate**

A specific type of `Gate` that has an associated page name. The `Gate` is unlocked once the player "Likes" the associated page.

<br>
####**HOW TO DEFINE**

``` cs
SocialLikeGate likeGate = new SocialLikeGate(
	"likeGate", 							          // ID
	Soomla.Profile.Provider.FACEBOOK, 	// Social Provider
	"[page name]"							          // Page to "Like"
);
```

<br>
###**SocialStatusGate**

A specific type of `Gate` that has an associated status. The `Gate` is unlocked once the player posts the status.

<br>
####**HOW TO DEFINE**

``` cs
SocialStatusGate statusGate = new SocialStatusGate(
	"statusGate",                        // ID
	Soomla.Profile.Provider.FACEBOOK,    // Social Provider
	"[status]"                           // Status to post
);
```

<br>
###**SocialStoryGate**

A specific type of `Gate` that has an associated story. The `Gate` is unlocked once the player posts the story.

<br>
####**HOW TO DEFINE**

``` cs
SocialStoryGate storyGate = new SocialStoryGate(
	"storyGate", 							          // ID
	Soomla.Profile.Provider.FACEBOOK, 	// Social provider
	"[This is the message for the story]",
	"[Story Name]",
	"[Caption for the image]",
	"[Link]",
	"[Image Url]"
);
```

<br>
###**SocialUploadGate**

A specific type of `Gate` that has an associated image. The `Gate` is unlocked once the player uploads the image.

<br>
####**HOW TO DEFINE**

``` cs
SocialUploadGate uploadGate = new SocialUploadGate(
	"uploadGate", 							          // ID
	Soomla.Profile.Provider.FACEBOOK, 		// Social provider
	"[FileName]", 							          // Name of image file
	"[Message to upload with]", 			    // Message
	new Texture2D(TODO, TODO)				      // TODO
);
```

<br>

---

##**Mission**

A `Mission` is a task your users need to complete in your game. `Mission`s are usually associated with `Reward`s meaning that you can give your users something for completing `Mission`s. You can create `Mission`s and use them as single, independent entities OR create a `Challenge` to handle several `Mission`s and monitor their completion. `Mission`s may be completed multiple times.

**A `Mission` contains the following elements:**

- `Rewards` - Rewards that can be earned when completing this `Mission`.

- `Schedule` - A schedule that defines the number of times this `Mission` can be played, how often, etc.

- `Gate` - A `Gate` that needs to be unlocked in order to complete this `Mission`.

<div class="info-box">`Mission` is an abstract class. Below are several types of missions that implement `Mission`.</div>

<br>
####**COMMON USE**

All missions have the same functionality.

**Check if the `Mission` is available:**

``` cs
if (someMission.IsAvailable()) {
	//do something...
}
```

**Check if the `Mission` is completed:**

``` cs
if (someMission.IsCompleted()) {
	//do something...
}
```

**Retrieve a specific `Mission`:**

``` cs
BalanceMission mission1 = new BalanceMission("","","",0);

Mission myMission = LevelUp.GetInstance().GetMission(mission1.ID);
```

###**BalanceMission**

A specific type of `Mission` that has an associated virtual item and a desired balance. The `Mission` is complete once the item's balance reaches the desired balance.

<br>
####**HOW TO DEFINE**

``` cs
Reward reward = new ...
VirtualCurrency coin = new VirtualCurrency("Coin", "", "coin_currency");

///To complete this mission the user needs to collects 250 coins.
///Once the mission is complete he/she will receive the reward.
BalanceMission bMission = new BalanceMission(
	"coinMission",									  // ID
	"Coin Mission", 								  // Name
	new List<Reward>() { reward }, 		// Rewards
	coinScore.ID,									    // Associated Score ID
	250												        // Desired balance
);
```

###**RecordMission**

A specific type of `Mission` that has an associated score and a desired record. The `Mission` is complete once the player achieves the desired record for the given score.

<br>
####**HOW TO DEFINE**

``` cs
///To complete this mission the user needs his coinScore to reach a record of 1000.
RecordMission rMission = new RecordMission(
	"rMission", 						         // ID
	"Coin Record Score", 				     // Name
	coinScore.ID,						         // Associated Score ID
	1000								             // Desired record
);

///To complete this mission the user needs his coinScore to reach a record of 5000.
///Once the mission is complete he/she will receive the reward(s).
RecordMission rMission2 = new RecordMission(
	"rMission", 						            // ID
	"Coin Record Score", 				        // Name
	new List<Reward>() { someReward },  // Reward(s)
	coinScore1.ID,						          // Associated Score ID
	5000								                // Desired record
);
```

###**PurchasingMission**

A specific type of `Mission` that has an associated market item. The `Mission` is complete once the item has been purchased.

<br>
####**HOW TO DEFINE**

``` cs
SingleUseVG itemToBuy = new SingleUseVG("name", "description", "ID", new PurchaseWithMarket("product_ID", 1.99));

///To complete this mission the user needs to buy the item.
PurchasingMission pMission = new PurchasingMission(
	"pMission", 						          // ID
	"Purchasing Mission", 				    // Name
	itemToBuy.ID						          // Associated item ID
);

///To complete this mission the user needs to buy the item.
///Once the mission is complete he/she will receive the reward(s).
PurchasingMission pMission2 = new PurchasingMission(
	"pMission", 						           // ID
	"Purchasing Mission", 				     // Name
	new List<Reward>() { someReward }, // Reward(s)
	itemToBuy.ID						           // Associated item ID
);

```

###**WorldCompletionMission**

A specific type of `Mission` that has an associated `World`. The `Mission` is complete once the `World` has been completed.

<br>
####**HOW TO DEFINE**

``` cs
World worldA = new World("worldA");

///To complete this mission the user needs to complete worldA.
WorldCompletionMission wMission = new WorldCompletionMission(
	"wMission", 						          // ID
	"World completion Mission", 		  // Name
	worldA.ID						              // Associated World ID
);

///To complete this mission the user needs to complete worldA.
///Once the mission is complete he/she will receive the reward(s).
WorldCompletionMission wMission2 = new WorldCompletionMission(
	"wMission2", 						            // ID
	"World completion Mission", 		    // Name
	new List<Reward>() { someReward },  // Reward(s)
	worldA.ID						                // Associated World ID
);
```

<div class="info-box">The following `Mission`s require the user to perform a specific social action in order to receive a `Reward`. Currently, the social provider that's available is Facebook, so the `Mission`s are FB-oriented. In the future, more social providers will be added. </div>

###**SocialLikeMission**

A specific type of `Mission` that has an associated page name. The `Mission` is complete once the player "Likes" the page.  

<br>
####**HOW TO DEFINE**

``` cs
SocialLikeMission likeMission = new SocialLikeMission(
	"likeMission",						// ID
	"Like Mission",							// Name
	Soomla.Profile.Provider.FACEBOOK,	 // Social provider
	"[page name]"						// Page to "Like"
);

///Mission with rewards (assume that r1 and r2 are Rewards that have been instantiated).
SocialLikeMission likeMission2 = new SocialLikeMission(
	"likeMission2", 										// ID
	"Like Mission",											// Name
	new List<Reward>() { r1, r2 },			// Rewards
	Soomla.Profile.Provider.FACEBOOK, 	// Social provider
	"[page name]"												// Page to "Like"
);
```

<br>
###**SocialStatusMission**

A specific type of `Mission` that has an associated status. The `Mission` is complete once the player posts the status.  

<br>
####**HOW TO DEFINE**

``` cs
SocialStatusMission statusMission = new SocialStatusMission(
	"statusMission", 										// ID
	"Status Mission",										// Name
	Soomla.Profile.Provider.FACEBOOK, 	// Social provider
	"[status]"													// Status to post
);

///Mission with rewards (assume that r1 and r2 are Rewards that have been instantiated).
SocialStatusMission statusMission2 = new SocialStatusMission(
	"statusMission2", 									// ID
	"Status Mission",										// Name
	new List<Reward>() { r1, r2 },			// Rewards
	Soomla.Profile.Provider.FACEBOOK, 	// Social provider
	"[status]"													// Status to post
);
```

<br>

###**SocialStoryMission**
A specific type of `Mission` that has an associated story that includes a message, story name, caption, link, and image. The `Mission` is complete once the player posts the story.  

<br>
####**HOW TO DEFINE**

``` cs
SocialStoryMission storyMission = new SocialStoryMission(
	"storyMission", 										// ID
	"Story Mission",										// Name
	Soomla.Profile.Provider.FACEBOOK, 	// Social provider
	"[Message for the story]",
	"[Story Name]",
	"[Caption for the image]",
	"[Link]",
	"[Image Url]"
);

///Mission with rewards (assume that r1 and r2 are Rewards that have been instantiated).
SocialStoryMission storyMission2 = new SocialStoryMission(
	"storyMission2", 										// ID
	"Story Mission",										// Name
	new List<Reward>() { r1, r2 },			// Rewards
	Soomla.Profile.Provider.FACEBOOK, 	// Social provider
	"[Message for the story]",
	"[Story Name]",
	"[Caption for the image]",
	"[Link]",
	"[Image Url]"
);
```

<br>

###**SocialUploadMission**
A specific type of `Mission` that has an associated filename and message. The `Mission` is complete once the player uploads the image.  

<br>
####**HOW TO DEFINE**


``` cs
SocialUploadMission uploadMission = new SocialUploadMission(
	"uploadMission", 										// ID
	"Upload Mission", 									// Name
	Soomla.Profile.Provider.FACEBOOK, 	// Social provider
	"[FileName]", 											// Name of image file
	"[Message to upload with]", 				// Message
	new Texture2D(0, 0)									// TODO
);

///Mission with rewards (assume that r1 and r2 are Rewards that have been instantiated).
SocialUploadMission uploadMission2 = new SocialUploadMission(
	"uploadMission2", 									// ID
	"Upload Mission", 									// Name
	new List<Reward>() { r1, r2 },			// Rewards
	Soomla.Profile.Provider.FACEBOOK, 	// Social provider
	"[FileName]", 											// Name of image file
	"[Message to upload with]", 				// Message
	new Texture2D(0, 0)									// TODO
);
```

<br>

---

##**Challenge**

Missions can be aggregated into challenges which can contain a single mission or multiple ones. The user is required to complete all these missions in order to earn the reward associated with the challenge.

<br>
####**HOW TO DEFINE**

``` cs
///To complete this challenge, the user must complete all 4 missions.
Challenge challenge = new Challenge(
	"challenge", 						      // ID
	"4 Mission Challenge",				// Name
	new List<Mission>() { bMission, rMission, pMission, wMission } // Missions
);

///To complete this challenge, the user must complete all 4 missions.
///Once the challenge is complete, he/she will receive the reward(s).
Challenge challenge2 = new Challenge(
	"challenge2", 						           // ID
	"4 Mission Challenge",				       // Name
	new List<Mission>() { bMission, rMission, pMission, wMission }, // Mission(s)
	new List<Reward>() { someReward }    // Reward(s)
);
```

<br>
####**COMMON USE**

**Check if the `Challenge` is complete:**
``` cs
if (challenge.IsCompleted()) {
	//do something...
}
```

<br>

---

##**Reward**

A `Reward` is an entity which can be earned by the user for meeting certain criteria in game progress. For example - a user can earn a badge for completing a `Mission`. Dealing with `Reward`s is very similar to dealing with `VirtualItem`s: grant a `Reward` by giving it, and recall a `Reward` by taking it.

<div class="info-box">`Reward` is an abstract class. Below are several types of rewards that implement `Reward`.</div>

<br>
####**COMMON USE**

All rewards have the same functionality.

**Give a `Reward`:**

Use this to give your user a `Reward`, for example you can give your users a `Reward` of 100 coins just for downloading your game.

``` cs
coinReward.Give();
```

**Take a `Reward`:**

Use this to redeem a `Reward` from your user.

``` cs
reward.Take();
```

**Retrieve a Reward:**

``` cs
Reward reward = LevelUp.GetInstance().GetReward(coinReward.ID);
```

###**BadgeReward**

A specific type of `Reward` that represents a badge with an icon. **For example:** when the user achieves a top score,  the user can earn a "Highest Score" badge reward.

<br>
####**HOW TO DEFINE**

``` cs
BadgeReward goldMedal = new BadgeReward(
	"badge_goldMedal",				     // ID
	"Gold Medal" 				           // Name
);
```

###**SequenceReward**

 A specific type of `Reward` that holds a list of other `Reward`s in a certain sequence. The rewards are given in ascending order. **For example:** In a Karate game the user can progress between belts and can be rewarded a sequence of: blue belt, yellow belt, green belt, brown belt, and lastly, black belt.

<br>
####**HOW TO DEFINE**

``` cs
BadgeReward blueBelt = new BadgeReward(
	"blueBelt",                          // ID
	"Karate blue belt"                   // Name
);
//Assume the same instantiation for the rest of the belts.

SequenceReward beltReward = new SequenceReward(
	"beltReward",  				        // ID
	"Belt Reward", 				        // Name
	new List<Reward>() {  	      // Rewards in sequence
		blueBelt,
		yellowBelt,  
		greenBelt,  
		brownBelt,  
		blackBelt }
);
```

###**VirtualItemReward**

A specific type of `Reward` that you can use to give your users some amount of a virtual item. **For example:** Give users 100 coins (virtual currency) when they complete a `Mission`.

<br>
####**HOW TO DEFINE**

``` cs
VirtualCurrency coin = new VirtualCurrency("Coin", "", "coin_currency");

VirtualItemReward coinReward = new VirtualItemReward(
	"vReward",  				       // ID
	"Coin Reward",  				   // Name
	coin.ID,  				   	     // Associated item ID
	100 				   			       // Amount
);
```


###**RandomReward**

A specific type of `Reward` that holds a list of other `Reward`s. When this `Reward` is given, it randomly chooses a `Reward` from the list of `Reward`s it internally holds. **For example:** A user can earn a mystery box `Reward` that grants him/her a random `Reward`.

<br>
####**HOW TO DEFINE**

``` cs
RandomReward mysteryReward = new RandomReward(
	"mysteryReward", 					// ID
	"Mystery Box Reward", 		// Name
	new List<Reward>() { 			// Rewards to choose from
		goldMedal,
		coinReward }
);
```
