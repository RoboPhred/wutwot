import * as React from "react";

import { Trans } from "react-i18next";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import ListItemLink from "./ListItemLink";

import NavItems from "../nav-links";

const Nav: React.FC = () => (
  <List component="nav">
    {NavItems.map(({ path, i18nKey }) => (
      <ListItemLink key={i18nKey} to={path} button autoselect>
        <ListItemText>
          <Trans i18nKey={i18nKey} />
        </ListItemText>
      </ListItemLink>
    ))}
  </List>
);

export default Nav;
