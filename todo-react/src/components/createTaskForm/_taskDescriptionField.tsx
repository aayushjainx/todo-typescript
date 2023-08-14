import { TextField } from '@mui/material';
import React, { FC, ReactElement } from 'react';

export const TaskDescriptionField: FC = (): ReactElement => {
  return (
    <TextField
      id="description"
      label="Description"
      placeholder="Description"
      variant="outlined"
      size="small"
      name="description"
      fullWidth
      multiline
      rows={4}
    />
  );
};
