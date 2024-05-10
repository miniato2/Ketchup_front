import Table from 'react-bootstrap/Table';
import '../../style.css';
import { useState } from 'react';

const CheckBootstrapTable = ({ data, columns, onRowClick }) => {
  const [checkedItems, setCheckedItems] = useState({}); // 체크된 항목을 추적하기 위한 상태

  // 전체 선택 여부를 토글하는 함수
  const toggleAllCheckboxes = () => {
    const newCheckedItems = {};
    data.forEach((item, index) => {
      newCheckedItems[index] = !checkedItems[index];
    });
  
    setCheckedItems(newCheckedItems);
  };

  // 특정 행의 체크박스를 토글하는 함수
  const toggleCheckbox = (index) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div class="card-body">
      <Table className="table">
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>
              <input
                type="checkbox"
                onChange={toggleAllCheckboxes}
              />
            </th>
            {columns.map(([key, label], index) => (
              <th scope='col' style={key === '제목' ? { width: "600px", padding: "10px" } : { padding: "10px" }} key={index}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((item, index) => (
            <tr key={index} style={{ cursor: 'pointer' }}>
              <td style={{ padding: "15px", textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={checkedItems[index] || false}
                  onChange={() => toggleCheckbox(index)}
                />
              </td>
              {columns.map(([key], columnIndex) => (
                <td style={{ padding: "15px", textAlign: key === '제목' ? 'left' : 'center' }} onClick={() => onRowClick(columnIndex)} key={columnIndex}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CheckBootstrapTable;