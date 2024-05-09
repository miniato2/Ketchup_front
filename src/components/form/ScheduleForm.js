import React from 'react';
import { Grid, TextField, Box, ButtonGroup, Button, ListItem, ListItemText } from "@mui/material";
import { Textbox } from 'react-inputs-validation';

export default function ScheduleForm({ newScheduleData, onInsertCancelHandler, handleSubmit, handleInputChange }) {
    // 날짜와 시간을 ISO 8601 형식으로 변환하는 함수
    const convertToISO8601 = (datetimeString) => {
        const date = new Date(datetimeString);
        return date.toISOString();
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(newScheduleData); }}>
            <Grid container spacing={4} justifyContent="left" ml={10}>
                <Grid item xs={6} md={8}>
                    <Box sx={{
                        '& .MuiTextField-root': { m: 1, width: '20ch' }
                    }}>
                        <ListItem sx={{ px: 0, flex: 1 }}>
                            <ListItemText sx={{ maxWidth: 100 }}>일정 번호</ListItemText>
                            <TextField
                                label="일정 번호"
                                variant="outlined"
                                name="skdNo"
                                value={newScheduleData.skdNo}
                                onChange={handleInputChange}
                            />
                            {/* <Textbox
                            attributesInput={{
                                id: 'skdNo',
                                name: 'skdNo',
                                type: 'number',
                                placeholder: '일정 번호를 입력해주세요.',
                            }}
                            value={newScheduleData.skdNo}
                            onChange={(name, e) => {handleInputChange()}}
                            onBlur={e=>{ }}
                            validationOption={{
                                name: '일정 번호',
                                check: true,
                                required: true,
                            }}
                            /> */}
                        </ListItem>
                        <ListItem sx={{ px: 0, flex: 1 }}>
                            <ListItemText sx={{ maxWidth: 100 }}>부서 번호</ListItemText>
                            <TextField
                                label="부서 번호"
                                variant="outlined"
                                name="dptNo"
                                value={newScheduleData.dptNo}
                                onChange={handleInputChange}
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0, flex: 1 }}>
                            <ListItemText sx={{ maxWidth: 100 }}>일정 이름</ListItemText>
                            <Box sx={{
                                '& .MuiTextField-root': { m: 1, width: '20ch' }
                            }}>
                                <TextField
                                    label="일정 이름"
                                    variant="outlined"
                                    name="skdName"
                                    value={newScheduleData.skdName}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </ListItem>
                        <ListItem sx={{ px: 0, flex: 1 }}>
                            <ListItemText sx={{ maxWidth: 100 }}>시작 일시</ListItemText>
                            <Box sx={{
                                '& .MuiTextField-root': { m: 1, width: '20ch' }
                            }}>
                                <TextField
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
                        <ListItem sx={{ px: 0, flex: 1 }}>
                            <ListItemText sx={{ maxWidth: 100 }}>종료 일시</ListItemText>
                            <Box sx={{
                                '& .MuiTextField-root': { m: 1, width: '20ch' }
                            }}>
                                <TextField
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
                        <ListItem sx={{ px: 0, flex: 1 }}>
                            <ListItemText sx={{ maxWidth: 100 }}>장소</ListItemText>
                            <Box sx={{
                                '& .MuiTextField-root': { m: 1, width: '20ch' }
                            }}>
                                <TextField
                                    label="장소"
                                    variant="outlined"
                                    name="skdLocation"
                                    value={newScheduleData.skdLocation}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </ListItem>
                        <ListItem sx={{ px: 0, flex: 1 }}>
                            <ListItemText sx={{ maxWidth: 100 }}>메모</ListItemText>
                            <Box sx={{
                                '& .MuiTextField-root': { m: 1, width: '20ch' }
                            }}>
                                <TextField
                                    label="메모"
                                    variant="outlined"
                                    name="skdMemo"
                                    value={newScheduleData.skdMemo}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </ListItem>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup>
                        <Button color="error" onClick={onInsertCancelHandler}>취소</Button>
                        <Button type="submit">등록</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </form>


    );
}
