import { Box, Grid, Typography, Button, Alert, TextField } from "@mui/material";
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import { Person } from "@mui/icons-material";

export default function ScheduleDetail({ handleInputChange, scheduleDetail, closeDetailDialog, handleUpdate, handleDelete }) {
    const [updateChecked, setUpdateChecked] = useState(false);
    const onDelete = () => { handleDelete(scheduleDetail); setUpdateChecked(false); };
    const onUpdate = () => { handleUpdate(scheduleDetail) };

    if (!scheduleDetail) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {scheduleDetail && (
                        <Typography variant="h5">{scheduleDetail.title}</Typography>
                    )}
                </Grid>
                {updateChecked ? (
                        <>
                            <Grid item xs={6}>
                                <Typography variant="body1">시작일시: </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant="outlined" name="skdStartDttm" onChange={handleInputChange} value={moment(scheduleDetail.start).format("YYYY-MM-DD HH:mm")} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">종료일시: </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant="outlined" name="skdEndDttm" onChange={handleInputChange} value={moment(scheduleDetail.end).format("YYYY-MM-DD HH:mm")} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">장소: </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant="outlined" name="skdLocation" onChange={handleInputChange} value={scheduleDetail.extendedProps.skdLocation} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">메모: </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant="outlined" name="skdMemo" onChange={handleInputChange} value={scheduleDetail.extendedProps.skdMemo} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justifyContent="flex-end" spacing={1}>
                                    <Grid item>
                                        {/* <Button onClick={온클릭하면 바로 컨펌창을 틀어라} variant="contained" color="error">삭제</Button> */}
                                    </Grid>
                                    <Grid item ml={'auto'}>
                                        <Button onClick={closeDetailDialog} variant="contained">닫기</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={() => setUpdateChecked(true)} onClose={() => setUpdateChecked(false)} variant="contained" color="primary">수정</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item xs={6}>
                                <Typography variant="body1">시작일시: {moment(scheduleDetail.start).format("YYYY-MM-DD HH:mm")}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">종료일시: {moment(scheduleDetail.end).format("YYYY-MM-DD HH:mm")}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">장소: {scheduleDetail.extendedProps.skdLocation}</Typography>
                                <Typography variant="body1">메모: {scheduleDetail.extendedProps.skdMemo}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justifyContent="flex-end" spacing={1}>
                                    <Grid item>
                                        {/* <Button onClick={온클릭하면 바로 컨펌창을 틀어라} variant="contained" color="error">삭제</Button> */}
                                    </Grid>
                                    <Grid item ml={'auto'}>
                                        <Button onClick={closeDetailDialog} variant="contained">닫기</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={() => setUpdateChecked(true)} onClose={() => setUpdateChecked(false)} variant="contained" color="primary">수정</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    )
                }

                {/* 보험용으로 가지고 있는거임 */}
                {/* <Grid item xs={12}>
                        <Grid container justifyContent="flex-end" spacing={1}>
                            <Grid item>
                                <Button onClick={onDelete} variant="contained" color="error">삭제</Button>
                            </Grid>
                            <Grid item ml={'auto'}>
                                <Button onClick={closeDetailDialog} variant="contained">닫기</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={onUpdate} variant="contained" color="primary">수정</Button>
                            </Grid>
                        </Grid>
                    </Grid> */}

            </Grid >
        </Box >
    );
};

