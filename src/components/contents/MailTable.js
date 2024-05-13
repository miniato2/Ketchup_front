import Table from 'react-bootstrap/Table';
import '../../style.css';
import { useState } from 'react';

const MailTable = ({ data, columns, onRowClick, part }) => {
  const [checkedItems, setCheckedItems] = useState({});

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

    console.log("체크 박스 확인용!!!!!!!!!!!!")
    console.log(index);
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
            <th>번호</th>
            {columns.map(([key, label], index) => (
              <th scope='col' style={key === '제목' ? { width: "600px", padding: "10px" } : { padding: "10px" }} key={index}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: "15px", textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={checkedItems[index] || false}
                  onChange={() => toggleCheckbox(index)}
                />
              </td>
              <td>{data.length - index}</td>
              {columns.map(([key], columnIndex) => (
                <td style={{ padding: "15px" }} key={columnIndex}>
                  {key === 'mailTitle' ?
                    (<span style={{ cursor:"pointer" }} onClick={onRowClick(index)} >{item[key]}</span>)
                    : (key === 'receiverName' ? <span style={{cursor:"pointer"}}>{item[key]}</span> : item[key])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MailTable;