---
layout: "content"
image: "Modeling"
title: "LEVELUP: Model & Operations"
text: "Learn about the different entities of LevelUp. See examples of how to initialize and use them."
position: 9
theme: 'platforms'
collection: 'unity_levelup'
module: 'levelup'
platform: 'unity'
---

#LEVELUP: Model & Operations

##LevelUp

`LevelUp` models out worlds, levels, scores, missions, and more, all in one framework that allows game developers to build their game structure and progressions behavior easily and effectively. The sense of progress that users feel in a game is what creates retention and long-term use, which usually lead to monetization.

In this document, you will find definitions of each of the entities of LevelUp, the connections between them, and code examples that demonstrate how to use them.

###**LevelUp Hierarchy**

The SOOMLA team has examined dozens of games and has observed that most game progress and accomplishment can be packed into worlds. Worlds can contain both levels and worlds internally, and may have missions that can be completed in order to receive rewards.

![alt text](/img/tutorial_img/soomla_diagrams/LevelUp.png "Soomla LevelUp Model")

###**Prerequisites**

This document assumes that you have a good understanding of SOOMLA's Store module. If not, please take time to read about the [Economy Model](/docs/platforms/unity/EconomyModel), and then come back to this document.

The `Schedule` and `Reward` entities are widely used in the examples of this document. You can read about them [here](#auxiliary-models).

##SoomlaLevelUp

This class is the top level container for the unity3d-levelup model and definitions. It stores the configurations of the game's world-hierarchy and provides lookup functions for `LevelUp` model elements.

`SoomlaLevelUp` is the central point of initialization. To use `LevelUp` you'll need to compose `World`s, `Level`s, `Mission`s, `Score`s, `Gate`s, `Reward`s, and then instantiate `SoomlaLevelUp` with your root `World`.

<br>
**Useful Functions**

``` cs
// Retrieve a `World` by its ID:
World world = SoomlaLevelUp.GetWorld(someWorld.ID);

// Retrieve a `Score` by its ID:
Score score = SoomlaLevelUp.GetScore(someScore.ID);

// Retrieve a `Gate` by its ID:
Gate gate = SoomlaLevelUp.GetGate(someGate.ID);

// Retrieve a `Mission` by its ID:
Mission mission = SoomlaLevelUp.GetMission(someMission.ID);

// Retrieve a `Reward` by its ID:
Reward reward = SoomlaLevelUp.GetReward(someReward.ID);

// Retrieve the number of Worlds in your game:
int numOfWorlds = SoomlaLevelUp.GetWorldCount(true);

// Retrieve the number of Levels in a given World:
int levels = SoomlaLevelUp.GetLevelCountInWorld(someWorld);

// Retrieve the number of `Level`s in the game:
int totalLevels = SoomlaLevelUp.GetLevelCount();

// Retrieve the number of completed `Level`s:
int completedLevels = SoomlaLevelUp.GetCompletedWorldCount();
```

<br>
##**World**

A game can have multiple `World`s or a single one, and `World`s can also contain other `World`s in them. In some games, these are referred to as level packs. Often, a `World` contains a set of `Level`s, or multiple sets. A `World` can also have a potential `Gate` that defines the criteria to enter it. Games that don’t have the concept of `World`s can be modeled as single `World` games.

**A `World` contains the following *optional* elements:**

- `Gate` - The `Gate` that defines the criteria to enter this `World`.

- `InnerWorldsMap` - The `World`s contained in this `World`.

- `Scores` - A list of `Score`s that this `World` contains . In the class `World`, you can add, retrieve, set, increase, decrease, and reset `Score`s, whether there are multiple `Score`s, or a single one.

- `Missions` - A list of `Mission`s that this `World` contains. In the class `World` you can add more `Mission`s.

<br>
####**HOW TO DEFINE**

For your convenience, there are multiple ways to define a `World`.

``` cs
// Simple constructor that receives only an ID.
World jungleWorld = new World("jungleWorld");

// Instantiation of gates, scores, and missions will
// be demonstrated in the relevant sections below.
World lakeWorld = new World(
  "lakeWorld",                          // ID
  gate,                                 // Gate to enter this world
  innerWorlds,                          // Inner worlds	(or levels)
  scores,                               // Scores of this world
  missions,                             // Missions of this world
);
```

<br>
####**COMMON USE**

**Add `World`s or `Levels` to a `World`**:

``` cs
// Create a batch of `Level`s and add them to the `World`. Instead
// of creating many levels one by one, you can create them all at
// once, and save time.
jungleWorld.BatchAddLevelsWithTemplates(
  10,                                   // Number of levels in this world
  someGate,                             // Gate for each of the levels
  new List<Score>() { ... },            // Scores for each of the levels
  new List<Mission>() { ... }           // Missions for each of the levels
);

// Add an inner world
World jungleWorldInner = new World("innerWorld");
jungleWorld.AddInnerWorld(jungleWorldInner.ID);

// Fetch an inner world
World innerWorld = jungleWorld.GetInnerWorldAt(0);
```

<br>
**Get/Set completion status:**

``` cs
bool canStart = jungleWorld.CanStart(); // check world's status

jungleWorld.SetCompleted(true); // set as completed

bool isComplete = jungleWorld.IsCompleted(); // check if complete
```

<br>
**Add elements to a `World`:**
You can add `Mission`s and `Score`s to an existing `World`.

``` cs
Mission mission = new ... ;
jungleWorld.AddMission(mission);

Score score = new ... ;
jungleWorld.AddScore(score);
```

<br>
**Manipulate/Query `Score`(s) of a `World`:**

Use the different functions provided in `World` to get, set, increase, and decrease its `Score`s.  You can use `SumInnerWorldsRecords()` to sum up the `Score`s of the inner `World`s or `Level`s. Some functions are intended for a single `Score`, while others are for multiple `Score`s - you can differentiate between them according to their names and signatures.

``` cs
/** For worlds with single scores: **/

jungleWorld.SetSingleScoreValue(300); // set score to 300

jungleWorld.IncSingleScore(100); // increase score by 100

jungleWorld.DecSingleScore(50); // increase score by 50

Score score = jungleWorld.GetSingleScore(); // get score: value is 350

double total = jungleWorld.SumInnerWorldsRecords(); // get the total score of all inner world (levels) scores


/** For worlds with multiple scores: **/

jungleWorld.SetScoreValue(someScore.ID, 500); // set someScore to 500

jungleWorld.IncScore(someScore.ID, 200); // increase score by 200

jungleWorld.DecScore(someScore.ID, 100); // decrease score by 100

jungleWorld.ResetScores(true); // reset score values & save
```

<br>
**Manipulate/Query `Reward(s)` of a `World`:**

``` cs
Reward coinReward = new ...
jungleWorld.AssignReward(coinReward); // assign this reward to this World

String rewardID = jungleWorld.getAssignedRewardID(); // get reward ID
```

<br>
**Example: Print all Record scores and Latest Scores**

``` cs
string scoreName;
double scoreVal;
string message;

// Create a World
World worldA = new World("worldA");

// Add a few scores to worldA

// Print all the record values of the scores of worldA
Dictionary<string, double> recordScores = worldA.GetRecordScores();
foreach(KeyValuePair<string, double> entry in recordScores)
{
	scoreName = entry.Key;
	scoreVal = entry.Value;
	message = scoreName + ": " + scoreVal;
	SoomlaUtils.LogDebug("", message);
}

// Print all the latest values of the scores of worldA
Dictionary<string, double> latestScores = worldA.GetLatestScores();
foreach(KeyValuePair<string, double> entry in latestScores)
{
	scoreName = entry.Key;
	scoreVal = entry.Value;
	message = scoreName + ": " + scoreVal;
	SoomlaUtils.LogDebug("", message);
}
```

<br>
##**Level**

One of the most common ways to create a sense of progress and accomplishment in games is to have levels. Every `Level` has a state, that is always one of: `Idle`, `Running`, `Paused`, `Ended`, or `Completed`. To use levels correctly, you need to use the provided `Start`, `Pause`, and `End` functions, in order for the level to keep an updated record of what its state is.

**A `Level` contains the following elements:**

- `StartTime` - The start time of this level.

- `Elapsed` - The duration of the play time for this level. This can be used for games that need to keep track of how long the user has been playing the level in order to calculate his / her `Score` at the end.

- `State` - The state of the level is initially `Idle`. While the user is playing the level is in `Running` mode, and can later be one of `Paused`, `Ended`, or `Completed`.

<br>
**HOW TO DEFINE**

`Level` has a few different constructors, 2 of which are shown here. The section about `World`s, above, demonstrates the use of a function called `BatchAddLevelsWithTemplates` which is much more convenient to use than the `Level` constructors.

``` cs
Level level1 = new Level("level1ID");

Level level2 = new Level(
		"level2ID",
		someGate,
		new Dictionary<string, Score> {{ "", score }},
		new List<Mission> () { someMission }
);
```

<br>
**COMMON USE**

**Start, pause, or end this `Level`:**

``` cs
level1.Start();

level1.Pause();

level1.Start();

level1.End();

level1.Restart();
```

<br>
**Manipulate a specific `Level`:**

``` cs
level1.SetCompleted(true);
```

<br>
**Query a specific level**

``` cs
int timesPlayed = level1.GetTimesPlayed();

int timesStarted = level1.GetTimesStarted();

long slowDuration = level1.GetSlowestDurationMillis();

long fastDuration = level1.GetFastestDurationMillis();

long playDuration = level1.GetPlayDurationMillis();
```

<br>
##**Score**

Represents a score in the game. A simple game usually has one generic numeric score which grows as the user progresses in the game. A game can also have multiple scores for different aspects such as time, speed, points, etc.

**A `Score` contains the following elements:**

- `StartValue` - The initial `Score` value in the game.

- `HigherBetter`- This field defines whether it's better that the score is higher or lower. A `Score` can be ascending in nature such as regular points (higher is better) or can be descending such as time-to-complete level (lower is better).

- `_tempScore` - The *current* value of this score.

<br>
####**HOW TO DEFINE**

There are multiple ways to define a `Score`.

``` cs
// Simple constructor that receives only an ID.
Score score = new Score("score_ID");

Score numberScore = new Score(
  "numberScore",                        // ID
  "Number Score",                       // Name
  true                                  // Ascending(higher is better)
);
```

<br>
####**COMMON USE**

**Check if the `Score` in the current game session has reached a certain value:**

``` cs
Reward badgeReward = new BadgeReward(...)

// If the score has reached 5000 give the user a badge.
if (numberScore.HasTempReached(5000)) {
  badgeReward.Give();
}
```

<br>
**Check if the `Score` has reached a record:**

``` cs
// Checks if a value of 300 breaks numberScore's record.
if (numberScore.HasRecordReached(300)) {
  // Do something...
}
```

<br>
**Manipulate a `Score` by using its functions to get, set, increase, and decrease it.**

``` cs
numberScore.SetTempScore(50); // numberScore = 50

numberScore.Inc(200); // numberScore = 250

numberScore.Dec(100); // numberScore = 150

numberScore.Reset(true); // numberScore = 0

int n = numberScore.GetTempScore(); // n = 0
```

<br>
###**RangeScore**

A specific type of `Score` that has an associated range. The `Score`'s  value can be only inside that range of values. **For example:** A puzzle or quiz can measure the user's success on a scale of 1 - 10, or a shooting `Score` can be on a scale of 10 to 100 according to the user's performance in the game.

<br>
####**HOW TO DEFINE**

``` cs
Score quizScore = new RangeScore(
  "quizGrade",                          // ID
  new RangeScore.SRange(0, 10)          // Range
);

Score shootingScore = new RangeScore(
  "shootingRange",                      // ID
  "Shooting Range Score",               // Name
  true,                                 // Ascending (higher is better)
  new RangeScore.SRange(10, 100)        // Range
);
```

<br>
###**VirtualItemScore**

A specific type of `Score` that has an associated virtual item, whose balance is affected by the score.

**For example:** In a game that has diamonds that the user needs to collect, you would define a `VirtualCurrency` "diamond" and a `VirtualItemScore` "diamondScore". The balance of "diamond" changes according to "diamondScore".  

<br>
####**HOW TO DEFINE**

There are multiple ways to define a `VirtualItemScore`.

``` cs
VirtualCurrency diamond = new ...
Score diamondScore = new VirtualItemScore(
  "diamondScore1",                      // ID
  diamond.ID                            // Associated item ID
);

VirtualCurrency coin = new ...
Score coinScore = new VirtualItemScore(
  "coinScore",                          // ID
  "Coin Score",                         // Name
  true,                                 // Ascending (higher is better)
  coin.ID                               // Associated item ID
);
```

<br>
##**Gate**

A `Gate` is an object that defines certain criteria for progressing between the game's `World`s or `Level`s. The `Gate` is a criteria or list of rules which which must be met in order to enter the `World` or `Level`. The rules are based on components of the previous `World` or `Level`: scores achieved, missions completed, etc. The `Gate` is opened once the logical conditions are met. In some games, `Gate`s can be opened with a payment or social task, such as sharing the game on Facebook.

<div class="info-box">`Gate` is an abstract class. Below are explanations of several types of `Gate`s that implement `Gate` and examples of how to use them.</div>

<br>
####**HOW TO OPEN**

All `Gate`s share the same definition, as explained above, but each `Gate` opens in a different way. Some `Gate`s need to be opened manually by the developer, and others will open automatically when a specific event is thrown. You'll find below an explanation of each type of `Gate` including how it opens.

<br>
###**BalanceGate**

A specific type of `Gate` that has an associated virtual item and a desired balance. The`Gate` **automatically** opens once the item's balance has reached the desired balance.

This type of gate encourages the user to collect more of some virtual item, such as coins or diamonds, and therefore creates motivation for the user to keep playing.  

<br>
####**HOW TO DEFINE**

``` cs
VirtualCurrency muffin = new ...

// Collect 5 muffins to open the gate
Gate bGate = new BalanceGate(
  "bGate",                              // ID
  muffin.ID,                            // Associated Item ID
  5                                     // Desired balance
);
```

<br>
####**USE CASE**

``` cs
int balance;
bool isOpen;

balance = StoreInventory.GetItemBalance(muffin.ID); // balance = 0

isOpen = bGate.IsOpen();  // False because the muffin balance hasn't
                          // reached the desired balance (5).

StoreInventory.GiveItem(muffin.ID, 5);

balance = StoreInventory.GetItemBalance(muffin.ID); // Now balance = 5

isOpen = bGate.IsOpen(); // True because the balance has reached the desired balance (5).
```

<br>
###**PurchasableGate**

A specific type of `Gate` that has an associated Virtual item. This `Gate` is useful when you want to allow unlocking of certain `Level`s or `World`s only if they are purchased.

`PurchasableGate` can be used either to monetize your game, by making the user pay real money, or to create retention by giving the user motivation to collect enough currencies to make the needed purchase.

<div class="info-box">**IMPORTANT:** This `Gate` does not open automatically when the relevant item has been purchased, but rather the developer has to *manually* open it. Once the `Gate` is opened (by calling `Open()`), the purchase process of the associated virtual item begins. See "Use Case" below.</div>

<br>
####**HOW TO DEFINE**

``` cs
VirtualGood shield = new SingleUseVG(
  "name", "description", "ID",
  new PurchaseWithMarket("product_ID", 1.99)
);

// The user must buy the 'itemToBuy' in order to open this Gate.
Gate pGate = new PurchasableGate(
  "purchaseGate",              // ID
  shield.ID                    // Associated item ID
);
```

<br>
####**USE CASE**

``` cs
bool isOpen;

isOpen = pGate.IsOpen();  // False

pGate.Open(); // Eventually, Open() calls StoreInventory.BuyItem(shield.ID, pGate.ID);

isOpen = pGate.IsOpen();  // True because the shield item has been purchased.
```

<br>
###**RecordGate**

A RecordGate has an associated score and a desired record. The `Gate` opens **automatically** once the player achieves the desired record.

`RecordGate` can be used to highly promote game progression. For example, if there is `RecordGate` for each level in the game, the user will be encouraged to continuously beat his/her own score.

<br>
####**HOW TO DEFINE**

``` cs
Score numberScore = new Score("numberScore", "Score", true);

// The user needs to reach a record of 5000 for numberScore in order to open this Gate.
Gate rGate = new RecordGate(
  "rGate",                      // ID
  numberScore.ID,               // Associated score ID
  5000                          // Score record that opens the gate
);
```

<br>
####**USE CASE**

``` cs
bool isOpen;
bool reachedRecord;

reachedRecord = numberScore.HasRecordReached(5000.0); // False because numberScore has
                                                      // a record of 0

isOpen = rGate.IsOpen(); // False, because numberScore hasn't reached a record of 5000

numberScore.Inc(5000.0); // Now, the value of numberScore is 5000

numberScore.Reset(true); // Saves the score and its new record in the storage

reachedRecord = numberScore.HasRecordReached(5000); // True!

isOpen = rGate.IsOpen(); // True because numberScore has reached the record of 5000
```

<br>
###**ScheduleGate**

A specific type of `Gate` that has a schedule that defines when the `Gate` can be opened. The `Gate` opens **automatically** according to the defined schedule.

`ScheduleGate` can be used to create suspense and reel in the user to play at specific times that you define. For example, you can define a `ScheduleGate` that unlocks a bonus level on Friday at 5pm. Chances are that the exclusivity of the bonus level (that can only be unlocked once a week), will cause the user to make himself/herself available for play on the time you specified.

<br>
####**HOW TO DEFINE**

``` cs
// Note that there are multiple ways to declare a schedule.
// This is just one of them.
Schedule schedule = new Schedule(
  DateTime.Now,                         // Start time
  DateTime.Now.AddHours(2),             // End time
  Schedule.Recurrence.EVERY_DAY,        // Recurrence
  1                                     // Activation limit
);

// This Gate is open if we are within the time frame defined
// in the schedule.
Gate sGate = new ScheduleGate("ID", schedule);
```

<br>
####**USE CASE**

``` cs
bool isOpen;

// Now:
isOpen = sGate.IsOpen();  // True because we are within the defined time frame.

// 3 hours later:
isOpen = sGate.IsOpen();  // False because we are NOT within the defined time frame.
```

<br>
###**WorldCompletionGate**

A `WorldCompletionGate` has an associated `World` that. Once the `World` is completed, the `Gate` **automatically** opens.

This gate is perhaps, the simplest of the gates, in that its only requirement is that the user finish the previous World in order to move on to the next.

<br>
####**HOW TO DEFINE**

``` cs
World worldA = new World("worldA");

//The user must complete worldA in order to open this Gate.
Gate wGate = new WorldCompletionGate(
  "wGate",                              // ID
  worldA.ID                             // Associated World ID
);
```

<br>
####**USE CASE**

``` cs
bool isOpen;
bool isCompleted;

isCompleted = worldA.IsCompleted(); // False because worldA has not been completed.

isOpen = wGate.IsOpen(); // False because worldA has not been completed.

worldA.SetCompleted(true); // Set worldA as completed.

isOpen = wGate.IsOpen(); // True because worldA has been completed.
```

<br>
###**GatesList**

A list of one or more `Gate`s that together define a composite criteria for progressing between the game's `World`s or `Level`s.

There are two kinds of `GatesList`s:

<br>
####**GatesListAND**

A specific type of `GatesList` that can be opened only if ALL `Gate`s in its list are open.

This gate is very demanding since it requires multiple criteria in order to be opened. Once the gate is opened, you can allow the user to skip one `World` and continue on to the next.

<br>
####**HOW TO DEFINE**

``` cs
// NOTE: wGate and rGate are defined in the sections above.
Gate wGateANDrGate = new GatesListAND(
	"wGateANDrGate",                      // ID
	new List<Gate>() { wGate, rGate }     // List of Gates
);
```

<br>
####**USE CASE**

``` cs
// The user needs to meet the criteria of wGate AND of rGate
// in order to open this Gate. For the definitions of wGate and
// rGate, see the topics WorldCompletionGate and RecordGate above.

int isOpen;
bool isCompleted;
bool wGateIsOpen;
bool rGateIsOpen;

isCompleted = worldA.IsCompleted(); // False because worldA has not been completed

wGateIsOpen = wGate.IsOpen(); // False because worldA has not been completed

rGateIsOpen = rGate.IsOpen(); // False because numberScore hasn't reached a record of 5000

worldA.SetCompleted(true); // Set worldA as completed

wGateIsOpen = wGate.IsOpen(); // True because worldA has been completed

isOpen = wGateANDrGate.IsOpen(); // False because we need both of the gates to be open

numberScore.Inc(5000.0); // Now numberScore = 5000

numberScore.Reset(true); // Save the score and its record in the storage

isOpen = wGateANDrGate.IsOpen(); // TRUE! because both gates have been opened
```

<br>
####**GatesListOR**
A specific type of `GatesList` that can be opened if AT LEAST ONE `Gate` in its list is open.

`GatesListOR` gives the user more than one option to unlock some Level or World, by opening at least one of the specified gates.

<br>
####**HOW TO DEFINE**

``` cs
// NOTE: wGate and rGate are defined in the sections above.
Gate wGateORpGate = new GatesListOR(
  "",                                   // ID
  new List<Gate>() { wGate, rGate }     // List of Gates
);
```

<br>
####**USE CASE**

``` cs
// The user needs to meet the criteria of wGate OR of rGate
// in order to open this Gate. For the definitions of wGate and
// rGate, see the topics WorldCompletionGate and RecordGate above.

bool isOpen;
bool wGateIsOpen;
bool rGateIsOpen;
bool isCompleted;

isCompleted = worldA.IsCompleted(); // False because worldA has not been completed.

wGateIsOpen = wGate.IsOpen(); // False because worldA has not been completed.

rGateIsOpen = rGate.IsOpen();  // False because numberScore hasn't reached a record of 5000.0

worldA.SetCompleted(true); // Set worldA as completed.

wGateIsOpen = wGate.IsOpen();  // True because worldA has been completed.

isOpen = wGateORrGate.IsOpen(); // TRUE! We only need one of the gates to be open,
                                // in this case it's wGate that's open.
```

<br>
###**SocialActionGate**

`SocialActionGate`s require the user to perform a specific social action in order to open the `Gate`s. Currently, the social provider that's available is Facebook, so the `Gate`s are FB-oriented. In the future, more social providers will be added.

`SocialActionGate`s allow you to enforce social engagement by locking certain levels or worlds behind social interactions. For example, you can ask your users to like your page or share a specific status about your game, and in return unlock a bonus level or world for them. In this win-win situation your users will be pleased, and the network effect will increase the popularity of your game.

<div class="info-box">`SocialActionGate` is an abstract class. Below are explanations of the four types of social `Gate`s that implement `SocialActionGate`. All types of `Gate`s implement the superclass `Gate` and therefore, implement its functionality and behavior.

Also, please note that `SocialActionGate`s are dependent on SOOMLA's [unity3d-profile](https://github.com/soomla/unity3d-profile).</div>

<br>
###**SocialLikeGate**

A specific type of `Gate` that has an associated page name.

<div class="info-box">**IMPORTANT:** This `Gate` does not open automatically when the relevant page has been liked, but rather the developer has to *manually* open it. Once the `Gate` is opened (by calling `Open()`), the `Like()` function is called.</div>

<br>
####**HOW TO DEFINE**

``` cs
SocialActionGate likeGate = new SocialLikeGate(
  "likeGate",                           // ID
  Soomla.Profile.Provider.FACEBOOK,     // Social Provider
  "[page name]"                         // Page to "Like"
);
```

<br>
###**SocialStatusGate**

A specific type of `Gate` that has an associated status.

<div class="info-box">**IMPORTANT:** This `Gate` does not open automatically when the relevant status has been posted, but rather the developer has to *manually* open it. Once the `Gate` is opened (by calling `Open()`), the `UpdateStatus()` function is called.</div>

<br>
####**HOW TO DEFINE**

``` cs
SocialActionGate statusGate = new SocialStatusGate(
  "statusGate",                         // ID
  Soomla.Profile.Provider.FACEBOOK,     // Social Provider
  "[status]"                            // Status to post
);
```

<br>
###**SocialStoryGate**

A specific type of `Gate` that has an associated story.

<div class="info-box">**IMPORTANT:** This `Gate` does not open automatically when the relevant story has been posted, but rather the developer has to *manually* open it. Once the `Gate` is opened (by calling `Open()`), the `UpdateStory()` function is called.</div>

<br>
####**HOW TO DEFINE**

``` cs
SocialActionGate storyGate = new SocialStoryGate(
  "storyGate",                          // ID
  Soomla.Profile.Provider.FACEBOOK,     // Social provider
  "[This is the message for the story]",
  "[Story Name]",
  "[Caption for the image]",
  "[Link]",
  "[Image Url]"
);
```

<br>
###**SocialUploadGate**

A specific type of `Gate` that has an associated image.

<div class="info-box">**IMPORTANT:** This `Gate` does not open automatically when the relevant image has been uploaded, but rather the developer has to *manually* open it. Once the `Gate` is opened (by calling `Open()`), the `UploadImage()` function is called.</div>

<br>
####**HOW TO DEFINE**

``` cs
SocialActionGate uploadGate = new SocialUploadGate(
  "uploadGate",                         // ID
  Soomla.Profile.Provider.FACEBOOK,     // Social provider
  "[FileName]",                         // Name of image file
  "[Message to upload with]",           // Message
  new Texture2D(128, 128)
);
```

<br>
##**Mission**

A `Mission` is a task your users need to complete in your game. `Mission`s are the glue between `Gate`s and `Reward`s; Specific `Reward`s can be given to users that complete `Mission`s, and every `Mission` has a `Gate` that must be opened in order to complete it. You can create `Mission`s and use them as single, independent entities OR create a `Challenge` to handle several `Mission`s and monitor their completion. Some `Mission`s may be completed multiple times.

**A `Mission` contains the following elements:**

- `Rewards` - Rewards that can be earned when completing this `Mission`.

- `Schedule` - A schedule that defines the number of times this `Mission` can be played, how often, etc.

- `Gate` - A `Gate` that needs to be opened in order to complete this `Mission`.

<br>
####**HOW TO COMPLETE**

All `Mission`s share the same definition, as explained above, but each `Mission` is completed in a different way. Some `Mission`s need to be completed manually by the developer (by calling `Complete()`), and others will automatically be completed when a specific event is thrown. You'll find below an explanation of each type of `Mission` including how it's completed.

<div class="info-box">NOTICE: `Mission` is an abstract class. Below are several types of missions that implement `Mission`.</div>

<br>
####**COMMON USE**

All missions have the same functionality.

**Check if the `Mission` is available:**

This function determines whether a `Mission` is available to be set as completed, by checking the criteria that makes the `Mission` available, as well as the number of times that this `Mission` can be completed.

For example, let's say that you allow your user to complete "mission A" once, and "Mission B" an unlimited number of times. In this case, when you call `IsAvailable()` on "mission A", it'll return true before the user has completed the mission, and false afterwards. However, every time you call `IsAvailable()` on "mission B", it'll return true, no matter how many times the mission has been completed.

``` cs
if (someMission.IsAvailable()) {
  // Do something...
}
```

**Check if the `Mission` is completed:**

``` cs
if (someMission.IsCompleted()) {
  // Do something...
}
```

<br>
###**BalanceMission**

A specific type of `Mission` that has an associated virtual item and a desired balance. The `Mission` is **automatically** complete once the item's balance reaches the desired balance.

<br>
####**HOW TO DEFINE**

``` cs
Reward reward = new ...
VirtualCurrency coin = new ...

// To complete this mission the user needs to collects 250 coins.
// Once the mission is complete he/she will receive the reward.
Mission bMission = new BalanceMission(
  "coinMission",                        // ID
  "Coin Mission",                       // Name
  new List<Reward>() { reward },        // Rewards
  coin.ID,                              // Associated virtual item ID
  250                                   // Desired balance
);
```

<br>
####**USE CASE**

``` cs
int balance;
bool isCompleted;

balance = StoreInventory.GetItemBalance(coin.ID); // Balance = 0

isCompleted = bMission.IsCompleted(); // False because the coin balance hasn't
                                      // reached the desired balance (250).

StoreInventory.GiveItem(coin.ID, 250);

balance = StoreInventory.GetItemBalance(coin.ID); // Now balance = 250

isCompleted = bMission.IsCompleted(); // True because the balance has reached
                                      // the desired balance (250).
```

<br>
###**RecordMission**

A specific type of `Mission` that has an associated score and a desired record. The `Mission` is **automatically** complete once the player achieves the desired record for the given score.

<br>
####**HOW TO DEFINE**

``` cs

// To complete this mission the user needs the coinScore to reach a record of 5000.
// Once the mission is complete he/she will receive the reward(s).
Mission rMission = new RecordMission(
  "rMission",                           // ID
  "Coin Record Score",                  // Name
  new List<Reward>() { someReward },    // Reward(s)
  coinScore.ID,                         // Associated Score ID
  2000.0                                // Desired record
);
```

<br>
####**USE CASE**

``` cs
bool isCompleted;
bool reachedRecord;

reachedRecord = coinScore.HasRecordReached(2000.0); // False because numberScore
                                                    // has a record of 0

isCompleted = rMission.IsCompleted();  // False, because numberScore hasn't reached
                                       //a record of 2000

coinScore.Inc(2000.0); // Now, the value of numberScore is 2000

coinScore.Reset(true); // Saves the score and its new record in the storage

reachedRecord = coinScore.HasRecordReached(2000.0); // True because numberScore has
                                                    // reached the record of 2000

isCompleted = rMission.IsCompleted();  // TRUE!
```

<br>
###**PurchasingMission**

A specific type of `Mission` that has an associated market item.

<div class="info-box">**IMPORTANT:** This `Mission` is not completed automatically when the relevant item has been purchased, but rather the developer has to *manually* complete it. Once the `Mission` is complete (by calling `Complete()`), the purchase process of the associated virtual item begins. See "Use Case" below.</div>

<br>
####**HOW TO DEFINE**

``` cs
VirtualGood itemToBuy = new SingleUseVG("name", "description", "ID", new PurchaseWithMarket("product_ID", 1.99));

// To complete this mission the user needs to buy the item.
// Once the mission is complete he/she will receive the reward(s).
Mission pMission = new PurchasingMission(
  "pMission",                           // ID
  "Purchasing Mission",                 // Name
  new List<Reward>() { someReward },    // Reward(s)
  itemToBuy.ID                          // Associated item ID
);

```

<br>
####**USE CASE**

``` cs
bool isCompleted;

isCompleted = pMission.IsCompleted();  // False

pMission.Complete(); // Eventually, Complete() calls StoreInventory.BuyItem(itemToBuy.ID, pMission.ID);

isCompleted = pMission.IsCompleted();  // True because the item has been purchased.
```

<br>
###**WorldCompletionMission**

A specific type of `Mission` that has an associated `World`. The `Mission` is **automatically** complete once the `World` has been completed.

<br>
####**HOW TO DEFINE**

``` cs
World worldA = new World("worldA");

// To complete this mission the user needs to complete worldA.
// Once the mission is complete he/she will receive the reward(s).
Mission wMission = new WorldCompletionMission(
  "wMission",                           // ID
  "World completion Mission",           // Name
  new List<Reward>() { someReward },    // Reward(s)
  worldA.ID                             // Associated World ID
);
```

<br>
####**USE CASE**

``` cs
bool isMissionComplete;
bool isWorldComplete;

isWorldComplete = worldA.IsCompleted(); // False because worldA has not been completed yet.

isMissionComplete = wMission.IsCompleted(); // False because worldA has not been completed.

worldA.SetCompleted(true); // Set worldA as completed.

isMissionComplete = wMission.IsCompleted(); // True because worldA has been completed.
```

<br>
<div class="info-box">The following `Mission`s require the user to perform a specific social action in order to receive a `Reward`. Currently, the social provider that's available is Facebook, so the `Mission`s are FB-oriented. In the future, more social providers will be added. Please note that `SocialActionGate`s are dependent on SOOMLA's [unity3d-profile](https://github.com/soomla/unity3d-profile).</div>

<br>
###**SocialLikeMission**

A specific type of `Mission` that has an associated page name.

<div class="info-box">**IMPORTANT:** This `Mission` is not completed automatically when the relevant page has been liked, but rather the developer has to *manually* complete it. Once the `Mission` is complete (by calling `Complete()`), the `Like()` function is called.</div>

<br>
####**HOW TO DEFINE**

``` cs
Mission likeMission = new SocialLikeMission(
  "likeMission",                        // ID
  "Like Mission",                       // Name
  new List<Reward>() { r1, r2 },        // Rewards
  Soomla.Profile.Provider.FACEBOOK,     // Social provider
  "[page name]"                         // Page to "Like"
);
```

<br>
###**SocialStatusMission**

A specific type of `Mission` that has an associated status.

<div class="info-box">**IMPORTANT:** This `Mission` is not completed automatically when the relevant status has been posted, but rather the developer has to *manually* complete it. Once the `Mission` is complete (by calling `Complete()`), the `UpdateStatus()` function is called.</div>

<br>
####**HOW TO DEFINE**

``` cs
Mission statusMission = new SocialStatusMission(
  "statusMission",                      // ID
  "Status Mission",                     // Name
  new List<Reward>() { r1, r2 },        // Rewards
  Soomla.Profile.Provider.FACEBOOK,     // Social provider
  "[status]"                            // Status to post
);
```

<br>
###**SocialStoryMission**
A specific type of `Mission` that has an associated story that includes a message, story name, caption, link, and image.

<div class="info-box">**IMPORTANT:** This `Mission` is not completed automatically when the relevant story has been posted, but rather the developer has to *manually* complete it. Once the `Mission` is complete (by calling `Complete()`), the `UpdateStory()` function is called.</div>

<br>
**HOW TO DEFINE**

``` cs
Mission storyMission = new SocialStoryMission(
  "storyMission",                       // ID
  "Story Mission",                      // Name
  new List<Reward>() { r1, r2 },        // Rewards
  Soomla.Profile.Provider.FACEBOOK,     // Social provider
  "[Message for the story]",
  "[Story Name]",
  "[Caption for the image]",
  "[Link]",
  "[Image Url]"
);
```

<br>
###**SocialUploadMission**
A specific type of `Mission` that has an associated filename and message.

<div class="info-box">**IMPORTANT:** This `Mission` is not completed automatically when the relevant image has been uploaded, but rather the developer has to *manually* complete it. Once the `Mission` is complete (by calling `Complete()`), the `UploadImage()` function is called.</div>

<br>
####**HOW TO DEFINE**

``` cs
Mission uploadMission = new SocialUploadMission(
  "uploadMission",                      // ID
  "Upload Mission",                     // Name
  new List<Reward>() { r1, r2 },        // Rewards
  Soomla.Profile.Provider.FACEBOOK,     // Social provider
  "[FileName]",                         // Name of image file
  "[Message to upload with]",           // Message
  new Texture2D(0, 0)                   // TODO
);
```

<br>
##**Challenge**

Missions can be aggregated into challenges which can contain a single mission or multiple ones. The user is required to complete all these missions in order to earn the reward associated with the challenge.

<br>
####**HOW TO DEFINE**

``` cs
// To complete this challenge, the user must complete both missions.
// Once the challenge is complete, he/she will receive the reward(s).
// Note that wMission and rMission are defined in the examples above.
Challenge challenge = new Challenge(
  "challenge",                                    // ID
  "2 Mission Challenge",                          // Name
  new List<Mission>() { wMission, rMission },     // Missions
  new List<Reward>() { someReward }               // Reward(s)
);
```

<br>
####**USE CASE**

``` cs
bool isCompleted;

isCompleted = challenge.IsCompleted(); // False because the missions haven't been completed

worldA.SetCompleted(true); // Complete wMission

isCompleted = challenge.IsCompleted(); // False because only 1 of 2 missions is complete

numberScore.Inc(2000.0); // Now numberScore = 2000
numberScore.Reset(true); // Save the new record in storage

isCompleted = challenge.IsCompleted(); // TRUE! Both missions have been completed
```

##Auxiliary Models

###**Schedule**

A `Schedule` defines any time restrictions that an entity may have.

**A `Schedule` contains the following restrictions:**

- `RequiredRecurrence` - How often is this entity available? Every month, week, day, hour?

  **For example:** A `Mission` that is available to be completed every Monday.

- `TimeRanges` - A range of time that this entity is available, with a start time and an end time.

  **For example:** A `Reward` that can be given starting when the user finishes a certain `Level` and ending 1 hour later.

- `ActivationLimit` - The number of times that this entity is available for use.

  **For example:** A `Mission` that can be attempted 10 times throughout gameplay.

<br>
###**Reward**

<div class="info-box">Note that `Reward` is a part of soomla-unity3d-core, and *not* part of the LevelUp module. However, because `Reward`s are used very often throughout Levelup, it's important that you are familiar with the different `Reward` types.</div>

A `Reward` is an entity which can be earned by the user for meeting certain criteria in game progress. For example - a user can earn a badge for completing a `Mission`. Dealing with `Reward`s is very similar to dealing with `VirtualItem`s: grant a `Reward` by giving it, and recall a `Reward` by taking it.

`Reward` is an abstract class. Below are several types of rewards that implement `Reward`.

<br>
**COMMON USE**

All rewards have the same functionality.

**Give a `Reward`:**

Use this to give your user a `Reward`, for example you can give your users a `Reward` of 100 coins just for downloading your game.

``` cs
coinReward.Give();
```

**Take a `Reward`:**

Use this to recall a `Reward` from your user.

``` cs
reward.Take();
```

<br>
####**VirtualItemReward**

A specific type of `Reward` that you can use to give your users some amount of a virtual item. **For example:** Give users 100 coins (virtual currency) when they complete a `Mission`.

**HOW TO DEFINE**

``` cs
VirtualCurrency coin = new VirtualCurrency("Coin", "", "coin_currency");

Reward coinReward = new VirtualItemReward(
  "vReward",                            // ID
  "Coin Reward",                        // Name
  coin.ID,                              // Associated item ID
  100                                   // Amount
);
```

<br>
####**BadgeReward**

A specific type of `Reward` that represents a badge with an icon. **For example:** when the user achieves a top score,  the user can earn a "Highest Score" badge reward.

**HOW TO DEFINE**

``` cs
Reward goldMedal = new BadgeReward(
  "badge_goldMedal",                    // ID
  "Gold Medal"                          // Name
);
```

<br>
####**SequenceReward**

 A specific type of `Reward` that holds a list of other `Reward`s in a certain sequence. The rewards are given in ascending order. **For example:** In a Karate game the user can progress between belts and can be rewarded a sequence of: blue belt, yellow belt, green belt, brown belt, and lastly, black belt.

**HOW TO DEFINE**

``` cs
Reward blueBelt = new BadgeReward(
  "blueBelt",                           // ID
  "Karate blue belt"                    // Name
);
// Assume the same instantiation for the rest of the belts.

Reward beltReward = new SequenceReward(
  "beltReward",                         // ID
  "Belt Reward",                        // Name
  new List<Reward>() {                  // Rewards in sequence
    blueBelt,
    yellowBelt,  
    greenBelt,  
    brownBelt,  
    blackBelt }
);
```

<br>
####**RandomReward**

A specific type of `Reward` that holds a list of other `Reward`s. When this `Reward` is given, it randomly chooses a `Reward` from the list of `Reward`s it internally holds. **For example:** A user can earn a mystery box `Reward` that grants him/her a random `Reward`.

**HOW TO DEFINE**

``` cs
Reward mysteryReward = new RandomReward(
  "mysteryReward",                      // ID
  "Mystery Box Reward",                 // Name
  new List<Reward>() {                  // Rewards to choose from
    goldMedal,
    coinReward }
);
```
