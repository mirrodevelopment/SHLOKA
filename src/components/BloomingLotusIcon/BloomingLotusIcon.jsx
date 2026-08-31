import flowerImg from '../../assets/Flower-icon.png';

export default function BloomingLotusIcon({ width, height, className, style }) {
  // Scale up base sizes by 1.75x globally so all sections from Hero to Footer receive a larger, prominent flower icon
  const baseW = typeof width === 'number' ? width : (width ? parseInt(width, 10) : 24);
  const baseH = typeof height === 'number' ? height : (height ? parseInt(height, 10) : 16);

  const finalWidth = Math.round(baseW * 1.75);
  const finalHeight = Math.round(baseH * 1.75);

  return (
    <img
      src={flowerImg}
      alt="SHLOKA Heritage Lotus Motif"
      className={className}
      style={{
        width: `${finalWidth}px`,
        height: `${finalHeight}px`,
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
    />
  );
}
