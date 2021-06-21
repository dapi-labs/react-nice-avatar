import React from "react";
import classnames from "classnames";

import Avatar from "../src";

export default function (props) {
  const { config } = props;

  const genBlockWithAvatar = (config = {}) => (
    <div className="blockWithAvatar">
      <Avatar style={{ width: "2rem", height: "2rem" }} shape="rounded" {...config} />
      <div className="content">
        <div className="mock short" />
        <div className="mock long" />
        <div className="mock long" />
        <div className="mock long" />
        <div className="mock medium" />
      </div>
    </div>
  );

  const genListWithAvatar = (config = {}) => (
    <div className="listWithAvatar">
      <div className="mock block" />
      <div className="mock long" />
      <div className="mock medium" />

      <div className="avatars">
        <Avatar className="avatar" style={{ width: "1rem", height: "1rem" }} {...config} />
        <Avatar className="avatar" style={{ width: "1rem", height: "1rem" }} />
        <Avatar className="avatar" style={{ width: "1rem", height: "1rem" }} />
      </div>
    </div>
  );

  const genApplicationMockup = ({ theme } = {}) => (
    <div className={classnames("application", theme)}>
      <div className="applicationHeader">
        <div className="icons">
          <span className="icon" />
          <span className="icon" />
          <span className="icon" />
        </div>
        <Avatar style={{ width: "1.5rem", height: "1.5rem" }} {...config} />
      </div>

      <div className="applicationBody">
        <div className="left">
          {genBlockWithAvatar(config)}
          {genBlockWithAvatar()}
          {genBlockWithAvatar()}
          {genBlockWithAvatar()}
          {genBlockWithAvatar()}
          {genBlockWithAvatar()}
        </div>
        <div className="right">
          {genListWithAvatar()}
        </div>
      </div>
    </div>
  );

  return (
    <div className="casesSection">
      <div className="casesWrapper">
        {genApplicationMockup()}
        {genApplicationMockup({ theme: "dark" })}
      </div>

      <a
        href="https://www.buymeacoffee.com/wwayne"
        target="_blank"
        className="buymeacoffeeBtn"
        rel="noreferrer">
        <img
          alt="buymeacoffee"
          src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=wwayne&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
      </a>
    </div>
  );
}
