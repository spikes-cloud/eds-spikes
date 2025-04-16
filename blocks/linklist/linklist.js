import promoteChild from '../../scripts/utils/dom.js';

export default async function decorate(block) {
  const [headingTitle, fixedListUrl, ctaText] = [...block.children];

  const mainTitle = headingTitle ? promoteChild(headingTitle) : null;
  const fixedUrl = fixedListUrl ? promoteChild(fixedListUrl) : null;
  const linkTitle = ctaText ? promoteChild(ctaText) : null;
  console.log(fixedUrl, linkTitle, 'fixedUrlfixedUrl', block.children);

  // generating damURL from anchor tag
  const linklistBody = document.createElement('div');
  const linklistItemOne = document.createElement('div');
  const linklistItemTwo = document.createElement('div');
  const linklistUl = document.createElement('ul');
  const linklistli = document.createElement('li');
  // const linklistAnchor = document.createElement('a');
  // const linklistP = document.createElement('p');

  // linklistAnchor.href = fixedUrl;
  // linklistAnchor.innerHTML = 'Click here';
  // // OR, safer if you're not inserting HTML
  // linklistAnchor.textContent = 'Click here';
  // linklistAnchor.target = '_blank'; // opens in new tab
  // linklistAnchor.rel = 'noopener noreferrer'; // security best practice with _blank
  // linklistAnchor.className = 'my-custom-class';

  // Add CSS classes only if the elements exist
  linklistBody?.classList.add('linklist-body');
  linklistItemOne?.classList.add('linklist-item-one');
  linklistItemTwo?.classList.add('linklist-item-two');
  linklistUl?.classList.add('linklist-ul');
  linklistli?.classList.add('linklist-li');

  console.log(block, 'linklist decorate function');
  linklistItemOne.append(mainTitle);
  // linklistli.append(linklistAnchor, linklistP);
  // linklistUl.append(linklistli);
  // linklistItemTwo.append(linklistUl);
  // linklistBody.append(linklistItemOne, linklistItemTwo);

  // block.textContent = '';
  // block.append(linklistBody);
}
