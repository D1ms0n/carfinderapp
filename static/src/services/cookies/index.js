/**
 * Service for work with Cookies
 */

class CookiesService {
  /**
   * Method for geting cookies
   * @param {string} cname - cookie name
   */
  static getCookie(cname){
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  /**
  * Method for setting cookies
  * @param {string} cname - cookie name
  * @param {string} cvalue - cookie value
  * @param {string} exdays - cookie days until the cookie expire
  */
  static setCookie(cname, cvalue, exdays) {
    const hours = 24;
    const seconds = 60;
    const minutes = 60;
    const milliseconds = 1000;
    const d = new Date();
    d.setTime(d.getTime() + (exdays * hours * seconds * minutes * milliseconds));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  static deleteCookie(cname){
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
export { CookiesService };

// import { CookiesService } from './../../services/cookies';
// getSomeCookie(){
// 	CookiesService.setCookie('test','test','1');
// }