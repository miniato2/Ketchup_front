import ButtonGroup from "../contents/ButtonGroup";

function UpdateResourceForm({setUpdateClick}) {
    const buttonClick = (label) => {
        if(label == "저장") {
            console.log("dslfjeoifnwofnwlf");
        }else if(label == "취소") {
            setUpdateClick(false);
        }
    };

    const updateButtons = [
        {label: "취소", styleClass: "back", onClick: () => buttonClick("취소")},
        {label: "저장", styleClass: "move", onClick: () => buttonClick("저장")}
    ];

    return (
        <>
            <div className="modal-content">
                모달 수정
            </div>
            <ButtonGroup buttons={updateButtons} />
        </>
    );
}

export default UpdateResourceForm;