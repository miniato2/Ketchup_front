import '../../style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PaginationButtons = () => {
    return (
        <div id="paging-btn">
            <button class="bi bi-chevron-double-left"></button>
            <button class="bi bi-chevron-compact-left"></button>
            <block >
                <button > 1 </button>
                <button > 2 </button>
                <button > 3 </button>
            </block>
            <button class="bi bi-chevron-compact-right"></button>
            <button class="bi bi-chevron-double-right"></button>
        </div>
    );
};

export default PaginationButtons;