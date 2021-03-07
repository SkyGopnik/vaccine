import React from 'react';

interface IProps {
  className?: string,
  type?: 'small',
  width?: number,
  height?: number,
  disabled?: boolean,
  onClick?: Function,
  onMouseDown?: Function,
  onMouseUp?: Function
}

export default (props: IProps) => {
  const {
    className,
    type,
    width,
    height,
    onClick,
    onMouseDown,
    onMouseUp,
    disabled = false
  } = props;

  return (
    <span
      className={className}
      onClick={(e) => !disabled && onClick && onClick(e)}
      onMouseDown={(e) => !disabled && onMouseDown && onMouseDown(e)}
      onMouseUp={(e) => !disabled && onMouseUp && onMouseUp(e)}
    >
      <svg width={!width ? (type === 'small' ? "14" : "183") : width} height={!height ? (type === 'small' ? "16" : "231") : height} viewBox="0 0 183 231" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M177.038 182.993L121.846 104.163C120.281 101.928 119.442 99.265 119.442 96.5363V21.5037L106.439 12.2078H71.9512L63.5571 21.5037V96.5363C63.5571 99.265 62.7175 101.928 61.1524 104.163L5.9619 182.993C-8.19542 203.213 6.27005 231 30.9541 231H152.046C176.73 231 191.195 203.213 177.038 182.993V182.993Z" fill="#D3EFFB"/>
        <path d="M177.038 182.993L121.846 104.163C120.281 101.928 119.442 99.265 119.442 96.5363V30.2407V21.5037L107.464 12.2078H71.9517L63.5576 21.5037V30.2407H95.9906C102.327 30.2407 107.464 35.3772 107.464 41.714V96.5363C107.464 99.265 108.303 101.928 109.869 104.163L165.06 182.993C179.218 203.213 164.752 231 140.068 231H152.046C176.73 231 191.196 203.213 177.038 182.993Z" fill="#BED8FB"/>
        <path d="M129.757 21.5038H53.2429C51.7234 21.5038 50.4917 20.2721 50.4917 18.7521V2.7517C50.4917 1.23215 51.7234 0 53.2429 0H129.757C131.277 0 132.509 1.2317 132.509 2.7517V18.7525C132.509 20.2721 131.277 21.5038 129.757 21.5038V21.5038Z" fill="#9DC6FB"/>
        <path d="M129.757 0H118.491C120.011 0 121.243 1.2317 121.243 2.7517V18.7525C121.243 20.2721 120.011 21.5042 118.491 21.5042H129.757C131.277 21.5042 132.508 20.2725 132.508 18.7525V2.7517C132.509 1.2317 131.277 0 129.757 0V0Z" fill="#80B4FB"/>
        <path d="M133.52 149.494C131.067 145.99 127.566 143.348 123.517 141.968C118.961 140.416 117.28 137.126 110.154 137.126C100.828 137.126 100.828 142.762 91.502 142.762C82.1749 142.762 82.1749 137.126 72.8478 137.126C65.7216 137.126 64.04 140.416 59.4832 141.968C55.4344 143.348 51.9333 145.99 49.4798 149.494L19.4264 192.419C15.0058 198.733 17.2864 204.712 18.4721 206.989C19.6578 209.266 23.2473 214.563 30.9542 214.563H152.047C159.754 214.563 163.343 209.266 164.529 206.989C165.715 204.712 167.995 198.733 163.575 192.419L133.52 149.494Z" fill="#78D0B1"/>
        <path d="M163.574 192.42L133.52 149.494C131.067 145.99 127.566 143.348 123.517 141.968C118.961 140.416 117.28 137.126 110.154 137.126C106.451 137.126 104.219 138.016 102.289 139.087C104.073 140.077 105.599 141.223 107.787 141.969C111.836 143.349 115.336 145.991 117.79 149.494L147.844 192.42C152.264 198.733 149.984 204.712 148.798 206.99C147.613 209.267 144.023 214.564 136.316 214.564H152.046C159.753 214.564 163.343 209.267 164.529 206.99C165.714 204.712 167.994 198.733 163.574 192.42V192.42Z" fill="#70B9C6"/>
        <path d="M61.7484 166.119C59.8228 166.119 58.2626 164.559 58.2626 162.633V160.132C58.2626 158.207 59.8232 156.646 61.7484 156.646C63.674 156.646 65.2341 158.207 65.2341 160.132V162.633C65.2341 164.559 63.674 166.119 61.7484 166.119Z" fill="#70B9C6"/>
        <path d="M123.083 198.211C121.158 198.211 119.598 196.65 119.598 194.725V192.224C119.598 190.298 121.158 188.738 123.083 188.738C125.009 188.738 126.569 190.298 126.569 192.224V194.725C126.569 196.65 125.008 198.211 123.083 198.211Z" fill="#70B9C6"/>
        <path d="M123.083 168.62C121.158 168.62 119.598 167.06 119.598 165.134V162.634C119.598 160.708 121.158 159.148 123.083 159.148C125.009 159.148 126.569 160.708 126.569 162.634V165.134C126.569 167.06 125.008 168.62 123.083 168.62Z" fill="#70B9C6"/>
        <path d="M91.5001 161.33C89.5745 161.33 88.0143 159.769 88.0143 157.844V155.343C88.0143 153.417 89.5749 151.857 91.5001 151.857C93.4257 151.857 94.9859 153.418 94.9859 155.343V157.844C94.9859 159.77 93.4252 161.33 91.5001 161.33Z" fill="#70B9C6"/>
        <path d="M83.6195 187.561C81.6939 187.561 80.1337 186.001 80.1337 184.075V181.574C80.1337 179.649 81.6943 178.088 83.6195 178.088C85.5446 178.088 87.1052 179.649 87.1052 181.574V184.075C87.1052 186.001 85.5446 187.561 83.6195 187.561Z" fill="#70B9C6"/>
        <path d="M50.4574 192.493C48.5318 192.493 46.9716 190.932 46.9716 189.007V186.506C46.9716 184.581 48.5322 183.021 50.4574 183.021C52.3825 183.021 53.9431 184.581 53.9431 186.506V189.007C53.9431 190.932 52.3825 192.493 50.4574 192.493Z" fill="#70B9C6"/>
      </svg>
    </span>
  );
};
