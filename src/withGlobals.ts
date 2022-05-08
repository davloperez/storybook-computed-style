import { DecoratorFunction, useChannel } from "@storybook/addons";
import { useEffect, useGlobals } from "@storybook/addons";
import { EVENTS } from "./constants";
import { State } from "./State";

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  const [{ selectingElement }] = useGlobals();
  const emit = useChannel({});
  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === "docs";
  let rootElement: HTMLElement;

  useEffect(() => {
    // Execute your side effect here
    // For example, to manipulate the contents of the preview
    const selector = isInDocs ? `#anchor--${context.id} .docs-story` : `#root`;
    rootElement = rootElement ?? document.querySelector(selector);

    if (selectingElement) {
      rootElement.addEventListener("mouseover", handleMouseOver);
      rootElement.addEventListener("mouseout", handleMouseOut);
      rootElement.addEventListener("click", handleClick);
    } else {
      rootElement.removeEventListener("mouseover", handleMouseOver);
      rootElement.removeEventListener("mouseout", handleMouseOut);
      rootElement.removeEventListener("click", handleClick);
    }
    clearComputedStyles();
  }, [selectingElement]);

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const selectedElement = rootElement.querySelector(
      "[data-computed-style-selected=true]"
    ) as HTMLElement;
    if (target === selectedElement) {
      return;
    }
    if (selectedElement) {
      selectedElement.removeAttribute("data-computed-style-selected");
      resetOriginalOutline(selectedElement);
    }
    if (target === rootElement) {
      clearComputedStyles();
      return;
    }
    if (target !== rootElement) {
      target.setAttribute("data-computed-style-selected", "true");
      target.style.outline = "1px solid #00F";
      emit(EVENTS.UPDATE, {
        item: {
          id: target.getAttribute("id"),
          nodeName: target.nodeName,
        },
        computedStyles: window.getComputedStyle(target),
        boundingClientRect: target.getBoundingClientRect(),
      });
    }
  };

  const handleMouseOver = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isSelected =
      target.getAttribute("data-computed-style-selected") === "true";
    if (target !== rootElement && !isSelected) {
      target.setAttribute("data-computed-style-outline", target.style.outline);
      target.style.outline = "1px solid #F00";
    }
  };

  const handleMouseOut = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isSelected =
      target.getAttribute("data-computed-style-selected") === "true";
    if (!isSelected) {
      resetOriginalOutline(target);
    }
  };

  const resetOriginalOutline = (target: HTMLElement) => {
    const originalOutline = target.getAttribute("data-computed-style-outline");
    target.style.outline = originalOutline || "";
    target.removeAttribute("data-computed-style-outline");
  };

  const clearComputedStyles = () => {
    emit(EVENTS.UPDATE, {
      item: undefined,
      computedStyles: undefined,
      boundingClientRect: undefined,
    });
  };

  return StoryFn();
};
