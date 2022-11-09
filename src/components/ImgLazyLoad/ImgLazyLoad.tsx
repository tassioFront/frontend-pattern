import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ImgLazyLoadTypes {
  alt: string;
  height?: string;
  src: string;
  width?: string;
  className?: string;
}

const ImgLazyLoad = ({
  alt,
  height,
  src,
  width,
  className,
}: ImgLazyLoadTypes): JSX.Element => (
  <LazyLoadImage
    alt={alt}
    src={src}
    height={height}
    width={width}
    className={className}
  />
);

export default ImgLazyLoad;
