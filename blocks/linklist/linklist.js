import promoteChild from '../../scripts/utils/dom.js';

export default async function decorate(block) {
  const [headingTitle] = [...block.children];

  const mainTitle = headingTitle ? promoteChild(headingTitle) : null;

  console.log(block, 'linklist decorate function', mainTitle);

  // heroContentMax.append(...elementAppendHeroContent);
  // heroContent.append(heroContentMax);
  // heroBody.append(...elementAppendHeroBody);
  // heroBody.append(heroContent);
  // block.textContent = '';
  // block.append(heroBody);
  // console.log(heroBody, 'hey there ankit');
}
