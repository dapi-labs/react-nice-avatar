/**
 * @typedef Props
 * @property {string} bgColor
 * @property {'circle' | 'rounded' | 'square'} [shape] default is `circle`
 *
 * @param {Props} props
 */
export default function Layout({ children, bgColor, shape = "circle" }) {
  function Shape({ v = shape }) {
    switch (v) {
      case "square":
        return <rect x="0" width="380" height="380" fill={bgColor} />;
      case "rounded":
        return <rect x="0" width="380" height="380" rx="30" fill={bgColor} />;
      case "circle":
      default:
        return <circle cx="190" cy="190" r="190" fill={bgColor} />;
    }
  }

  const clipPathId = `url(#wrapper-clip-${shape})`;

  return (
    <svg width="380" height="380" viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Shape />

      <defs>
        <clipPath id="wrapper-clip-circle">
          <Shape v="circle" />
        </clipPath>
        <clipPath id="wrapper-clip-rounded">
          <Shape v="rounded" />
        </clipPath>
        <clipPath id="wrapper-clip-square">
          <Shape v="square" />
        </clipPath>
      </defs>

      <g clip-path={clipPathId}>{children}</g>
    </svg>
  );
}
