import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callGetResourcesAPI } from "../../apis/ResourceAPICalls";
import ResourceList from "../../components/lists/resources/ResourceList";
import ButtonGroup from "../../components/contents/ButtonGroup";
import RscRegistModal from "../../components/items/resources/RscRegistModal";

function Resources() {
    const { part } = useParams();
    const result = useSelector(state => state.resourceReducer);
    const resourceList = result.resourcelist || [];
    const dispatch = useDispatch();
    const [registModal, setRegistModal] = useState(false);

    useEffect(
        () => {
            dispatch(callGetResourcesAPI(part));
        }, [part]
    );

    const buttonClick = (label) => {
        if (label == "등록") {
            setRegistModal(true);
        }
    }

    const buttons = [
        { label: "삭제", styleClass: "back" },
        { label: "등록", styleClass: "move", onClick: () => buttonClick("등록") }
    ]

    return (
        <>
            {registModal ? <RscRegistModal setRegistModal={setRegistModal} part={part} /> : null} 
            <main id="main" className="main">
                <div className="title">
                    <h2>자원 관리</h2>
                    {part === 'conferences' ? <h5>회의실 관리</h5> : <h5>차량 관리</h5>}
                </div>
                <div>
                    <ButtonGroup buttons={buttons} />
                </div>
                <div>
                    <ResourceList list={resourceList} part={part} />
                </div>
            </main>
        </>
    );
}

export default Resources;