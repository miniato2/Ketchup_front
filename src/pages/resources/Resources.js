import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callDeleteResourceAPI, callGetResourcesAPI } from "../../apis/ResourceAPICalls";
import ResourceList from "../../components/lists/resources/ResourceList";
import ButtonGroup from "../../components/contents/ButtonGroup";
import RscRegistModal from "../../components/items/resources/RscRegistModal";
import DeleteModal from "../../components/items/boards/DeleteModal";
import { Dialog } from "@mui/material";
import PaginationButtons from "../../components/contents/PaginationButtons";

function Resources() {
    const { part } = useParams();
    const result = useSelector(state => state.resourceReducer);
    const resourceList = result.resourcelist?.data;
    const dispatch = useDispatch();
    const [registModal, setRegistModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가

    console.log("💙💙💙💙💙💙💙");
    console.log(resourceList?.totalElements);

    useEffect(
        () => {
            dispatch(callGetResourcesAPI(part, currentPage));
        }, [dispatch, part, currentPage]
    );

    const buttons = [
        { label: "삭제", styleClass: "back", onClick: () => setDeleteModal(true) },
        { label: "등록", styleClass: "move", onClick: () => setRegistModal(true) }
    ];

    const rscDelete = async () => {
        await dispatch(callDeleteResourceAPI(selectedItems));
        setSelectedItems([]);
        await dispatch(callGetResourcesAPI(part, currentPage));
    };

    return (
        <>
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
                                list={resourceList?.content}
                                part={part}
                                selectedItems={selectedItems}
                                setSelectedItems={setSelectedItems} />
                            <PaginationButtons
                                totalItems={resourceList?.totalElements}
                                itemsPerPage={10}
                                currentPage={currentPage}
                                onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
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
                                selectedItems={selectedItems}
                                part={part}
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