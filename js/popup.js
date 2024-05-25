function retrieveSettings() {
  chrome.storage.local.get({ sites: getDefaultSites() }).then(({ sites }) => {
    renderSiteList(sites);
    applySettingsToSteamPage(sites);
  }).catch((error) => console.error("Error retrieving settings:", error));
}

function saveSettings(sites) {
  chrome.storage.local.set({ sites }).then(() => {
    console.log("Settings saved:", sites);
    applySettingsToSteamPage(sites.filter((site) => site.enabled));
  }).catch((error) => console.error("Error saving settings:", error));
}

function applySettingsToSteamPage(sites) {
  chrome.tabs.query({ url: "*://steamcommunity.com/*" }).then((tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { updatedSettings: sites }).catch((error) => {
        console.error("Error sending message to tab:", error);
      });
    });
  }).catch((error) => console.error("Error querying tabs:", error));
}

function getDefaultSites() {
  return [
    { name: "Online Fix", enabled: true },
    { name: "Skidrow", enabled: true },
    { name: "FitGirl", enabled: true },
    { name: "SteamRIP", enabled: true },
    { name: "Dodi", enabled: true },
    { name: "Gload", enabled: true },
    { name: "GOG", enabled: true },
    { name: "Crack Status", enabled: true },
    { name: "RuTracker", enabled: true },

  ];
}

function renderSiteList(sites) {
  const siteListContainer = document.getElementById("siteList");
  siteListContainer.innerHTML = "";

  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid-container");

  sites.forEach((site) => {
    const siteDiv = document.createElement("div");
    siteDiv.classList.add("site-item");

    const siteIcon = document.createElement("img");
    siteIcon.classList.add("site-icon");
    siteIcon.src = getIconURLForSite(site.name);
    siteDiv.appendChild(siteIcon);

    const siteName = document.createElement("span");
    siteName.classList.add("site-name");
    siteName.textContent = site.name;
    siteDiv.appendChild(siteName);

    siteDiv.addEventListener("click", () => {
      site.enabled = !site.enabled;
      updateSiteState(site, siteIcon, siteName);
      saveSettings(sites);
    });

    updateSiteState(site, siteIcon, siteName);
    gridContainer.appendChild(siteDiv);
  });

  siteListContainer.appendChild(gridContainer);
}

function updateSiteState(site, siteIcon, siteName) {
  if (site.enabled) {
    siteIcon.style.filter = "none"; 
    siteName.style.filter = "none"; 
  } else {
    siteIcon.style.filter = "brightness(30%) grayscale(100%)"; 
    siteName.style.filter = "grayscale(100%)"; 
  }
}



function getIconURLForSite(siteName) {
  const icons = {
    "Online Fix": "https://i.imgur.com/WAXRAUw.png",
    "Skidrow": "https://i.imgur.com/qRtlnsn.png",
    "FitGirl": "https://i.imgur.com/GOFbweI.png",
    "SteamRIP": "https://i.imgur.com/tmvOT86.png",
    "Dodi": "https://i.imgur.com/g71t1Ge.png",
    "Gload": "https://gload.to/logo.png",
    "GOG": "https://i.imgur.com/wXfz72C.png",
    "Crack Status": "https://i.imgur.com/3szizz7.png",
    "RuTracker": "https://i.imgur.com/wOjpyEc.png",

  };

  return icons[siteName] || "";
}

document.addEventListener("DOMContentLoaded", retrieveSettings);
