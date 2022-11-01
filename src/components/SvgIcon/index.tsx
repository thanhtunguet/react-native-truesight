import type { PropsWithChildren, ReactElement } from 'react';
import React, { FC } from 'react';
import nameof from 'ts-nameof.macro';
import type {
  LinearGradientProps,
  PathProps,
  StopProps,
} from 'react-native-svg';
import { Stop } from 'react-native-svg';
import type { SvgComponent } from 'react-native-svg-types';

type PathColorProps = Pick<PathProps, 'fill' | 'stroke'>;

function clonePathElement(
  child: ReactElement<PathProps>,
  overrideProps: PathColorProps
): ReactElement<PathProps> {
  const { fill, stroke } = overrideProps;

  const { props } = child;

  return React.cloneElement(
    child,
    props?.fill || props?.stroke
      ? {
          fill: fill ?? props.fill,
          stroke: stroke ?? props.stroke,
        }
      : {},
    []
  );
}

function cloneGradientDefs(
  child: ReactElement<LinearGradientProps>,
  stops: ReactElement<StopProps>[]
): ReactElement<LinearGradientProps> {
  const { props } = child;
  return React.cloneElement(
    child,
    {
      ...props,
    },
    stops
  );
}

export const SvgIcon: FC<SvgIconProps> = (
  props: PropsWithChildren<SvgIconProps>
): ReactElement => {
  const {
    component,
    colors = [],
    locations = [],
    fill,
    stroke,
    solid,
    ...svgProps
  } = props;

  const element = component.default(svgProps)!;

  const { children } = element.props;

  if (locations.length !== colors.length) {
    console.error('Locations and colors should be of the same length');
  }

  return React.cloneElement(
    element,
    svgProps,
    React.Children.toArray(children)
      .filter((child) => React.isValidElement(child))
      .map((child) => {
        const childNode: ReactElement = child as ReactElement;
        if (childNode.type === 'defs') {
          if (!solid) {
            const { props: defProps } = childNode;
            const linearStops = colors?.map((color, index) => (
              <Stop offset={locations[index]} stopColor={color} />
            ));
            return React.cloneElement(
              childNode,
              defProps,
              defProps.children.map(
                (childStop: ReactElement<LinearGradientProps>) =>
                  cloneGradientDefs(childStop, linearStops)
              )
            );
          }
        }
        if (childNode.type === 'path') {
          if (solid) {
            return clonePathElement(child as ReactElement<PathProps>, {
              fill,
              stroke,
            });
          }
        }
        return child;
      })
  );
};

export interface SvgIconProps extends PathColorProps {
  component: {
    default: SvgComponent;
  };

  solid?: boolean;

  colors?: string[];

  locations?: number[];
}

SvgIcon.defaultProps = {
  //
};

SvgIcon.displayName = nameof(SvgIcon);

export default SvgIcon;
