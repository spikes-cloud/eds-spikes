import promoteChild from '../../scripts/utils/dom.js';

export default async function decorate(block) {
  const [headingTitle] = [...block.children];

  const mainTitle = headingTitle ? promoteChild(headingTitle) : null;

  // generating damURL from anchor tag
  const linklistBody = document.createElement('div');
  const linklistItemOne = document.createElement('div');
  const linklistItemTwo = document.createElement('div');
  const linklistUl = document.createElement('ul');
  const linklistli = document.createElement('li');
  const linklistAnchor = document.createElement('a');
  const linklistP = document.createElement('p');

  // Add CSS classes only if the elements exist
  linklistBody?.classList.add('linklist-body');
  linklistItemOne?.classList.add('linklist-item-one');
  linklistItemTwo?.classList.add('linklist-item-two');
  linklistUl?.classList.add('linklist-ul');
  linklistli?.classList.add('linklist-li');

  console.log(block, 'linklist decorate function', mainTitle);
  linklistItemOne.append(mainTitle);
  linklistli.append(linklistAnchor, linklistP);
  linklistUl.append(linklistli);
  linklistItemTwo.append(linklistUl);
  linklistBody.append(linklistItemOne, linklistItemTwo);

  block.textContent = '';
  block.append(linklistBody);
}
