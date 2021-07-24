import React, { Component } from "react";
import classnames from "classnames";

import { genConfig } from "../../src";
import Single from "./Single";
import Cases from "./Cases";

import { AppComponentState } from './types'
import { AvatarFullConfig } from '../../src/types'

export default class App extends Component<{}, AppComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "single",
      config: genConfig({ hairColorRandom: true }),
      theme: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && "dark" || "light"
    };
  }

  onChangeTab(tab: string) {
    this.setState({
      currentTab: tab
    });
  }

  updateConfig(config: AvatarFullConfig) {
    this.setState({
      config: { ...config, hairColorRandom: true }
    });
  }

  toggleTheme() {
    const { theme } = this.state;
    const newTheme = theme === "light" && "dark" || "light";
    this.setState({
      theme: newTheme
    });
  }

  render() {
    const { currentTab, config, theme } = this.state;

    return (
      <div className={classnames("app", theme)}>
        <header className="header">
          <div className="tabs">
            <div className={classnames("activeBg", currentTab)} />
            <div
              className={classnames("tabItem", { active: currentTab === "single" })}
              onClick={this.onChangeTab.bind(this, "single")}>
              SINGLE
            </div>
            <div
              className={classnames("tabItem", { active: currentTab === "cases" })}
              onClick={this.onChangeTab.bind(this, "cases")}>
              CASES
            </div>
          </div>

          <div className="menu">
            <div
              className={classnames("themeToggle", theme)}
              onClick={this.toggleTheme.bind(this)}>
              <i className="iconfont icon-Daytimemode" />
              <i className="iconfont icon-nightmode" />
            </div>

            <a className="iconfont icon-github" href="https://github.com/chilllab/react-nice-avatar" />
          </div>
        </header>

        <div className="appContent">
          {currentTab === "single" && <Single config={config} updateConfig={this.updateConfig.bind(this)} />}
          {currentTab === "cases" && <Cases config={config} />}
        </div>
      </div>
    );
  }
}
