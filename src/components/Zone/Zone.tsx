import { FC, memo, useCallback, useState } from 'react'
import {
  DragLayerMonitor,
  DropTargetMonitor,
  useDragLayer,
  useDrop
} from 'react-dnd'

import { Item } from '@/components/Item'
import { Slot } from '@/components/Slot'
import { IItem, ItemTypes } from '@/types/item'
import { ISlot, SlotHeight, SlotWidth } from '@/types/slot'

export interface IZoneProps {
  items: IItem[]
  moveItem: (
    id: string,
    location: 'left' | 'center' | 'right',
    position: number
  ) => void
  zoneWrapperRef: React.RefObject<HTMLDivElement>
}

export const Zone: FC<IZoneProps> = memo(
  ({ items, moveItem, zoneWrapperRef }: IZoneProps) => {
    const [slots, setSlots] = useState<ISlot[]>([
      { id: 'zone-slot-1' },
      { id: 'zone-slot-2' },
      { id: 'zone-slot-3' },
      { id: 'zone-slot-4' },
      { id: 'zone-slot-5' },
      { id: 'zone-slot-6' },
      { id: 'zone-slot-7' },
      { id: 'zone-slot-8' },
      { id: 'zone-slot-9' },
      { id: 'zone-slot-10' },
      { id: 'zone-slot-11' },
      { id: 'zone-slot-12' }
    ])

    const getCanDrop = useCallback(
      (item: IItem, monitor: DropTargetMonitor): boolean => {
        if (zoneWrapperRef.current == null || item == null) {
          return false
        }

        const zoneClientRect = zoneWrapperRef.current.getBoundingClientRect()
        const zoneX = zoneClientRect.x
        const zoneY = zoneClientRect.y

        const itemWidth = item.width
        const itemHeight = item.height

        const draggableOffset = monitor.getSourceClientOffset()

        if (draggableOffset == null) {
          return false
        }

        const relativeLeft = draggableOffset.x - zoneX
        const relativeTop = draggableOffset.y - zoneY
        const relativeRight = relativeLeft + itemWidth
        const relativeBottom = relativeTop + itemHeight
        if (
          relativeLeft > SlotWidth ||
          relativeRight < 0 ||
          relativeTop > SlotHeight * slots.length ||
          relativeBottom < 0
        ) {
          // no overlap, outside the zone
          return false
        }

        const overlapTop = Math.max(relativeTop, 0)
        const startIndex = Math.floor(overlapTop / SlotHeight)

        const itemOccupingSlotCount = itemHeight / SlotHeight

        if (startIndex + itemOccupingSlotCount <= slots.length) {
          let index = startIndex
          for (
            index = startIndex;
            index < startIndex + itemOccupingSlotCount;
            index++
          ) {
            if (
              slots[index].occupied != null &&
              slots[index].occupied !== item.id
            )
              break
          }

          if (index >= startIndex + itemOccupingSlotCount) {
            return true
          }
        }

        return false
      },
      [slots]
    )

    const getHoveredSlots = useCallback(
      (monitor: DragLayerMonitor): string[] => {
        if (!monitor.isDragging()) {
          return []
        }

        if (zoneWrapperRef.current == null) {
          return []
        }

        const zoneClientRect = zoneWrapperRef.current.getBoundingClientRect()
        const zoneX = zoneClientRect.x
        const zoneY = zoneClientRect.y

        const item = monitor.getItem<IItem>()
        const itemWidth = item.width
        const itemHeight = item.height

        const draggableOffset = monitor.getSourceClientOffset()

        if (draggableOffset == null) {
          return []
        }

        const relativeLeft = draggableOffset.x - zoneX
        const relativeTop = draggableOffset.y - zoneY
        const relativeRight = relativeLeft + itemWidth
        const relativeBottom = relativeTop + itemHeight

        if (
          relativeLeft > SlotWidth ||
          relativeRight < 0 ||
          relativeTop > SlotHeight * slots.length ||
          relativeBottom < 0
        ) {
          // no overlap, outside the zone
          return []
        }

        const overlapTop = Math.max(relativeTop, 0)
        const overlapBottom = Math.min(
          relativeBottom,
          SlotHeight * slots.length
        )

        const results: string[] = []

        if(relativeTop<0 || relativeBottom>SlotHeight*13){
          return results
        }

        slots.forEach((slot, index) => {
          const slotTop = SlotHeight * (index+1)
          if (
            Math.max(slotTop, overlapTop) <= Math.min(slotTop, overlapBottom)
          ) {
            results.push(slot.id)
          }
        })
        return results
      },
      []
    )

    const occupySlots = useCallback(
      (startIndex: number, count: number, id: string) => {
        // first release slots previously occupied by `id` and occupy `count` slots from `startIndex`
        setSlots(
          slots
            .map(slot =>
              slot.occupied === id ? { ...slot, occupied: undefined } : slot
            )
            .map((slot, index) =>
              index >= startIndex && index < startIndex + count
                ? { ...slot, occupied: id }
                : slot
            )
        )
      },
      [slots]
    )

    const [{ canDrop }, drop] = useDrop(
      () => ({
        accept: [ItemTypes.UDMSE, ItemTypes.M1000E],
        collect: monitor => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop()
        }),
        canDrop: (item, monitor) => getCanDrop(item, monitor),
        drop: (item: IItem, monitor: DropTargetMonitor<IItem>) => {
          if (zoneWrapperRef.current == null) {
            return undefined
          }

          const zoneClientRect = zoneWrapperRef.current.getBoundingClientRect()
          const zoneX = zoneClientRect.x
          const zoneY = zoneClientRect.y

          const itemWidth = item.width
          const itemHeight = item.height

          const draggableOffset = monitor.getSourceClientOffset()

          if (draggableOffset == null) {
            return undefined
          }

          const relativeLeft = draggableOffset.x - zoneX
          const relativeTop = draggableOffset.y - zoneY
          const relativeRight = relativeLeft + itemWidth
          const relativeBottom = relativeTop + itemHeight

          if (
            relativeLeft > SlotWidth ||
            relativeRight < 0 ||
            relativeTop > SlotHeight * slots.length ||
            relativeBottom < 0
          ) {
            // no overlap, outside the zone
            return undefined
          }

          const overlapTop = Math.max(relativeTop, 0)
          const startIndex = Math.floor(overlapTop / SlotHeight)

          const itemOccupingSlotCount = itemHeight / SlotHeight

          if (startIndex + itemOccupingSlotCount <= slots.length) {
            occupySlots(startIndex, itemOccupingSlotCount, item.id)
            moveItem(item.id, 'left', startIndex)
          }
          return undefined
        }
      }),
      [moveItem]
    )

    const { isDragging, hoveredSlots } = useDragLayer(monitor => ({
      isDragging: monitor.isDragging(),
      hoveredSlots: getHoveredSlots(monitor)
    }))

    return (
      <div
        className='ui-widget-content draggable SizeToParent ui-draggable ui-draggable-handle'
        style={{
          width: '480px',
          height: '950px',
          backgroundImage: "url('assets/images/24u_test_cab2.png')",
          backgroundSize: '100% 100%',
          zoom: '1',
          position: 'relative',
          paddingLeft: '50px',
          paddingRight: '50px',
          paddingTop: '65px'
        }}
      >
        <div id='zoneWrapper' ref={zoneWrapperRef}>
          <div id='zone' ref={drop} role='zone' className='position-relative'>
            {slots.map(slot => (
              <Slot
                key={slot.id}
                id={slot.id}
                highlight={isDragging}
                over={hoveredSlots.includes(slot.id)}
                canDrop={canDrop}
              />
            ))}
            {items.map(item => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    )
  }
)

Zone.displayName = 'Zone'

export default Zone
