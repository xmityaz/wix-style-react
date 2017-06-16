import styles from './DropdownLayout.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WixComponent from '../WixComponent';
import isEqual from 'lodash.isequal';
import isobject from 'lodash.isobject';
import trim from 'lodash.trim';
import isstring from 'lodash.isstring';
import has from 'lodash.has';

const modulu = (n, m) => {
  const remain = n % m;
  return remain >= 0 ? remain : remain + m;
};

const NOT_HOVERED_INDEX = -1;

class DropdownLayout extends WixComponent {

  constructor(props) {
    super(props);

    this.state = {
      hovered: NOT_HOVERED_INDEX,
    };

    this._onSelect = this._onSelect.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onClose = this._onClose.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  isLegalOption(option) {
    return isobject(option) && has(option, 'id') && trim(option.id).length > 0 &&
        has(option, 'value') && (React.isValidElement(option.value) || (isstring(option.value) && trim(option.value).length > 0));
  }

  onClickOutside(event) {
    const {visible, onClickOutside} = this.props;
    if (visible && onClickOutside) {
      onClickOutside(event);
    }
  }

  _onSelect(index) {
    const {options, onSelect, selectedId} = this.props;
    options[index] && onSelect && onSelect(options[index], options[index].id === selectedId);
    return !!onSelect && options[index];
  }

  _onMouseEnter(index) {
    if (this.isSelectableOption(this.props.options[index])) {
      this.setState({hovered: index});
    }
  }

  _onMouseLeave() {
    this.setState({
      hovered: NOT_HOVERED_INDEX
    });
  }

  hoverNextStep(step) {
    const {options} = this.props;

    if (!options.some(this.isSelectableOption)) {
      return;
    }

    let newHovered = this.state.hovered;
    do {
      newHovered = Math.abs(modulu(Math.max(newHovered + step, -1), options.length));
    } while (!this.isSelectableOption(options[newHovered]));

    this.setState({hovered: newHovered});
    this.options.scrollTop = (newHovered - 2) * 35;
  }

  _onKeyDown(event) {
    if (!this.props.visible) {
      return false;
    }

    switch (event.key) {
      case 'ArrowDown': {
        this.hoverNextStep(1);
        break;
      }

      case 'ArrowUp': {
        this.hoverNextStep(-1);
        break;
      }

      case 'Enter': {
        if (!this._onSelect(this.state.hovered)) {
          return false;
        }
        break;
      }

      case 'Tab': {
        return this._onSelect(this.state.hovered);
      }

      case 'Escape': {
        this._onClose();
        break;
      }

      default: {
        return false;
      }
    }

    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  _onClose() {
    this.setState({
      hovered: NOT_HOVERED_INDEX,
    });

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  renderNode(node) {
    return node ? <div className={styles.node}>{node}</div> : null;
  }

  render() {
    const {options, visible, dropDirectionUp, selectedId, tabIndex, fixedHeader, fixedFooter, withArrow} = this.props;

    const contentContainerClassName = classNames({
      [styles.contentContainer]: true,
      [styles.shown]: visible,
      [styles.up]: dropDirectionUp,
      [styles.down]: !dropDirectionUp,
      [styles.withArrow]: withArrow
    });

    return (
      <div tabIndex={tabIndex} className={classNames(styles.wrapper, styles[`theme-${this.props.theme}`])} onKeyDown={this._onKeyDown}>
        <div className={contentContainerClassName} style={{maxHeight: this.props.maxHeightPixels + 'px'}}>
          {this.renderNode(fixedHeader)}
          <div className={styles.options} style={{maxHeight: this.props.maxHeightPixels - 35 + 'px'}} ref={options => this.options = options} data-hook="dropdown-layout-options">
            {options.map((option, idx) => (
              option.value === '-' ?
                (this.renderDivider(idx)) :
                (this.renderItem({
                  option,
                  idx,
                  selected: option.id === selectedId,
                  hovered: idx === this.state.hovered,
                  disabled: option.disabled,
                  overrideStyle: option.overrideStyle
                }))
            ))}
          </div>
          {this.renderNode(fixedFooter)}
        </div>
        {this.renderTopArrow()}
      </div>
    );
  }

  renderDivider(idx) {
    return (<div key={idx} className={styles.divider}/>);
  }

  renderItem({option, idx, selected, hovered, disabled, overrideStyle}) {
    const optionClassName = classNames({
      [styles.option]: !overrideStyle,
      [styles.selected]: selected && !overrideStyle,
      wixstylereactSelected: selected && overrideStyle, //global class for items that use the overrideStyle
      [styles.hovered]: hovered && !overrideStyle,
      wixstylereactHovered: hovered && overrideStyle, //global class for items that use the overrideStyle
      [styles.disabled]: disabled,
    });
    return (
      <div
        className={optionClassName}
        onClick={!disabled ? () => this._onSelect(idx) : null}
        key={idx}
        onMouseEnter={() => this._onMouseEnter(idx)}
        onMouseLeave={this._onMouseLeave}
        >
        {option.value}
      </div>
    );
  }

  renderTopArrow() {
    const {withArrow, visible, dropDirectionUp} = this.props;
    const arrowClassName = classNames({
      [styles.arrow]: true,
      [styles.up]: dropDirectionUp,
      [styles.down]: !dropDirectionUp
    });
    return withArrow && visible ? <div className={arrowClassName}/> : null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({hovered: NOT_HOVERED_INDEX});
    }

    if (!isEqual(this.props.options, nextProps.options)) {
      if (nextProps.options.some(option => (!this.isLegalOption(option)))) {
        throw new Error('InputWithOptions: Invalid option provided');
      }

      if (this.state.hovered !== NOT_HOVERED_INDEX) {
        this.setState({
          hovered: nextProps.options.findIndex(item => item.id === this.props.options[this.state.hovered].id)
        });
      }
    }
  }

  isSelectableOption(option) {
    return option.value !== '-' && !option.disabled;
  }
}

DropdownLayout.propTypes = {
  dropDirectionUp: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  visible: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]).isRequired,
    disabled: PropTypes.bool,
    overrideStyle: PropTypes.bool
  })),
  selectedId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  tabIndex: PropTypes.number,
  theme: PropTypes.string,
  onClickOutside: PropTypes.func,
  fixedHeader: PropTypes.node,
  fixedFooter: PropTypes.node,
  maxHeightPixels: PropTypes.number,
  withArrow: PropTypes.bool
};

DropdownLayout.defaultProps = {
  options: [],
  tabIndex: 1,
  selectedId: NOT_HOVERED_INDEX,
  maxHeightPixels: 260
};

DropdownLayout.NONE_SELECTED_ID = NOT_HOVERED_INDEX;

export default DropdownLayout;
