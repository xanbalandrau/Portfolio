const ButtonCookie = () => {
  const CookiePanel = () => {
    window.tarteaucitron.userInterface.openPanel();
  };
  return (
    <div>
      <button className="cookie-button" onClick={CookiePanel}>
        Gérer mes cookies
      </button>
    </div>
  );
};

export default ButtonCookie;
