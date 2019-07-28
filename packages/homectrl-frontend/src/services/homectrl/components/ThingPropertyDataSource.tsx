import * as React from "react";
import { getThingPropertyValue, setThingPropertyValue } from "../api";

export interface ThingPropertyDataSourceProps {
  thingId: string;
  propertyId: string;
  children(props: ThingPropertyDataSurceRenderProps): JSX.Element;
}
export interface ThingPropertyDataSurceRenderProps {
  error: string | null;
  value: any;
  setValue(value: any): void;
}

interface State {
  value: any;
  error: string | null;
}
export class ThingPropertyDataSource extends React.Component<
  ThingPropertyDataSourceProps,
  State
> {
  constructor(props: ThingPropertyDataSourceProps) {
    super(props);
    this._setValue = this._setValue.bind(this);
    this.state = {
      value: null,
      error: null
    };
  }

  componentDidMount() {
    this.fetchValue();
  }

  componentDidUpdate() {
    this.fetchValue();
  }

  render() {
    const { children } = this.props;
    const { value, error } = this.state;
    return React.Children.only(
      children({ value, error, setValue: this._setValue })
    );
  }

  async fetchValue() {
    const { thingId, propertyId } = this.props;
    try {
      const value = await getThingPropertyValue(thingId, propertyId);
      this.setState({
        error: null,
        value
      });
    } catch (e) {
      this.setState({
        error: e.message
      });
    }
  }

  private async _setValue(value: any) {
    const { thingId, propertyId } = this.props;
    try {
      const newValue = await setThingPropertyValue(thingId, propertyId, value);
      this.setState({
        error: null,
        value: newValue
      });
    } catch (e) {
      this.setState({
        error: e.message
      });
    }
  }
}
