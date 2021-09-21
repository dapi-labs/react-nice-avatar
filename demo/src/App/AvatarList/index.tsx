import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import type { AvatarFullConfig } from 'react-nice-avatar/types'
import type { AvatarListItem } from './types'

import ReactNiceAvatar, { genConfig } from 'react-nice-avatar/index'

import "./index.scss"

export default class AvatarList extends Component {
  static propTypes = {
    selectConfig: PropTypes.func.isRequired
  }

  constructor (props: { selectConfig: (item: AvatarFullConfig) => void }) {
    super(props)
    this.displayCount = 10
    this.state = {
      current: 0,
      avatarConfigList: this.genConfigList(this.displayCount)
    }
    this.listId = 'avatarList'
    this.listWidth = 0
  }

  componentDidMount () {
    this.fetchListWidth()
  }

  genConfigList (count: number): AvatarListItem {
    return new Array(count)
      .fill(null)
      .map(() => ({
        ...genConfig({ isGradient: Boolean(Math.round(Math.random())) }),
        id: 'n_' + nanoid()
      }))
  }

  fetchListWidth (count = 0) {
    if (count > 20) return
    const listElem = document.getElementById(this.listId)
    if (!listElem) {
      return setTimeout(() => {
        this.fetchListWidth(count + 1)
      }, 500)
    }

    this.listWidth = listElem.offsetWidth
  }

  changeCurrent (deg: 1 | -1) {
    const { current, avatarConfigList } = this.state
    const newCurrent = Math.max(current + deg, 0)
    const newState = { current: newCurrent }
    if (newCurrent * this.displayCount > avatarConfigList.length - 1) {
      const newConfigList = this.genConfigList(this.displayCount)
      newState.avatarConfigList = avatarConfigList.concat(newConfigList)
    }
    this.setState(newState)
  }

  render () {
    const { selectConfig } = this.props
    const { current, avatarConfigList } = this.state
    const displayMax = (current + 2) * this.displayCount
    const displayMin = (current - 1) * this.displayCount
    return (
      <div className="flex items-center justify-center">
        {/* Arrow left */}
        {current !== 0 &&
          <i
            className="iconfont icon-arrow-right-filling-center transform rotate-180 mr-1 text-xl text-gray-500 transition hover:text-white cursor-pointer"
            onClick={this.changeCurrent.bind(this, -1)} />
        }

        {/* List */}
        <div
          id={this.listId}
          className="AvatarList overflow-x-auto">
          <div
            className="listWrapper flex items-center py-3"
            style={{
              transform: `translateX(-${current * this.listWidth}px)`
            }}>
            {avatarConfigList.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  className="AvatarItemWrapper"
                  onClick={selectConfig.bind(this, item)}>
                  {idx >= displayMin && idx < displayMax &&
                    <ReactNiceAvatar
                      className="AvatarItem"
                      {...item} />
                    }
                </div>
              )
            })}
          </div>
        </div>

      {/* Arrow right */}
        <i
          className="iconfont icon-arrow-right-filling-center ml-1 text-xl text-gray-500 transition hover:text-white cursor-pointer"
          onClick={this.changeCurrent.bind(this, 1)} />
      </div>

    )
  }
}
