---
layout: "content"
image: "Modeling"
title: "Game Design Model"
text: "Learn about the different entities of LevelUp to understand how to build your game structure and progressions behavior."
position: 2
theme: 'soomla'
collection: 'soomla_levelup'
---

#LEVELUP: Model & Operations

##About

###Prerequisite: SOOMLA Store

SOOMLA Store provides game developers with an economy model that every game economy can be based upon. The economy model includes currencies, packs of currencies, and several types of virtual items that can be sold for money or in exchange for other items. You need to understand the [Store Economy Model](/docs/platforms/cocos2dx/EconomyModel) before continuing to read about `LevelUp`.

###LevelUp

`LevelUp` models out worlds, levels, scores, missions, and more, all in one framework that allows game developers to build their game structure and progressions behavior easily and effectively. The sense of progress that users feel in a game is what creates retention and long-term use, which usually lead to monetization.

In this document, you will find definitions of each of the entities of `LevelUp`, the connections between them, and code examples that demonstrate how to use them.

<br>

####**LevelUp Hierarchy**

After observing dozens of games, the SOOMLA team realized that most game progress and accomplishment can be packed into worlds. Worlds can contain both levels and other worlds, and can have a gate that needs to be unlocked in order to enter the next world. More progress mechanisms are available under levels, which include scores, challenges, missions, and records.

![alt text](/img/tutorial_img/soomla_diagrams/LevelUpModel.png "Soomla LevelUp Model")

###Schedule

<div class="info-box">Before we begin, it's important that you know what a `Schedule` is, as you will see it used a few times in the descriptions below.</div>

A `CCSchedule` defines any time restrictions that an entity may have.

**A `CCSchedule` contains the following restrictions:**

- **Recurrence** - How often is this entity available? Every month, week, day, hour?
  **For example:** A `Gate` that can be unlocked every hour.

- **Time Ranges** - A time range that defines when this entity is available, with a start time and an end time.
**For example:** A `Reward` that can be given starting when the user finishes a certain `Level` and ending 8 seconds later.

- **Activation Limit** - The number of times that this entity is available for use.
**For example:** A `Mission` that can be attempted 10 times throughout gameplay.

###Reward

<div class="info-box">Note that `Reward` is a part of soomla-cocos2dx-core, and not part of the LevelUp module. However, because `Reward`s are used very often throughout cocos2dx-levelup, it's important that you are familiar with them and the different types.</div>

A `Reward` is an entity which can be earned by the user for meeting certain criteria in game progress. For example - a user can earn a badge for completing a `Mission`. Dealing with `Reward`s is very similar to dealing with `VirtualItem`s: grant a `Reward` by giving it, and recall a `Reward` by taking it.

`Reward` itself cannot be instantiated, but there are many types of rewards, all explained below, and those will have the functionality that `Reward` provides, such as giving or taking a reward.

<br>
####**BadgeReward**

A specific type of `Reward` that represents a badge with an icon. **For example:** when the user achieves a top score,  the user can earn a "Highest Score" badge reward.


<br>
####**SequenceReward**

 A specific type of `Reward` that holds a list of other `Reward`s in a certain sequence. The rewards are given in ascending order. **For example:** In a Karate game the user can progress between belts and can be rewarded a sequence of: blue belt, yellow belt, green belt, brown belt, and lastly, black belt.


<br>
####**VirtualItemReward**

A specific type of `Reward` that you can use to give your users some amount of a virtual item. **For example:** Give users a reward of 100 coins (virtual currency).


<br>
####**RandomReward**

A specific type of `Reward` that holds a list of other `Reward`s. When this `Reward` is given, it randomly chooses a `Reward` from the list of `Reward`s it internally holds. **For example:** A user can earn a mystery box `Reward` that grants him/her a random `Reward`.

<br>

---

##Level

One of the most common ways to create a sense of progress and accomplishment in games is to have levels. Every `Level` has a state, that is always one of: "Idle", "Running", "Paused", "Ended", or "Completed". To use levels correctly, you need to use the provided `Start`, `Pause`, and `End` functions, in order for the level to keep an updated record of what its state is.

**A `Level` contains the following elements:**

- A start time of the current level.

- The duration of the play time for this level. This can be used for games that need to keep track of how long the user has been playing the level in order to calculate his [`Score`](#score) at the end.

- The state of the current level. Initially, a level's state is "Idle". While the user is playing, the level is in "Running" mode, and can later be one of "Paused", "Ended", or "Completed".

<br>
**COMMON USE**

**Retrieve a specific `Level` according to its ID:**

To retrieve a `Level`, use `LevelUp`'s function `GetWorld()`, and use casting because `Level` IS A (extends) `World`.

``` cpp
CCLevel *level1 = (CCLevel *) CCLevelUp::getInstance()->getWorld(WORLD_LEVEL1_ID);
```

<br>
**Start, pause, restart, or end this `Level`:**

``` cpp
level1->start();
level1->pause();
level1->restart(false);
level1->end(true);
```

<br>
**Manipulate a specific `Level`:**

Get the number of times this `Level` has been played, the number of times started, the slowest / fastest duration of play, or set the `Level`as completed.

``` cpp
int timesPlayed = level1->getTimesPlayed();
int timesStarted = level1->getTimesStarted();
long slowDuration = level1->getSlowestDurationMillis();
level1->setCompleted(true);
```

<br>
**Get the number of `Level`s in the game:**

``` cpp
int totalLevels = CCLevelUp::getInstance()->getLevelCount();
```

<br>
**Get the number of completed `Level`s:**

``` cpp
int completedLevels = CCLevelUp::getInstance()->getCompletedWorldCount();
```

<br>

---

##World

A game can have multiple `World`s or a single one, and `World`s can also contain other `World`s in them. In some games, these are referred to as level packs. Often, a `World` contains a set of `Level`s, or multiple sets. A `World` can also have a potential `Gate` that defines the criteria to enter it. Games that don’t have the concept of `World`s can be modeled as single `World` games (SLM games).

**A `World` contains the following elements:**

- `mGate` - The `Gate` that defines the criteria to enter this `World`.

- `mInnerWorldsMap` - The `World`s contained in this `World`.

- `mScores` - A list of `Score`s that this `World` contains . In the class `World`, you can add, retrieve, set, increase, decrease, and reset `Score`s, whether there are multiple `Score`s, or a single one.

- `mMissions` - A list of `Mission`s that this `World` contains. In the class `World` you can add more `Mission`s.

<br>
**HOW TO DEFINE**

For your convenience, there are multiple ways to define a `World`.

``` cpp
/// Simple constructor that receives only an ID.
CCWorld *jungleWorld = CCWorld::create(CCString::create(JUNGLE_WORLD_ID));

/// Instantiation of gates, scores, and missions will
/// be demonstrated in the relevant sections below.
CCWorld *world = CCWorld::create(
  CCString::create("world_ID"),
  gate,
  innerWorlds,  
  scores,  
  missions
);
```

<br>
**COMMON USE**

**Add `Levels` to a `World`**:
`BatchAddLevelsWithTemplates` creates a batch of `Level`s and adds them to the `World`. This function will save you a lot of time. Instead of creating many levels one by one, you can create them all at once.

``` cpp
jungleWorld->batchAddLevelsWithTemplates(
  10,                                    // Number of levels in this world
  gate,                                  // Gate for each of the levels
  scores,                                // Scores for each of the levels
  missions                               // Missions for each of levels
);
```

<br>
**Get/Set completion status:**

``` cpp
jungleWorld->setCompleted(true); //set as completed

bool isCompleted = jungleWorld->isCompleted(); //check if complete
```

<br>
**Add elements to a `World`:**
You can add `Mission`s and `Score`s to an existing `World`.

``` cpp
jungleWorld->addMission(mission);

jungleWorld->addScore(score);
```

<br>
**Manipulate `Score`(s) of a `World`:**

Use the different functions provided in `World` to get, set, increase, and decrease its `Score`s.  You can use `SumInnerWorldsRecords()` to sum up the `Score`s of the inner `World`s or `Level`s. Some functions are intended for a single `Score`, while others are for multiple `Score`s - you can differentiate between them according to their names and signatures.

``` cpp
/** For single scores: **/

jungleWorld->setSingleScoreValue(300); //set score to 300

jungleWorld->incSingleScore(100); //increase score by 100

CCScore *score =  jungleWorld->getSingleScore(); //get score - value is 400


/** For multiple scores: **/

jungleWorld->setScoreValue("some_score_ID", 200); //set SomeScore to 200

jungleWorld->resetScores(true); //reset score values
```


<br>
**Manipulate `Rewards` of a `World`:**

``` cpp

jungleWorld->assignReward(coinReward); //assign this reward to this World

cocos2d::__String rewardID = jungleWorld->getAssignedRewardID(); //get reward ID
```

<br>
**Retrieve information about the `World`s in your game:**

``` cpp
///number of Worlds in the game (the given bool signifies if to include all levels in the count)
int numOfWorlds = CCLevelUp::getInstance()->getWorldCount(true);

///retrieve World by its ID
World world = CCLevelUp::getInstance()->getWorld("worldA");

///number of Levels in the given World
int levels = CCLevelUp::getInstance()->getLevelCountInWorld(jungleWorld);
```

<br>

---

##Score

Represents a score in the game. A simple game usually has one generic numeric score which grows as the user progresses in the game. A game can also have multiple scores for different aspects such as time, speed, points, etc.

**A `Score` contains the following elements:**

- `mStartValue` - The initial `Score` value in the game.

- `mHigherBetter`- This field defines whether it's better that the score is higher or lower. A `Score` can be ascending in nature such as regular points (higher is better) or can be descending such as time-to-complete level (lower is better).

<br>
**HOW TO DEFINE**

``` cpp
CCScore *score = CCScore::create(
  CCString::create("NUM_SCORE_ID"),        // ID  
  CCString::create("Number Score"),        // Name
  CCBool::create(true)                     // Higher is better
);
```

<br>
**COMMON USE**

**Check if the `Score` in the current game session has reached a certain value:**

``` cpp
// If the score has reached 5000 give the user a badge.
if (numScore->hasTempReached(5000)) {
  // Give a reward
}
```

<br>
**Check if the `Score` has reached a record:**

``` cpp
// Checks if a value of 300 breaks numScore's record.
if (numScore->hasRecordReached(300)) {
  //do something...
}
```

<br>
**Manipulate a `Score` by using its functions to get, set, increase, and decrease it.**

``` cpp
numScore->dec(100); // decrease by 100

numScore->setTempScore(250); // set a temporary score
```

<br>
**Retrieve a `Score` according to its ID:**

``` cpp
CCScore *score = CCLevelUp::getInstance()->getScore("NUM_SCORE_ID");
```

###RangeScore

A specific type of `Score` that has an associated range. The `Score`'s  value can be only inside that range of values. **For example:** A puzzle or quiz can measure the user's success on a scale of 1 - 10, or a shooting `Score` can be on a scale of 10 to 100 according to the user's performance in the game.

<br>
**HOW TO DEFINE**

``` cpp
CCScore *quizScore = CCRangeScore::create(
  CCString::create("quizScore"),           // ID
  CCSRange::create(0, 10)                  // Range
);

CCScore *shootingScore = CCRangeScore::create(
  CCString::create("shootingScore"),       // ID
  CCString::create("Shooting Score"),      // Name
  CCSBool::create(true),                   // Higher is better
  CCSRange::create(10, 100)                // Range
);
```

<br>
###VirtualItemScore

A specific type of `Score` that has an associated virtual item. The score is related to the specific item ID. **For example:** In a game that has diamonds that the user needs to collect, you would define a virtual currency diamond and a `VirtualItemScore` based upon it.  

<br>
**HOW TO DEFINE**

For your convenience, there are multiple ways to define a `VirtualItemScore`.

``` cpp
CCVirtualCurrency *diamond = CCVirtualCurrency::create(
  CCString::create("Diamond"),
  CCString::create(""),
  CCString::create("diamond_ID")
);

CCScore *diamondScore = CCVirtualItemScore::create(
  CCString::create("diamondScore"),      // ID
  CCString::create("diamond_ID")         // Associated item ID
);

// OR

CCScore *diamondScore = CCVirtualItemScore::create(
  CCString::create("diamondScore"),      // ID
  CCString::create("Diamond Score"),     // Name
  CCBool::create(true),                  // Higher is better
  CCString::create("diamond_ID")         // Associated item ID
);
```

<br>

---

##Gate

A `Gate` is an object that defines certain criteria for progressing between the game's `World`s or `Level`s. The `Gate` is a criteria or list of rules which which must be met in order to enter the `World` or `Level`. The rules are based on components of the previous `World` or `Level`: scores achieved, missions completed, etc. The `Gate` is opened once the logical conditions are met. In some games, `Gate`s can be opened with a payment or social task, such as sharing the game on Facebook.

<div class="info-box">`Gate` itself cannot be instantiated, but there are many types of gates, all explained below, and those will have the functionality that `Gate` provides.</div>

<br>
**COMMON USE**

**Check if the `Gate` is open:**

``` cpp
if (someGate->isOpen()) {
  //do something
}
```

**Retrieve a specific `Gate`:**

``` cpp
CCGate *gate = CCLevelUp::getInstance()->getGate("gate1");
```

<br>
###BalanceGate

 A specific type of `Gate` that has an associated virtual item and a desired balance. The`Gate` opens once the item's balance has reached the desired balance.

**A `BalanceGate` contains the following elements:**

- `mAssociatedItemId` - The ID of the virtual item whose balance is examined.

- `mDesiredBalance` - The balance of the associated item that needs to be reached in order to unlock the `Gate`.

<br>
**HOW TO DEFINE**

``` cpp
CCVirtualCurrency *shield = CCVirtualCurrency::create(
  CCString::create("Shield"),
  CCString::create(""),
  CCString::create("shield_ID")
);

// Collect 5 shields to open the gate
CCGate *shieldGate = CCBalanceGate::create(
  CCString::create("shieldGate"),        // ID
  CCString::create("shield_ID"),         // Associated item ID
  CCInteger::create(5)                   // Desired balance
);
```

<br>
###PurchasableGate

A specific type of `Gate` that has an associated market item. The `Gate` opens once the item has been purchased. This `Gate` is useful when you want to allow unlocking of certain `Level`s or `World`s only if they are purchased with real money.

**A `PurchasableGate` contains the following elements:**

- `mAssociatedItemId` - The ID of the virtual item who needs to be purchased in order to unlock the `Gate`.

<br>
**HOW TO DEFINE**

``` cpp
CCVirtualGood *itemToBuy = CCSingleUseVG::create(
  CCString::create("Item To Buy"),
  CCString::create(""),
  CCString::create("itemToBuyID"),
  CCPurchaseWithMarket::create(
    CCString::create("itemToBuy_ProductID"),
    CCDouble::create(8.99))
);

// The user must buy the 'itemToBuy' in order to unlock this Gate.
CCGate *pGate = CCPurchasableGate::create(
  CCString::create("purchaseGate"),     // ID
  CCString::create("itemToBuyID")       // Associated item ID
);
```

<br>
###RecordGate

A RecordGate has an associated score and a desired record. The `Gate` opens once the player achieves the desired record for the given score.

**A `RecordGate` contains the following elements:**

- `mAssociatedScoreId` - The ID of the `Score` that's examined.
- `mDesiredRecord` - The value that the associated `Score` needs to reach in order to unlock the `Gate`.

<br>
**HOW TO DEFINE**

``` cpp
//The user needs to reach a record of 5000 for numberScore in order to unlock this Gate.
CCGate *rGate = CCRecordGate::create(
  CCString::create("recordGate"),        // ID
  CCString::create("scoreID"),           // Associated score ID
  CCDouble::create(5000)                 // Desired record
);
```

<br>
###ScheduleGate

A specific type of `Gate` that has a schedule that defines when the `Gate` can be opened. The `Gate` opens once the player tries to open it in the time frame of the defined schedule.

**A `ScheduleGate` contains the following elements:**

- `Schedule` - The `Schedule` that defines when this `Gate` can be unlocked.

<br>
**HOW TO DEFINE**

``` cpp
//The user can unlock this Gate if he/she is attempting to do so in the time frame defined in schedule.
CCGate *sGate = CCScheduleGate::create(
  CCString::create("scheduleGate"),      // ID
  CCSchedule::createAnyTimeUnLimited()   // Schedule
);
```

<br>
###WorldCompletionGate

A `WorldCompletionGate` has an associated `World` that, once complete, the `Gate` becomes unlocked.

**A `WorldCompletionGate` contains the following elements:**

- `mAssociatedWorldId` - The `World` that needs to be completed in order to unlock the Gate.

<br>
**HOW TO DEFINE**

``` cpp
CCWorld *worldA = CCWorld::create(__String::create("worldA_ID"));

CCGate *wGate = CCWorldCompletionGate::create(
  CCString::create("worldCompGate"),     // ID
  CCString::create("worldA_ID")          // Associated world ID
);
```

<br>
###GatesList

A list of one or more `Gate`s that together define a composite criteria for progressing between the game's `World`s or `Level`s.

There are two kinds of `GatesList`:

####GatesListAND

A specific type of `GatesList` that can be opened only if ALL `Gate`s in its list are open.

<br>
**HOW TO DEFINE**

``` cpp
///The user needs to meet the criteria of bGate AND of sGate in order to open this Gate. For the definitions of bGate and sGate, see the sections above about BalanceGate and ScheduleGate above.
CCGate *bGateANDsGate = CCGatesListAND::create(
  CCString::create("andGate_ID"),        // ID
  CCString::create(bGate, sGate, NULL)   // List of Gates
);
```

####GatesListOR
A specific type of `GatesList` that can be opened if AT LEAST ONE `Gate`s in its list is open.

<br>
**HOW TO DEFINE**

``` cpp
///The user needs to meet the criteria of wGate OR of pGate in order to open this Gate. For the definitions of wGate and pGate, see the topics WorldCompletionGate and PurchasableGate above.
CCGate *wGateORpGate = CCGatesListOR::create(
  CCString::create("orGate_ID"),         // ID
  CCString::create(wGate, pGate, NULL)    // List of Gates
);
```

<br>

<div class="info-box">The gates described below are `SocialActionGate`s. These are gates that require the user to perform a specific social action in order to unlock the `Gate`s. Currently, the social provider that's available is Facebook, so the `Gate`s are FB-oriented. In the future, more social providers will be added.</div>

<br>
###SocialLikeGate

A specific type of `Gate` that has an associated page name. The `Gate` is unlocked once the player "Likes" the associated page.

<br>
**HOW TO DEFINE**

``` cpp
CCGate *likeGate = CCSocialLikeGate::create(
  CCString::create("likeGate"),          // ID
  soomla::FACEBOOK,                      // Social Provider
  CCString::create("[page name]")        // Page to "Like"
);
```

<br>
###SocialStatusGate

A specific type of `Gate` that has an associated status. The `Gate` is unlocked once the player posts the status.

<br>
**HOW TO DEFINE**

``` cpp
CCGate *statusGate = CCSocialStatusGate::create(
  CCString::create("statusGate"),        // ID
  soomla::FACEBOOK,                      // Social Provider
  CCString::create("[status]")           // Status to post
);
```

<br>
###SocialStoryGate

A specific type of `Gate` that has an associated story. The `Gate` is unlocked once the player posts the story.

<br>
**HOW TO DEFINE**

``` cpp
CCGate *storyGate = CCSocialStoryGate::create(
  CCString::create("storyGate"),         // ID
  soomla::FACEBOOK,                      // Social Provider
  CCString::create("[message]"),         // Message to post
  CCString::create("[Story Name]"),      // Story name
  CCString::create("[Caption]"),         // Caption for image
  CCString::create("[Link]"),            // Link to post
  CCString::create("[Image Url]")        // Image URL
);
```

<br>
###SocialUploadGate

A specific type of `Gate` that has an associated image. The `Gate` is unlocked once the player uploads the image.

<br>
**HOW TO DEFINE**

``` cpp
CCGate *uploadGate = CCSocialUploadGate::create(
  CCString::create("uploadGate"),         // ID
  soomla::FACEBOOK,                       // Social Provider
  CCString::create("[Filename]")          // Image URL
  CCString::create("[message]"),          // Message to post
);
```

<br>

---

##Mission

A `Mission` is a task your users need to complete in your game. `Mission`s are usually associated with `Reward`s meaning that you can give your users something for completing `Mission`s. You can create `Mission`s and use them as single, independent entities OR create a `Challenge` to handle several `Mission`s and monitor their completion. `Mission`s may be completed multiple times.

**A `Mission` contains the following elements:**

- `mRewards` - Rewards that can be earned when completing this `Mission`.

- `mSchedule` - A schedule that defines the number of times this `Mission` can be played, how often, etc.

- `mGate` - A `Gate` that needs to be unlocked in order to complete this `Mission`.


<br>
**COMMON USE**

There are several types of missions, described below. All missions have the same functionality, as shown here.

**Check if the `Mission` is available:**

This checks if the mission can be completed. In other words, this checks if the mission's Gate can be opened. For example, in ScheduleMission

``` cpp
if (someMission->isAvailable()) {
  //do something...
}
```

**Check if the `Mission` is completed:**

``` cpp
if (someMission->isCompleted()) {
  //do something...
}
```

**Retrieve a `Mission` by its item ID:**

``` cpp
CCMission *myMission = CCLevelUp::getInstance()->getMission("mission_ID");
```

<br>
###BalanceMission

A specific type of `Mission` that has an associated virtual item and a desired balance. The `Mission` is complete once the item's balance reaches the desired balance.

<br>
**HOW TO DEFINE**

``` cpp
///To complete this mission the user needs to collect 250 coins.
///Once the mission is complete he/she will receive the reward.
CCMission *bMission = CCBalanceMission::create(
  CCString::create("coinMission"),       // ID
  CCString::create("Coin Mission"),      // Name
  balanceReward,                         // Optional reward(s)
  CCString::create("coinScore_ID"),      // Associated Score ID
  250                                    // Desired balance
);
```

<br>
###RecordMission

A specific type of `Mission` that has an associated score and a desired record. The `Mission` is complete once the player achieves the desired record for the given score.

<br>
**HOW TO DEFINE**

``` cpp
///To complete this mission, the user needs his "coinScore" to reach a record of 5000.
CCRecordMission *rMission = CCRecordMission::create(
  CCString::create("rMission"),          // ID
  CCString::create("Coin Record Score"), // Name
  coinReward,                            // Optional reward(s)
  CCString::create("coinScore_ID"),      // Associated Score ID
  5000                                   // Desired record
);
```

<br>
###PurchasingMission

A specific type of `Mission` that has an associated market item. The `Mission` is complete once the item has been purchased.

<br>
**HOW TO DEFINE**

``` cpp
CCVirtualGood *itemToBuy = CCSingleUseVG::create(
  CCString::create("name"),
  CCString::create("description"),
  CCString::create("itemToBuy_ID"),  
  CCPurchaseWithMarket::create(CCString::create("itemToBuy_ProdID",
    CCDouble::create(1.99))
);

///To complete this mission, the user needs to buy the item.
CCMission *pMission = CCPurchasingMission::create(
  CCString::create("pMission"),          // ID
  CCString::create("Purchase Mission"),  // Name
  purchaseReward,                        // Optional reward(s)
  CCString::create("itemToBuy_ID"),      // Associated item ID
);
```

<br>
###WorldCompletionMission

A specific type of `Mission` that has an associated `World`. The `Mission` is complete once the `World` has been completed.

<br>
**HOW TO DEFINE**

``` cpp
CCWorld *worldA = CCWorld::create(__String::create("worldA_ID"));

CCRecordMission *wMission = CCWorldCompletionMission::create(
  CCString::create("wMission"),            // ID
  CCString::create("Complete World A"),    // Name
  coinReward,                              // Optional reward(s)
  CCString::create("worldA_ID")            // Associated World ID
);
```

<div class="info-box">The following `Mission`s require the user to perform a specific social action in order to receive a `Reward`. Currently, the social provider that's available is Facebook, so the `Mission`s are FB-oriented. In the future, more social providers will be added. </div>

<br>
###SocialLikeMission

A specific type of `Mission` that has an associated page name. The `Mission` is complete once the player "Likes" the page.  

<br>
**HOW TO DEFINE**

``` cpp
CCMission *likeMission = CCSocialLikeMission::create(
  CCString::create("likeMission"),         // ID
  CCString::create("Like Mission"),        // Name
  likeReward,                              // Optional reward(s)
  soomla::FACEBOOK,                        // Social Provider
  CCString::create("[page name]")          // Page to "Like"
);
```

<br>
###SocialStatusMission

A specific type of `Mission` that has an associated status. The `Mission` is complete once the player posts the status.  

<br>
**HOW TO DEFINE**

``` cpp
CCMission *statusMission = CCSocialStatusMission::create(
  CCString::create("statusMission"),       // ID
  CCString::create("Status Mission"),      // Name
  statusReward,                            // Optional reward(s)
  soomla::FACEBOOK,                        // Social Provider
  CCString::create("status")               // Status to post
);
```

<br>

###SocialStoryMission
A specific type of `Mission` that has an associated story that includes a message, story name, caption, link, and image. The `Mission` is complete once the player posts the story.  

<br>
**HOW TO DEFINE**

``` cpp
CCMission *storyMission = CCSocialStoryMission::create(
  CCString::create("storyMission"),      // ID
  CCString::create("Story Mission"),     // Name
  storyReward,                           // Optional reward(s)
  soomla::FACEBOOK,                      // Social Provider
  CCString::create("message"),           // Message to post
  CCString::create("Story Name"),        // Story name
  CCString::create("Caption"),           // Caption for image
  CCString::create("https://..."),       // Link to post
  CCString::create("Image Url")          // Image URL
);
```

<br>

###SocialUploadMission
A specific type of `Mission` that has an associated filename and message. The `Mission` is complete once the player uploads the image.  

<br>
**HOW TO DEFINE**

``` cpp
CCMission *uploadMission = CCSocialUploadMission::create(
  CCString::create("uploadMission"),       // ID
  CCString::create("Upload Mission"),      // Name
  uploadReward,                            // Optional reward(s)
  soomla::FACEBOOK,                        // Social Provider
  CCString::create("filename")             // Image URL
  CCString::create("message"),             // Message to post
);
```

<br>

---

##Challenge

Missions can be aggregated into challenges which can contain a single mission or multiple ones. The user is required to complete all these missions in order to earn the reward associated with the challenge.

<br>
**HOW TO DEFINE**

``` cpp
cocos2d::__Array *missions = cocos2d::__Array::create();
missions->addObject(bMission);
missions->addObject(rMission);
missions->addObject(pMission);

///To complete this challenge, the user must complete all 3 missions.
CCChallenge *challenge = CCChallenge::create(
  __String::create("challenge"),             // ID
  __String::create("3 Mission Challenge"),   // Name
  missions,                                  // Mission(s) to complete
  challengeReward                            // Optional reward(s)
);
```

<br>
**COMMON USE**

**Check if the `Challenge` is complete:**
``` cpp
if (challenge->isCompleted()) {
  //do something...
}
```
