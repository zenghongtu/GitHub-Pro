import { AtIcon } from 'taro-ui';

interface FontIconProps {
  value: string;
  size?: string | number;
  styleProps?: React.CSSProperties;
}
const FontIcon = ({ value, size = 16, styleProps = {} }: FontIconProps) => {
  const fontSize = size + 'px';

  const style: React.CSSProperties = {
    lineHeight: '1em',
    fontSize,
    ...styleProps,
  };
  return (
    <AtIcon prefixClass={'icon'} customStyle={style} value={value}></AtIcon>
  );
};

export default FontIcon;
