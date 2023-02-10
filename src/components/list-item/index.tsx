import FontIcon from '@/components/font-icon';
import { Text, View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import classnames from 'classnames';
import { AtIcon } from 'taro-ui';
import styles from './index.module.scss';

interface ListItemProps {
  onClick?: (ev: ITouchEvent) => void;
  className?: string;
  hasBorder?: boolean;
  title?: string;
  renderTitle?: () => JSX.Element;
  onRightClick?: (ev: ITouchEvent) => void;
  extraText?: string;
  language?: string;
  icon?: string;
  rightIcon?: string;
  color?: string;
  renderExtraText?: () => JSX.Element;
  arrow?: 'right' | 'left' | 'up' | 'down' | null;
  size?: string | number;
  style?: React.CSSProperties;
}

const ListItem = ({
  className,
  title,
  language,
  extraText,
  icon,
  rightIcon,
  renderTitle,
  renderExtraText,
  onClick = function () {},
  onRightClick = function () {},
  arrow = 'right',
  hasBorder = true,
  color = 'none',
  size = 25,
  style = {},
}: ListItemProps) => {
  const styleProps: any = {};

  if (hasBorder) {
    styleProps.borderBottomWidth = '1px';
  }

  const iconStyleProps: React.CSSProperties = {
    fontSize: size + 'px',
    padding: '1px',
    marginRight: '10px',
    borderRadius: '50%',
    color: '#fff',
    background: color,
    ...style,
  };

  return (
    <View
      className={classnames(styles.item, className)}
      onClick={onClick || undefined}
      style={styleProps}
    >
      <View className={styles.left}>
        {icon && <FontIcon styleProps={iconStyleProps} value={icon}></FontIcon>}
        {title || (renderTitle && renderTitle())}
      </View>
      <View className={styles.right}>
        {extraText && <Text className={styles['extra-text']}>{extraText}</Text>}
        {rightIcon && (
          <AtIcon
            onClick={onRightClick || undefined}
            size="20"
            customStyle={{ color: '#409bfc', fontWeight: 500 }}
            value={rightIcon}
          ></AtIcon>
        )}
        {arrow && (
          <AtIcon
            size="20"
            customStyle={{ color: '#ccc', fontWeight: 400 }}
            value={`chevron-${arrow}`}
          ></AtIcon>
        )}
      </View>
    </View>
  );
};

export default ListItem;
