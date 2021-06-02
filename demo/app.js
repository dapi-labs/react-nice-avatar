import React, { Component } from "react";
import classnames from "classnames";

import Single from './Single'
import Cases from './Cases'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'cases'
    };
  }

  onChangeTab (tab) {
    this.setState({
      currentTab: tab
    })
  }

  render() {
    const { currentTab } = this.state;

    return (
      <div className="app">
        <a className="iconfont icon-github" href="https://github.com/chilllab/react-nice-avatar" />

        <header className="header">
          <div className="tabs">
            <div className={classnames("activeBg", currentTab)} />
            <div
              className={classnames("tabItem", { active: currentTab === 'single' })}
              onClick={this.onChangeTab.bind(this, 'single')}>
              SINGLE
            </div>
            <div
              className={classnames("tabItem", { active: currentTab === 'cases' })}
              onClick={this.onChangeTab.bind(this, 'cases')}>
              CASES
            </div>
          </div>
        </header>

        <div className="appContent">
          {currentTab === 'single' && <Single />}
          {currentTab === 'cases' && <Cases />}
        </div>
      </div>
    );
  }
}
