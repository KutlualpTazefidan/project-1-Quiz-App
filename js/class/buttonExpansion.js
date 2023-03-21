// animating the add question menu according to
// https://developer.chrome.com/blog/performant-expand-and-collapse/ or
// https://css-tricks.com/performant-expandable-animations-building-keyframes-on-the-fly/

class expandableButton {
  constructor(submitForm, newQuestionIcon) {
    this.menu = submitForm;
    this.menuContents = this.menu.querySelector(".js-menu");
    this.menuToggleButton = this.menu.querySelector("js-menu-button");
    this.menuTitle = this.menu.querySelector("js-menu-title");

    this.expanded = true;
    this.animate = false;
    this.nFrames = 60;
    this.collapsed;
    this.index = index;

    // bind -> binds a function with stated arguments to a variable
    // so it can be used again and again
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

  calculateScales() {
    const collapsed = this.menuTitle.getBoundingClientRect();
    const expanded = this.menu.getBoundingClientRect();

    // Why divide by expanded.width ? maybe normalizing
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

    const menuExpandAnimaiton = [];
    const menuExpandContentsAnimaiton = [];
    const menuCollapseAnimaiton = [];
    const menuCollapsedContentsAnimaiton = [];
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
        outerAnimation: menuCollapseAnimaiton,
        innerAnimation: menuCollapsedContentsAnimaiton,
      });
    }
  }

  // calculateCollapsedScale() {
  //   const collapsed = newQuestionIcon.getBoundingClientRect();
  //   const expanded = submitForm.getBoundingClientRect();
  //   return {
  //     x: collapsed.width / expanded.width,
  //     y: collapsed.height / expanded.height,
  //   };
  //   // Baking expanding and collapsing animations, so that css can use them.
  //   const frame = 100; // length of the loop and should be more 60 to have smooth animation
  //   function createKeyframeAnimation() {
  //     let { x, y } = calculateCollapsedScale();
  //     let animatoin = "";
  //     let animationInverse = "";
  //     for (let step = 0; step <= frame; step++) {}
  //   }
  //   let i = 0;
  //   function calculateEaseValue(v, pow = 4) {
  //     return 1 - Math.pow(1 - v, pow);
  //   }
  //   let easedStep = calculateEaseValue(i, frame);
  //   const xScale = x + (1 - x) * easedStep;
  //   const yScale = y + (1 - y) * easedStep;
  // }
}
