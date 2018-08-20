// Simple localization
const isGithubPages = window.location.hostname === 'stripe.github.io';
const localeIndex = isGithubPages ? 2 : 1;
window.__exampleLocale = window.location.pathname.split('/')[localeIndex] || 'en';
const urlPrefix = isGithubPages ? '/elements-examples/' : '/';


var optionListA = document.querySelectorAll('.optionList a');

for(var i=0;i<optionListA.length;i++){
  var langNode = optionListA[i];
  const langValue = langNode.getAttribute('data-lang');
  const langUrl = langValue === 'en' ? urlPrefix : (urlPrefix + langValue + '/');

  if (langUrl === window.location.pathname || langUrl === window.location.pathname + '/') {
    langNode.className += ' selected';
    langNode.parentNode.setAttribute('aria-selected', 'true');
  } else {
    langNode.setAttribute('href', langUrl);
    langNode.parentNode.setAttribute('aria-selected', 'false');
  }
}

// document.querySelectorAll('.optionList a').forEach(function(langNode) {
//   const langValue = langNode.getAttribute('data-lang');
//   const langUrl = langValue === 'en' ? urlPrefix : (urlPrefix + langValue + '/');

//   if (langUrl === window.location.pathname || langUrl === window.location.pathname + '/') {
//     langNode.className += ' selected';
//     langNode.parentNode.setAttribute('aria-selected', 'true');
//   } else {
//     langNode.setAttribute('href', langUrl);
//     langNode.parentNode.setAttribute('aria-selected', 'false');
//   }
// });
