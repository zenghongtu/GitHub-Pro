import { AtIcon } from 'taro-ui';
import './index.scss';

interface FontIconProps {
  value: string;
  size?: string | number;
  styleProps?: React.CSSProperties;
}
const FontIcon = ({ value, size = 16, styleProps = {} }: FontIconProps) => {
  const style = { fontSize: size + 'px', ...styleProps };
  return (
    <AtIcon prefixClass={'icon'} customStyle={style} value={value}></AtIcon>
  );
};

export default FontIcon;
