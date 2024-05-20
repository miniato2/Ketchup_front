import { Box, Grid, Typography, Button, Dialog, TextField } from "@mui/material";
import { decodeJwt } from "../../utils/tokenUtils";
import { useState } from "react";
import { updateReserveAPI } from "../../apis/ReserveAPICalls";
import moment from "moment";

const token = decodeJwt(window.localStorage.getItem("accessToken"));
const reserver = token.memberName;

export default function ReserveDetail({ selectedReserve, closeDetailDialog }) {

    const [updateChecked, setUpdateChecked] = useState(false);
    const [updatedReserveData, setUpdatedReserveData] = useState({
        rsvNo: selectedReserve.rsvNo,
        reserver: reserver,
        rsvDescr: selectedReserve.rsvDescr,
        rsvStartDttm: moment(selectedReserve?.start).format("YYYY-MM-DD HH:mm"),
        rsvEndDttm: moment(selectedReserve?.end).format("YYYY-MM-DD HH:mm"),
        resources: selectedReserve.resources
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedReserveData({
            ...updatedReserveData,
            [name]: value
        });
    };

    const handleUpdateEvent = (selectedReserve, updatedReserveData) => {
        try {
            updateReserveAPI(selectedReserve, updatedReserveData);
            alert("예약 수정에 성공하였습니다. handleUpdateEvent 메소드 호출 완료");
        } catch (error) {
            console.error("예약 수정 중 에러 발생 handleUpdate: ", error);
            alert("예약 수정에 실패했습니다.");
        }
        closeDetailDialog();
    };

    // TODO LIST
    // handleDelete
    // onCloseConfirmDelete

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {selectedReserve && (
                        <Typography variant="h5">{selectedReserve.extendedProps.resources.rscName} 예약 상세 정보</Typography>
                    )}
                </Grid>
                {updateChecked ? (
                    <>
                        {/* 수정 폼 */}
                        <Grid item xs={6}>
                            <Typography variant="body1">예약 시작 일시: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" name="rsvStartDttm" onChange={handleInputChange} value={updatedReserveData.rsvStartDttm} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">예약 종료 일시: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" name="rsvEndDttm" onChange={handleInputChange} value={updatedReserveData.rsvEndDttm} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">사용목적: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" name="rsvDescr" onChange={handleInputChange} value={updatedReserveData.rsvDescr} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">예약자: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{updatedReserveData.reserver}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-end" spacing={1}>
                                <Grid item ml={'auto'}>
                                    <Button onClick={closeDetailDialog} variant="contained">닫기</Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleUpdateEvent} onClose={() => setUpdateChecked(false)} variant="contained" color="primary">수정</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <>
                        {/* 상세보기 폼 */}
                        <Grid item xs={6}>
                            <Typography variant="body1">예약일정: {moment(selectedReserve.start).format("YYYY-MM-DD HH:mm")}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1"> ~ {moment(selectedReserve.end).format("YYYY-MM-DD HH:mm")}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">사용목적: {selectedReserve.title}</Typography>
                            <Typography variant="body1">예약자: {updatedReserveData.reserver}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-end" spacing={1}>
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
        </Box >

    );
};