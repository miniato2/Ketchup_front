import { Grid, TextField, Box, ButtonGroup, Button, List, ListItem, ListItemText } from "@mui/material";

export default function ScheduleForm({ newScheduleData, onCloseDialogHandler, handleSubmit, handleInputChange }) {

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(newScheduleData); }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <List>
                            <ListItem sx={{ py: 1, px: 0, display: 'flex', alignItems: 'center' }}>
                                <ListItemText sx={{ width: '30%', pr: '2%' }}>일정 이름</ListItemText>
                                <Box sx={{ flex: 1 }}>
                                    <TextField
                                        fullWidth
                                        label="skdName"
                                        variant="outlined"
                                        name="skdName"
                                        value={newScheduleData.skdName}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0, display: 'flex', alignItems: 'center' }}>
                                <ListItemText sx={{ width: '30%', pr: '2%' }}>시작 일시</ListItemText>
                                <Box sx={{ flex: 1 }}>
                                    <TextField
                                        fullWidth
                                        label="시작 일시"
                                        variant="outlined"
                                        name="skdStartDttm"
                                        value={newScheduleData.skdStartDttm}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0, display: 'flex', alignItems: 'center' }}>
                                <ListItemText sx={{ width: '30%', pr: '2%' }}>종료 일시</ListItemText>
                                <Box sx={{ flex: 1 }}>
                                    <TextField
                                        fullWidth
                                        label="종료 일시"
                                        variant="outlined"
                                        name="skdEndDttm"
                                        value={newScheduleData.skdEndDttm}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0, display: 'flex', alignItems: 'center' }}>
                                <ListItemText sx={{ width: '30%', pr: '2%' }}>장소</ListItemText>
                                <Box sx={{ flex: 1 }}>
                                    <TextField
                                        fullWidth
                                        label="장소"
                                        variant="outlined"
                                        name="skdLocation"
                                        value={newScheduleData.skdLocation}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0, display: 'flex', alignItems: 'center' }}>
                                <ListItemText sx={{ width: '30%', pr: '2%' }}>메모</ListItemText>
                                <Box sx={{ flex: 1 }}>
                                    <TextField
                                        fullWidth
                                        label="메모"
                                        variant="outlined"
                                        name="skdMemo"
                                        value={newScheduleData.skdMemo}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup>
                        <Button color="error" onClick={onCloseDialogHandler}>취소</Button>
                        <Button type="submit">등록</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </form>
    );
}
