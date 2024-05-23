import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callDeleteResourceAPI, callGetResourcesAPI } from "../../apis/ResourceAPICalls";
import ResourceList from "../../components/lists/resources/ResourceList";
import ButtonGroup from "../../components/contents/ButtonGroup";
import RscRegistModal from "../../components/items/resources/RscRegistModal";
import DeleteModal from "../../components/items/boards/DeleteModal";
import { Dialog } from "@mui/material";

function Resources() {
    const { part } = useParams();
    const result = useSelector(state => state.resourceReducer);
    const resourceList = result.resourcelist;
    const dispatch = useDispatch();
    const [registModal, setRegistModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);

    console.log("💙💙💙💙💙💙💙");
    console.log(resourceList);

    useEffect(
        () => {
            dispatch(callGetResourcesAPI(part));
        }, [dispatch, part]
    );

    const buttons = [
        { label: "삭제", styleClass: "back", onClick: () => setDeleteModal(true) },
        { label: "등록", styleClass: "move", onClick: () => setRegistModal(true) }
    ];

    // const buttonClick = (label) => {
    //     if (label == "등록") {
    //         setRegistModal(true);
    //     } else if (label == "삭제") {
    //         rscDelete();
    //         // setDeleteModal(false);
    //     }
    // };

    const rscDelete = async () => {
        dispatch(callDeleteResourceAPI(selectedItems));
        console.log("선택된 항목을 삭제합니다:", selectedItems);
        setSelectedItems([]);
    };

    return (
        <>
            {/* {registModal && <RscRegistModal setRegistModal={setRegistModal} part={part} /> } */}
            <main id="main" className="main">
                <div className="title">
                    {part === 'conferences' ? <h2>회의실</h2> : <h2>차량</h2>}
                </div>
                {!Array.isArray(resourceList) && resourceList === 0 ? (
                    <div>
                        <h5 className="text-center my-5">자원 관리 권한이 없습니다.</h5>
                    </div>
                ) : (
                    <>
                        <div>
                            <ButtonGroup buttons={buttons} />
                        </div>
                        <div>
                            <ResourceList
                                list={resourceList}
                                part={part}
                                selectedItems={selectedItems}
                                setSelectedItems={setSelectedItems} />
                        </div>

                        <Dialog open={registModal} onClose={() => setRegistModal(false)}>
                            <RscRegistModal
                                setRegistModal={setRegistModal}
                                part={part}
                            />
                        </Dialog>

                        <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
                            <DeleteModal
                                onClose={setDeleteModal}
                                onDelete={rscDelete}
                            />
                        </Dialog>
                    </>
                )
                }
            </main>
        </>
    );
}

export default Resources;