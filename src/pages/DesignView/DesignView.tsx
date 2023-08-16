import update from 'immutability-helper'
import { useCallback, useMemo, useRef, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { CustomDragLayer } from '@/components/CustomDragLayer'
import { Item } from '@/components/Item'
import { Zone } from '@/components/Zone'
import { ItemMap, ItemTypes } from '@/types/item'

export const DesignView = () => {
  const [items, setItems] = useState<ItemMap>({
    'obj-udmse': {
      id: 'obj-udmse',
      type: ItemTypes.UDMSE,
      width: 380,
      height: 35,
      location: 'right',
      position: 0,
      image: 'assets/images/UDM-SE.png'
    },
    'obj-m1000e': {
      id: 'obj-m1000e',
      type: ItemTypes.M1000E,
      width: 380,
      height: 350,
      location: 'right',
      position: 1,
      image: 'assets/images/m1000e.png'
    }
  })
  const zoneWrapperRef = useRef<HTMLDivElement>(null)

  const moveItem = useCallback(
    (id: string, location: 'left' | 'center' | 'right', position: number) => {
      setItems(update(items, { [id]: { $merge: { location, position } } }))
    },
    [items]
  )

  const leftItems = useMemo(
    () =>
      Object.keys(items)
        .map(id => items[id])
        .filter(item => item.location === 'left'),
    [items]
  )

  const rightItems = useMemo(
    () =>
      Object.keys(items)
        .map(id => items[id])
        .filter(item => item.location === 'right'),
    [items]
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer zoneWrapperRef={zoneWrapperRef} />
      <div className='d-flex m-2'>
        <div id='leftSide' className='d-flex'>
          <Zone
            items={leftItems}
            moveItem={moveItem}
            zoneWrapperRef={zoneWrapperRef}
          />
        </div>

        <div id='center' className='mx-auto'>
          <div
            className='droppable multiDrop ui-droppable'
            style={{ width: '500px', height: '500px', backgroundColor: '#ddd' }}
          />
        </div>

        <div
          id='rightside'
          style={{
            marginLeft: 'auto',
            width: '400px',
            backgroundColor: '#b4fcff'
          }}
          className='droppable multiDrop ui-droppable ui-droppable-disabled'
        >
          <p></p>
          <center>
            <b>VIRTUAL WORKBENCH</b>
          </center>
          <p></p>
          <div className='list-inline position-relative'>
            {rightItems.map(item => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

DesignView.displayName = 'DesignView'

export default DesignView
