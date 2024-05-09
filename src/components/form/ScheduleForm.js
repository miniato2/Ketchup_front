import React from 'react';
import { Grid, TextField, Box, ButtonGroup, Button, List, ListItem, ListItemText } from "@mui/material";

export default function ScheduleForm({ newScheduleData, onCloseDialogHandler, handleSubmit, handleInputChange }) {
     // 날짜와 시간을 ISO 8601 형식으로 변환하는 함수
     const convertToISO8601 = (datetimeString) => {
        const date = new Date(datetimeString);
        return date.toISOString();
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(newScheduleData); }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <List>
                            <ListItem sx={{ py: 1, px: 0, display: 'flex', alignItems: 'center' }}>
                                <ListItemText sx={{ width: '30%', pr: '2%' }}>일정 번호</ListItemText>
                                <Box sx={{ flex: 1 }}>
                                    <TextField
                                        fullWidth
                                        label="일정 번호"
                                        variant="outlined"
                                        name="skdNo"
                                        value={newScheduleData.skdNo}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0, display: 'flex', alignItems: 'center' }}>
                                <ListItemText sx={{ width: '30%', pr: '2%' }}>부서 번호</ListItemText>
                                <Box sx={{ flex: 1 }}>
                                    <TextField
                                        fullWidth
                                        label="부서 번호"
                                        variant="outlined"
                                        name="dptNo"
                                        value={newScheduleData.dptNo}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0, display: 'flex', alignItems: 'center' }}>
                                <ListItemText sx={{ width: '30%', pr: '2%' }}>일정 이름</ListItemText>
                                <Box sx={{ flex: 1 }}>
                                    <TextField
                                        fullWidth
                                        label="일정 이름"
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
                                        type="datetime-local" // date 형식으로 변경
                                        label="시작 일시"
                                        variant="outlined"
                                        name="skdStartDttm"
                                        // value에는 변환된 ISO 8601 형식으로 입력
                                        value={newScheduleData.skdStartDttm ? newScheduleData.skdStartDttm.replace(" ", "T") : ""}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0, display: 'flex', alignItems: 'center' }}>
                                <ListItemText sx={{ width: '30%', pr: '2%' }}>종료 일시</ListItemText>
                                <Box sx={{ flex: 1 }}>
                                    <TextField
                                        fullWidth
                                        type="datetime-local" // date 형식으로 변경
                                        label="종료 일시"
                                        variant="outlined"
                                        name="skdEndDttm"
                                        // value에는 변환된 ISO 8601 형식으로 입력
                                        value={newScheduleData.skdEndDttm ? newScheduleData.skdEndDttm.replace(" ", "T") : ""}
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
