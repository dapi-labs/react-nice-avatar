import React, { Component } from "react";
import { hot } from "react-hot-loader";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import ReactNiceAvatar, { genConfig } from "react-nice-avatar/index";

import AvatarEditor from './AvatarEditor/index'
import AvatarList from './AvatarList/index'
import Footer from './Footer/index'
import { AvatarFullConfig } from "react-nice-avatar/types";
import { SingleComponentState } from "src/types";
import MoreConfiguration from "./MoreConfiguration";
import { setEnvironmentData } from "worker_threads";
import { DefaultOptions } from "react-nice-avatar/utils";
import { get } from "http";
import { getCompletion } from "yargs";

require('./index.scss')

export interface AppState {
  config: Required<AvatarFullConfig>,
  shape: SingleComponentState['bgShape']
  seedValue: string
  lockedAttr: Array<keyof AvatarFullConfig>
}
class App extends Component<any, AppState> {

  avatarId: string

  constructor(props: any) {
    super(props)
    this.state = {
      config: genConfig({
        isGradient: Boolean(Math.round(Math.random()))
      }),
      shape: 'circle',
      seedValue: '',
      lockedAttr: []
    }
    this.avatarId = 'myAvatar'
  }

  selectConfig(config: Required<AvatarFullConfig>) {
    this.setState({ config, lockedAttr: [] })
  }

  updateConfig(key: keyof DefaultOptions, value: string) {
    const { config } = this.state
    config[key] = value
    this.setState({ config })
  }

  updateShape(shape: SingleComponentState['bgShape']) {
    this.setState({ shape })
  }

  genConfig(mixed: string | AvatarFullConfig, lockedAttr: Array<keyof AvatarFullConfig>) {
    const { config } = this.state
    const lockConfig = lockedAttr.reduce((acc, key) => {
      acc[key] = config[key]
      return acc
    }, {})

    return genConfig(mixed, lockConfig)
  }
  async download() {
    const scale = 2;
    const node = document.getElementById(this.avatarId);
    if (node) {
      const blob = await domtoimage.toBlob(node, {
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale}) translate(${node.offsetWidth / 2 / scale}px, ${node.offsetHeight / 2 / scale}px)`,
          "border-radius": 0
        },
        width: node.offsetWidth * scale
      });

      saveAs(blob, "avatar.png");
    }
  }

  onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const seedValue = e.target.value
    this.setState({
      config: this.genConfig(seedValue, this.state.lockedAttr),
      seedValue
    })
  }

  render() {
    const { config, shape, seedValue, lockedAttr } = this.state

    return (
      <div className="App flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center">
          <div
            id={this.avatarId}
            className="mb-10">
            <ReactNiceAvatar
              className="w-64 h-64 highres:w-80 highres:h-80"
              hairColorRandom
              shape={shape}
              {...config as AvatarFullConfig} />
          </div>
          <AvatarEditor
            lockedAttr={lockedAttr}
            config={config}
            shape={shape}
            updateConfig={this.updateConfig.bind(this)}
            updateShape={this.updateShape.bind(this)}
            download={this.download.bind(this)} />
          <input
            className="inputField w-64 h-10 p-2 rounded-full mt-10 text-center outline-none"
            placeholder="input name or email ..."
            value={seedValue}
            onChange={this.onInput.bind(this)} />
        </main>

        {/* Avatar list */}
        <AvatarList selectConfig={this.selectConfig.bind(this)} />

        {/* Footer */}
        <Footer />

        <MoreConfiguration
          lockedAttr={lockedAttr}
          onChangeLockedAttr={(lockedAttr) => {
            this.setState({
              lockedAttr
            })
          }}
          seedValue={seedValue}
          onChangeSeedValue={(value, lockedAttr) => {
            this.setState({
              config: this.genConfig(value, lockedAttr),
              seedValue: value,
              lockedAttr,
            })
          }}
          config={config}
          updateConfig={this.updateConfig.bind(this)}
        />
      </div>
    );
  }
}

export default hot(module)(App);
