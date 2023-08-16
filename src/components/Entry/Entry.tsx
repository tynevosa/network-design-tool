import { symlink } from 'fs'
import { FC, memo } from 'react'

export interface IEntryProps {
  onNextPage: () => void
}

export const Entry: FC<IEntryProps> = memo(({ onNextPage }: IEntryProps) => {
  return (
    <div id='entryPoint' className='w-100 h-content'>
      <div className='h-100 d-flex justify-content-center align-items-center'>
        <div className='card border-primary mb-3' style={{ minWidth: '600px' }}>
          <div className='card-header text-center'>
            <h3>Start a new Project</h3>
          </div>
          <div className='card-body' style={{ display: 'inline-flex' }}>
            <div
              style={{ width: '50%', borderRight: '1px dashed #333' }}
              className='p-5'
            >
              <h4
                className='card-title text-center'
                style={{ minWidth: '200px' }}
              >
                Name this Location
              </h4>
              <p
                className='card-text text-center'
                style={{ marginBottom: '30px' }}
              >
                (You can change this later.)
              </p>
              <form>
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
                      aria-describedby='locNameHelp'
                      id='newLocName'
                    />
                    <small id='locNameHelp' className='form-text text-muted'>
                      Example: Main Building
                    </small>
                  </div>
                  <div className='form-group row'>
                    <button
                      id='startToolNew'
                      onClick={onNextPage}
                      type='button'
                      className='btn btn-primary'
                      style={{ marginTop: '15px' }}
                    >
                      Start Designing
                    </button>
                  </div>
                </fieldset>
              </form>
              <div className='form-group row py-5' style={{ display: 'none' }}>
                <h3 className='text-center'>
                  <b> Sorry !</b>
                </h3>
                Currently the site requries an account to operate.
                <br />
                Eventually local mode will be working correctly.
                <br />
                Logging in automatically saves all work and progress.
                <br />
              </div>
            </div>

            <div style={{ width: '50%' }} className='p-5'>
              <h4 className='card-title text-center'>Login to Account</h4>
              <form>
                <fieldset>
                  <div
                    className='form-group row'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <label
                      htmlFor='exampleInputEmail1'
                      className='form-label mt-4'
                    >
                      Email address:
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='exampleInputEmail1'
                      placeholder='Enter email'
                    />
                  </div>
                  <div className='form-group row'>
                    <label
                      htmlFor='exampleInputPassword1'
                      className='form-label mt-4'
                    >
                      Password:
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      id='exampleInputPassword1'
                      placeholder='Password'
                    />
                  </div>

                  <div className='form-group row'>
                    <button
                      id='Login'
                      type='submit'
                      className='btn btn-primary'
                      style={{ marginTop: '15px' }}
                    >
                      Log in
                    </button>
                  </div>
                </fieldset>
              </form>
              <div className='text-center'>
                <br />
                <br />
                <h2>
                  <a href='/signup'>
                    <b>Sign up Here</b>
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

Entry.displayName = 'Entry'

export default Entry
