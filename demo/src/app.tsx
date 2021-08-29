import React, { Component } from "react";
import classnames from "classnames";

import { AvatarFullConfig } from '../../src/types'

import { genConfig } from "../../src";

require('./app.scss')

export default class App extends Component<{}, {}> {

  render() {
    return (
      <div className="App flex flex-col">
        <main className="flex-1"></main>
      </div>
    );
  }
}
