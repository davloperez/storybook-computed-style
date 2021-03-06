import React, { Fragment } from "react";
import { Placeholder } from "@storybook/components";
import { State } from "../State";
import { AddonParameters } from "../AddonParameters";

interface PanelContentProps {
  state: State;
  parameters: AddonParameters;
}

export const PanelContent = ({ state, parameters }: PanelContentProps) => {
  if (state.item) {
    return (
      <div>
        <div>
          nodeType: {state.item.nodeName}{" "}
          {state.item.id && <span>(id: {state.item.id})</span>}
          {JSON.stringify(parameters)}
        </div>

        <table>
          <thead>
            <tr>
              <th>CSS property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(state.computedStyles).map(
              ([key, value]) =>
                parameters.include.includes(
                  key as keyof CSSStyleDeclaration
                ) && (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <Placeholder>
        <Fragment>Hover any element to see its computed styles.</Fragment>
      </Placeholder>
    );
  }
};
