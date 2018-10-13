import * as React from "react";

import { Thing } from "@/services/homectrl/types/Thing";

export interface ThingsDataSourceProps {
  children(data: { things: Thing[] }): JSX.Element;
}
type Props = ThingsDataSourceProps;
export default class ThingsDataSource extends React.Component<Props> {
  render() {
    const things: Thing[] = [
      {
        name: "Test",
        types: ["test"],
        description: "A mock thing"
      },
      {
        name: "Test 2",
        types: ["test"],
        description: "Another mock thing"
      }
    ];
    return React.Children.only(this.props.children({ things }));
  }
}
