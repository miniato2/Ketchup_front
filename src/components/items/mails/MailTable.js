import Table from 'react-bootstrap/Table';
import '../../../style.css';
import '../../../pages/mails/mail.css';

const MailTable = ({ data, columns, onRowClick, part, checkedItems, setCheckedItems }) => {
  const toggleCheckbox = (mailNo) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [mailNo]: !prevState[mailNo]
    }));
  };

  const toggleAllCheckboxes = () => {
    const newCheckedItems = {};
    data.forEach((item) => {
      newCheckedItems[item.mailNo] = !checkedItems[item.mailNo];
    });

    setCheckedItems(newCheckedItems);
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
            {Array.isArray(columns) && columns.map(([key, label], index) => (
              <th scope='col' style={key === '제목' ? { width: "600px", padding: "10px" } : { padding: "10px" }} key={index}>{label}</th>
            )
            )}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((item, index) => (
            <tr key={index} className={part === 'receive' ? (item.readTime !== '읽음' ? 'unreadRow' : '') : ''}>
              <td style={{ padding: "15px", textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={checkedItems[item.mailNo] || false}
                  onChange={() => toggleCheckbox(item.mailNo)} />
              </td>
              <td>{data.length - index}</td>
              {columns.map(([key], columnIndex) => (
                <td style={{ padding: "15px" }} key={columnIndex}>
                  {key === 'mailTitle' ?
                    (<span style={{ cursor: "pointer" }} onClick={onRowClick(data.length - index - 1)} >{item[key]}</span>)
                    : (
                      key === 'readTime' ? (
                        item[key] === '읽음' ? (
                          <i className="bi bi-envelope-open m-icon"></i>
                        ) : (
                          <i className="bi bi-envelope m-icon"></i>
                        )
                      ) : (key === 'receiverName' ?
                        <span style={{ cursor: "pointer" }} className="dropdown">
                          <a href="#" className="receiver-time" data-bs-toggle="dropdown">{item[key]}</a>
                          <ul className="dropdown-menu">
                            <li className="dropdown-item">
                              <span>{item[key]}</span>
                            </li>
                          </ul>
                        </span>
                        : item[key])
                    )
                  }
                </td>
              ))}
            </tr>
          ))
          }
        </tbody>
      </Table>
    </div>
  );
};

export default MailTable;