import AppCatCss from './AppCategory.module.css';

function AppCategory({category, setCategory}){
    const approvalData = [
        { title: "진행중인 문서", count: 3, categoryNo: 1},
        { title: "완료된 문서", count: 5, categoryNo: 2},
        { title: "결재 대기 문서", count: 10, categoryNo: 3},
        { title: "수신 참조 문서", count: 2, categoryNo: 4}
    ];


    const onClickHandler = (categoryNo) => {
        setCategory(categoryNo);
    }

    return(
        <div className={AppCatCss.appCategory}>
            {approvalData.map(({ title, count, categoryNo}) => (
                    <div className={category === categoryNo ? AppCatCss.selectedCategoryBox : AppCatCss.categoryBox } 
                    onClick={() => onClickHandler(categoryNo)} key={categoryNo}>
                            <h5 className={AppCatCss.title}>{title}</h5>
                            <div className={AppCatCss.count}>
                                <h3>{count}</h3>
                            </div>
                        </div> 
                    ))}
        </div>
    )
}

export default AppCategory;