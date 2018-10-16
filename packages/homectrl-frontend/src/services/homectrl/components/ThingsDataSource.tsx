import * as React from "react";

import { Thing } from "@/services/homectrl/types/Thing";

export interface ThingsDataSourceProps {
  children(data: { error: Error | null; things: Thing[] | null }): JSX.Element;
}
type Props = ThingsDataSourceProps;
interface State {
  error: Error | null;
  things: Thing[] | null;
}
export default class ThingsDataSource extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: null,
      things: null
    };

    this.fetchData();
  }

  render() {
    const { error, things } = this.state;
    return React.Children.only(this.props.children({ error, things }));
  }

  private async fetchData() {
    const response = await fetch(`${process.env.HOMECTRL_API_URL}/things`);
    if (response.status !== 200) {
      this.setState({
        error: new Error(response.statusText)
      });
      return;
    }
    const result = await response.json();
    this.setState({
      error: null,
      things: result
    });
  }
}
