import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Calendar from "../schedules/calendar";
import { getReserveAPI } from "../../apis/ReserveAPICalls";
import { useState, useEffect } from "react";

export default function Reserve() {
    const [searchClicked, setSearchClicked] = useState(false);
    const [searchConditions, setSearchConditions] = useState({
        rscCategory: "",
        rsvDate: ""
    });
    const [reserveData, setReserveData] = useState([]);

    useEffect(() => {
        console.log("reserveData useEffect를 통해서 확인해봄", reserveData);
    }, [reserveData]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setSearchConditions({
            ...searchConditions,
            [name]: value
        });
    };

    const onClickSearch = () => {
        fetchReserves();
        setSearchClicked(true);
    };

    function parseCustomDateTime(dateTimeStr) {
        const datePattern = /(\d{4})-(\d{2})-(\d{2})/;
        const timePattern = /(\d{1,2})시 (\d{2})분/;
        const amPmMatch = dateTimeStr.match(/(오전|오후)/);
        let [dateMatch, year, month, day] = dateTimeStr.match(datePattern);
        let [timeMatch, hour, minute] = dateTimeStr.match(timePattern);
      
        if (amPmMatch[1] === "오후" && hour !== "12") {
          hour = parseInt(hour) + 12; // Convert to 24-hour format for PM
        }
      
        return new Date(year, month - 1, day, hour, minute); // Months are 0-based, so subtract 1
      }
      

    async function fetchReserves() {
        try {
            const { rscCategory, rsvDate } = searchConditions;
            const response = await getReserveAPI(rscCategory, rsvDate);
            const data = await response.json();
    
            const reservesWithParsedDates = data.results.reserve.map(reserve => ({
                ...reserve,
                rsvStartDttm: parseCustomDateTime(reserve.rsvStartDttm),
                rsvEndDttm: parseCustomDateTime(reserve.rsvEndDttm),
            }));
    
            setReserveData(reservesWithParsedDates);
        } catch (error) {
            console.error('fetchReserves 함수 도중 에러 발생:', error);
        }
    }

    return (
        <main id="main" className="main">
            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid>
                        <h1>자원예약</h1>
                        <Grid item xs={5}>
                            <TextField variant="outlined" name="rscCategory" type="text" onChange={onInputChange} />
                            <TextField variant="outlined" name="rsvDate" type="date" onChange={onInputChange} />
                        </Grid>
                        <Button onClick={onClickSearch}>조회</Button>
                    </Grid>
                </Grid>

                {searchClicked ? (
                    <Grid>
                        {reserveData ? reserveData.map((reserves, index) => (
                            <Calendar
                                key={index}
                                reserves={reserves}
                                height="50vh"
                                initialView="dayGridDay"
                            />
                        )) : <Typography>조회된 예약 정보가 없습니다.</Typography>}
                    </Grid>
                ) : (
                    <Grid>
                        <Typography>검색 조건을 입력하여 검색해주세요.</Typography>
                    </Grid>
                )}
            </Box>
        </main>
    );
};