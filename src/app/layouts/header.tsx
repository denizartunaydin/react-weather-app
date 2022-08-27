const Header = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row pt-5 pb-5">
            <div className="col-md-2 header__logo">Weather</div>
            <div className="col-md-8">
              <div className="header__search-container">
                <input
                  className="header__search-container__input"
                  type="text"
                  placeholder="Search City"
                />
                <div className="header__search-container__icon">
                  <i className="bi bi-search "></i>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="header__lang">
                <div className="header__lang__item active">tr</div>
                <div className="header__lang__item">en</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
