import React, {PropTypes} from 'react';
import WixComponent from '../../BaseComponents/WixComponent';

export default class Divider extends WixComponent {

  static propTypes =
    {
      size: PropTypes.number,
      direction: PropTypes.string,
      length: PropTypes.string,
      color: PropTypes.string,
      opacity: PropTypes.number
    };

  static defaultProps =
    {
      size: 2,
      direction: 'horizontal',
      length: '100px',
      color: '#18D2DE',
      opacity: 20
    };

  render() {
    let {direction, length, size, color, opacity} = this.props;
    size = this.getMaxSize(size);
    opacity = this.getFormattedOpacity(opacity);
    const props = {
      style: {
        boxSizing: 'border-box',
        width: direction === 'horizontal' ? length : size + 'px',
        height: direction === 'horizontal' ? size + 'px' : length,
        border: 'solid ' + size/2 + 'px ' + color,
        opacity: opacity
      }
    };

    return (
      <div {...props} />
    );
  }

  getMaxSize(size) {
    if (size > 12) {
      size = 12;
    } else if (size < 0) {
      size = 2;
    }
    return size;
  }

  getFormattedOpacity(opacity) {
    if (opacity > 100) {
      opacity = 100;
    }
    return opacity = opacity > 0 ? opacity / 100 : 0;
  }
}
