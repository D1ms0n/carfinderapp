
const messages = {
    init: () => {
        messages.settings();
        messages.getLocalisation();
        messages.texts();
    },
    settings: () => {
        messages.localisation = 'ua';
    },
    getLocalisation: () => {
        messages.localisation = 'en';
    },
    texts: () => {
        messages.signIn = ( messages.localisation === 'en' ? 'Sign in' : '' );
        messages.signUp = ( messages.localisation === 'en' ? 'Sign up ' : '' );
        messages.name = ( messages.localisation === 'en' ? 'Some name' : '' );
        messages.manufacturer = ( messages.localisation === 'en' ? 'manufacturer' : '' );
        messages.model = ( messages.localisation === 'en' ? 'model' : '' );
        messages.year = ( messages.localisation === 'en' ? 'year' : '' );
        messages.mileage = ( messages.localisation === 'en' ? 'mileage' : '' );
        messages.submit = ( messages.localisation === 'en' ? 'submit' : '' );
        messages.km = ( messages.localisation === 'en' ? 'km' : '' );
        messages.tmp = ( messages.localisation === 'en' ? '' : '' );
        messages.tmp = ( messages.localisation === 'en' ? '' : '' );
        messages.tmp = ( messages.localisation === 'en' ? '' : '' );
        messages.tmp = ( messages.localisation === 'en' ? '' : '' );
    },
};
messages.init();

export default{
    messages
}
