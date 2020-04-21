import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import MenuItem from "@material-ui/core/MenuItem";

import { onLinkClick } from "./utils";

export interface ListItemLinkProps {
  to: string;
  disabled?: boolean;
  onClick(e: React.MouseEvent<any>): void;
}

type Props = ListItemLinkProps & RouteComponentProps;
class MenuItemLink extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    const { history, location, to, disabled, onClick, children } = this.props;
    return (
      <MenuItem
        component="a"
        href={history.createHref({ pathname: to })}
        disabled={disabled}
        onClick={this._onClick}
      >
        {children}
      </MenuItem>
    );
  }

  private _onClick(e: React.MouseEvent<any>) {
    onLinkClick.call(this, e);
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
}
export default withRouter(MenuItemLink);
