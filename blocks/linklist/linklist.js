// import promoteChild from '../../scripts/utils/dom.js';

export default async function decorate(block) {
  const [headingTitle] = [...block.children];
  console.log(block, 'linklist decorate function', headingTitle);
  // generating damURL from anchor tag
  // const heroBody = document.createElement('div');
  // const heroContentMax = document.createElement('div');
  // const heroContent = document.createElement('div');
  // const titleText = heroTitle ? promoteChild(heroTitle) : null;
  // const checkImgAltText = checkImgAlt ? promoteChild(checkImgAlt) : null;
  // const mainImage = heroImage ? promoteChild(heroImage) : null;
  // const logoImage = logoImg ? promoteChild(logoImg) : null;
  // const captionText = imgCaption ? promoteChild(imgCaption) : null;
  // const introTextValue = introText ? promoteChild(introText) : null;
  // const checklogoAltText = checklogoAlt ? promoteChild(checklogoAlt) : null;
  // console.log(checkImgAltText, checklogoAltText);
  // Add CSS classes only if the elements exist
  // captionText?.classList.add('caption');
  // titleText?.classList.add('title');
  // introTextValue?.classList.add('intro-text');
  // heroBody?.classList.add('hero-body');
  // mainImage?.classList.add('image');
  // logoImage?.classList.add('logo');
  // heroContent?.classList.add('hero-content');
  // heroContentMax.classList.add('hero-max-content');
  // const isValidElement = (el) =>
  //   el && (el.textContent.trim() !== '' || el.querySelector('img')?.getAttribute('src'));
  // const elementAppendHeroBody = [titleText, mainImage].filter(isValidElement);
  // const elementAppendHeroContent = [captionText, logoImage, introTextValue].filter(
  //   isValidElement,
  // );
  // heroContentMax.append(...elementAppendHeroContent);
  // heroContent.append(heroContentMax);
  // heroBody.append(...elementAppendHeroBody);
  // heroBody.append(heroContent);
  // block.textContent = '';
  // block.append(heroBody);
  // console.log(heroBody, 'hey there ankit');
}
