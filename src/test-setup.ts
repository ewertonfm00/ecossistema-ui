import '@testing-library/jest-dom'

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
  value: () => ({ width: 500, height: 300, top: 0, left: 0, bottom: 300, right: 500 }),
  configurable: true,
})
