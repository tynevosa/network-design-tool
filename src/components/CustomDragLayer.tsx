// import React from 'react'
// import { useDragLayer } from 'react-dnd'
// import type { DragLayerMonitor, XYCoord } from 'react-dnd'
// import type { CSSProperties } from 'react'

// import { Item } from './Item'
// import { SlotHeight, SlotWidth } from '@/types/slot'
// import { type IItem } from '@/types/item'

// export interface ICustomDragLayerProps {
//   zoneWrapperRef: React.RefObject<HTMLDivElement>
// }

// const layerStyles: CSSProperties = {
//   position: 'fixed',
//   pointerEvents: 'none',
//   zIndex: 100,
//   left: 0,
//   top: 0,
//   width: '100%',
//   height: '100%'
// }

// const getItemStyles = (
//   initialOffset: XYCoord | null,
//   currentOffset: XYCoord | null
// ) => {
//   if (initialOffset == null || currentOffset == null) {
//     return {
//       display: 'none'
//     }
//   }

//   const { x, y } = currentOffset

//   const transform = `translate(${x}px, ${y}px)`
//   return {
//     transform,
//     WebkitTransform: transform
//   }
// }

// const getCurrentOffset = (
//   monitor: DragLayerMonitor<IItem>,
//   zoneWrapperRef: React.RefObject<HTMLDivElement>
// ) => {
//   const draggableOffset = monitor.getSourceClientOffset()

//   if (draggableOffset == null || !monitor.getItem()) {
//     return draggableOffset
//   }
//   const itemWidth = monitor.getItem().width
//   const itemHeight = monitor.getItem().height

//   if (!zoneWrapperRef || zoneWrapperRef.current == null) {
//     return draggableOffset
//   }

//   const zoneClientRect = zoneWrapperRef.current.getBoundingClientRect()
//   const zoneX = zoneClientRect.x
//   const zoneY = zoneClientRect.y
//   const relativeLeft = draggableOffset.x - zoneX
//   const relativeTop = draggableOffset.y - zoneY
//   const relativeRight = relativeLeft + itemWidth
//   const relativeBottom = relativeTop + itemHeight
//   const slotsLength = 12
//   if (
//     relativeLeft > SlotWidth ||
//     relativeRight < 0 ||
//     relativeTop > SlotHeight * slotsLength ||
//     relativeBottom < 0
//   ) {
//     // no overlap, outside the zone
//     return draggableOffset
//   }

//   // const overlapTop = Math.max(relativeTop, 0)
//   let startIndex
//   if(relativeTop >= 0) startIndex = Math.floor(relativeTop / SlotHeight)
//   else startIndex = Math.floor(relativeTop / SlotHeight)
//   draggableOffset.y = startIndex * SlotHeight + zoneY
//   if (Math.abs(draggableOffset.x - zoneX) < 30) draggableOffset.x = zoneX

//   return draggableOffset

//   // return startIndex
// }

// export const CustomDragLayer = ({ zoneWrapperRef }: ICustomDragLayerProps) => {
//   const { item, isDragging, initialOffset, currentOffset } = useDragLayer(
//     monitor => ({
//       item: monitor.getItem(),
//       itemType: monitor.getItemType(),
//       initialOffset: monitor.getInitialSourceClientOffset(),
//       currentOffset: getCurrentOffset(monitor, zoneWrapperRef),
//       isDragging: monitor.isDragging()
//     })
//   )

//   const renderItem = () => <Item item={item} prev/>
//   if (!isDragging) {
//     return null
//   }

//   return (
//     <div style={layerStyles}>
//       <div style={getItemStyles(initialOffset, currentOffset)}>
//         {renderItem()}
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { useDragLayer } from 'react-dnd'
import type { DragLayerMonitor, XYCoord } from 'react-dnd'
import type { CSSProperties } from 'react'

import { Item } from './Item'
import { SlotHeight, SlotWidth } from '@/types/slot'
import { type IItem } from '@/types/item'

export interface ICustomDragLayerProps {
  zoneWrapperRef: React.RefObject<HTMLDivElement>
}

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

const getItemStyles = (
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  item: any | null,
  zoneWrapperRef: React.RefObject<HTMLDivElement> | null
) => {
  if (initialOffset == null || currentOffset == null) {
    return {
      display: 'none'
    }
  }
  let transform
  
  const draggableOffset = currentOffset
  if (draggableOffset == null || !item) {
    transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`
    return {
      transform,
      WebkitTransform: transform
    }
  }
  const itemWidth = item.width
  const itemHeight = item.height
  
  if (!zoneWrapperRef || zoneWrapperRef.current == null) {
    transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`
    return {
      transform,
      WebkitTransform: transform
    }
  }
  
  const zoneClientRect = zoneWrapperRef.current.getBoundingClientRect()
  const zoneX = zoneClientRect.x
  const zoneY = zoneClientRect.y
  const relativeLeft = draggableOffset.x - zoneX
  const relativeTop = draggableOffset.y - zoneY
  const relativeRight = relativeLeft + itemWidth
  const relativeBottom = relativeTop + itemHeight
  const slotsLength = 12
  if (
    relativeLeft > SlotWidth ||
    relativeRight < 0 ||
    relativeTop > SlotHeight * slotsLength ||
    relativeBottom < 0
  ) {
    // no overlap, outside the zone
    transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`
    return {
      transform,
      WebkitTransform: transform
    }
  }
  
  const overlapTop = Math.max(relativeTop, 0)
  const startIndex = Math.floor(overlapTop / SlotHeight)
  let { x, y } = draggableOffset
  y = startIndex * SlotHeight + zoneY
  if (Math.abs(x - zoneX) < 30) x = zoneX
  
  
  transform = `translate(${x}px, ${y}px)`

  return {
    transform,
    WebkitTransform: transform
  }
}

export const CustomDragLayer = ({ zoneWrapperRef }: ICustomDragLayerProps) => {
  const { item, isDragging, initialOffset, currentOffset } = useDragLayer(
    monitor => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    })
  )

  const renderItem = () => <Item item={item} prev/>

  if (!isDragging) {
    return null
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset, item, zoneWrapperRef)}>
        {renderItem()}
      </div>
    </div>
  )
}
