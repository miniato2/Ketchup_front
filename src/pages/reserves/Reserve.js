import { Box, Button, Grid, Typography, Dialog, Snackbar, Alert, Table, TableCell, TableRow } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { getReserveAPI } from "../../apis/ReserveAPICalls";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import './Reserve.css';
import Scrolls from "../../components/scrolls/Scrolls";
import ResourceCategorySelect from "./ResourceCategorySelect";
import ReserveDateSelect from "./ReserveDateSelect";
import InsertReserveForm from "../../components/form/InsertReserveForm";
import ReserveDetail from "../../components/form/ReserveDetail";
import DeleteReserveForm from "../../components/form/DeleteReserveForm";

export default function Reserve() {
    const dispatch = useDispatch();
    const reserves = useSelector(state => state.reserveReducer);
    const [reserveData, setReserveData] = useState([]);
    const [showErrorAlertRscCategory, setShowErrorAlertRscCategory] = useState(false);
    const [showErrorAlertRsvDate, setShowErrorAlertRsvDate] = useState(false);
    const [searchClicked, setSearchClicked] = useState(false);
    const [searchConditions, setSearchConditions] = useState({
        rscCategory: "",
        rsvDate: ""
    });
    const [selectedReserve, setSelectedReserve] = useState(null);
    const [selectedResource, setSelectedResource] = useState({});
    const [insertReserveDialogOpen, setInsertReserveDialogOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("error");
    const vertical = 'top';
    const horizontal = 'right';
    const setSearchErrorAlert = (categoryError, dateError) => {
        setShowErrorAlertRscCategory(categoryError);
        setShowErrorAlertRsvDate(dateError);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const onDateClickHandler = (selectInfo, resource) => {
        setSelectedResource(resource);
        setInsertReserveDialogOpen(true);
    };

    const onInsertCancelHandler = () => { setInsertReserveDialogOpen(false) };
    const closeDetailDialog = () => { setDetailDialogOpen(false); };
    const onCloseDeleteConfirm = () => {
        setOpenDeleteConfirm(false);
        setDetailDialogOpen(false);
    };

    const onEventClickHandler = (selected) => {
        setSelectedReserve(selected.event);
        setDetailDialogOpen(true);
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setSearchConditions({
            ...searchConditions,
            [name]: value
        });
    };

    const convertToCalendarProps = (rsvList) => {
        if (!Array.isArray(rsvList) || rsvList.length === 0) {
            return [];
        }

        return rsvList.map(reserve => {
            try {
                const resources = reserve.resources || {};
                const { rscNo, rscCategory, rscName, rscInfo, rscCap, rscIsAvailable, rscDescr } = resources;

                return {
                    title: reserve.rsvDescr,
                    start: moment(reserve.rsvStartDttm, 'YYYY-MM-DD A h:mm').toDate(),
                    end: moment(reserve.rsvEndDttm, 'YYYY-MM-DD A h:mm').toDate(),
                    id: reserve.rsvNo,
                    extendedProps: {
                        rsvDescr: reserve.rsvDescr,
                        reserverId: reserve.reserverId,
                        reserverName: reserve.reserverName,
                        resources: {
                            rscNo: rscNo,
                            rscCategory: rscCategory,
                            rscName: rscName,
                            rscInfo: rscInfo,
                            rscCap: rscCap,
                            rscIsAvailable: rscIsAvailable,
                            rscDescr: rscDescr
                        }
                    }
                };
            } catch (error) {
                return null;
            }
        })
    };

    const fetchReserves = () => {
        try {
            const { rscCategory, rsvDate } = searchConditions;
            if (!rsvDate) {
                throw new Error("날짜를 입력해주세요.");
            }
            dispatch(getReserveAPI(rscCategory, rsvDate));
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            console.error(errorMessage);
        }
    };

    useEffect(() => {
        const convertedReserves = convertToCalendarProps(reserves);
        setReserveData(convertedReserves);
    }, [reserves]);

    const onClickSearch = () => {
        if (searchConditions.rscCategory === "" && searchConditions.rsvDate === "") {
            setSearchErrorAlert(true, true);
            setSnackbarMessage("자원 카테고리와 날짜를 선택해주세요.");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            return;
        } else if (searchConditions.rscCategory === "") {
            setSearchErrorAlert(true, false);
            setSnackbarMessage("자원 카테고리를 선택해주세요.");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            return;
        } else if (searchConditions.rsvDate === "") {
            setSearchErrorAlert(false, true);
            setSnackbarMessage("날짜를 선택해주세요.");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            return;
        }
        setSearchClicked(false);
        setSearchErrorAlert(false, false);
        setTimeout(() => {
            setSearchClicked(true);
        }, 0);
    };

    useEffect(() => {
        fetchReserves();
    }, [searchClicked]);

    const groupReservesByRsc = (reserveData) => {
        const groupedReserves = {};
        reserveData.forEach((reserve) => {
            const rscNo = reserve.extendedProps.resources.rscNo;
            if (!groupedReserves[rscNo]) {
                groupedReserves[rscNo] = [];
            }
            groupedReserves[rscNo].push(reserve);
        });
        return groupedReserves;
    };

    const showCalendars = () => {
        const groupedReserves = groupReservesByRsc(reserveData);
        const businessHours = {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '09:00',
            endTime: '19:00',
        };

        return (
            <Scrolls>
                {Object.entries(groupedReserves).map(([rscNo, reserveList]) => {
                    const resource = reserveList[0].extendedProps.resources;
                    let infoMeasurement = "";
                    let capMeasurement = "";
                    if (searchConditions.rscCategory === "회의실") {
                        infoMeasurement = "위치";
                        capMeasurement = "수용 가능 인원";
                    } else if (searchConditions.rscCategory === "차량") {
                        infoMeasurement = "차량 번호";
                        capMeasurement = "승차 정원";
                    }

                    return (
                        <Box key={rscNo}  >
                            <Typography textAlign="center" variant="h4">{resource.rscName}</Typography>
                            <Table>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontSize: '18px' }}>{infoMeasurement}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '18px' }}>{resource.rscInfo}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontSize: '18px' }}>{capMeasurement}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '18px' }}>{resource.rscCap}</TableCell>
                                </TableRow>
                            </Table>
                            <FullCalendar
                                locale="ko"
                                events={reserveList}
                                initialView="timeGridDay"
                                initialDate={searchConditions.rsvDate}
                                plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    interactionPlugin,
                                    listPlugin
                                ]}
                                height="50vh"
                                headerToolbar={false}
                                themeSystem='bootstrap'
                                selectable={true}
                                select={(selectInfo) => onDateClickHandler(selectInfo, resource)}
                                eventClick={onEventClickHandler}
                                businessHours={businessHours}
                                slotMinTime="08:00"
                            />
                        </Box>
                    );
                })}
            </Scrolls>
        );
    };

    return (
        <main id="main" className="main">
            <Box p={2}>
                <Grid container spacing={3} alignItems="center" mt={1} mb={4} sx={{ backgroundColor: "rgb(236, 11, 11, 0.17)", borderRadius: "10px", height: "230px" }}>
                    <Grid item xs={12}>
                        <h1 style={{ marginTop: 15 }}>자원예약</h1>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <ResourceCategorySelect value={searchConditions.rscCategory} onChange={(value) => setSearchConditions({ ...searchConditions, rscCategory: value })} />
                    </Grid>
                    <Grid item md={5} xs={10}>
                        <ReserveDateSelect value={searchConditions.rsvDate} onChange={(e) => setSearchConditions({ ...searchConditions, rsvDate: e.target.value })} />
                    </Grid>
                    <Grid item md="auto" xs="auto" >
                        <Button onClick={onClickSearch}>조회</Button>
                    </Grid>
                </Grid>
                {searchClicked ? (
                    <Grid container spacing={2}>
                        {showCalendars()}
                    </Grid>
                ) : (
                    <Box height={'480px'} display="flex" flexDirection="column" justifyContent="center" alignItems="center" margin={'auto'}>
                        <Typography fontSize={24} textAlign={'center'}>검색 조건을 입력하여 검색해주세요.</Typography>
                        <img src="/img/searchConditionRequired.png" alt="searchConditionRequired" style={{ display: "block", margin: "0 auto", maxWidth: "100%", height: "auto" }} />
                    </Box>
                )}
            </Box>

            {/* 유효성 검사 알림창 */}
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                style={{ marginTop: '45px' }}
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {/* 등록 폼 */}
            <Dialog open={insertReserveDialogOpen} onClose={onInsertCancelHandler} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: "10px" } }}>
                <InsertReserveForm
                    onInsertCancelHandler={onInsertCancelHandler}
                    selectedResource={selectedResource}
                    existingReserves={reserveData.filter(reserve => reserve.extendedProps.resources.rscNo === selectedResource.rscNo)}
                />
            </Dialog>

            {/* 상세조회 */}
            <Dialog open={detailDialogOpen} onClose={closeDetailDialog} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: "10px" } }}>
                <ReserveDetail
                    closeDetailDialog={closeDetailDialog}
                    selectedReserve={selectedReserve}
                    setOpenDeleteConfirm={setOpenDeleteConfirm}
                    existingReserves={reserveData.filter(reserve => reserve.extendedProps.resources.rscNo === selectedResource.rscNo)}
                />
            </Dialog>

            {/* 삭제 폼 */}
            <Dialog open={openDeleteConfirm} onClose={onCloseDeleteConfirm} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: "10px" } }}>
                <DeleteReserveForm
                    onCloseDeleteConfirm={onCloseDeleteConfirm}
                    selectedReserve={selectedReserve}
                />
            </Dialog>
        </main >
    );
};