import React from 'react'

const RowAppend = (props) => {
    return (
        <tr key={props.rowIndex}>
            <td width="5%">{props.rowIndex + 1}</td>
            <td width="10%"> 
                <input 
                    className="form-control" 
                    id="cylinder_id" 
                    name="cylinder_id" 
                    type="text" 
                    placeholder="Cylinder Id" 
                    onChange={(event) => props.changeHandler(props.rowIndex, event, 'cylinder_id')}
                    value={props.data}
                />
            </td>
            <td width="15%">Job Name</td>
            <td width="5%">FL</td>
            <td width="5%">Cir</td>
            <td width="5%">Dia</td>
            <td width="10%">Plating Order</td>
            <td width="10%">Surface Area</td>
            <td width="10%">Priority Level</td>
            <td width="10%">QC Level</td>
            <td width="10%">With Copper</td>
            <td width="5%">
                <ul className="d-flex">
                    <li className="p-r-10 cursor-pointer" onClick={props.clickAdd}><i className="fa fa-plus"></i></li>
                    <li className="p-r-10 cursor-pointer" onClick={() => props.clickRemove(props.rowIndex)}><i className="fa fa-minus"></i></li>
                </ul>
            </td>
        </tr>
    )
}
export default RowAppend;