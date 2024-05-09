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
            <Grid container spacing={10} justifyContent="center">
                <Grid item xs={5}>
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
                                        type="datetime-local"
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
                                        type="datetime-local"
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

        // <form onSubmit={(e) => { e.preventDefault(); handleSubmit(newScheduleData); }}>
        //     <div className="mb-3 row">
        //         <label htmlFor="skdNo" className="col-sm-2 col-form-label">일정 번호</label>
        //         <div className="col-sm-10">
        //             <input type="number" name="skdNo" className="form-control" id="skdNo" value={newScheduleData.skdNo} onChange={handleInputChange} />
        //         </div>
        //     </div>
        //     <div className="mb-3 row">
        //         <label htmlFor="dptNo" className="col-sm-2 col-form-label">부서 번호</label>
        //         <div className="col-sm-10">
        //             <input type="number" name="dptNo" className="form-control" id="dptNo" value={newScheduleData.dptNo} onChange={handleInputChange} />
        //         </div>
        //     </div>
        //     <div className="mb-3 row">
        //         <label htmlFor="skdName" className="col-sm-2 col-form-label">일정 이름</label>
        //         <div className="col-sm-10">
        //             <input type="text" name="skdName" className="form-control" id="skdName" value={newScheduleData.skdName} onChange={handleInputChange} />
        //         </div>
        //     </div>
        //     <div className="mb-3 row">
        //         <label htmlFor="skdStartDttm" className="col-sm-2 col-form-label">시작 일시</label>
        //         <div className="col-sm-10">
        //             <input type="datetime-local" name="skdStartDttm" className="form-control" id="skdStartDttm" value={newScheduleData.skdStartDttm ? newScheduleData.skdStartDttm.replace(" ", "T") : ""} onChange={handleInputChange} />
        //         </div>
        //     </div>
        //     <div className="mb-3 row">
        //         <label htmlFor="skdEndDttm" className="col-sm-2 col-form-label">종료 일시</label>
        //         <div className="col-sm-10">
        //             <input type="datetime-local" name="skdEndDttm" className="form-control" id="skdEndDttm" value={newScheduleData.skdEndDttm ? newScheduleData.skdEndDttm.replace(" ", "T") : ""} onChange={handleInputChange} />
        //         </div>
        //     </div>
        //     <div className="mb-3 row">
        //         <label htmlFor="skdLocation" className="col-sm-2 col-form-label">장소</label>
        //         <div className="col-sm-10">
        //             <input type="text" name="skdLocation" className="form-control" id="skdLocation" value={newScheduleData.skdLocation} onChange={handleInputChange} />
        //         </div>
        //     </div>
        //     <div className="mb-3 row">
        //         <label htmlFor="skdMemo" className="col-sm-2 col-form-label">메모</label>
        //         <div className="col-sm-10">
        //             <input type="text" name="skdMemo" className="form-control" id="skdMemo" value={newScheduleData.skdMemo} onChange={handleInputChange} />
        //         </div>
        //     </div>
        //     <Grid item xs={12}>
        //         <ButtonGroup>
        //             <Button color="error" onClick={onCloseDialogHandler}>취소</Button>
        //             <Button type="submit">등록</Button>
        //         </ButtonGroup>
        //     </Grid>
        // </form>
    );
}
