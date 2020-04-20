import * as React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { thingSourceAdd } from "@/actions/thing-source-add";

export interface AddThingSourceDialogProps {
  open: boolean;
  onRequestClose(): void;
}

const AddThingSourceDialog: React.FC<AddThingSourceDialogProps> = ({
  open,
  onRequestClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [sourceName, setSourceName] = React.useState("");
  const [sourceUrl, setSourceUrl] = React.useState("");

  const onNameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSourceName(e.target.value);
    },
    [],
  );
  const onUrlChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSourceUrl(e.target.value);
    },
    [],
  );
  const onCancelClick = React.useCallback(() => {
    setSourceName("");
    setSourceUrl("");
    onRequestClose();
  }, [onRequestClose]);
  const onAddClick = React.useCallback(() => {
    if (sourceName === "" || sourceUrl === "") {
      return;
    }
    dispatch(thingSourceAdd(sourceName, sourceUrl));
    setSourceName("");
    setSourceUrl("");
    onRequestClose();
  }, [sourceName, sourceUrl, onRequestClose]);

  return (
    <Dialog
      open={open}
      aria-labelledby="add-thing-source-title"
      onClose={onCancelClick}
    >
      <DialogTitle id="add-thing-source-title">
        {t("thing_sources.verb.new_descriptive")}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t("thing_sources.source_name_titlecase")}
          fullWidth
          value={sourceName}
          onChange={onNameChange}
        />
        <TextField
          margin="dense"
          label={t("thing_sources.source_url_titlecase")}
          type="url"
          fullWidth
          value={sourceUrl}
          onChange={onUrlChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelClick} color="primary">
          {t("verbs.cancel_titlecase")}
        </Button>
        <Button
          disabled={sourceName === "" || sourceUrl === ""}
          onClick={onAddClick}
          color="primary"
        >
          {t("verbs.add_titlecase")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddThingSourceDialog;
