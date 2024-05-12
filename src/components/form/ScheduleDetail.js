import { Box, Grid, Typography, Button, Dialog, TextField } from "@mui/material";
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";

export default function ScheduleDetail({ handleInputChange, scheduleDetail, closeDetailDialog, handleUpdate, handleDelete }) {
    const [updateChecked, setUpdateChecked] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const handleConfirmDelete = async () => {
        try {
            await handleDelete(scheduleDetail);
            setConfirmDeleteOpen(false);
        } catch (error) {
            console.error("일정 삭제 중 에러 발생 handleDelete: ", error);
        }
    };

    const onCloseConfirmDelete = () => {
        setConfirmDeleteOpen(false);
    };

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
                            <TextField variant="outlined" name="skdStartDttm" onChange={handleInputChange} defaultValue={moment(scheduleDetail.start).format("YYYY-MM-DD HH:mm")} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">종료일시: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" name="skdEndDttm" onChange={handleInputChange} defaultValue={moment(scheduleDetail.end).format("YYYY-MM-DD HH:mm")} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">장소: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" name="skdLocation" onChange={handleInputChange} defaultValue={scheduleDetail.extendedProps.skdLocation} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">메모: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" name="skdMemo" onChange={handleInputChange} defaultValue={scheduleDetail.extendedProps.skdMemo} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-end" spacing={1}>
                                <Grid item>
                                    <Button onClick={() => setConfirmDeleteOpen(true)} variant="contained" color="error">삭제</Button>
                                </Grid>
                                <Grid item ml={'auto'}>
                                    <Button onClick={closeDetailDialog} variant="contained">닫기</Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleUpdate} onClose={() => setUpdateChecked(false)} variant="contained" color="primary">수정</Button>
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
                                    <Button onClick={() => setConfirmDeleteOpen(true)} variant="contained" color="error">삭제</Button>
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
                )}
            </Grid >

            <Dialog open={confirmDeleteOpen} onClose={onCloseConfirmDelete}>
                <Box p={2}>
                    <Typography variant="body1">한 번 삭제하면 다시 복구할 수 없습니다.</Typography>
                    <Typography variant="body1">정말로 삭제하시겠습니까?</Typography>
                </Box>
                <Box p={2} display="flex" justifyContent="flex-end">
                    <Button onClick={onCloseConfirmDelete} variant="outlined" color="primary">취소</Button>
                    <Button onClick={handleConfirmDelete} variant="contained" color="error" ml={1}>삭제</Button>
                </Box>
            </Dialog>
        </Box >
    );
};

