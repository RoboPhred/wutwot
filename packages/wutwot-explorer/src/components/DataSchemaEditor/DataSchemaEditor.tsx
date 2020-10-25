import * as React from "react";
import { DataSchema } from "@wutwot/td";
import Form from "@rjsf/material-ui";
import { IChangeEvent, ISubmitEvent } from "@rjsf/core";

export interface DataSchemaEditorProps {
  schema: DataSchema;
  formData?: any;
  onFormDataChanged?(formData: any): void;
  onValidChanged?(valid: boolean): void;
  onSubmit?(data: any): void;
}

const DataSchemaEditor: React.FC<DataSchemaEditorProps> = ({
  schema,
  formData,
  children,
  onFormDataChanged,
  onValidChanged,
  onSubmit,
}) => {
  const handleSubmit = React.useCallback(
    (e: ISubmitEvent<any>) => {
      if (e.errors.length > 0) {
        return;
      }
      onSubmit!(e.formData);
    },
    [onSubmit],
  );
  const handleChange = React.useCallback(
    (e: IChangeEvent<any>) => {
      if (onFormDataChanged) {
        onFormDataChanged(e.formData);
      }
      if (onValidChanged) {
        onValidChanged(e.errors.length === 0);
      }
    },
    [onFormDataChanged, onValidChanged],
  );

  return (
    <Form
      schema={schema as any}
      formData={formData}
      onChange={handleChange}
      onSubmit={onSubmit ? handleSubmit : undefined}
    >
      {children}
    </Form>
  );
};

export default DataSchemaEditor;
