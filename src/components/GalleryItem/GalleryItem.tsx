import { FC, memo } from 'react'

export interface IGalleryItemProps {
  image: string
}

export const GalleryItem: FC<IGalleryItemProps> = memo(
  ({ image }: IGalleryItemProps) => {
    return (
      <li style={{ backgroundColor: '#ddeeff' }}>
        <div
          style={{
            display: 'inline-flex',
            height: '75px',
            width: '100%',
            padding: '5px',
            border: '1px solid #000'
          }}
        >
          <div style={{ width: '30%', height: '100%' }}>
            <img
              src={image}
              alt='The peaks of High Tatras'
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{ width: '70%', height: '100%' }}>
            <b>24U Generic Cabinet</b>
            <br />
            Brand: Generic
          </div>
        </div>
      </li>
    )
  }
)

GalleryItem.displayName = 'GalleryItem'

export default GalleryItem
