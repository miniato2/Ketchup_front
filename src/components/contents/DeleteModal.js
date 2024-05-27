import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import ButtonGroup from "./ButtonGroup";
import { callGetResourcesAPI } from "../../apis/ResourceAPICalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function DeleteModal({ onClose, onDelete, selectedItems, part }) {

    const handleCancel = () => {
        onClose();
    };

    const handleDelete = async () => {
        onDelete();
        onClose();
    };

    return (

        <Dialog open={true}>
            <Box p={6} justifyContent="flex-end" padding="40px" paddingBottom="20px">
                <Typography variant="body1">{selectedItems.length}개의 {part === 'conferences' ? "회의실" : "차량"}이 선택되었습니다.</Typography>
                <Typography variant="body1">예약 일정이 존재하는 {part === 'conferences' ? "회의실" : "차량"}이 있을 경우 모든 예약 일정이 삭제되며, 예약자에게 알람 메일이 전송됩니다.</Typography>
                <Typography variant="body1">정말 삭제하시겠습니까?</Typography>
                <br />

                <ButtonGroup
                    buttons={[
                        { label: '취소', styleClass: 'back', onClick: handleCancel },
                        { label: '삭제', styleClass: 'move', onClick: handleDelete }
                    ]}
                />
            </Box >
        </Dialog>

    );
}

export default DeleteModal;