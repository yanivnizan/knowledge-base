---
layout: "content"
image: "Tutorial"
title: "LevelUp Class"
text: "LevelUp.cs is a class that provides many useful functions for retrieving different LevelUp entities and information about them."
position: 3
theme: 'soomla'
collection: 'soomla_blueprint'
---

#**LevelUp**

`LevelUp.cs` is the top level container for the unity-levelup model and definitions. It stores the configurations of the game's `World`-hierarchy and provides lookup functions for `LevelUp` model elements.


##Fields

**`LevelUp` holds the following:**

- An instance of `LevelUp` - This is the instance to initialize in order to initialize the entire `LevelUp` module.

- `InitialWorld` - The `World` that your users will begin on; the main `World` of your game.

- `Rewards` - The rewards that are available in your game.

##Important Functions

**NOTE:** You can also find example usages of these functions in [LevelUp Game Design Model](TODO).

**Initialize:**

``` cs
LevelUp.GetInstance().Initialize(mainWorld, new List<Reward>() { coinReward, bombReward });
```

<br>
**Retrieve various entities:**

``` cs
Score score = new Score("scoreID");
BadgeReward reward = new BadgeReward("rewardID", "Example Reward");
World world = new World("worldID");

/// Retrieve entities:
Score s = LevelUp.GetInstance().GetScore(score.ID);
Reward r = LevelUp.GetInstance().GetReward(reward.ID);
World w = LevelUp.GetInstance().GetWorld(world.ID);
```

<br>

**Retrieve information about `Level`s and `World`s:**

``` cs
/// Get total number of levels in all worlds and inner worlds, starting with the InitialWorld.
int totalNumOfLevels = LevelUp.GetInstance().GetLevelCount();

/// Get total number of levels in the given world and its inner worlds.
int numOfLevels = LevelUp.GetInstance().GetLevelCountInWorld();

/// Get total number of worlds and their inner worlds (false signifies not to count their levels).
int numOfWorlds = LevelUp.GetInstance().GetWorldCount(false);

/// Get total number of completed levels.
int numCompLevels = LevelUp.GetInstance().GetCompletedLevelCount();

/// Get total number of completed worlds.
int numCompWorlds = LevelUp.GetInstance().GetCompletedWorldCount();
```
