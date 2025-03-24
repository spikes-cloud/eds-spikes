import optimizeImages from '../../scripts/utils/optimize-images.js'; // Adjust the path as needed
import promoteChild from '../../scripts/utils/dom.js';

export default function decorate(block) {
  const [img, imgAlt, caption, hideOnMobile, title, heading, text, logo] = [...block.children];

  const heroBody = document.createElement('div');

  const image = img ? promoteChild(img) : null;
  const captionText = caption ? promoteChild(caption) : null;
  const titleText = title ? promoteChild(title) : null;
  const introText = text ? promoteChild(text) : null;
  const isAltTextRequired = imgAlt ? promoteChild(imgAlt) : null;
  const hideImageOnMobile = hideOnMobile ? promoteChild(hideOnMobile) : null;
  const headingText = heading ? promoteChild(heading) : null;
  const logoImage = logo ? promoteChild(logo) : null;

  // Add CSS classes only if the elements exist
  image?.classList.add('image');
  captionText?.classList.add('caption');
  titleText?.classList.add('title');
  introText?.classList.add('intro-text');
  headingText?.classList.add('heading');
  logoImage?.classList.add('logo-image');

  heroBody.classList.add('body');

  // Append only the elements that exist
  const elementsToAppend = [
    titleText,
    headingText,
    image,
    isAltTextRequired,
    captionText,
    introText,
    hideImageOnMobile,
    logoImage,
  ].filter((el) => el !== null); // Remove `null` values

  heroBody.append(...elementsToAppend); // Append only existing elements

  block.textContent = '';
  block.append(heroBody);
  optimizeImages(block);
}
