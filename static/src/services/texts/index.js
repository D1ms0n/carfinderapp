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
      texts.manufacturer = ( texts.localisation === 'en' ? 'manufacturer' : '' );
      texts.model = ( texts.localisation === 'en' ? 'model' : '' );
      texts.year = ( texts.localisation === 'en' ? 'year' : '' );
      texts.mileage = ( texts.localisation === 'en' ? 'mileage' : '' );
      texts.km = ( texts.localisation === 'en' ? '000 km' : '' );
      texts.yearMin = ( texts.localisation === 'en' ? 'min' : '' );
      texts.yearMax = ( texts.localisation === 'en' ? 'max' : '' );
      texts.noResults = ( texts.localisation === 'en' ? 'no results' : '' );
      texts.noResultsSnoops = ( texts.localisation === 'en' ? 'no added snoops' : '' );
      texts.headerTitle = ( texts.localisation === 'en' ? 'The best headline in the world' : '' );
      texts.login = ( texts.localisation === 'en' ? 'Sign in' : '' );
      texts.registration = ( texts.localisation === 'en' ? 'Sign up' : '' );
      texts.cancel = ( texts.localisation === 'en' ? 'Cancel' : '' );
      texts.submit = ( texts.localisation === 'en' ? 'Submit' : '' );
      texts.snoops = ( texts.localisation === 'en' ? 'Snoops' : '' );
      texts.createSnoops = ( texts.localisation === 'en' ? 'Create snoop' : '' );
      texts.searchText = ( texts.localisation === 'en' ? 'Search' : '' );
      texts.tmp = ( texts.localisation === 'en' ? '' : '' );
      texts.tmp = ( texts.localisation === 'en' ? '' : '' );
      texts.tmp = ( texts.localisation === 'en' ? '' : '' );
      texts.tmp = ( texts.localisation === 'en' ? '' : '' );
      texts.tmp = ( texts.localisation === 'en' ? '' : '' );
      texts.tmp = ( texts.localisation === 'en' ? '' : '' );
    },
  };
  
  texts.init();
  
  export default{
    texts
  };