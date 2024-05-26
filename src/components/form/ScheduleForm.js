import React from 'react';
import { Grid, TextField, Box, Button, ListItem, ListItemText, Typography, DialogContent } from "@mui/material";
import CampaignIconOutlined from '@mui/icons-material/CampaignOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import ButtonGroup from '../contents/ButtonGroup';

export default function ScheduleForm({ newScheduleData, onInsertCancelHandler, handleSubmit, handleInputChange, skdNameError, setTouched, dateError, touched }) {
    const buttons = [
        { label: '취소', onClick: onInsertCancelHandler, styleClass: 'back' },
        { label: '등록', onClick: () => handleSubmit(newScheduleData), styleClass: 'move' }
    ];

    return (
        <DialogContent style={{ height: '58vh', alignContent: "center" }}>
            <Box p={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display={"flex"} alignItems={"center"} justifyContent={'flex-start'}>
                            <Box display={"flex"} alignItems={"center"}>
                                <CampaignIconOutlined fontSize='medium' />
                                <Typography variant='body1' sx={{ ml: 1 }} flexShrink={0}>일정 제목: </Typography>
                            </Box>
                            <TextField sx={{ ml: 1.7, width: "50vw" }} variant='outlined' name='skdName' onChange={handleInputChange} value={newScheduleData.skdName} onBlur={() => setTouched({ ...touched, skdName: true })} />
                        </Box>
                        {skdNameError && <Typography sx={{ color: "red", ml: 15, mt: 1 }}>{skdNameError}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems={"center"} justifyContent={"flex-start"}>
                            <Box display={"flex"} alignItems={"center"}>
                                <CalendarMonthOutlined fontSize="medium" />
                                <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정: </Typography>
                                <TextField sx={{ ml: 5.5, width: "23vw" }} type="datetime-local" variant="outlined" name="skdStartDttm" onChange={handleInputChange} value={newScheduleData.skdStartDttm} onBlur={() => setTouched({ ...touched, skdStartDttm: true })} />
                                <span style={{ margin: '0 20px' }}>~</span>
                                <TextField sx={{ width: "23vw" }} type="datetime-local" variant="outlined" name="skdEndDttm" onChange={handleInputChange} value={newScheduleData.skdEndDttm} onBlur={() => setTouched({ ...touched, skdEndDttm: true })} />
                            </Box>
                        </Box>
                        {dateError && <Typography sx={{ color: "red", ml: 15, mt: 1 }}>{dateError}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                            <Box display="flex" alignItems="center">
                                <LocationOnOutlined fontSize="medium" />
                                <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>장소:</Typography>
                            </Box>
                            <TextField sx={{ ml: 5.5, width: '50vw' }} variant="outlined" name="skdLocation" onChange={handleInputChange} value={newScheduleData.skdLocation} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                            <Box display="flex" alignItems="center">
                                <ArticleOutlinedIcon fontSize="medium" />
                                <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>메모:</Typography>
                            </Box>
                            <TextField sx={{ ml: 5.5, width: '50vw' }} multiline variant="outlined" name="skdMemo" onChange={handleInputChange} value={newScheduleData.skdMemo} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box justifyContent={'flex-end'}>
                            <Box>
                                <ButtonGroup buttons={buttons} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </DialogContent>
    );
}