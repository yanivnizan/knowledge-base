---
layout: "sample"
image: "Events"
title: "Events"
text: "Learn how to observe and handle economy events triggered by android-store to customize your game-specific behavior."
position: 5
theme: 'platforms'
collection: 'android_store'
module: 'store'
platform: 'android'
---

# Unity Ads + SOOMLA Store

## Use Case: Reward coins on video ads completion

``` cs
using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.Advertisements;
using Soomla;
using Soomla.Store;

//Just apply this script to an UI Button
public class freeCoins : MonoBehaviour {
	public string COIN_ID = "coin_ID";
    Button btn;
	// Use this for initialization
	void Start () {
        btn = GetComponent<Button>();
		Advertisement.Initialize ("YOUR_UNITYADS_GAMEID");
        Advertisement.allowPrecache = true;
	}

    void LateUpdate()
    {
        if (Advertisement.isReady() && Advertisement.isSupported==true)
        { btn.interactable = true;} else { btn.interactable = false;}
    }

	//UI Button action
	public void ShowAds()
	{
		ShowOptions options = new ShowOptions();
		options.pause=true;
		options.resultCallback=HandleShowResult;
		Advertisement.Show(null,options);
	}
	void HandleShowResult(ShowResult result)
	{
		//Give 200 Coins if the user watched the Ads Completely
		if(result==ShowResult.Finished)
		{
			StoreInventory.GiveItem(COIN_ID, 200);
		}
	}
}
```

## Getting started with the two SDKs

1. If you are already using Unity to develop the game, getting started with Unity Ads is very simple. Import the package, drag the prefab and you are good to go. Here are the <a href="https://unityads.unity3d.com/help/Documentation for Publishers/Integration-Guide-for-Unity" target="_blank">full instructions</a>.

2. Adding SOOMLA store is also very easy: Import, drag the prefab, initialize and setup your virtual goods. Here are the <a href="http://know.soom.la/unity/store/store_gettingstarted/" target="_blank">full instructions</a>.

## Additional tips and recommendations

1. Combine 2 or 3 Video ad networks for increased coverage. Working with a single provider will often lead to inventory problems where `UnityAdsCampaignsAvailable();` returns empty.

2. Adding SOOMLA Highway package will allow your users to backup their balances and will give you more tools to analyze their behavior.
