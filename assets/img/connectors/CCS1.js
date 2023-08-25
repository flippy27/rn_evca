import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const CSS1Icon = ({ width = 44, height = 44, viewBox = "0 0 44 44", fill = "none", ...props }) => {
    return (
        <Svg width={width} height={height} viewBox={viewBox} fill={fill} {...props}>
            <G clipPath="url(#clip0)">
                <Path d="M17.3951 13.2165C18.7784 13.2165 19.9049 12.0887 19.9049 10.7038C19.9049 9.3188 18.7784 8.19098 17.3951 8.19098C16.0118 8.19098 14.8853 9.3188 14.8853 10.7038C14.8853 12.0887 16.0118 13.2165 17.3951 13.2165ZM17.3951 9.38196C18.1251 9.38196 18.7153 9.97745 18.7153 10.7038C18.7153 11.4301 18.1206 12.0256 17.3951 12.0256C16.6697 12.0256 16.0749 11.4301 16.0749 10.7038C16.0749 9.97745 16.6697 9.38196 17.3951 9.38196Z" fill="#393737" />
                {/* ... other SVG paths go here ... */}
            </G>
            {/* Include any other SVG elements you need, like Defs, ClipPath, etc. */}
        </Svg>
    );
};

export default CSS1Icon;