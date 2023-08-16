import './styles.css'

import classNames from 'classnames'
import { FC, memo } from 'react'

export interface ISlotProps {
  id: string
  highlight?: boolean
  over?: boolean
  canDrop?: boolean
}

export const Slot: FC<ISlotProps> = memo(
  ({ id, highlight = false, over = false, canDrop = true }: ISlotProps) => {
    return (
      <div
        role='slot'
        id={id}
        className={classNames(
          'droppable ui-droppable slot',
          over && canDrop && 'slot-droppable',
          over && !canDrop && 'slot-non-droppable',
          highlight && 'slot-highlight'
        )}
      />
    )
  }
)

Slot.displayName = 'Slot'

export default Slot
