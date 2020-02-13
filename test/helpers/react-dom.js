import {unmountComponentAtNode} from 'react-dom'

export function createTestElement() {
  const container = document.createElement('div')

  beforeEach(() => {
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    document.body.removeChild(container)
    container.innerHTML = ''
  })

  return container
}

export const flushPromises = () => new Promise(setImmediate)
