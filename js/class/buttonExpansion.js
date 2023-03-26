// animating the add question menu according to
// https://developer.chrome.com/blog/performant-expand-and-collapse/ or
// https://css-tricks.com/performant-expandable-animations-building-keyframes-on-the-fly/

export default class expandableButton {
  constructor(
    activationButton,
    inputForm,
    inputContents,
    initialSizeAndPosition
  ) {
    this.inputForm = inputForm;
    this.inputContents = inputContents;
    this.formToggleButton = activationButton;
    this.formInitialSizeAndPosition = initialSizeAndPosition;

    this.expanded = true;
    this.animate = false;
    this.numberFrames = 60;
    this.collapsed;

    // bind -> binds a function with stated arguments to a variable
    // so it can be used again and again
    // Following three lines are used to use&store in it current state
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    this.toggle = this.toggle.bind(this);

    this._getCollapsedAndExpandedBoundingBox();
    this._createEaseAnimation();
    this._addEventListeners();

    this.collapse();
    this.activate();
  }

  _getCollapsedAndExpandedBoundingBox() {
    // Storing the expanded and collapsed size of the menu
    const collapsed = this.formInitialSizeAndPosition.getBoundingClientRect();
    const expanded = this.inputForm.getBoundingClientRect();

    // Why divide by expanded.width? benefit ? % ? maybe normalizing
    this.collapsed = {
      // x: collapsed.width / expanded.width,
      // y: collapsed.height / expanded.height,
      x: 0,
      y: 0,
    };
  }

  _createEaseAnimation() {
    // Creating the expand animation for a given number of frames
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
    for (let i = 0; i <= this.numberFrames; i++) {
      const step = this._ease(i / this.numberFrames);
      const startX = this.collapsed.x;
      const startY = this.collapsed.y;
      const endX = 1;
      const endY = 1;

      // Expand animation
      this._appendAnimation({
        i,
        step,
        startX: this.collapsed.x,
        startY: this.collapsed.y,
        endX: 1,
        endY: 1,
        outerAnimation: menuExpandAnimation,
        innerAnimation: menuExpandContentsAnimation,
      });
      // Collapse animation
      this._appendAnimation({
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
    this.inputForm.classList.add("menu--active");
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

    this.inputForm.style.transform = `scale(${x},${y})`;
    this.inputContents.style.transform = `scale(${invX},${invY})`;

    if (!this.animate) {
      return;
    }
    this._applyAnimation({ expand: false });
  }

  toggle() {
    if (this.expanded) {
      this.collapse();
      return;
    }
    this.expand();
  }

  expand() {
    if (this.expanded) {
      return;
    }
    this.expanded = true;
    this.inputForm.style.transform = `scale(1,1)`;
    this.inputContents.style.transform = `scale(1,1)`;
    if (!this.animate) {
      return;
    }
    this._applyAnimation({ expand: true });
  }

  _addEventListeners() {
    // addEventListener(type,listener)
    // called when the event occurs
    // listener: object that receives info when an event occurs
    console.log();
    this.formToggleButton.addEventListener("click", this.toggle);
  }

  // opts allows to pass any number of named arguments to a function
  _applyAnimation({ expand } = opts) {
    this.inputForm.classList.remove("menu--expanded");
    this.inputForm.classList.remove("menu--collapsed");
    this.inputContents.classList.remove("menu___contents--expanded");
    this.inputContents.classList.remove("menu___contents--collapsed");

    // forcing styles to recalc, so the classes take hold - ???
    window.getComputedStyle(this.inputForm).transform;

    if (expand) {
      this.inputForm.classList.add("menu--expanded");
      this.inputContents.classList.add("menu___contents--expanded");
      return;
    }
    this.inputForm.classList.add("menu--collapsed");
    this.inputContents.classList.add("menu___contents--collapsed");
  }

  _appendAnimation({
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
    ${i}% {
      transform: scale(${xScale}, ${yScale})
    }`);
    innerAnimation.push(`
    ${i}% {
      transform: scale(${invScaleX}, ${invScaleY})
    }`);
  }

  _clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  _ease(v, pow = 4) {
    v = this._clamp(v, 0, 1);
    return 1 - Math.pow(1 - v, pow);
  }
}
