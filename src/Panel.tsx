import React from "react";
import { useAddonState, useChannel, useParameter } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS, PARAM_KEY } from "./constants";
import { PanelContent } from "./components/PanelContent";
import { State } from "./State";
import { AddonParameters } from "./AddonParameters";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [state, setState] = useAddonState<State>(ADDON_ID, {});
  const parameters = useParameter(PARAM_KEY, {
    include: ["padding", "fontFamily", "outline"],
  } as AddonParameters);
  useChannel({
    [EVENTS.UPDATE]: (state: State) => {
      setState(state);
    },
  });

  return (
    <AddonPanel {...props}>
      <PanelContent state={state} parameters={parameters} />
    </AddonPanel>
  );
};
