function showResponsiveMenu() {
    let menu = document.getElementById("topnav_responsive_menu");
    let icon = document.getElementById("topnav_hamburger_icon");
    let root = document.getElementById("root");
    if (menu.className === "") {
      menu.className = "open";
      icon.className = "open";
      root.style.overflowY = "hidden";
    } else {
      menu.className = "";                    
      icon.className = "";
      root.style.overflowY = "";
    }
  }