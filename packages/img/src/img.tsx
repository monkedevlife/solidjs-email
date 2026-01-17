import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';

export type ImgProps = Readonly<JSX.ImgHTMLAttributes<HTMLImageElement>>;

export const Img: Component<ImgProps> = (props) => {
  const [local, others] = splitProps(props, ['alt', 'src', 'width', 'height', 'style']);

  return (
    <img
      {...others}
      alt={local.alt}
      height={local.height}
      src={local.src}
      style={{
        display: 'block',
        outline: 'none',
        border: 'none',
        'text-decoration': 'none',
        ...local.style,
      }}
      width={local.width}
    />
  );
};
