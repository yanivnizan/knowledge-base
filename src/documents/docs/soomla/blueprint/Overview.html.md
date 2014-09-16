---
layout: "content"
image: "Tutorial"
title: "Overview"
text: "LevelUp provides helps game developers create a game progression plan, by modeling out worlds, levels, scores, missions, and more."
position: 1
theme: 'soomla'
collection: 'soomla_blueprint'
---

#SOOMLA's LevelUp Module

SOOMLA's LevelUp module is an open-source project that helps game developers create a game progression plan for their games. The main goal of LevelUp is to give users a sense of accomplishment, by providing entities such as worlds, levels, scores, missions, and rewards. Games that incorporate these are bound to succeed in creating long-term engagement for their users.

![alt text](/img/tutorial_img/soomla_diagrams/LevelUpModel.png "Soomla LevelUp Model")

##Dependencies

LevelUp is dependent on SOOMLA's other modules, [Store](/docs/soomla/store) and [Profile](/docs/soomla/storefront).  The **Store** module provides an in-game economy that allows game developers to easily implement virtual currencies, virtual goods, and in-app purchases. Profile enables game developers to integrate social actions into their games, such as allowing users to share a story on Facebook, tweet a status on Twitter, amongst other options.

LevelUp uses some of the entities provided in Store and Profile. For example, LevelUp has a mission called `socialStatusMission` - This is an example of one of the types of missions available in LevelUp, yet it includes updating a **social** status, which is why it needs the functionality provided in Profile. Another example is `balanceGate`, that belongs to LevelUp. This is a gate that can be unlocked by reaching a desired balance of some virtual item, such as: collecting 100 coins (a virtual currency) in order to unlock the gate. As you can probably tell, `balanceGate` is dependent on the entities provided in Store.

##The Building Blocks

###Game Design Modeling

SOOMLA’s dynamic and flexible LevelUp data model will allow you to easily model your game and easily manage your Levels, Scores, Rewards and more. This modeling was designed after investigating many successful mobile games and talking to game developers. [Learn more...](/docs/soomla/blueprint/Model)

###LevelUp Events

Be notified when something interesting happens in your game. LevelUp will fire an event when your user breaks a record or when a world's gate opens. Then, you can handle these events accordingly, with your game-specific behavior. [Learn more...](/docs/soomla/blueprint/Events)

###Local Storage

LevelUp will keep your game's state encrypted in SOOMLA's on-device key-value database technology. You don't need to take care of these things ever again, just let LevelUp take care of it for you and query for whatever you need using the API in LevelUp's model objects. [Learn more...](/docs/soomla/blueprint/Storage)
