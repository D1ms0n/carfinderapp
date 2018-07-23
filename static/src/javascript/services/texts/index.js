
const texts = {
  init: () => {
    texts.settings();
    texts.getLocalisation();
    texts.texts();
  },
  settings: () => {
    texts.localisation = 'ua';
  },
  getLocalisation: () => {
    texts.localisation = 'en';
  },
  texts: () => {
    texts.signIn = ( texts.localisation === 'en' ? 'Sign in' : '' );
    texts.signUp = ( texts.localisation === 'en' ? 'Sign up ' : '' );
    texts.manufacturer = ( texts.localisation === 'en' ? 'manufacturer' : '' );
    texts.model = ( texts.localisation === 'en' ? 'model' : '' );
    texts.year = ( texts.localisation === 'en' ? 'year' : '' );
    texts.mileage = ( texts.localisation === 'en' ? 'mileage' : '' );
    texts.submit = ( texts.localisation === 'en' ? 'submit' : '' );
    texts.km = ( texts.localisation === 'en' ? '000 km' : '' );
    texts.yearMin = ( texts.localisation === 'en' ? 'min' : '' );
    texts.yearMax = ( texts.localisation === 'en' ? 'max' : '' );
    texts.noResults = ( texts.localisation === 'en' ? 'no results' : '' );
    texts.tmp = ( texts.localisation === 'en' ? '' : '' );
  },
};
texts.init();

export default{
  texts
};
