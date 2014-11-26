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

SOOMLA Store provides game developers with an economy model that every game economy can be based upon. The economy model includes currencies, packs of currencies, and several types of virtual items that can be sold for money or in exchange for other items. You need to understand the [Store Economy Model](/cocos2dx/store/EconomyModel) before continuing to read about `LevelUp`.

###LevelUp

`LevelUp` models out worlds, levels, scores, missions, and more, all in one framework that allows game developers to build their game structure and progressions behavior easily and effectively. The sense of progress that users feel in a game is what creates retention and long-term use, which usually lead to monetization.

In this document, you will find definitions of each of the entities of `LevelUp`, the connections between them, and code examples that demonstrate how to use them.

<br>

####**LevelUp Hierarchy**

After observing dozens of games, the SOOMLA team realized that most game progress and accomplishment can be packed into worlds. Worlds can contain both levels and other worlds, and can have a gate that needs to be unlocked in order to enter the next world. More progress mechanisms are available under levels, which include scores, challenges, missions, and records.

<br>

![alt text](/img/tutorial_img/soomla_diagrams/LevelUpModel.png "Soomla LevelUp Model")

###Schedule

<div class="info-box">Before we begin, it's important that you know what a `Schedule` is, as you will see it used a few times in the descriptions below.</div>

A `Schedule` defines any time restrictions that an entity may have.

**A `Schedule` contains the following restrictions:**

- **Recurrence** - How often is this entity available? Every month, week, day, hour?
  **For example:** A `Gate` that can be unlocked every hour.

- **Time Ranges** - A time range that defines when this entity is available, with a start time and an end time.
**For example:** A `Reward` that can be given starting when the user finishes a certain `Level` and ending 8 seconds later.

- **Activation Limit** - The number of times that this entity is available for use.
**For example:** A `Mission` that can be attempted 10 times throughout gameplay.

###Reward

<div class="info-box">Note that `Reward` is a part of SOOMLA Core, and not part of the LevelUp module. However, because `Reward`s are used very often throughout LevelUp, it's important that you are familiar with them and the different types.</div>

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
**Functionality**

- Retrieve a specific `Level` according to its ID.

- Start, pause, restart, or end a `Level`.

- Set the `Level`as completed.

- Get the number of times a `Level` has been played, the number of times started, or the slowest/fastest duration of play.

<br>

---

##World

A game can have multiple `World`s or a single one, and `World`s can also contain other `World`s in them. In some games, these are referred to as level packs. Often, a `World` contains a set of `Level`s, or multiple sets. A `World` can also have a potential `Gate` that defines the criteria to enter it. Games that don’t have the concept of `World`s can be modeled as single `World` games (SLM games).

**A `World` contains the following elements:**

- The `Gate` that defines the criteria to enter this `World`.

- The `World`s contained in this `World`.

- A list of `Score`s that this `World` contains . In the class `World`, you can add, retrieve, set, increase, decrease, and reset `Score`s, whether there are multiple `Score`s, or a single one.

- A list of `Mission`s that this `World` contains. In the class `World` you can add more `Mission`s.


<br>
**Functionality**

- Add a batch of `Levels` to a `World`.

- Get or set the completion status of the `World`.

- Add elements such as `Mission`s and `Score`s to an existing `World`.

- Set, increase, or decrease `Score`(s) of a `World`. Some functions are intended for a single `Score`, while others are for multiple `Score`s.

- Assign `Reward`s to this `World`.


<br>

---

##Score

Represents a score in the game. A simple game usually has one generic numeric score which grows as the user progresses in the game. A game can also have multiple scores for different aspects such as time, speed, points, etc.

**A `Score` contains the following elements:**

- The initial `Score` value in the game.

- A field that defines whether it's better that the score is higher or lower. A `Score` can be ascending in nature such as regular points (higher is better) or can be descending such as time-to-complete level (lower is better).

<br>
**Functionality**

- Check if the `Score` in the current game session has reached a certain value.

- Check if the `Score` has reached a record.

- Manipulate a `Score` by using its functions to get, set, increase, and decrease it.


###RangeScore

A specific type of `Score` that has an associated range. The `Score`'s  value can be only inside that range of values. **For example:** A puzzle or quiz can measure the user's success on a scale of 1 - 10, or a shooting `Score` can be on a scale of 10 to 100 according to the user's performance in the game.

###VirtualItemScore

A specific type of `Score` that has an associated virtual item. The score is related to the specific item ID. **For example:** In a game that has diamonds that the user needs to collect, you would define a virtual currency diamond and a `VirtualItemScore` based upon it.  

<br>

---

##Gate

A `Gate` is an object that defines certain criteria for progressing between the game's `World`s or `Level`s. The `Gate` is a criteria or list of rules which which must be met in order to enter the `World` or `Level`. The rules are based on components of the previous `World` or `Level`: scores achieved, missions completed, etc. The `Gate` is opened once the logical conditions are met. In some games, `Gate`s can be opened with a payment or social task, such as sharing the game on Facebook.

<div class="info-box">`Gate` itself cannot be instantiated, but there are many types of gates, all explained below, and those will have the functionality that `Gate` provides.</div>

<br>
**Functionality**

- Check if the `Gate` is open.

- Check if the `Gate` *can* be opened (does it meet its criteria to be opened?).

- Attempt to open the `Gate`.


###BalanceGate

 A specific type of `Gate` that has an associated virtual item and a desired balance. The`Gate` opens once the item's balance has reached the desired balance. For example, once the user collects 5 diamonds, the `Gate` to the next level opens.

**A `BalanceGate` contains the following elements:**

- The ID of the virtual item whose balance is examined.

- The balance (of the associated item) that needs to be reached in order to unlock the `Gate`.


###PurchasableGate

A specific type of `Gate` that has an associated market item. The `Gate` opens once the item has been purchased. This `Gate` is useful when you want to allow unlocking of certain `Level`s or `World`s only if they are purchased with real money.

**A `PurchasableGate` contains the following elements:**

- The ID of the virtual item who needs to be purchased in order to unlock the `Gate`.

###RecordGate

A RecordGate has an associated score and a desired record. The `Gate` opens once the player achieves the desired record for the given score. For example, when the user's "Coin Score" reaches 200, the `Gate` opens.

**A `RecordGate` contains the following elements:**

- The ID of the `Score` that needs to reach the record.

- The value that the associated `Score` needs to reach in order to unlock the `Gate`.


###ScheduleGate

A specific type of `Gate` that has a schedule that defines when the `Gate` can be opened. The `Gate` opens once the player tries to open it in the time frame of the defined schedule. For example, a `Gate` that opens only every Monday.

**A `ScheduleGate` contains the following elements:**

- A `Schedule` that defines when this `Gate` can be unlocked.


###WorldCompletionGate

A `WorldCompletionGate` has an associated `World` that, once complete, the `Gate` becomes unlocked.

**A `WorldCompletionGate` contains the following elements:**

- An ID of a `World` that needs to be completed in order to unlock the Gate.

<br>

<div class="info-box">The next 2 types of `Gate`s represent a type of list of one or more `Gate`s that together define a composite criteria for progressing between the game's `World`s or `Level`s. The class `GatesList` is an abstract class that the following 2 `Gate`s implement.</div>

###GatesListAND

A specific type of `GatesList` that can be opened only if ALL `Gate`s in its list are open.

###GatesListOR

A specific type of `GatesList` that can be opened if AT LEAST ONE `Gate`s in its list is open.

<br>

<div class="info-box">The gates described below are `SocialActionGate`s. These are gates that require the user to perform a specific social action in order to unlock the `Gate`s. To learn more about social actions, read about SOOMLA's [Profile](/docs/soomla/profile) module. Currently, the social provider that's available is Facebook, so the `Gate`s are FB-oriented. In the future, more social providers will be added.</div>

###SocialLikeGate

A specific type of `Gate` that has an associated page name. The `Gate` is unlocked once the player "Likes" the associated page. Learn how to [Like](/docs/soomla/profile/MainClasses#like) a page.

<br>
###SocialStatusGate

A specific type of `Gate` that has an associated status. The `Gate` is unlocked once the player posts the status. Learn how to [post a status](/docs/soomla/profile/MainClasses#updatestatus).

<br>
###SocialStoryGate

A specific type of `Gate` that has an associated story. The `Gate` is unlocked once the player posts the story. Learn how to [update a story](/docs/soomla/profile/MainClasses#updatestory) a page.

<br>
###SocialUploadGate

A specific type of `Gate` that has an associated image. The `Gate` is unlocked once the player uploads the image. Learn how to [upload an image](/docs/soomla/profile/MainClasses#uploadimage) a page.

<br>

---

##Mission

A `Mission` is a task your users need to complete in your game. `Mission`s are usually associated with `Reward`s meaning that you can give your users something for completing `Mission`s. You can create `Mission`s and use them as single, independent entities OR create a `Challenge` to handle several `Mission`s and monitor their completion. `Mission`s may be completed multiple times.

**A `Mission` contains the following elements:**

- `Reward`s that can be earned when completing this `Mission`.

- A `Schedule` that defines the number of times this `Mission` can be played, how often, etc.

- A `Gate` that needs to be unlocked in order to complete this `Mission`.

<br>
<div class="info-box">There are several types of missions, described below. All missions have the same functionality, as shown here.</div>

<br>
**Functionality**

- Check if the `Mission` is available.

- Check if the `Mission` is completed.


<br>
###BalanceMission

A specific type of `Mission` that has an associated virtual item and a desired balance. The `Mission` is complete once the item's balance reaches the desired balance.

<br>
###RecordMission

A specific type of `Mission` that has an associated score and a desired record. The `Mission` is complete once the player achieves the desired record for the given score.

<br>
###PurchasingMission

A specific type of `Mission` that has an associated market item. The `Mission` is complete once the item has been purchased.

<br>
###WorldCompletionMission

A specific type of `Mission` that has an associated `World`. The `Mission` is complete once the `World` has been completed.

<br>
<div class="info-box">The following `Mission`s require the user to perform a specific social action in order to receive a `Reward`. Currently, the social provider that's available is Facebook, so the `Mission`s are FB-oriented. In the future, more social providers will be added. </div>

###SocialLikeMission

A specific type of `Mission` that has an associated page name. The `Mission` is complete once the player "Likes" the page.  

<br>
###SocialStatusMission

A specific type of `Mission` that has an associated status. The `Mission` is complete once the player posts the status.  

<br>
###SocialStoryMission
A specific type of `Mission` that has an associated story that includes a message, story name, caption, link, and image. The `Mission` is complete once the player posts the story.  

<br>
###SocialUploadMission
A specific type of `Mission` that has an associated filename and message. The `Mission` is complete once the player uploads the image.  

<br>

---

##Challenge

Missions can be aggregated into challenges which can contain a single mission or multiple ones. The user is required to complete all these missions in order to earn the reward associated with the challenge.

<br>
**Functionality**

- Check if the `Challenge` is complete.

<br>

---

##LevelUp

This class is the top level container for the LevelUp model and definitions. It stores the configurations of the game's world-hierarchy and provides lookup functions for LevelUp model elements.

**Use this class to:**

- Get the number of `Level`s in the game, or the number of completed `Level`s.

- Retrieve the `Score`s, `Mission`s, `Reward`s, and `Gate`s of your game, according to their IDs.
