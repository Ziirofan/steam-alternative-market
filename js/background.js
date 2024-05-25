const defaultPlatforms = [
  [
    "https://online-fix.me/index.php?do=search&subaction=search&story=",
    "Online Fix",
    "https://i.imgur.com/WAXRAUw.png",
  ],
  [
    "https://www.skidrowreloaded.com/?s=",
    "Skidrow",
    "https://i.imgur.com/qRtlnsn.png",
  ],
  [
    "https://fitgirl-repacks.site/?s=",
    "FitGirl",
    "https://i.imgur.com/GOFbweI.png",
  ],
  ["https://steamrip.com/?s=", "SteamRIP", "https://i.imgur.com/tmvOT86.png"],
  ["https://dodi-repacks.site/?s=", "Dodi", "https://i.imgur.com/g71t1Ge.png"],
  ["https://gload.to/?s=", "Gload", "https://gload.to/logo.png"],
  [
    "https://www.gog-games.to/search/",
    "GOG",
    "https://i.imgur.com/wXfz72C.png",
  ],
  [
    "https://crackstatus.net/tracker.php?nm=",
    "Crack Status",
    "https://i.imgur.com/3szizz7.png",
  ],
  [
    "https://rutracker.org/forum/tracker.php?nm=",
    "RuTracker",
    "https://i.imgur.com/wOjpyEc.png",
  ],
];

chrome.runtime.onMessage;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.openLink) {
    chrome.storage.local.get(["searchLink"], function (result) {
      const searchLink = result.searchLink;
      if (searchLink) {
        chrome.tabs.create({ url: searchLink });
      }
    });
  }
});
