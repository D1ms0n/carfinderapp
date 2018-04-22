
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
        messages.about = ( messages.localisation === 'en' ? 'About' : '' );
        messages.temp = ( messages.localisation === 'en' ? '' : '' );
    },
};
messages.init();

export default{
    messages
}
