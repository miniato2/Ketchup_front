import Table from 'react-bootstrap/Table';
import '../../style.css';


const BootstrapTable = ({ data, columns }) => {
  return (
    <div class="card-body">
    <Table className="table">
        <thead>
            <tr style={{ textAlign: 'center' }}>
            {columns.map(([key, label], index) => (
                <th scope='col' style={key === '제목' ? { width: "600px", padding: "10px" } : { padding: "10px" }} key={index}>{label}</th>
            ))}
            </tr>
        </thead>
        <tbody>
        {Array.isArray(data) && data.map((item, index) => (
            <tr key={index}>
            {columns.map(([key], columnIndex) => (
              <td style={{ padding: "15px", textAlign: key === '제목' ? 'left' : 'center' }} key={columnIndex}>{item[key]}</td>
            ))}
          </tr>
            ))}
        </tbody>
    </Table>
    </div>
  );
};

export default BootstrapTable;