import { ICar } from "../types";

const generateImage = (car: ICar, angle?: string, surr?: boolean): string => {
  const url = new URL("https://cdn.imagin.studio/getImage");

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", car.make);
  url.searchParams.append("modelType", car.model);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", car.year);
  url.searchParams.append("randomPaint", "true");

  if (angle) {
    url.searchParams.append("angle", angle);
  }

  if (surr) {
    url.searchParams.append("surrounding", "sur4");
    url.searchParams.append("viewPoint", "5");
    url.searchParams.append("aspectRatio", "32:9");
    url.searchParams.append("overlayArea", "none");
  }

  return url.href;
};
export default generateImage;
