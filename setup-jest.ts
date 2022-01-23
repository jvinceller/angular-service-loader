import "jest-preset-angular/setup-jest";

// legacy window.scroll(x,y) definition
Object.defineProperty(window, "scroll", {value: (_x: any, _y: any) => {}, writable: true});

// maybe wrong?
// Object.defineProperty(window, "CSS", {value: null});

// document.doctype
Object.defineProperty(document, "doctype", {value: "<!DOCTYPE html>"});

// window.getComputedStyle()
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    display: "none",
    appearance: ["-webkit-appearance"]
  })
});

// document.body.style.transform()
Object.defineProperty(document.body.style, "transform", {value: () => ({enumerable: true, configurable: true})});
