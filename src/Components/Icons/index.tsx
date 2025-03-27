import * as React from 'react';
import {SvgXml} from 'react-native-svg';

interface IIconProps {
  name: any;
  height: number;
  width: number;
}

const Icon = ({name, height = 20, width = 20}: IIconProps) => {
  return <SvgXml xml={name} height={height} width={width} />;
};

export {Icon};
