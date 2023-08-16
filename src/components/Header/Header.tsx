export const Header = () => (
  <div className='navbar navbar-expand-lg navbar-dark bg-primary'>
    <div className='container'>
      <a href='../' className='navbar-brand'>
        Network Design Tool
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-bs-toggle='collapse'
        data-bs-target='#navbarResponsive'
        aria-controls='navbarResponsive'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarResponsive'></div>
    </div>
  </div>
)

Header.displayName = 'Header'

export default Header
