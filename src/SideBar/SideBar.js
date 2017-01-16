import css from './SideBar.scss';
import React from 'react';
import BottomBar from './BottomBar';
import Menu from './Menu';
import WixHOCs from '../HOC/WixHOCs';

class SideBar extends React.Component {

  static displayName: 'SideBar'

  render() {
    return (
      <div className={css.wrapper}>
        {this.props.children}
      </div>
    );
  }

  static propTypes = {
    children: React.PropTypes.any
  }
}

SideBar.Menu = Menu;
SideBar.BottomBar = BottomBar;

export default WixHOCs(SideBar);
