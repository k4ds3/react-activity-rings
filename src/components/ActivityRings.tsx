import React from 'react';
import type {ActivityRing, ActivityRingContainerOptions} from '../types';
import * as styles from './ActivityRings.module.css';

interface ActivityRingsProps {
    rings: ActivityRing[];
    options?: ActivityRingContainerOptions;
}

const defaultOptions : ActivityRingContainerOptions = {
  containerHeight: '100%',
  containerWidth: '100%',
  paddingBetweenRings: 0.75,
  initialRadius: 30,
  animationDurationMillis: 1500,
};

export default function ActivityRings(props: ActivityRingsProps) {
  const options = Object.assign(defaultOptions, props.options) as Required<ActivityRingContainerOptions>;
  const viewBoxSize = 100 + props.rings.length*(20+options.paddingBetweenRings);

  return (
    <svg className={styles.activityRingsContainer} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} height={options.containerHeight} width={options.containerWidth}>
      <g>
        {props.rings.map((ring, index) => (
          <InnerActivityRing key={index} index={index} ring={ring} options={options} />
        ))}
      </g>
    </svg>
  );
}

interface InnerActivityRingProps {
    index: number;
    ring: ActivityRing;
    options: Required<ActivityRingContainerOptions>;
}

function InnerActivityRing(props: InnerActivityRingProps) {
  const radius = props.options.initialRadius+(props.index*(12+props.options.paddingBetweenRings));
  const dashArrayPart = (Math.min(0.999, props.ring.filledPercentage)) * (2*radius*Math.PI);

  return (
    <>
      <circle cx='50%' cy='50%' r={radius} stroke={props.ring.color} strokeOpacity={0.4} strokeWidth={12} className={styles.innerActivityRingBackground} />
      <circle cx='50%' cy='50%' r={radius} strokeDasharray={`${dashArrayPart} 999`} stroke={props.ring.color} strokeWidth={12} style={{animationDuration: `${props.options.animationDurationMillis}ms`}} className={styles.innerActivityRing} />
    </>
  );
}