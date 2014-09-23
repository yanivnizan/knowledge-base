---
layout: "content"
image: "Tutorial"
title: "PROFILE: Getting Started"
text: "Get started with unity3d-profile. Here you can find integration instructions and a basic example of initialization."
position: 6
theme: 'platforms'
collection: 'platforms_unity'
---

#PROFILE: Getting Started

##Download or Clone

###Pre-baked package

Download [unity3d-profile v1.0](http://bit.ly/1sUDdG0).

###Working with sources

For those of you who want to [contribute](#contribution) code, please use our "sources environment".

```
$ git clone --recursive git@github.com:soomla/unity3d-profile.git
```

<div class="info-box">There are some necessary files in "submodules" linked with symbolic links. If you're cloning the project, make sure you clone it with the `--recursive` flag.</div>

## Getting Started

1. Go over the guidelines for downloading and importing the official [Facebook SDK](https://developers.facebook.com/docs/unity/getting-started/canvas).

	<div class="warning-box">You do NOT need to initialize FB - `SoomlaProfile` will initialize it for you. (for example, **don't** call `FB.Init()`!).</div>

2. Move the "Facebook" folder from "Assets" to "Assets/Plugins"  -  SOOMLA works from the "Plugins" folder so that it'll be available to UnityScript developers. This is why you need to move "Facebook" into "Plugins" as well.

3. Download and import [soomla-unity3d-core.unitypackage](https://github.com/soomla/unity3d-profile/blob/master/soomla-unity3d-core.unitypackage) and [unity3d-profile.unitypackage](http://bit.ly/1sUDdG0). If you also want to use Store related rewards, you'll need to go over the instructions of [unity3d-store](https://github.com/soomla/unity3d-store).

4. Drag the "CoreEvents" and "ProfileEvents" Prefabs from `../Assets/Soomla/Prefabs` into your scene. You should see them listed in the "Hierarchy" panel. **IMPORTANT:** This step MUST be done for unity3d-profile to work properly!

	![alt text](/img/profile/unityPrefabs.png "Prefabs")

5. On the menu bar click "Window" > "Soomla" > "Edit Settings" and change the value for "Soomla Secret".

	<div class="info-box">**Custom Secret** is an encryption secret you provide that will be used to secure your data. Choose this secret wisely, you can't change it after you launch your game! NOTE: If you used unity3d-store versions before v1.5.2 this secret MUST be the same as "Custom Secret". </div>

	![alt text](/img/profile/soomlaSettings.png "Soomla Settings")

6. Initialize `SoomlaProfile`:

    ```cs
    SoomlaProfile.Initialize();
    ```

	<div class="warning-box">IMPORTANT NOTES:<br>

	Initialize `SoomlaProfile` ONLY ONCE when your application loads.<br>

	Initialize `SoomlaProfile` in the `Start()` function of a `MonoBehaviour` and **NOT** in the `Awake()` function. SOOMLA has its own `MonoBehaviour` and it needs to be "Awakened" before you initialize.<br>

7. Call all the social functions you can from the `SoomlaProfile` class (functions such as `Like()`, `UpdateStatus()`, etc.). If you try to call these functions from the `FB` class, you won't be able to work with SOOMLA correctly. You can still call functions from the `FB` class, but only those that are not provided by `SoomlaProfile`.

8. You'll need event handlers in order to be notified about in-app purchasing-related events and social-related event. refer to the [Event Handling](/docs/platforms/unity/Profile_Events) section for more information.

And that's it! unity3d-profile knows how to contact Facebook and perform social actions with the information you provide.

##Contribution

**SOOMLA appreciates code contributions!** You are more than welcome to extend the social capabilities of the SOOMLA Profile module, by adding support to any social provider you wish (Twitter, Google+, etc.), and connect the new provider to SOOMLA's Store module.

<div class="info-box">If you would like to contribute, please follow our [Documentation Guidelines](https://github.com/soomla/cocos2dx-store/blob/master/documentation.md). Clear, consistent comments will make our code easy to understand.</div>

##Example

Here is an example of initializing Profile, logging the user into Facebook, and sharing a story on the user's Facebook wall. To learn about the different entities and functionality of Profile, see [Main Classes & Operations](/docs/platforms/unity/Profile_MainClasses).


<br>
Initialize `SoomlaProfile`.

``` cs
SoomlaProfile.Initialize();
```

<br>
Log the user into Facebook.

``` cs
SoomlaProfile.Login(
	Provider.FACEBOOK,                        // Provider
	new BadgeReward("loggedIn", "Logged In!") // Reward to give
);
```

<br>
Share a story on the user's Facebook wall.

``` cs
SoomlaProfile.UpdateStory(
	Provider.FACEBOOK,                        // Provider
	// Story information below
	"Check out this great story by SOOMLA !",  
	"SOOMLA is 2 years young!",
	"soomla_2_years",
	"http://blog.soom.la/2014/08/congratulations-soomla-is-2-years-young.html",
	"http://blog.soom.la/wp-content/uploads/2014/07/Birthday-bot-300x300.png",
	new BadgeReward("sheriff", "Sheriff")    // Reward
);
```
