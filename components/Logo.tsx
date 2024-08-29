import React from "react";
import Svg, { Path, G } from "react-native-svg";
import colors from "../constants/colors";

const defaultBg = colors.main;
const defaultLogo = colors.extra.white;

interface SvgProps {
  height?: number;
  width?: number;
  background?: string;
  logo?: string;
}

const Logo = (props: SvgProps) => (
  <Svg width={32} height={32} {...props} viewBox="0 0 512 512">
    <Path
      d="M0 0h512v512H0z"
      fill={props.background ? props.background : defaultBg}
    />
    <G fill={props.logo ? props.logo : defaultLogo}>
      <Path d="M255 204.674h49.752v143.587H255z" />
      <Path
        d="M362.002-126.945h70.981V14.752h-70.981z"
        transform="skewY(45.218) scale(.70442 1)"
      />
      <Path
        d="M145.647 158.248h145.647v73.872H145.647z"
        transform="skewY(30.88) scale(.85824 1)"
      />
      <Path
        d="M-442.766 460.247h145.647v73.872h-145.647z"
        transform="skewY(-30.88) scale(-.85824 1)"
      />
    </G>
  </Svg>
);

const ZoomedLogo = (props: SvgProps) => (
  <Svg width={32} height={32} {...props} viewBox="0 0 512 512">
    <Path
      d="M-4.408 0h512v512h-512z"
      fill={props.background ? props.background : defaultBg}
    />
    <G fill={props.logo ? props.logo : defaultLogo}>
      <Path d="M255 196.932h81.87v235.316H255z" />
      <Path
        d="M362.836-227.118h129.483V31.949H362.836z"
        transform="matrix(.7028 .7114 0 1 0 0)"
      />
      <Path
        d="M-555.394 507.487h258.485v130.844h-258.485z"
        transform="matrix(-.85885 .51223 0 1 0 0)"
      />
      <Path
        d="M24.451 210.475h258.485v130.844H24.451z"
        transform="skewY(30.812) scale(.85885 1)"
      />
      <Path d="M180.743 393.604h1.889v3.779h-1.889z" />
    </G>
  </Svg>
);

export default Logo;
export { ZoomedLogo };
