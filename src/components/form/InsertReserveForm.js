import { Button, Grid, Typography, Box, TextField, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { insertReserveAPI } from "../../apis/ReserveAPICalls";


const token = decodeJwt(window.localStorage.getItem("accessToken"));
const reserver = token.memberName;

export default function InsertReserveForm({ onInsertCancelHandler }) {

    const [newReserveData, setNewReserveData] = useState({
        rsvNo: "",
        reserver: "",
        rsvDescr: "",
        rsvStartDttm: "",
        rsvEndDttm: "",
        resources: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReserveData({
            ...newReserveData,
            [name]: value
        });
    };

    const handleSubmit = (newReserveData) => {
        try {
            insertReserveAPI(newReserveData);
            alert("예약이 정상적으로 등록되었습니다.");
        } catch (error) {
            console.error("예약 정보 등록하면서 오류가 발생했습니다 :", error);
            alert("예약 등록에 실패하였습니다.");
        }
        onInsertCancelHandler();
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(newReserveData); }}>
            <Grid container spacing={4} justifyContent="left" ml={10}>
                <Grid item xs={6} md={8}>
                    <Box sx={{
                        '& .MuiTextField-root': { m: 1, width: '20ch' }
                    }}>
                        <ListItem sx={{ px: 0, flex: 1 }}>
                            <ListItemText sx={{ maxWidth: 100 }}>예약 시작 일시</ListItemText>
                            <Box sx={{
                                '& .MuiTextField-root': { m: 1, width: '20ch' }
                            }}>
                                <TextField
                                    type="datetime-local"
                                    label="예약 시작 일시"
                                    variant="outlined"
                                    name="rsvStartDttm"
                                    // value에는 변환된 ISO 8601 형식으로 입력
                                    value={newReserveData.rsvStartDttm ? newReserveData.rsvStartDttm : ""}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </ListItem>
                        <ListItem sx={{ px: 0, flex: 1 }}>
                            <ListItemText sx={{ maxWidth: 100 }}>예약 종료 일시</ListItemText>
                            <Box sx={{
                                '& .MuiTextField-root': { m: 1, width: '20ch' }
                            }}>
                                <TextField
                                    type="datetime-local"
                                    label="예약 종료 일시"
                                    variant="outlined"
                                    name="rsvEndDttm"
                                    // value에는 변환된 ISO 8601 형식으로 입력
                                    value={newReserveData.rsvEndDttm ? newReserveData.rsvEndDttm : ""}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </ListItem>
                        <ListItem sx={{ px: 0, flex: 1 }}>
                            <ListItemText sx={{ maxWidth: 100 }}>사용목적</ListItemText>
                            <Box sx={{
                                '& .MuiTextField-root': { m: 1, width: '20ch' }
                            }}>
                                <TextField
                                    label="사용목적"
                                    variant="outlined"
                                    name="rsvDescr"
                                    value={newReserveData.rsvDescr}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </ListItem>
                        <ListItem sx={{ px: 0, flex: 1 }}>
                            <ListItemText sx={{ maxWidth: 100 }}>예약자</ListItemText>
                            <Box sx={{
                                '& .MuiTextField-root': { m: 1, width: '20ch' }
                            }}>
                                <Typography variant="body1" value={reserver}>{reserver}</Typography>
                            </Box>
                        </ListItem>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button color="error" onClick={onInsertCancelHandler}>취소</Button>
                    <Button type="submit">등록</Button>
                </Grid>
            </Grid>
        </form>
    );
}