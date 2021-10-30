import React from 'react'

export default function footer(): HTMLElement {
  return (
    <footer className="flex items-center justify-center text-gray-400 text-sm pb-5">
      <a
        href="https://github.com/dapilab/react-nice-avatar"
        className="transition-opacity duration-300 hover:opacity-75">
        Github
      </a>
      <span className="mx-3 relative -top-1">.</span>
      <a
        href="https://twitter.com/dapi_labs"
        className="transition-opacity duration-300 hover:opacity-75">
        Twitter
      </a>
      <span className="mx-3 relative -top-1">.</span>
      <a
        href="https://www.buymeacoffee.com/wwayne"
        className="transition-opacity duration-300 hover:opacity-75">
        Buy Me A Coffee
      </a>
    </footer>
  )
}
