import * as React from "react";
import { DataSchema } from "@wutwot/td";
import Form from "@rjsf/material-ui";
import { ISubmitEvent } from "@rjsf/core";

export interface DataSchemaEditorProps {
  schema: DataSchema;
  onSubmit(data: any): void;
}

const DataSchemaEditor: React.FC<DataSchemaEditorProps> = ({
  schema,
  onSubmit,
}) => {
  const handleSubmit = React.useCallback(
    (e: ISubmitEvent<any>) => {
      if (e.errors.length > 0) {
        return;
      }
      onSubmit(e.formData);
    },
    [onSubmit],
  );
  return <Form schema={schema as any} onSubmit={handleSubmit} />;
};

export default DataSchemaEditor;
