import * as React from "react";

import { Thing } from "../types/Thing";
import { getThing } from "../api";

export interface ThingDataSourceProps {
  thingId: string;
  children(data: { error: Error | null; thing: Thing | null }): JSX.Element;
}
type Props = ThingDataSourceProps;
interface State {
  error: Error | null;
  thing: Thing | null;
}
export default class ThingDataSource extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: null,
      thing: null
    };

    this.fetchData();
  }

  render() {
    const { error, thing } = this.state;
    return React.Children.only(this.props.children({ error, thing }));
  }

  private async fetchData() {
    const { thingId } = this.props;
    try {
      const thing = await getThing(thingId);
      this.setState({
        error: null,
        thing
      });
    } catch (e) {
      this.setState({
        error: e.message
      });
    }
  }
}
