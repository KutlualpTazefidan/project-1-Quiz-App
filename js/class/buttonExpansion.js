// animating the add question menu according to
// https://developer.chrome.com/blog/performant-expand-and-collapse/ or
// https://css-tricks.com/performant-expandable-animations-building-keyframes-on-the-fly/

class expandableButton {
  constructor(submitForm, newQuestionIcon) {
    this._menu = submitForm;
    this._menuContents = this._menu.querySelector();
    
  }

  calculateCollapsedScale() {
    const collapsed = newQuestionIcon.getBoundingClientRect();
    const expanded = submitForm.getBoundingClientRect();
    return {
      x: collapsed.width / expanded.width,
      y: collapsed.height / expanded.height,
    };
    // Baking expanding and collapsing animations, so that css can use them.
    const frame = 100; // length of the loop and should be more 60 to have smooth animation
    function createKeyframeAnimation() {
      let { x, y } = calculateCollapsedScale();
      let animatoin = "";
      let animationInverse = "";
      for (let step = 0; step <= frame; step++) {}
    }
    let i = 0;
    function calculateEaseValue(v, pow = 4) {
      return 1 - Math.pow(1 - v, pow);
    }
    let easedStep = calculateEaseValue(i, frame);
    const xScale = x + (1 - x) * easedStep;
    const yScale = y + (1 - y) * easedStep;
  }
}
