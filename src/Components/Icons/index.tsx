import * as React from 'react';
import {SvgXml} from 'react-native-svg';

interface IIconProps {
  name: any;
  height: number;
  width: number;
  color?: string;
}

const Icon = ({name, height = 20, width = 20, color = "#FFF"}: IIconProps) => {
  return <SvgXml xml={name} height={height} width={width} fill={color} />;
};

export {Icon};
