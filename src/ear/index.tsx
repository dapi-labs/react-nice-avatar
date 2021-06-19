import React, { Component, Fragment } from "react";

import EarSmall from "./small";
import EarBig from "./big";

export default class Ear extends Component<{ color: string, size: string }, {}> {
  render() {
    const { color, size } = this.props;
    return (
      <Fragment>
        {size === "small" &&
          <EarSmall color={color} />
        }
        {size === "big" &&
          <EarBig color={color} />
        }
      </Fragment>

    );
  }
}
