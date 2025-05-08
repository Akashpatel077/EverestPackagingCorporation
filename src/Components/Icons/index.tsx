import * as React from 'react';
import {SvgXml} from 'react-native-svg';
import {metrics} from 'src/theme';

interface IIconProps {
  name: any;
  height: number;
  width: number;
  color?: string;
}

const Icon = ({
  name,
  height = metrics.iconSize.md,
  width = metrics.iconSize.md,
  color,
}: IIconProps) => {
  return <SvgXml xml={name} height={height} width={width} fill={color} />;
};

export {Icon};
