export type State = {
  item?: {
    id?: string;
    nodeName: HTMLElement["nodeName"];
  };
  computedStyles?: CSSStyleDeclaration;
  boundingClientRect?: DOMRect;
};
