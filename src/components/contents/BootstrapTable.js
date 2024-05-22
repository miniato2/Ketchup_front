import Table from 'react-bootstrap/Table';
import '../../style.css';


const BootstrapTable = ({ data, columns, onRowClick }) => {
  
  return (
    <div class="card-body">
    <Table className="table">
        <thead>
            <tr style={{ textAlign: 'center' }}>
            {columns.map(([key, label], index) => (
                <th scope='col' style={label === '제목' ? { width: '50%', padding: "10px", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } : { padding: "10px" }} key={index}>{label}</th>
            ))}
            </tr>
        </thead>
        <tbody>
        {Array.isArray(data) && data.map((item, index) => (
            <tr key={index} onClick={() => onRowClick(index)} style={{ cursor: 'pointer' }}>
            {columns.map(([key], columnIndex) => (
              <td style={{ padding: "15px" }} key={columnIndex}>{item[key]}</td>
            ))}
          </tr>
            ))}
        </tbody>
    </Table>
    </div>
  );
};

export default BootstrapTable;