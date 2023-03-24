// animating the add question menu according to
// https://developer.chrome.com/blog/performant-expand-and-collapse/ or
// https://css-tricks.com/performant-expandable-animations-building-keyframes-on-the-fly/

class expandableButton {
  constructor(
    activationButton,
    inputForm,
    inputContents,
    initialSizeAndPosition
  ) {
    this.inputForm = inputForm;
    this.inputContents = inputContents;
    this.formToggleButton = activationButton;
    this.forminitialSizeAndPosition = initialSizeAndPosition;

    this.expanded = true;
    this.animate = false;
    this.nFrames = 60;
    this.collapsed;
    this.index = index;

    // bind -> binds a function with stated arguments to a variable
    // so it can be used again and again
    // Following three lines are used to use&store in it current state
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    this.toggle = this.toggle.bind(this);

    this.calculateScales();
    this.createEaseAnimation();
    this.addEventListeners();

    // we have the event listener, why do we still need to call these 2?
    this.collapse();
    this.activate();
  }

  calculateScales() {
    // Storing the expanded and collapsed size of the menu
    const collapsed = this.menuTitle.getBoundingClientRect();
    const expanded = this.menu.getBoundingClientRect();

    // Why divide by expanded.width? benefit ? % ? maybe normalizing
    this.collapsed = {
      x: collapsed.width / expanded.width,
      y: collapsed.height / expanded.height,
    };
  }

  createEaseAnimation() {
    let menuEase = document.querySelector(".menu-ease");
    if (menuEase) {
      return menuEase;
    }

    menuEase = document.createElement("style");
    menuEase.classList.add("menu-ease");

    const menuExpandAnimation = [];
    const menuExpandContentsAnimation = [];
    const menuCollapseAnimation = [];
    const menuCollapsedContentsAnimation = [];
    for (let i = 0; i <= nFrames; i++) {
      const step = this.ease(i / 100);
      const startX = this.collapsed.x;
      const startY = this.collapsed.y;
      const endX = 1;
      const endY = 1;

      // Expand animation
      this.appendAnimation({
        i,
        step,
        startX: 1,
        startY: 1,
        endX: this.collapsed.x,
        endY: this.collapsed.y,
        outerAnimation: menuCollapseAnimation,
        innerAnimation: menuCollapsedContentsAnimation,
      });
    }
    menuEase.textContent = ` 
      @keyframes menuExpandAnimation{
        ${menuExpandAnimation.join("")}
      }
      @keyframes menuExpandContentsAnimation{
        ${menuExpandContentsAnimation.join("")}
      }
      @keyframes menuCollapseAnimation{
        ${menuCollapseAnimation.join("")}
      }
      @keyframes menuCollapsedContentsAnimation{
        ${menuCollapsedContentsAnimation.join("")}
      }`;
    document.head.appendChild(menuEase);
    return menuEase;
  }

  activate() {
    this.menu.classList.add("menu--active");
    this.animate = true;
  }

  collapse() {
    if (!this.expanded) {
      return;
    }
    this.expanded = false;

    const { x, y } = this.collapsed;
    const invX = 1 / x;
    const invY = 1 / y;

    this.menu.style.transform = `scale(${x},${y})`;
    this.menuContents.style.transform = `scale(${invX},${invY})`;

    if (!this.animate) {
      return;
    }
    this.applyAnimation({ expand: false });
  }

  expand() {
    if (this.expanded) {
      return;
    }
    this.expanded = true;
    this.menu.style.transform = `scale(1,1)`;
    this.menuContents.style.transform = `scale(1,1)`;
    if (!this.animate) {
      return;
    }
    this.applyAnimation({ expand: true });
  }

  toggle() {
    if (this.expanded) {
      this.collapse();
      return;
    }
    this.expand();
  }

  addEventListeners() {
    // addEventListener(type,listener)
    // called when the event occurs
    // listener: object that receives info when an event occurs
    this.menuToggleButton.addEventListener("click", this.toggle);
  }

  // opts allows to pass any number of named arguments to a function
  applyAnimation({ expands } = opts) {
    this.menu.classList.remove("menu--expanded");
    this.menu.classList.remove("menu--collapsed");
    this.menuContents.classList.remove("menu___contents--expanded");
    this.menuContents.classList.remove("menu___contents--collapsed");

    // forcing styles to recalc, so the classes take hold - ???
    window.getComputedStyle(this.menu).transform;

    if (expand) {
      this.menu.classList.add("menu--expanded");
      this.menuContents.classList.add("menu___contents--expanded");
      return;
    }
    this.menu.classList.add("menu--collapsed");
    this.menuContents.classList.add("menu___contents--collapsed");
  }

  appendAnimation({
    i,
    step,
    startX,
    startY,
    endX,
    endY,
    outerAnimation,
    innerAnimation,
  } = opts) {
    const xScale = startX + (endX - startX) * step;
    const yScale = startY + (endY - startY) * step;
    const invScaleX = 1 / xScale;
    const invScaleY = 1 / yScale;

    outerAnimation.push(`
    ${i}% {}`);
  }

  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  ease(v, pow = 4) {
    v = this.clamp(v, 0, 1);
    return 1 - Math.pow(1 - v, pow);
  }
}

Menu._menu;
