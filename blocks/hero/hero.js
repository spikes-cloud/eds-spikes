import optimizeImages from '../../scripts/utils/optimize-images.js'; // Adjust the path as needed
import promoteChild from '../../scripts/utils/dom.js';

export default function decorate(block) {
  const [img, imgAlt, caption, hideOnMobile, title, heading, text, logo] = [...block.children];
  const heroBlockBody = document.createElement('div');
  const heroBlockImage = promoteChild(img);
  const heroBlockCaption = promoteChild(caption);
  const heroBlockTitle = promoteChild(title);
  const heroBlockIntroText = promoteChild(text);

  heroBlockImage?.classList.add('hero-block-image');
  heroBlockCaption?.classList.add('hero-block-caption');
  heroBlockTitle?.classList.add('hero-block-title');
  heroBlockIntroText?.classList.add('hero-block-intro-text');

  heroBlockBody.classList.add('hero-block-body');
  heroBlockBody.append(heroBlockTitle, heroBlockImage, heroBlockCaption, heroBlockIntroText);
  block.textContent = '';
  block.append(heroBlockBody);

  optimizeImages(block);
  console.log(imgAlt, hideOnMobile, heading, logo);
}
