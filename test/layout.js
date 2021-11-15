import { element } from './engine.js'
import { combine } from './class-names.js'

const box = ({ className, ...props } = {}, children) => element(
  {
    ...props,
    className: combine('a box & stack', className),
  },
  children
)

const cluster = ({ className, ...props } = {}, children) => element(
  {
    ...props,
    className: combine('a cluster', className),
  },
  children
)


const stack = ({ className, ...props } = {}, children) => element(
  {
    ...props,
    className: combine('a stack', className),
  },
  children
)

const switcher = ({ className, ...props } = {}, children) => element(
  {
    ...props,
    className: combine('switcher', className),
  },
  children
)

export { box, cluster, stack, switcher }
