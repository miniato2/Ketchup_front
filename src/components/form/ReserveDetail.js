import { Box, Grid, Typography, Button, Dialog, TextField } from "@mui/material";
import { decodeJwt } from "../../utils/tokenUtils";
import { useState, useEffect } from "react";
import { updateReserveAPI } from "../../apis/ReserveAPICalls";
import moment from "moment";

const token = decodeJwt(window.localStorage.getItem("accessToken"));
const reserver = token?.memberName;

export default function ReserveDetail({ selectedReserve, closeDetailDialog, setOpenDeleteConfirm }) {
    const [updateChecked, setUpdateChecked] = useState(false);
    const [updatedReserveData, setUpdatedReserveData] = useState({
        rsvNo: selectedReserve.rsvNo,
        reserver: reserver,
        rsvDescr: selectedReserve.rsvDescr,
        rsvStartDttm: moment(selectedReserve.start).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        rsvEndDttm: moment(selectedReserve.end).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        resources: selectedReserve.extendedProps.resources
    });

    const reserveNo = selectedReserve.id;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedReserveData({
            ...updatedReserveData,
            [name]: value
        });
    };

    const handleUpdateEvent = () => {
        try {
            updateReserveAPI(reserveNo, updatedReserveData);
            alert("예약 수정에 성공하였습니다.");
        } catch (error) {
            console.error("예약 수정 중 에러 발생 handleUpdate: ", error);
            alert("예약 수정에 실패했습니다.");
        }
        closeDetailDialog();
    };

    // TODO LIST. 추후에 업데이트해야함. 예약자의 아이디와 사용자의 아이디의 일치여부 판별 필요함.
    const isReserver = () => {
        return reserver === updatedReserveData.reserver;
    };

    useEffect(() => {
        setUpdatedReserveData({
            rsvNo: selectedReserve.rsvNo,
            reserver: reserver,
            rsvDescr: selectedReserve.title,
            rsvStartDttm: moment(selectedReserve.start).format("YYYY-MM-DDTHH:mm"),
            rsvEndDttm: moment(selectedReserve.end).format("YYYY-MM-DDTHH:mm"),
            resources: selectedReserve.extendedProps.resources
        });
    }, [selectedReserve]);

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                {updateChecked ? (
                    <>
                        {/* 수정 폼 */}
                        <Grid item xs={12}>
                            <Typography variant="h5">{selectedReserve.extendedProps.resources.rscName} 예약 수정</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">예약 시작 일시: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="datetime-local" variant="outlined" name="rsvStartDttm" onChange={handleInputChange} defaultValue={updatedReserveData.rsvStartDttm} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">예약 종료 일시: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="datetime-local" variant="outlined" name="rsvEndDttm" onChange={handleInputChange} defaultValue={updatedReserveData.rsvEndDttm} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">사용목적: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" name="rsvDescr" onChange={handleInputChange} defaultValue={updatedReserveData.rsvDescr} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">예약자: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{selectedReserve.extendedProps.reserver}</Typography>
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
                        <Grid item xs={12}>
                            <Typography variant="h5">{selectedReserve.extendedProps.resources.rscName} 예약 상세 정보</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">예약일정: {moment(selectedReserve.start).format("YYYY-MM-DD HH:mm")}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1"> ~ {moment(selectedReserve.end).format("YYYY-MM-DD HH:mm")}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">사용목적: {selectedReserve.title}</Typography>
                            <Typography variant="body1">예약자: {selectedReserve.extendedProps.reserver}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-end" spacing={1}>
                                {isReserver() ? (
                                    <>
                                        <Grid item>
                                            <Button onClick={() => setUpdateChecked(true)} variant="contained" color="primary">수정</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={() => setOpenDeleteConfirm(true)} variant="contained" color="error">삭제</Button>
                                        </Grid>
                                    </>
                                ) : null}
                                <Grid item ml={'auto'}>
                                    <Button onClick={closeDetailDialog} variant="contained">닫기</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid >
        </Box >
    );
};