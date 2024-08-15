import React, { useState } from 'react';
import styled from 'styled-components';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';


function CustomDialog({ open, onClose, onSubmit }) {
    const [channelName, setChannelName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(true);

    const handleSubmit = () => {
        onSubmit(channelName, isAnonymous,  );
        setChannelName(''); // Clear input field
        setIsAnonymous(true); // Reset anonymous state
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Channel</DialogTitle>
            <DialogContent>
                <StyledTextField
                    autoFocus
                    margin="dense"
                    label="Channel Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                        />
                    }
                    label="Anonymous"
                    labelPlacement="end"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CustomDialog;

const StyledTextField = styled(TextField)`
    margin-bottom: 16px;
`;

const SelectedMembersList = styled.div`
    margin-top: 16px;
`;

const SelectedMember = styled.div`
    padding: 8px 0;
`;
