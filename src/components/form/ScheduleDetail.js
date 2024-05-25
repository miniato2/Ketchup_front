import { Box, Grid, Typography, Button, Dialog, TextField, DialogContent, DialogTitle } from "@mui/material";
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import CampaignIconOutlined from '@mui/icons-material/CampaignOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'

export default function ScheduleDetail({ inputChangeHandler, scheduleDetail, closeDetailDialog, handleUpdate, handleDelete, skdNameError, dateError, touched, setTouched, validateUpdate }) {
    const [updateChecked, setUpdateChecked] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [updatedScheduleData, setUpdatedScheduleData] = useState({
        skdName: scheduleDetail?.title,
        skdStartDttm: moment(scheduleDetail?.start).format("YYYY-MM-DD HH:mm"),
        skdEndDttm: moment(scheduleDetail?.end).format("YYYY-MM-DD HH:mm"),
        skdLocation: scheduleDetail?.extendedProps.skdLocation,
        skdMemo: scheduleDetail?.extendedProps.skdMemo
    });

    useEffect(() => {
        if (scheduleDetail) {
            setUpdatedScheduleData({
                skdName: scheduleDetail.title,
                skdStartDttm: moment(scheduleDetail.start).format("YYYY-MM-DD HH:mm"),
                skdEndDttm: moment(scheduleDetail.end).format("YYYY-MM-DD HH:mm"),
                skdLocation: scheduleDetail.extendedProps.skdLocation,
                skdMemo: scheduleDetail.extendedProps.skdMemo
            });
        }

        // if (touched.skdName || touched.skdStartDttm || touched.skdEndDttm) {
        //     validateUpdate();
        // }
    }, [
        // updatedScheduleData,
        scheduleDetail
    ]);

    const handleConfirmDelete = () => {
        try {
            handleDelete(scheduleDetail);
            closeDetailDialog();
            setConfirmDeleteOpen(false);
        } catch (error) {
            console.error("일정 삭제 중 에러 발생 handleDelete: ", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUpdatedScheduleData({
            ...updatedScheduleData,
            [name]: value
        });

        setTouched({
            ...touched,
            [name]: value
        });
    };

    const handleAction = () => {
        try {
            handleUpdate(scheduleDetail, updatedScheduleData);
        } catch (error) {
            console.error("일정 수정 중 에러 발생 handleUpdate: ", error);
            alert("일정 수정에 실패했습니다.");
        }
        closeDetailDialog();
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
        <>
            {updateChecked ? (
                <>
                    <DialogTitle variant="h4" ml={3} mt={3}>일정 수정</DialogTitle>
                    <DialogContent style={{ height: '58vh', alignContent: 'center' }}>
                        <Box p={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box display={'flex'} alignItems={"center"} justifyContent={'flex-start'}>
                                        <Box display={'flex'} alignItems={'center'}>
                                            <CampaignIconOutlined fontSize='medium' />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정 제목: </Typography>
                                        </Box>
                                        <TextField sx={{ ml: 2.5, width: "50vw" }} variant="outlined" name="skdName" onChange={handleInputChange} value={updatedScheduleData.skdName} />
                                    </Box>
                                    {/* {skdNameError && <Typography sx={{ color: "red", ml: 15, mt: 1 }}>{skdNameError}</Typography>} */}
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={"center"} justifyContent={"flex-start"}>
                                        <Box display={"flex"} alignItems={"center"}>
                                            <CalendarMonthOutlined fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정: </Typography>
                                            <TextField sx={{ ml: 6.1, width: "23vw" }} type="datetime-local" variant="outlined" name="skdStartDttm" onChange={handleInputChange} value={updatedScheduleData.skdStartDttm} />
                                            <span style={{ margin: '0 15px' }}>~</span>
                                            <TextField sx={{ width: "23vw" }} type="datetime-local" variant="outlined" name="skdEndDttm" onChange={handleInputChange} value={updatedScheduleData.skdEndDttm} />
                                        </Box>
                                    </Box>
                                    {/* {dateError && <Typography sx={{ color: "red", ml: 15, mt: 1 }}>{dateError}</Typography>} */}
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                        <Box display="flex" alignItems="center">
                                            <LocationOnOutlined fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>장소:</Typography>
                                        </Box>
                                        <TextField sx={{ ml: 6.3, width: '50vw' }} variant="outlined" name="skdLocation" onChange={handleInputChange} value={updatedScheduleData.skdLocation} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                        <Box display="flex" alignItems="center">
                                            <ArticleOutlinedIcon fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>메모:</Typography>
                                        </Box>
                                        <TextField sx={{ ml: 6.3, width: '50vw' }} multiline variant="outlined" name="skdMemo" onChange={handleInputChange} value={updatedScheduleData.skdMemo} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="flex-end" spacing={1}>
                                        <Grid item ml={'auto'}>
                                            <button onClick={closeDetailDialog} className="back-btn">취소</button>
                                        </Grid>
                                        <Grid item>
                                            <button onClick={handleAction} onClose={() => setUpdateChecked(false)} className="grey-btn">저장</button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                </>
            ) : (
                <>
                    <DialogTitle variant="h4" ml={3} mt={3}>일정 상세</DialogTitle>
                    <DialogContent style={{ height: '38vh', alignContent: 'center' }}>
                        <Box p={3}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <Box display={'flex'} alignItems={"center"} justifyContent={'flex-start'}>
                                        <Box display={'flex'} alignItems={'center'}>
                                            <CampaignIconOutlined fontSize='medium' />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정 제목: </Typography>
                                            <Typography sx={{ ml: 2 }} variant="body1">{scheduleDetail.title}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display={'flex'} alignItems={"center"} justifyContent={'flex-start'}>
                                        <Box display={"flex"} alignItems={"center"}>
                                            <CalendarMonthOutlined fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정: </Typography>
                                            <Typography sx={{ ml: 6 }} variant="body1">{moment(scheduleDetail.start).format("YYYY-MM-DD HH:mm")}</Typography>
                                            <span style={{ margin: '0 20px' }}>~</span>
                                            <Typography variant="body1">{moment(scheduleDetail.end).format("YYYY-MM-DD HH:mm")}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                        <Box display="flex" alignItems="center">
                                            <LocationOnOutlined fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>장소:</Typography>
                                            <Typography sx={{ ml: 6 }} variant="body1">{scheduleDetail.extendedProps.skdLocation}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                        <Box display="flex" alignItems="center">
                                            <ArticleOutlinedIcon fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>메모:</Typography>
                                            <Typography sx={{ ml: 6 }} variant="body1">{scheduleDetail.extendedProps.skdMemo}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <button onClick={() => setConfirmDeleteOpen(true)} className="move-btn">삭제</button>
                                        </Grid>
                                        <Grid item ml={'auto'}>
                                            <button style={{ marginRight: "15px" }} onClick={() => setUpdateChecked(true)} onClose={() => setUpdateChecked(false)} className="grey-btn">수정</button>
                                        </Grid>
                                        <Grid>
                                            <button onClick={closeDetailDialog} className="back-btn">닫기</button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Dialog open={confirmDeleteOpen} onClose={onCloseConfirmDelete} fullWidth scroll="paper" sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }} PaperProps={{ sx: { mt: 0, borderRadius: "10px" } }}>
                                <Box p={2}>
                                    <Typography variant="body1">한 번 삭제하면 다시 복구할 수 없습니다.</Typography>
                                    <Typography variant="body1">정말로 삭제하시겠습니까?</Typography>
                                </Box>
                                <Box p={2} display="flex" justifyContent="flex-end">
                                    <button onClick={onCloseConfirmDelete} className="back-btn">취소</button>
                                    <button onClick={handleConfirmDelete} className="move-btn">삭제</button>
                                </Box>
                            </Dialog>
                        </Box>
                    </DialogContent>
                </>
            )}
        </>
    );
};