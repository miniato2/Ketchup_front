import '../../style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SearchBar = () => {
    return (
        <div class="search-bar">
            <form class="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="제목 검색" title="Enter search keyword" />
                <button type="submit" title="Search"><i class="bi bi-search"></i></button>
            </form>
        </div>
    );
};
  
export default SearchBar;