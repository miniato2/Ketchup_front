import Table from 'react-bootstrap/Table';
import '../../style.css';

const BootstrapTable = ({ data, columns }) => {
  return (
    <div class="card-body">
    <Table className="table">
        <thead>
            <tr>
            {columns.map((column, index) => (
                <th scope='col' style={column === '제목' ? { width: "400px", padding: "10px" } : { padding: "10px" }} key={index}>{column}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
            <tr key={index}>
            {columns.map((column, columnIndex) => (
              <td  style={{ padding: "15px" }} key={columnIndex}>{item[column]}</td>
            ))}
          </tr>
            ))}
        </tbody>
    </Table>
    </div>
  );
};

export default BootstrapTable;