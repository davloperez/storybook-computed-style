import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { TOOL_ID } from "./constants";

export const Tool = () => {
  const [{ selectingElement }, updateGlobals] = useGlobals();

  const toggleSelectingElement = useCallback(
    () =>
      updateGlobals({
        selectingElement: selectingElement ? undefined : true,
      }),
    [selectingElement]
  );

  return (
    <IconButton
      key={TOOL_ID}
      active={selectingElement}
      title={
        selectingElement
          ? "End selecting elements to show computed styles"
          : "Select element to show computed styles"
      }
      onClick={toggleSelectingElement}
    >
      {/*
        Checkout https://next--storybookjs.netlify.app/official-storybook/?path=/story/basics-icon--labels
        for the full list of icons
      */}
      <Icons icon={selectingElement ? "eyeclose" : "eye"} />
    </IconButton>
  );
};
