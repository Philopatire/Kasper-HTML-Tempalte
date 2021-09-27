function removeClass(nodeList, theClass) {
  nodeList.forEach((el) => el.classList.remove(theClass));
}
let displayedSection = 0;
// Know Displayed Section
{
  let header = document.getElementById("header"),
    services = document.getElementById("services"),
    portfolio = document.getElementById("portfolio"),
    about = document.getElementById("about"),
    clients = document.getElementById("clients"),
    contact = document.getElementById("contact");
  let links = document.querySelectorAll("nav ul.links li a");
  links.forEach((el) => {
    el.onclick = () => {
      removeClass(links, "active");
      el.classList.add("active");
    };
  });
  document.body.onscroll = () => {
    if (header.offsetHeight - (scrollY - header.offsetTop) - 100 > 0)
      displayedSection = 0;
    else if (services.offsetHeight - (scrollY - services.offsetTop) - 100 > 0)
      displayedSection = 1;
    else if (portfolio.offsetHeight - (scrollY - portfolio.offsetTop) - 100 > 0)
      displayedSection = 2;
    else if (about.offsetHeight - (scrollY - about.offsetTop) - 100 > 0)
      displayedSection = 3;
    else if (clients.offsetHeight - (scrollY - clients.offsetTop) - 100 > 0)
      displayedSection = 4;
    else if (contact.offsetHeight - (scrollY - contact.offsetTop) - 100 > 0)
      displayedSection = 5;
    removeClass(links, "active");
    links[displayedSection].classList.add("active");
  };
  let menuIcon = document.querySelector("nav i"),
    linksDiv = document.querySelector("nav .links");
  menuIcon.onclick = () => {
    if (linksDiv.style.display == "block") {
      linksDiv.style.display = "none";
    } else {
      linksDiv.style.display = "block";
    }
  };
}
// Portfolio
{
  function shuffle(elementClick, elementFunction, theDisplay) {
    elementClick.onclick = () => {
      all.forEach((el) => {
        el.style.display = "none";
      });
      elementFunction.forEach((el) => {
        el.style.display = theDisplay;
      });
    };
  }
  let shuffles = document.querySelectorAll(".portfolio .shuffle button"),
    all = document.querySelectorAll(".portfolio .photos .image"),
    web = document.querySelectorAll(".portfolio .photos .image.web"),
    graphics = document.querySelectorAll(".portfolio .photos .image.graphics"),
    photography = document.querySelectorAll(
      ".portfolio .photos .image.photography"
    ),
    illustration = document.querySelectorAll(
      ".portfolio .photos .image.illustration"
    );
  shuffles.forEach((el, i) => {
    el.onclick = () => {
      removeClass(shuffles, "active");
      el.classList.add("active");
    };
  });
  shuffle(shuffles[0], all, "inline");
  shuffle(shuffles[1], web, "inline");
  shuffle(shuffles[2], graphics, "inline");
  shuffle(shuffles[3], photography, "inline");
  shuffle(shuffles[4], illustration, "inline");
}
// End Portfolio
// Stats
{
  let happyClients = document.getElementById("happyClients"),
    completedProjects = document.getElementById("completedProjects"),
    awards = document.getElementById("awards"),
    coffeeDrinks = document.getElementById("coffeeDrinks");
  let data = {
    happyClients: 1600,
    completedProjects: 3200,
    awards: 40,
    coffeeDrinks: 20000,
  };
  function makeCounter(countHTML, nameInData) {
    let interval = setInterval(() => {
      let countHTMLInner = countHTML.innerHTML.match(/\d+/g).join("");
      countHTML.innerHTML = ++countHTMLInner;
      if (countHTMLInner >= data[nameInData]) clearInterval(interval);
      if (countHTML.innerHTML.length > 4) {
        let firstTowNumber = countHTML.innerHTML.match(/\d{2}/);
        let afterFirstTowNumber = countHTML.innerHTML.match(/(?<=\d{2}\s*)\d+/);
        countHTML.innerHTML = `${firstTowNumber} ${afterFirstTowNumber}`;
      }
    }, 1);
  }
  makeCounter(happyClients, "happyClients");
  makeCounter(completedProjects, "completedProjects");
  makeCounter(awards, "awards");
  makeCounter(coffeeDrinks, "coffeeDrinks");
}
// End Stats
// Skills
{
  let HTMLCSS = document.getElementById("HTMLCSS"),
    AIPS = document.getElementById("AIPS"),
    JSPHP = document.getElementById("JSPHP"),
    photography = document.getElementById("PHOTO");
  let loaderHTMLCSS = document.querySelector("#HTMLCSS ~ .loader"),
    loaderAIPS = document.querySelector("#AIPS ~ .loader"),
    loaderJSPHP = document.querySelector("#JSPHP ~ .loader"),
    loaderPhotography = document.querySelector("#PHOTO ~ .loader");
  let data = {
      HTMLCSS: "90%",
      AIPS: "96%",
      JSPHP: "85%",
      photography: "94%",
    },
    loaderData = {
      HTMLCSS: "165deg",
      AIPS: "200deg",
      JSPHP: "145deg",
      photography: "180deg",
    };
  function makeCounter(countHTML, nameInData) {
    let interval = setInterval(() => {
      let countHTMLInner = parseInt(countHTML.innerHTML);
      countHTML.innerHTML = `${++countHTMLInner}%`;
      if (countHTMLInner >= parseInt(data[nameInData])) clearInterval(interval);
    }, 40);
  }
  function makeCounterSpinner(countHTML, nameInData) {
    let interval = setInterval(() => {
      let rotate = Number(countHTML.style.transform.match(/\d+/g).join(""));
      countHTML.style.transform = `rotate(${++rotate}deg)`;
      if (rotate >= parseInt(loaderData[nameInData])) clearInterval(interval);
    }, 40);
  }
  makeCounter(HTMLCSS, "HTMLCSS");
  makeCounter(AIPS, "AIPS");
  makeCounter(JSPHP, "JSPHP");
  makeCounter(photography, "photography");
  makeCounterSpinner(loaderHTMLCSS, "HTMLCSS");
  makeCounterSpinner(loaderAIPS, "AIPS");
  makeCounterSpinner(loaderJSPHP, "JSPHP");
  makeCounterSpinner(loaderPhotography, "photography");
}
// End Skills
// Clients
{
  let leftBtn = document.querySelector(".clients .buttons .left"),
    rightBtn = document.querySelector(".clients .buttons .right"),
    groups = document.querySelectorAll(".clients .photos [class^=group]"),
    groupActive,
    groupActiveIndex;

  rightBtn.onclick = plus;
  leftBtn.onclick = minus;
  function redeclare() {
    groupActive = document.querySelector(
      ".clients .photos [class^=group].active"
    );
    for (let i = 0; i < groups.length; i++) {
      if (groups[i] == groupActive) groupActiveIndex = i;
      break;
    }
  }
  function plus() {
    redeclare();
    if (groupActiveIndex == groups.length - 1) groupActiveIndex = -1;
    groupActive.style.left = "120%";
    groups[++groupActiveIndex].style.animation = "to-left 1s linear";
    groups[groupActiveIndex].style.left = "0";
    setTimeout(() => {
      removeClass([groupActive], "active");
      groups[groupActiveIndex].classList.add("active");
    }, 1000);
  }
  function minus() {
    redeclare();
    if (groupActiveIndex == 0) groupActiveIndex = groups.length;
    groupActive.style.left = "-120%";
    groups[--groupActiveIndex].style.animation = "to-right 1s linear";
    groups[groupActiveIndex].style.left = "0";
    setTimeout(() => {
      removeClass([groupActive], "active");
      groups[groupActiveIndex].classList.add("active");
    }, 1000);
  }
}
// End Clients
