import React from "react";
import { useAddonState, useChannel } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS } from "./constants";
import { PanelContent } from "./components/PanelContent";
import { State } from "./State";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [state, setState] = useAddonState<State>(ADDON_ID, {});
  useChannel({
    [EVENTS.UPDATE]: (state: State) => {
      setState(state);
    },
  });

  return (
    <AddonPanel {...props}>
      <PanelContent state={state} />
    </AddonPanel>
  );
};
