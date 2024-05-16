// function MailTableBody({ data, columns, onRowClick, part, checkedItems, toggleCheckbox }) {
//     console.log("🍟🍟🍟🍟🍟🍟🍟🍟🍟");
//     console.log(checkedItems);
//     return (
//         <tbody>
//             {Array.isArray(data) && data.map((item, index) => (
//                 <tr key={index} className={part === 'receive' ? (item.readTime !== '읽음' ? 'unreadRow' : '') : ''}>
//                     <td style={{ padding: "15px", textAlign: 'center' }}>
//                         <input
//                             type="checkbox"
//                             checked={checkedItems[index] || false}
//                             onChange={() => toggleCheckbox(index)} />
//                     </td>
//                     <td>{data.length - index}</td>
//                     {columns.map(([key], columnIndex) => (
//                         <td style={{ padding: "15px" }} key={columnIndex}>
//                             {key === 'mailTitle' ?
//                                 (<span style={{ cursor: "pointer" }} onClick={onRowClick(data.length - index - 1)} >{item[key]}</span>)
//                                 : (
//                                     key === 'readTime' ? (
//                                         item[key] === '읽음' ? (
//                                             <i className="bi bi-envelope-open m-icon"></i>
//                                         ) : (
//                                             <i className="bi bi-envelope m-icon"></i>
//                                         )
//                                     ) : (key === 'receiverName' ?
//                                         <span style={{ cursor: "pointer" }} className="dropdown">
//                                             <a href="#" className="receiver-time" data-bs-toggle="dropdown">{item[key]}</a>
//                                             <ul className="dropdown-menu">
//                                                 <li className="dropdown-item">
//                                                     <span>{item[key]}</span>
//                                                 </li>
//                                             </ul>
//                                         </span>
//                                         : item[key])
//                                 )
//                             }
//                         </td>
//                     ))}
//                 </tr>
//             ))
//             }
//         </tbody>
//     );
// }

// export default MailTableBody;