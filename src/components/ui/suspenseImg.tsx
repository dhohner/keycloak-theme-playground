const imgCache = {
  __cache: {} as { [key: string]: Promise<void> | boolean },
  read(src: string) {
    if (!src) {
      return;
    }

    if (!this.__cache[src]) {
      this.__cache[src] = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.__cache[src] = true;
          resolve(this.__cache[src]);
        };
        img.src = src;
        setTimeout(() => resolve({}), 7000);
      }).then(() => {
        this.__cache[src] = true;
      });
    }

    if (this.__cache[src] instanceof Promise) {
      throw this.__cache[src];
    }
    return this.__cache[src];
  },
  clearImg(src: string) {
    delete this.__cache[src];
  },
};

export const SuspenseImg = ({
  src,
  alt,
  ...rest
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) => {
  imgCache.read(src);

  return <img alt={alt} src={src} {...rest} />;
};
