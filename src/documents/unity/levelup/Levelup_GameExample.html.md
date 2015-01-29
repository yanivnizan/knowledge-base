---
layout: "content"
image: "InAppPurchase"
title: "Game Example"
text: "This guide demonstrates use of the different LevelUp entities through an example game with explanations and code snippets."
position: 4
theme: 'platforms'
collection: 'unity_levelup'
module: 'levelup'
platform: 'unity'
---

#LevelUp Game Example

LevelUp models out worlds, levels, scores, missions, and more, all in one framework that allows game developers to build their game structure and progression behavior easily and effectively. The sense of progress that users feel in a game is what creates retention and long-term use, which usually lead to monetization.

In this document, you will find a game example that demonstrates the use of LevelUp's entities. There are detailed explanations following the example code, as well as gameplay examples. Use this document as a reference to create your game with LevelUp.

<div class="info-box">**NOTE:** If you haven't already, we suggest reading about the [LevelUp Model](/unity/levelup/Levelup_Model) and [LevelUp Event Handling](/unity/levelup/Levelup_Events).</div>

##The Game Example

**NOTE:** This document focuses on the game logic. Any wiring of the code examples to the user interface is only explained textually and is left for the developer to do.

###**Chimpo's Journey**

Chimpo is a smart, ambitious monkey, who embarks on a journey to reach the magical realms of Soomland. Players need to guide Chimpo through several lands (each land is a collection of levels), and need to avoid numerous predators and other obstacles on the dangerous way to Soomland.

###**Rules of the Game**

![alt text](/img/tutorial_img/levelup_game/levelStart.png "Start Level")

- To complete each level, Chimpo has to collect 2 bananas and reach the level's exit.

- To start each level, the previous level must be completed.

- Some levels have "Bonus Coconuts" that can be collected in order to receive rewards. These coconuts can be used as weapons to throw at enemies.

- Predators start to attack Chimpo after he has collected 2 bananas. Chimpo can escape the predators by either running to the exit before they catch him, or by knocking them out with coconuts.

- The player can earn coins throughout the game and use them to buy cool stuff in the store (see [IStoreAssets](#-istoreassets-code-) below). Coins can be accumulated by either buying them in the store for real money, or by earning them as rewards in the different missions of the game (see [Missions](#-missions-) below).

##Setup Code Example

We start by presenting the complete examples of the economy (`IStoreAssets` implementation) and the LevelUp model.  In the following section we will breakdown the LevelUp code to explain it in more detail.

###**IStoreAssets Code**

``` cs
public class ExampleAssets : IStoreAssets{

  public int GetVersion() {
  	return 0;
  }

  public VirtualCurrency[] GetCurrencies() {
  	return new VirtualCurrency[] {COIN_CURRENCY};
  }

  public VirtualGood[] GetGoods() {
  	return new VirtualGood[] {COCONUT, IMMUNITY, SUPER_MONKEY};
  }

  public VirtualCurrencyPack[] GetCurrencyPacks() {
  	return new VirtualCurrencyPack[] {HUND_COIN_PACK, TWOHUND_COIN_PACK};
  }

  public VirtualCategory[] GetCategories() {
  	return new VirtualCategory[] {};
  }


  /** Virtual Currencies **/

  public static VirtualCurrency COIN_CURRENCY = new VirtualCurrency(
	"Coin",                                 // Name
	"",                                     // Description
	"coin_ID"                               // Item ID
  );


  /** Virtual Currency Packs **/

  public static VirtualCurrencyPack TWOHUND_COIN_PACK = new VirtualCurrencyPack(
	"200 Coins",                            // Name
	"200 Coins",                            // Description
	"coins_200_ID",                         // Item ID
	200,                                    // Number of currencies in the pack
	COIN_CURRENCY.ID,                       // The currency associated with this pack
	new PurchaseWithMarket("coins_200_ProdID", 0.99)    // Purchase type
  );

  public static VirtualCurrencyPack FIVEHUND_COIN_PACK = new VirtualCurrencyPack(
	"500 Coins",                            // Name
	"500 Coins",                            // Description
	"coins_500_ID",                         // Item ID
	500,                                    // Number of currencies in the pack
	COIN_CURRENCY.ID,                       // The currency associated with this pack
	new PurchaseWithMarket("coins_500_ProdID", 1.99)     // Purchase type
  );


  /** Virtual Goods **/

  public static VirtualItem IMMUNITY = new SingleUseVG(
	"Immunity",                             // Name
	"15 seconds of immunity from enemies",  // Description
	"immunity_ID",                          // Item ID
	new PurchaseWithVirtualItem(COIN_CURRENCY.ID, 250)   // Purchase type
  );

  public static VirtualItem COCONUT = new SingleUseVG(
    "Coconut",                              // Name
    "Throw this coconut at your enemies!",  // Description
    "coconut_ID",                           // Item ID
    new PurchaseWithMarket(COIN_CURRENCY.ID, 300)      // Purchase type
  );

  public static VirtualItem SUPER_MONKEY = new EquippableVG(
	EquippableVG.EquippingModel.GLOBAL,
	"Super Monkey",                        // Name
	"Super monkey can jump over things",   // Description
	"superMonkey_ID",                      // Item ID
	new PurchaseWithVirtualItem(COIN_CURRENCY.ID, 1000)  // Purchase type
  );
}

```

<br>
###**LevelUp Code**

``` cs
public class ChimposJourney {

  public World CreateInitialWorld() {

    /** Scores **/

    Score pointScore = new Score(
      "pointScore_ID",                            // ID
      "Point Score",                              // Name
      true                                        // Higher is better
    );

    Score bananaScore = new Score(
      "bananaScore_ID",                           // ID  
      "Banana Score",                             // Name
      true                                        // Higher is better
    );

    /** Rewards **/

    Reward medalReward = new BadgeReward(
      "medalReward_ID",                           // ID
      "Medal Reward"                              // Name
    );

    Reward jungTwoHundCoinReward = new VirtualItemReward(
      "jungTwoHundCoinReward_ID",                 // ID  
      "200 Coin Reward",                          // Name  
      ExampleAssets.TWOHUND_COIN_PACK.ID,         // Associated virtual item
      1                                           // Amount
    );

    Reward desTwoHundCoinReward = new VirtualItemReward(
      "desTwoHundCoinReward_ID",                  // ID  
      "200 Coin Reward",                          // Name  
      ExampleAssets.TWOHUND_COIN_PACK.ID,         // Associated virtual item
      1                                           // Amount
    );

    Reward fiveHundCoinReward = new VirtualItemReward(
      "fiveHundCoinReward_ID",                    // ID  
      "500 Coin Reward",                          // Name  
      ExampleAssets.FIVEHUND_COIN_PACK.ID,        // Associated virtual item
      1                                           // Amount
    );

    /** Missions **/

    Mission pointMission = new RecordMission(
      "pointMission_ID",                          // ID
      "Point Mission",                            // Name
      new List<Reward>(){medalReward},            // Rewards
      pointScore.ID,                              // Associated score
      3                                           // Desired record
    );

    Mission coconutMission = new BalanceMission(
      "coconutMission_ID",                        // ID
      "Coconut Mission",                          // Name
      new List<Reward>() {fiveHundCoinReward},    // Rewards
      ExampleAssets.COCONUT.ID,                   // Associated virtual item
      5                                           // Desired balance
    );
    coconutMission.Schedule = Schedule.AnyTimeOnce();

    Mission likeMission = new SocialLikeMission(
      "likeMission_ID",                           // ID
      "Like Mission",                             // Name
      new List<Reward>(){medalReward},            // Rewards
      Soomla.Profile.Provider.FACEBOOK,           // Social provider
      "pageToLike"                                // Page to like
    );
    likeMission.Schedule = Schedule.AnyTimeOnce();

    Mission statusMissionJungle = new SocialStatusMission(
      "statusMissionJungle_ID",                   // ID
      "Status Mission Jungle",                    // Name
      new List<Reward>(){jungTwoHundCoinReward},  // Rewards
      Soomla.Profile.Provider.FACEBOOK,           // Social provider
      "JUNGLE World completed!"                   // Status to post
    );

    Mission statusMissionDesert = new SocialStatusMission(
      "statusMissionDesert_ID",                   // ID
      "Status Mission Desert",                    // Name
      new List<Reward>(){desTwoHundCoinReward},   // Rewards
      Soomla.Profile.Provider.FACEBOOK,           // Social provider
      "DESERT World completed!"                   // Status to post
    );

    /** Worlds **/

    // Initial world
    World mainWorld = new World(
      "main_world", null, null, null,
      new List<Mission>(){coconutMission, likeMission}
    );

    World jungleWorld = new World(
      "jungleWorld_ID",                           // ID
      null, null, null,                           // Gate, Inner worlds, Scores
      new List<Mission>(){statusMissionJungle}    // Missions
    );

    World desertWorld = new World(
      "desertWorld_ID",                           // ID
      null, null, null,                           // Gate, Inner worlds, Scores
      new List<Mission>(){statusMissionDesert}    // Missions
    );

    /** Levels **/

    jungleWorld.BatchAddLevelsWithTemplates(
      3,                                          // Number of levels
      null,                                       // Gate template
      new List<Score>(){bananaScore},             // Score templates
      null                                        // Mission templates
    );

    desertWorld.BatchAddLevelsWithTemplates(
      3,                                          // Number of levels
      null,                                       // Gate template
      new List<Score>(){bananaScore},             // Score templates
      null                                        // Mission templates
    );

    // Bind pointMission to the first level of the first world (jungleWorld)
    Level firstLevel = (Level)jungleWorld.GetInnerWorldAt(0);
    firstLevel.AddMission(pointMission);

    /** Gates **/

    // Once users finish Jungle world, they can continue to Desert world.
    Gate desertGate = new WorldCompletionGate(
      "desertGate_ID",                            // Item ID
      jungleWorld.ID                              // Associated world ID
    );
    desertWorld.Gate = desertGate;

    // See private function below
    AddGatesToWorld(jungleWorld);
    AddGatesToWorld(desertWorld);


    /** Add Worlds to Initial World **/
    mainWorld.AddInnerWorld(jungleWorld);
    mainWorld.AddInnerWorld(desertWorld);

    return mainWorld;

  }
  ...  

  private void AddGatesToWorld(World world) {

    // Iterate over all levels of the given world
    for (int i = 1; i < world.InnerWorldsMap.Count; i++) {

      Level previousLevel = (Level)world.GetInnerWorldAt(i - 1);
      Level currentLevel = (Level)world.GetInnerWorldAt(i);
      Score bananaScoreOfPrevLevel = previousLevel.Scores.Values.ElementAt(1);

      // The associated score of this Level's RecordGate is the bananaScore
      // of the previous level.
      Gate bananaGate = new RecordGate(
        "bananaGate_" + world.ID + "_level_" + i.ToString(),              // ID
        bananaScoreOfPrevLevel.ID,                          // Associated Score
        2                                                     // Desired record
      );

      // The associated world of this Level's WorldCompletionGate is the
      // previous level.
      Gate prevLevelCompletionGate = new WorldCompletionGate(
        "prevLevelCompletionGate_" + world.ID + "_level_" + i.ToString(), // ID
        previousLevel.ID                                    // Associated World
      );

      // The gates in this Level's GatesListAND are the 2 gates declared above.
      currentLevel.Gate = new GatesListAND(
        "gate_" + world.ID + "_level_" + i.ToString(),                    // ID
        new List<Gate>(){prevLevelCompletionGate, bananaGate}  // List of Gates
      );
    }
  }
}
```

<br>

### **Event Handler**

This class is an example of how an event handler class would look for our game. For simplicity, the class is subscribed only to a few of the LevelUp events that exist. Make sure to instantiate this event handler class before you initialize Levelup. Read more about [LevelUp Events](/unity/levelup/Levelup_Events).

``` cs
public class LevelUpEventHandler {

    // Constructor - Subscribes to potential events.
    public LevelUpEventHandler () {
        LevelUpEvents.OnWorldCompleted += onWorldCompleted;
        LevelUpEvents.OnMissionCompleted += onMissionCompleted;
        CoreEvents.OnRewardGiven += onRewardGiven;
    }

    public void onWorldCompleted(World world) {
        // Implemented in the relevant sections below.
    }

    public void onMissionCompleted(Mission mission) {
        // Implemented in the relevant sections below.
    }

    public void onRewardGiven(Reward reward) {
        // Implemented in the relevant sections below.
    }
}
```

###**Initialization Code**

``` cs
public class MainGame : MonoBehaviour {

  ...

  void Start () {

    // Initialize Event Handler
    private static LevelUpEventHandler handler = new ExampleEventHandler();

    ...

    // Initialize LevelUp
    World mainWorld = new ChimposJourney().CreateInitialWorld();

    SoomlaLevelUp.Initialize(mainWorld, null);
  }
  ...
}
```

##Code Explained

Below are explanations of the different LevelUp entities used throughout Chimpo's Journey.

###**Worlds & Levels**

Our game has 2 worlds, with 3 levels each. We used the function `BatchAddLevelsWithTemplates`  from the class `World`, in order to add 3 levels to each `World` in a convenient way.

We also defined `mainWorld` to contain the 2 worlds. Later we initialized `SoomlaLevelUp` with this initial world.

![alt text](/img/tutorial_img/levelup_game/worlds.png "Worlds & Levels")

<br>

**REMINDER:** Here is the code for the worlds as defined [above](#-levelup-code-).

``` cs
/** Worlds **/

// Initial world
World mainWorld = new World(
  "main_world", null, null, null,
  new List<Mission>(){coconutMission, likeMission}
);

World jungleWorld = new World(
  "jungleWorld_ID",                           // ID
  null, null, null,                           // Gate, Inner worlds, Scores
  new List<Mission>(){statusMissionJungle}    // Missions
);

World desertWorld = new World(
  "desertWorld_ID",                           // ID
  null, null, null,                           // Gate, Inner worlds, Scores
  new List<Mission>(){statusMissionDesert}    // Missions
);

/** Add Worlds to Initial World **/
mainWorld.AddInnerWorld(jungleWorld);
mainWorld.AddInnerWorld(desertWorld);
```

###**Scores**

Each level has 2 scores, a point score and a banana score:

<br>
####`pointScore`

This score can be based on any function you choose. In our example, `pointScore` (relevant only to the first level of the game) is calculated based on how long it took the player to complete the level. Our example score-calculation function is as follows:

``` cs
// The score will have an initial value of 3
pointScore.SetTempScore(3);

if the level hasn't been finished yet and 30 seconds have passed {
  pointScore.SetTempScore(2);
}

if the level hasn't been finished yet and 60 seconds have passed {
  pointScore.SetTempScore(1);
}
```

At the end of the level, we draw the `pointScore` as stars.

![alt text](/img/tutorial_img/levelup_game/pointScore.png "Time-based score")

`pointMission`, which is available only in the first level of the game, is based on this point score. You'll learn more about that later in [Missions](#-missions-).

<br>
####`bananaScore`

This score is for collecting the 2 bananas in order to move on to the the next level. You'll read more about `bananaGate` in [Gates](#-gates-).

`bananaScore` is also individual to each level. Why? If we were to declare this score globally, then all the levels would share the same `bananaScore`. This means that after collecting the 2 bananas in the first level of the first world, that level's gate would open, as well as all the other banana gates. The banana gates of all the next levels would also open because 2 bananas (overall in the game) have been collected. To avoid this situation, we declare such a banana score for EACH level. Then each level's banana gate will open only after *its* 2 bananas have been collected.

###**Gates**

The first level in the first world, `jungleWorld` has no gate that needs to be opened in order to unlock the level, because it is the starting point of the game. The rest of the levels and worlds have gates, explained below.

<br>
####**Gates between Worlds**

In order to create an order of play among the worlds in our game, we need to add a `WorldCompletionGate` to each world, except for the first one. The first one is `jungleWorld` and it has no `Gate` because it's open for initial play. The second (and last) world is `desertWorld`. In order to be able to start `desertWorld`, `jungleWorld` must be completed.

<br>
####**Gates between Levels**

To finish a level, the player needs to have completed the previous level AND to collect 2 bananas in the current level.

- `bananaGate` - This gate is of type `RecordGate`, with the associated score, `bananaScore` and a desired record of 2.

- `previousLevelCompletionGate` - This gate is of type `WorldCompletionGate`, with the associated world as the previous level each time (remember that `Level` inherits from `World`).

Gates are logical conditions.  To stipulate that a level's gate will be opened when both `bananaGate` AND `previousLevelCompletionGate` are opened, we create a gates list composed of both of these gates.  In the private function `AddGatesToWorld`, a `GatesListAND` that includes a `bananaGate` and a `previousLevelCompletionGate` is added to all levels (except for the very first one because it needs to be open for initial play.)

###**Missions**

There are various missions throughout the game that can be completed for rewards. Some are individual to each level and others are per world or per the entire game.

<br>
####`pointMission`

`pointMission` is of type `RecordMission`, which is a mission that has an associated score and a desired record. In Chimpo's Journey, `pointMission` is available in the first level of the game. The mission's associated score is `pointScore`, and the desired record is 3 (see the `pointScore` calculation described in [Scores](#-scores-) above). If the user reaches the desired record, he/she will receive a medal badge as a reward.

<br>
####`coconutMission`

This mission is of type `BalanceMission`, which is a mission that has an associated virtual item and a desired balance. In `coconutMission`, the associated virtual item is a `SingleUseVG` named `COCONUT`, and the desired balance is 5.

There are several coconuts scattered throughout the levels of the game, and they can be used to throw at and kill enemies. Coconuts can be accumulated by finding and collecting them throughout the game, or by purchasing them in the store for an expensive price of 300 coins each. Once the player has accumulated 5 coconuts (without using them up of course), he/she will receive a reward.

![alt text](/img/tutorial_img/levelup_game/coconutMission.png "Coconut mission")

Since coconuts can be found in random levels, and are accumulated globally, `coconutMission` applies to the entire game, and is not level-specific. In other words, if we would have created such a mission for *each* level, then once a level ends, the player wouldn't be able to keep collecting coconuts.

In the [setup code example](#setup-code-example) above, notice that under the declaration of `coconutMission`, we set the mission's `Schedule` so that it can be completed once throughout the entire game, anytime the user likes.

``` cs
coconutMission.Schedule = Schedule.AnyTimeOnce();
```

<br>
####`likeMission`

This is a `SocialLikeMission` that is offered in the main menu of the game and can be performed once anytime the user chooses. All the player has to do is like the given Facebook page, and in return he/she will receive free coins.

<br>
####`statusMission`s

`statusMissionJungle` and `statusMissionDesert` are of type `SocialStatusMission` and are offered each at the end of the world it is associated with. In these missions the user can post a specific status on Facebook and in return he/she will receive free coins. Upon world completion, an `OnWorldCompleted` event is thrown - we created an event handler that displays a screen like in the image below, and allows the user to share the specific status.

``` cs
public void onWorldCompleted(World world) {
  // Draw the UI that allows the user to perform the status mission.
}
```

![alt text](/img/tutorial_img/levelup_game/share.png "Share status mission")

##Gameplay Code

###**Check if level can start**

Chimpo's Journey has a menu that displays the worlds of the game and their levels. When the user clicks on a level the next screen is the game screen of the level. In order to render the relevant UI according to if a world/level is locked or not, we call `CanStart()` of the `World` class.

``` cs
// For example, iterate over the levels of jungleWorld...
foreach(KeyValuePair<string, World> entry in jungleWorld.InnerWorldsMap)
{
	// Check if the level's gate is open
	Level level = (Level)entry.Value;
	if (level.CanStart()) {
		// If so, draw the menu without a lock icon on the level
	}
	else {
		// Draw the menu with a lock icon on the level
	}
}
```

###**Start level**

Call `Level`'s  `Start` function from your Monobehaviour functions `Awake()` or `Start()`:

``` cs
level.Start();
```

During gameplay, the top left corner of the screen will display the number of coconuts that he/she has collected out of the 5 needed to complete the coconut mission. Once the mission has been completed, we won't want to display that information any longer since it is not relevant - remember, we defined the coconut mission as a global mission that can be played only once throughout the game; If the user has already completed it once, it won't be available anymore. To do this, before a level begins, we'll check if the coconut mission **is  available**, and if so we'll display the number of coconuts collected out of 5.  

``` cs
if (coconutMission.IsAvailable()) {
  // Display UI that shows how many coconuts the user has collected out of 5.
}
```

###**Level progression**

####**Collecting Bananas**

During gameplay, the user will collect bananas in each level. Every time he/she collects a banana, we'll need to increase the `bananaScore`. We'll also need to check if the user's `bananaScore` has reached the desired balance of 2, and if so we'll open the exit so that Chimpo can finish the level. Once the level will end, the record score (2) will be saved and the next level's `CCRecordGate` (`bananaGate`) will open at this point (remember that the record for banana gate is 2).

``` cs
Score levelBananaScore = level.Scores.Values.ElementAt(1);
int numOfBananas = 0;
bool exitIsOpen = false; // We'll use this variable later to end the level

// When the user collects a banana in the level:
levelBananaScore.Inc(1);

// Check if this banana was the second collected.
numOfBananas = levelBananaScore.GetTempScore();
if (numOfBananas == 2) {
  // If so, render the UI to show the exit as open.

  exitIsOpen = true;
}
```

<br>
####**Collecting Coconuts**

As mentioned above, Chimpo can collect coconuts in various levels throughout the game. When he collects a coconut, we need to make sure to increase the coconut balance, by calling `StoreInventory`'s function `GiveItem`.

``` cs
// If the user collects a coconut, we increase the coconut balance.
StoreInventory.GiveItem(ExampleAssets.COCONUT.ID, 1);
```

Once the user completes the coconut mission at some point in the game, we'll want to change the UI at the top left corner of the screen from displaying the number of coconuts collected to the message "Mission Accomplished!". To do that we'll implement the event handler that is triggered when a mission is complete.

``` cs
void onMissionCompleted(Mission mission) {
  if (mission.Name == "Coconut Mission") {
    // Remove from the UI the number of coconuts collected, and
    // instead insert the message "Mission Accomplished!".
  }
}
```

<br>
####**Throwing Coconuts**

If the user uses one of the coconuts he/she collected for knocking out enemies, we need to deduct his/her coconut balance.

``` cs
// If the user uses a coconut, we decrease the coconut balance.
StoreInventory.TakeItem(ExampleAssets.COCONUT.ID, 1);
```

<br>
**For the curious:** What's going on behind the scenes is that every time we increase or decrease the user's coconut balance, an `OnGoodBalanceChanged` event is thrown. Our `BalanceMission`, (`coconutMission`) is registered to such an event so every time this event is thrown, the coconut's balance is checked to determine if it reached the desired balance of 5. Once the user collects 5 coconuts (i.e. his/her coconut balance is 5), the `coconutMission` will be marked as complete and the user will receive his/her reward.

<br>
####**Displaying Rewards**

Once a user completes the coconut mission, he/she will receive a reward. We will want to let the user know what reward he earned. If the user is in the middle of playing, we don't want to disturb him/her, so we'll display a small top-bar that informs of the reward. However, if the user is not actively playing, we'll display a popup on the entire screen. To do this we'll implement the event handler that is triggered when a reward is given.

``` cs
void onRewardGiven(Reward reward) {
    String rewardMessage = "Congratulations! You won " + reward.Name;

    if (currentLevel.State == Level.LevelState.Running) {
        // Display the rewardMessage at the top of the screen in small text
    }
    else {
        // Display the rewardMessage in a popup on the entire screen
    }
}
```

###**End level**

####**Case 1:**

If Chimpo is attacked by a predator, we'll need to end the level unsuccessfully:

``` cs
level.End(false);
```

If we check the level's completion status, we'll get false. That means the `WorldCompletionGate` for the next level (whose associated world is this current level) will not be open, and therefore this will ensure that the next level won't be open for play. In this case, we'll want to draw the relevant UI, for example a screen that has a replay button that allows the player to try this level again.

<div class="info-box">TIP: Here, in your games, you can incorporate a concept of "lives" to limit the number of times the user can try again to succeed at a level. If he/she reaches the limit and still does not succeed, you can offer him/her either to wait some duration of time until they can try again, or offer a `PurchasingMission` where they can buy extra lives (to continue play immediately) AND they'll receive a reward.</div>

``` cs
bool isLevelComplete = level.IsCompleted();

if (!isLevelComplete) {
  // Draw the relevant UI
}
```

<br>
####**Case 2:**

The user successfully escapes all predators and reaches the exit on the screen.

![alt text](/img/tutorial_img/levelup_game/levelEnd.png "End Level")

If the exit `isOpen` (meaning that Chimpo collected the 2 bananas), we'll end the level successfully! Here, we should also render the relevant UI, such as a screen that congratulates the user and offers him/her to continue to the next level or go back to the main menu.

Notice that once we call `End(true)`, the next level's `WorldCompletionGate` will open.

``` cs
// If Chimpo tries to walk through the exit, we need to check that
// the exit is open.
if (exitIsOpen) {

  // End this level successfully
  // (Saves score internally)
  level.End(true);

	// Draw the relevant UI screen

}
```
