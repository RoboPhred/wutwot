import * as React from "react";

import { Thing } from "../types/Thing";
import { getThings } from "../api";

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
    try {
      const things = await getThings();
      this.setState({
        error: null,
        things
      });
    } catch (e) {
      this.setState({
        error: e.message
      });
    }
  }
}
