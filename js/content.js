function searchGameOnPlatform(
  container,
  platformURL,
  platformName,
  formattedGameName,
  iconUrl,
) {
  const searchURL = `${platformURL}${formattedGameName}`;
  createButton(
    container,
    searchURL,
    platformName,
    `Search on ${platformName}`,
    iconUrl,
  );
}

const gameNameElement = document.getElementById("appHubAppName");
if (gameNameElement) {
  const gameName = gameNameElement.textContent.trim();
  const formattedGameName = gameName
    .toLowerCase()
    .replace(/['_™]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, " ");

  const buttonContainer = document.createElement("div");
  gameNameElement.parentNode.insertBefore(
    buttonContainer,
    gameNameElement.nextSibling,
  );

  function createButton(
    container,
    searchLink,
    buttonText,
    tooltipText,
    iconPath,
  ) {
    const linkButton = document.createElement("button");
    linkButton.style.cssText =
      "background-color: transparent; border: none; padding: 0; cursor: pointer; transition: background-color 1s ease-out;";

    const img = new Image();
    img.src = iconPath;
    img.alt = buttonText;
    img.classList.add("site-icon");
    img.style.cssText =
      "width: 64px; height: 32px; object-fit: contain; background: linear-gradient(to right, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%); padding: 5px; border-radius: 10px; transition: transform 0.3s ease-in-out;";

    img.addEventListener("mouseover", function () {
      this.style.backgroundColor = "grey";
    });

    img.addEventListener("mouseout", function () {
      this.style.backgroundColor = "transparent";
    });

    linkButton.appendChild(img);
    linkButton.classList.add("search-button");
    linkButton.title = `Search on ${buttonText}`;

    linkButton.onclick = function () {
      chrome.storage.local.set({ searchLink: searchLink });
      chrome.runtime.sendMessage({ openLink: true });
    };

    container.appendChild(linkButton);
  }

  function createButtonsFromSettings(sites) {
    buttonContainer.innerHTML = "";
    sites.forEach((site) => {
      if (site.enabled) {
        switch (site.name) {
          case "Online Fix":
            searchGameOnPlatform(
              buttonContainer,
              "https://online-fix.me/index.php?do=search&subaction=search&story=",
              "Online Fix",
              formattedGameName,
              "https://i.imgur.com/WAXRAUw.png",
            );
            break;
          case "Skidrow":
            searchGameOnPlatform(
              buttonContainer,
              "https://www.skidrowreloaded.com/?s=",
              "Skidrow",
              formattedGameName,
              "https://i.imgur.com/qRtlnsn.png",
            );
            break;
          case "FitGirl":
            searchGameOnPlatform(
              buttonContainer,
              "https://fitgirl-repacks.site/?s=",
              "FitGirl",
              formattedGameName,
              "https://i.imgur.com/GOFbweI.png",
            );
            break;
          case "SteamRIP":
            searchGameOnPlatform(
              buttonContainer,
              "https://steamrip.com/?s=",
              "SteamRIP",
              formattedGameName,
              "https://i.imgur.com/tmvOT86.png",
            );
            break;
          case "Dodi":
            searchGameOnPlatform(
              buttonContainer,
              "https://dodi-repacks.site/?s=",
              "Dodi",
              formattedGameName,
              "https://i.imgur.com/g71t1Ge.png",
            );
            break;
          case "Gload":
            searchGameOnPlatform(
              buttonContainer,
              "https://gload.to/?s=",
              "Gload",
              formattedGameName,
              "https://gload.to/logo.png",
            );
            break;
          case "GOG":
            searchGameOnPlatform(
              buttonContainer,
              "https://www.gog-games.to/search/",
              "GOG",
              formattedGameName,
              "https://i.imgur.com/wXfz72C.png",
            );
            break;
          case "Crack Status":
            searchGameOnPlatform(
              buttonContainer,
              "https://crackstatus.net/tracker.php?nm=",
              "Crack Status",
              formattedGameName,
              "https://i.imgur.com/3szizz7.png",
            );
            break;
          case "RuTracker":
            searchGameOnPlatform(
              buttonContainer,
              "https://rutracker.org/forum/tracker.php?nm=",
              "RuTracker",
              formattedGameName,
              "https://i.imgur.com/wOjpyEc.png",
            );
            break;
          default:
            break;
        }
      }
    });
  }

  chrome.storage.local.get({ sites: [] }, (data) => {
    const storedSites = data.sites;
    if (storedSites && storedSites.length > 0) {
      createButtonsFromSettings(storedSites);
    }

    chrome.storage.local.onChanged.addListener((changes) => {
      const changedSites = changes.sites.newValue;
      if (changedSites) {
        createButtonsFromSettings(changedSites);
      }
    });
  });

  const platforms = [
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
    [
      "https://dodi-repacks.site/?s=",
      "Dodi",
      "https://i.imgur.com/g71t1Ge.png",
    ],
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

  platforms.forEach((platform) => {
    searchGameOnPlatform(
      buttonContainer,
      platform[0],
      platform[1],
      formattedGameName,
      platform[2],
    );
  });
}

