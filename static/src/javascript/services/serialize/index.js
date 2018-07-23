
/**
 * service for serialize forms
 * @param {form}  - form selector 
 * @param {serialize} - function return form params { para1=value1$param2=value2 }
 */

export default function serialize(form){
  
  if (!form || form.nodeName !== 'FORM') {
    return;
  }
  let i, j, q = [];
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === '') {
      continue;
    }
    switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
          case 'text':
          case 'number':
          case 'tel':
          case 'email':
          case 'hidden':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
            break;
          case 'checkbox':
          case 'radio':
            if (form.elements[i].checked) {
              q.push(form.elements[i].name + '=' + 'true');
            }
            break;
        }
        break;
      case 'file':
        break;
      case 'TEXTAREA':
        q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
        break;
      case 'SELECT':
        switch (form.elements[i].type) {
          case 'select-one':
            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
            break;
          case 'select-multiple':
            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
              if (form.elements[i].options[j].selected) {
                q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].options[j].value));
              }
            }
            break;
        }
        break;
      case 'BUTTON':
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
            break;
        }
        break;
    }
  }
  return q.join('&');
}