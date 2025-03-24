import { stringFormat, sortObjectByAttr } from './common-utils.js';

/**
 * @param {string} damUrlStr - The base DAM Open API URL.
 * @param {string} params - Query parameters to append to the request.
 * @returns {Promise<Object>} - The JSON object or an empty object if an error occurs.
 */
const getAssetMetadata = async (damUrlStr, params) => {
  try {
    const headers = { cache: 'no-cache' };
    const metadataResp = await fetch(`${damUrlStr}/metadata?${params}`, headers);
    if (!metadataResp.ok) throw new Error(`HTTP error! Status: ${metadataResp.status}`);

    const data = await metadataResp.json();
    return data;
  } catch (error) {
    console.error(`DAM Metadata API failed: ${error.message}`);
  }
  return '{}';
};

const OPEN_API_FORMAT = '/as/{seoname}?smartcrop={crop}&preferwebp=true';
const MEDIA_FORMAT = '({widthType}-width: {width}px)';

const createPicTagWithOpenApi = async (damUrl) => {
  if (!damUrl || !damUrl.href) {
    console.error('Invalid URL provided for DAM asset.');
    return null;
  }
  // Step 0 - Create Picture Tag
  const pictureEle = document.createElement('picture');
  const params = new URLSearchParams(window.location.search);

  // Step 1 - Fetch Metadata
  if (typeof globalThis.globalDmSmartCrops == 'undefined') {
    globalThis.globalDmSmartCrops = await getAssetMetadata(
      damUrl?.href,
      params.toString(),
    );
  }

  // Step 2 - Extract metadata details
  const { repositoryMetadata, assetMetadata } = globalDmSmartCrops;
  const dcFormat = repositoryMetadata?.['dc:format'] || 'image/webp';
  const title = assetMetadata?.['dc:title'] || '';
  const seoname = `${title?.replace(/[^A-Z0-9]+/gi, '-')}-${dcFormat.replace('/', '.')}`;

  // Step 3 -  Add source tag & srcset attr
  if (repositoryMetadata?.smartcrops) {
    const sortedSmartCrops = sortObjectByAttr(
      repositoryMetadata?.smartcrops,
      'width',
      'desc',
    );
    Object.entries(sortedSmartCrops).forEach(([crop, value]) => {
      const smartCropUrl = stringFormat(OPEN_API_FORMAT, { seoname, crop });
      const sourceEle = document.createElement('source');
      sourceEle.setAttribute(
        'srcset',
        `${damUrl?.href}${smartCropUrl}&${params.toString()}`,
      );
      sourceEle.setAttribute('type', 'image/webp');
      sourceEle.setAttribute('data-sm-key', crop);
      const mediaArgs = { widthType: 'min', width: value.width }; // TODO: Understand when to use min/max values
      const media = stringFormat(MEDIA_FORMAT, mediaArgs);
      sourceEle.setAttribute('media', media);

      pictureEle.appendChild(sourceEle);
    });
  }

  // Step 4 - Add <img> Tag
  const imgAtts = {
    loading: damUrl?.loading || 'lazy', // For better performance
    src: damUrl.href,
    alt: damUrl?.alt || title || 'Default Image', // Add Image Title incase the alt text is missing.
    width: assetMetadata?.['tiff:ImageWidth'] || 'auto',
    height: assetMetadata?.['tiff:ImageLength'] || 'auto',
  };
  const imgEle = document.createElement('img');
  Object.entries(imgAtts).forEach(([attr, value]) => {
    if (value) imgEle.setAttribute(attr, value);
  });

  pictureEle.appendChild(imgEle);
  return pictureEle;
};

export { createPicTagWithOpenApi, getAssetMetadata };
