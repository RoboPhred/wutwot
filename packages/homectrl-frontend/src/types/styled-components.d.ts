import { Theme } from "@material-ui/core";

type ObjectStyleProps<T> = { classes: { [K in keyof T]: string } };
type StyleProps<T> = T extends (theme: Theme) => infer R
  ? ObjectStyleProps<R>
  : ObjectStyleProps<T>;
