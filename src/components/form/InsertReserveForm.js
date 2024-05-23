import { Button, Grid, Typography, Box, TextField, ListItem, ListItemText, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { insertReserveAPI } from "../../apis/ReserveAPICalls";
import moment from "moment";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const token = decodeJwt(window.localStorage.getItem("accessToken"));
const reserverId = token?.memberNo;
const reserverName = token?.memberName;

export default function InsertReserveForm({ onInsertCancelHandler, selectedResource, existingReserves }) {
    const [newReserveData, setNewReserveData] = useState({
        reserver: reserverId,
        rsvDescr: "",
        rsvStartDttm: "",
        rsvEndDttm: "",
        resources: {}
    });
    const [dateError, setDateError] = useState("");
    const [descrError, setDescrError] = useState("");
    const [touched, setTouched] = useState({
        rsvDescr: false,
        rsvStartDttm: false,
        rsvEndDttm: false
    });

    useEffect(() => {
        if (selectedResource) {
            setNewReserveData(prevData => ({
                ...prevData,
                resources: selectedResource
            }));
        }
    }, [selectedResource]);

    useEffect(() => {
        if (touched.rsvDescr || touched.rsvStartDttm || touched.rsvEndDttm) {
            validate();
        }
    }, [newReserveData, touched]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "rsvDescr" && value.length > 200) {
            setDescrError("사용목적은 최대 200자까지 입력할 수 있습니다.");
            return;
        }

        setNewReserveData({
            ...newReserveData,
            [name]: value
        });

        setTouched({
            ...touched,
            [name]: value
        });
    };

    const validate = () => {
        // 예약일시 유효성 검사
        const now = moment();
        const start = moment(newReserveData.rsvStartDttm);
        const end = moment(newReserveData.rsvEndDttm);

        if (!newReserveData.rsvStartDttm || !newReserveData.rsvEndDttm) {
            setDateError("예약 시작 일시와 종료 일시를 모두 입력해주세요.");
            return;
        }

        if (start.isBefore(now)) {
            setDateError("예약 시작일시는 과거일 수 없습니다.");
            return;
        }

        if (start.isSameOrAfter(end)) {
            setDateError("예약 시작일시는 종료일시보다 이전이어야 합니다.");
            return;
        }

        const hasConflict = existingReserves.some(reserve => {
            const rsvStart = moment(reserve.start);
            const rsvEnd = moment(reserve.end);
            return start.isBetween(rsvStart, rsvEnd, null, '[)') || end.isBetween(rsvStart, rsvEnd, null, '(]') || (start.isSameOrBefore(rsvStart) && end.isSameOrAfter(rsvEnd));
        });

        if (hasConflict) {
            setDateError("선택하신 시간에 이미 예약이 등록된 예약건이 있습니다. 다른 시간이나 다른 자원을 선택해주세요.");
            return;
        }

        if (newReserveData.rsvDescr.length < 5) {
            setDescrError("사용목적은 공란일 수 없고 공백 포함 최소 5글자 이상이어야 합니다.");
            return;
        }

        if (newReserveData.rsvDescr.length > 200) {
            setDescrError("사용목적은 공백 포함 최대 200자까지 입력할 수 있습니다.");
            return;
        }

        setDateError("");
        setDescrError("");
    };

    const handleSubmit = () => {
        validate();
        if (dateError || descrError) {
            return;
        }

        try {
            insertReserveAPI(newReserveData);
            alert("예약이 정상적으로 등록되었습니다.");
        } catch (error) {
            console.error("예약 등록 실패: ", error);
            alert("예약 등록에 실패했습니다. 관리자에게 문의바랍니다.");
        }
        onInsertCancelHandler();
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <DialogContent style={{ height: '56vh', alignContent: "center" }}>
                <Box p={3}>
                    {/* <Grid container spacing={2} justifyContent="left" > */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} mb={4}>
                            <Typography variant='h5'>{newReserveData.resources.rscName} 예약 등록</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems={"center"} justifyContent={"flex-start"}>
                                <Box display={"flex"} alignItems={"center"}>
                                    <CalendarMonthOutlined fontSize="medium" />
                                    <Typography variant="body1" sx={{ ml: 1 }}>예약 일정: </Typography>
                                    <TextField sx={{ ml: 2 }} type="datetime-local" variant="outlined" name="rsvStartDttm" onChange={handleInputChange} value={newReserveData.rsvStartDttm} onBlur={() => setTouched({ ...touched, rsvStartDttm: true })} />
                                    <span style={{ margin: '0 20px' }}>~</span>
                                    <TextField type="datetime-local" variant="outlined" name="rsvEndDttm" onChange={handleInputChange} value={newReserveData.rsvEndDttm} onBlur={() => setTouched({ ...touched, rsvEndDttm: true })} />
                                </Box>
                            </Box>
                            {dateError && <Typography sx={{ color: "red", ml: 15, mt: 1 }}>{dateError}</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                <Box display="flex" alignItems="center">
                                    <ArticleOutlinedIcon fontSize="medium" />
                                    <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>사용목적:</Typography>
                                </Box>
                                <TextField sx={{ ml: 2.5, width: '555px' }} multiline variant="outlined" name="rsvDescr" onChange={handleInputChange} value={newReserveData.rsvDescr} placeholder="사용목적을 작성해주세요. (공란 불가, 공백 포함 최소 5글자, 최대 200자)" onBlur={() => setTouched({ ...touched, rsvDescr: true })} />
                            </Box>
                            {descrError && <Typography sx={{ color: "red", ml: 15, mt: 1 }}>{descrError}</Typography>}
                        </Grid>
                        <Grid item={12}>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"flex-start"}>
                                <Box display="flex" alignItems={"center"}>
                                    <PersonOutlinedIcon fontSize="medium" />
                                    <Typography variant="body1" sx={{ ml: 1 }}>예약자: </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ ml: 3.7 }}>{reserverName}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-end" spacing={1}>
                                <Grid item ml={'auto'}>
                                    <Button onClick={onInsertCancelHandler} variant="contained" color="error">취소</Button>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" color="primary">등록</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </form>
    );
}