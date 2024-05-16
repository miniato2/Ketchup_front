import { useParams } from "react-router-dom";

function Resources() {
    const {part} = useParams();

    return (
        <main id="main" className="main">
            <div className="title">
                {part === 'conferences' ? <h2>회의실 관리</h2> : <h2>차량 관리</h2>}
            </div>
        </main>
    );
}

export default Resources;