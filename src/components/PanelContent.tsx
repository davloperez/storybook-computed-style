import React, { Fragment } from "react";
import { Placeholder } from "@storybook/components";
import { State } from "../State";

interface PanelContentProps {
  state: State;
}

export const PanelContent = ({ state }: PanelContentProps) => {
  if (state.item) {
    return (
      <div>
        <div>
          nodeType: {state.item.nodeName}{" "}
          {state.item.id && <span>(id: {state.item.id})</span>}
        </div>

        <table>
          <thead>
            <tr>
              <th>CSS property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(state.computedStyles).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
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
