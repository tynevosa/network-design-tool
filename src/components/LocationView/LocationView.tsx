import { FC, memo } from 'react'

export interface ILocationViewProps {
  onNextPage: () => void
}

export const LocationView: FC<ILocationViewProps> = memo(
  ({ onNextPage }: ILocationViewProps) => {
    return (
      <div id='locationView' className='w-100 h-content'>
        <div className='row h-100 d-flex justify-content-center align-items-center'>
          <div
            id='encl-abcxyz'
            onClick={onNextPage}
            className='enclosureItem'
            style={{
              width: '600px',
              height: '600px',
              border: '1px solid #b6b6b6',
              padding: '25px'
            }}
          >
            <div>
              <h3 className='text-center'>
                <b>24U Generic Cabinet</b>
              </h3>
            </div>
            <div
              style={{
                background: "url('assets/images/24u_test_cab2.png') no-repeat",
                backgroundSize: 'contain',
                backgroundPosition: 'center center',
                height: '90%',
                width: '100%'
              }}
            ></div>
          </div>
          <div
            id='encl-abcxyz'
            style={{
              marginLeft: '50px',
              width: '600px',
              height: '600px',
              border: '1px solid #b6b6b6',
              padding: '25px'
            }}
          >
            <div>
              <h3
                className='text-center'
                style={{ marginTop: '50%', marginBottom: '50%' }}
              >
                <b>( ADD ENCLOSURE )</b>
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

LocationView.displayName = 'LocationView'

export default LocationView
