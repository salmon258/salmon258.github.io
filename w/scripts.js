function getParameterByName(name, url) {
  /* eslint-disable no-param-reassign */
  /* eslint-disable no-useless-escape */

  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function sanitise(string) {
  const chars = {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;',
  };
  const re = new RegExp(Object.keys(chars).join('|'), 'g');

  return String(string).replace(re, match => chars[match]);
}

function isImageSafe(image) {
  return image.startsWith('https://growth-public.grab.com');
}

const defaultImage = '../default.svg';

document.addEventListener('DOMContentLoaded', () => {
  const img = sanitise(getParameterByName('img'));

  document.querySelector('.image').src = isImageSafe(img) ? img : defaultImage;
});
