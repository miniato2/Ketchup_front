import { useState } from 'react';
import '../../style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SearchBarValue = ({ onSearch }) => {
    const [searchCondition, setSearchCondition] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e) => {
        setSearchCondition(e.target.value);
        setSearchValue(e.target.value);
    };

    console.log(searchCondition);
    console.log(searchValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 검색어가 변경될 때 onSearch 함수를 호출하여 검색어를 전달합니다.
        onSearch(searchCondition);
        onSearch(searchValue);
    };

    return (
        <div className="search-bar">
            <form className="search-form d-flex align-items-center" onSubmit={handleSubmit}>
                <select className="form-select" onChange={handleChange}>
                    <option selected value=''>검색 조건</option>
                    <option value="mailTitle">제목</option>
                </select>
                <input type="text" name="query" placeholder="제목 검색" title="Enter search keyword" onChange={handleChange} />
                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
            </form>
        </div>
    );
};

export default SearchBarValue;