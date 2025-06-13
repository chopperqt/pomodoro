import cx from 'classnames'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import type { IconProp } from "@fortawesome/fontawesome-svg-core"

export const StatusKey = {
  BASE: 'base',
  DANGER: 'danger',
} as const

export type StatusOption = typeof StatusKey[keyof typeof StatusKey]

interface Props {
  onClick: () => void
  icon: IconProp
  status?: StatusOption
  isDisabled?: boolean
}

export const Button = ({
  onClick,
  icon,
  status = StatusKey.BASE,
  isDisabled = false,
}: Props) => {

  const isDanger = status === StatusKey.DANGER

  return (
    <button
      className={cx("p-2 bg-gray-300 rounded-md cursor-pointer", {
        ['bg-red-300']: isDanger,
        ['!bg-red-200']: isDisabled && isDanger,
      })}
      onClick={onClick}
      disabled={isDisabled}
    >
      <FontAwesomeIcon
        className={cx("w-8 h-8 text-gray-400", {
          ['text-red-400']: isDanger,
          ['!text-red-300']: isDisabled && isDanger,
        })}
        icon={icon}
        size="2xl"
      />
    </button>
  )
}
