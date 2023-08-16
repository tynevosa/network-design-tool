import { CSSProperties, FC, memo, useEffect, useMemo } from 'react'
import { useDrag } from 'react-dnd'

import { IItem } from '@/types/item'
import { SlotHeight } from '@/types/slot'
import { getEmptyImage } from 'react-dnd-html5-backend'

export interface IItemProps {
  item: IItem
  prev?: boolean
}

export const Item: FC<IItemProps> = memo(
  ({ item, prev = false }: IItemProps) => {
    const [{ isDragging }, drag, preview] = useDrag(
      () => ({
        type: item.type,
        item,
        collect: monitor => ({
          isDragging: monitor.isDragging()
        })
      }),
      []
    )

    const styles: CSSProperties = useMemo(
      () => ({
        width: `${item.width}px`,
        height: `${item.height}px`,
        backgroundImage: `url(${item.image})`,
        backgroundSize: '100% 100%',
        zoom: '1',
        position: 'absolute',
        left: '0px',
        top: prev ? '0px' : `${item.position * SlotHeight}px`,
        opacity: isDragging ? 0 : 1,
        visibility: prev ? 'visible' : isDragging ? 'hidden' : 'visible'
      }),
      [item.width, item.height, item.image, item.position, isDragging, prev]
    )

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: false })
    }, [])

    return (
      <div
        ref={drag}
        id={item.id}
        role='DraggableBox'
        className='ui-widget-content draggable SizeToParent ui-draggable ui-draggable-handle'
        data-dragclass='class-19inRackMount'
        style={styles}
      />
    )
  }
)

Item.displayName = 'Item'

export default Item
