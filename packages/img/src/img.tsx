import type { JSX } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';

export type ImgProps = Readonly<JSX.ImgHTMLAttributes<HTMLImageElement>>;

export const Img: Component<ImgProps> = (props) => {
  const others = omit(props, 'alt', 'src', 'width', 'height', 'style');

  return (
    <img
      {...others}
      alt={props.alt}
      height={props.height}
      src={props.src}
      style={{
        display: 'block',
        outline: 'none',
        border: 'none',
        'text-decoration': 'none',
        ...props.style,
      }}
      width={props.width}
    />
  );
};
