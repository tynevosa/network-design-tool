import { FC, memo } from 'react'

import { GalleryItem } from '@/components/GalleryItem'

const items = [
  { image: 'assets/images/24u_test_cab2.png' },
  { image: 'assets/images/24u_test_cab2.png' },
  { image: 'assets/images/24u_test_cab2.png' },
  { image: 'assets/images/24u_test_cab2.png' }
]

export interface INewLocationProps {
  onNextPage: () => void
}

export const NewLocation: FC<INewLocationProps> = memo(
  ({ onNextPage }: INewLocationProps) => {
    return (
      <div id='newLocWidget' className='w-100 h-100' style={{}}>
        <div className='h-100 d-flex justify-content-center align-items-center'>
          <div
            className='card border-primary mb-3'
            style={{ minWidth: '600px', maxHeight: '800px' }}
          >
            <div className='card-header text-center'>
              <h3>Select your first Object</h3>
            </div>
            <div className='card-body' style={{ display: 'inline-flex' }}>
              <div
                style={{
                  width: '33.3%',
                  paddingRight: '20px',
                  borderRight: '1px dashed #333'
                }}
              >
                <div
                  className='row dp-5'
                  style={{
                    borderBottom: '1px dashed #333',
                    paddingBottom: '10px'
                  }}
                >
                  <fieldset>
                    <div
                      className='form-group row'
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <p className='text-center'>
                        Choose initial container type
                      </p>
                      <select className='form-select' id='newLocContainerType'>
                        <option value='1'>19 Inch (Network) Rackmount</option>
                        <option value='2'>23 Inch (Telco) Rackmount</option>
                        <option value='3'>
                          Pole & Tower Mounts and others
                        </option>
                      </select>
                    </div>
                  </fieldset>
                </div>
                <div
                  className='row'
                  style={{ height: '100%', paddingTop: '10px' }}
                >
                  <div
                    id='containers-1'
                    style={{ height: '100%' }}
                    className='text-center'
                  >
                    <fieldset>
                      <div
                        className='form-group row'
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <input
                          type='text'
                          className='form-control'
                          id='newLocRackSearchTxt'
                          placeholder='Search for Rackmount Enclosures'
                        />
                      </div>
                    </fieldset>
                    <ul
                      className='gallery bjListGal ui-helper-reset'
                      style={{ width: '100%', listStyleType: 'none' }}
                    >
                      {items.map((item, index) => (
                        <GalleryItem image={item.image} key={index} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div style={{ width: '66.6%' }} className='row'>
                <div style={{ width: '50%' }}>
                  <div
                    id='newLocObjPreview'
                    style={{ height: '100%', width: '100%' }}
                  >
                    <div
                      style={{
                        background:
                          "url('assets/images/24u_test_cab2.png') no-repeat",
                        backgroundSize: 'contain',
                        backgroundPosition: 'center center',
                        height: '100%',
                        width: '100%'
                      }}
                    ></div>
                  </div>
                </div>
                <div style={{ width: '50%' }}>
                  <div style={{ height: '80%' }}>
                    Some details will go here.
                  </div>
                  <div>
                    <button
                      id='addEnclosure'
                      onClick={onNextPage}
                      type='submit'
                      className='btn btn-primary'
                      style={{ marginTop: '15px' }}
                    >
                      Add and Configure this Object
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

NewLocation.displayName = 'NewLocation'

export default NewLocation
