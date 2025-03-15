import { stringFormat } from './common-utils.js';

const getAssetMetadata = async (damUrlStr) => {
  try {
    const metadataResp = await fetch(`${damUrlStr}/metadata`);
    if (!metadataResp.ok) {
      throw new Error(`HTTP error! Status: ${metadataResp.status}`);
    }
    const data = await metadataResp.json(); // Parse JSON response
    return data;
  } catch (error) {
    console.error(`DAM Metadata API failed: ${error.message}`);
  }
  return null;
};

const OPEN_API_FORMAT = '/as/{seoname}?smartcrop={crop}&preferwebp=true';
const MEDIA_FORMAT = '({widthType}-width: {width}px)';

const createPicTagWithOpenApi = async (damUrl) => {
  if (!damUrl || !damUrl.href) {
    console.error('Invalid URL provided for DAM asset.');
    return null;
  }
  // Step 1 - Fetch Metadata
  const metadataMap = await getAssetMetadata(damUrl?.href);
  if (!metadataMap) {
    console.error('Metadata retrieval failed, skipping image creation.');
    return null;
  }

  // Step 2 - Extract metadata details
  const { repositoryMetadata, assetMetadata } = metadataMap;
  const dcFormat = repositoryMetadata['dc:format'] || 'image/webp';
  const title = assetMetadata['dc:title'] || '';
  const seoname = `${title?.replace(/[^A-Z0-9]+/gi, '-')}-${dcFormat.replace('/', '.')}`;

  // Step 3 - Create picture Tag.
  const pictureEle = document.createElement('picture');

  // Step 4 -  Add source tag & srcset attr
  if (repositoryMetadata?.smartcrops) {
    Object.entries(repositoryMetadata.smartcrops).forEach(([crop, value]) => {
      const smartCropUrl = stringFormat(OPEN_API_FORMAT, { seoname, crop });
      const sourceEle = document.createElement('source');
      sourceEle.setAttribute('srcset', `${damUrl?.href}${smartCropUrl}`);
      sourceEle.setAttribute('type', 'image/webp');

      const mediaArgs = { widthType: 'min', width: value.width }; // TODO: Understand when to use min/max values
      const media = stringFormat(MEDIA_FORMAT, mediaArgs);
      sourceEle.setAttribute('media', media);

      pictureEle.appendChild(sourceEle);
    });
  }

  // Step 5 - Add <img> Tag
  const imgAtts = {
    loading: damUrl?.loading || 'lazy', // For better performance
    src: damUrl.href,
    alt: damUrl?.alt || title || 'Default Image', // Add Image Title incase the alt text is missing.
    width: assetMetadata['tiff:ImageWidth'] || 'auto',
    height: assetMetadata['tiff:ImageLength'] || 'auto',
  };
  const imgEle = document.createElement('img');
  Object.entries(imgAtts).forEach(([attr, value]) => {
    if (value) imgEle.setAttribute(attr, value);
  });

  pictureEle.appendChild(imgEle);
  return pictureEle;
};

export { createPicTagWithOpenApi, getAssetMetadata };
