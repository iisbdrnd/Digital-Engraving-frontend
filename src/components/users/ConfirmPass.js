import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import './ConfirmPassword.css'


const ConfirmPass = ({handlerSelect,admindata,onHandleChangeNumeric,state,changeHandeler,genderData,passwordMatchError,setState}) => {
   
    const [text,setText] = useState('')
    const [newText,setNewText] = useState('')
    const [error,setError] = useState(false)
    // const [key,setKey] = useState('profile')
    const [newVisible, setNewVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const newEyeValue = newVisible ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
    const confirmEyeValue = visible ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>


    const match = "Password Match by value";
    const Dmatch = "Password did not Match by value";
    
   
    const changeNewHandeler = () =>{
        setNewVisible(!newVisible);
    }

    const changeConfirmHandeler = () =>{
        setVisible(!visible);
    }
    const handleNewInput = (e) =>{
        setNewText(e.target.value)
    }
    // let errorMsg;
    const handleInputConfirm =(e) =>{
        setText(e.target.value);
        
    }
    useEffect(() =>{
        
        if (newText === text) {
            setError(true);

        }else{
            setError(false)
        }
    },[text,newText])
    // useEffect(()=>{
    //     if(key == 'profile'){
    //        this.setState(
    //         {[key]: 0}
    //     )
    //     }else{
    //         this.setState(
    //             {
    //                 [key]:1
    //             }
    //         )
    //     }
    // },[key])
    
    // const handlerSelect = (e) => {
    //     setKey(e)
    //     console.log(e)
        
    //     // setState({
        
    //     // })
    // }
    // console.log(newText,"-",text,error)
   
    

  return (
   
<React.Fragment>


<Tabs
      id="controlled-tab-example"
      activeKey={state.key}
      onSelect={(k) => handlerSelect(k)}
    >
                                        <Tab eventKey="profile" onChange title="Edit Profile">
                                            
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label className="form-label">Mobile</label>
                                                        <input className="form-control" type="text" name='mobile' placeholder="Mobile" value={admindata.mobile} onChange={onHandleChangeNumeric}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Office Phone</label>
                                                        <input className="form-control" type="text" name='office_phone' placeholder="Office Phone" value={admindata.office_phone} onChange={onHandleChangeNumeric}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label className="form-label">Fax</label>
                                                        <input className="form-control" type="text" name='fax' placeholder="Fax" value={admindata.fax} onChange={changeHandeler}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Age</label>
                                                        <input className="form-control" type="text" name='age' placeholder="Age" value={admindata.age} onChange={onHandleChangeNumeric}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label className="form-label">Address</label>
                                                        <input className="form-control" type="text" name='address' placeholder="Home Address" value={admindata.address} onChange={changeHandeler}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Gender</label>
                                                        <select className="form-control btn-square" name='gender'
                                                        value={admindata.gender} onChange={changeHandeler}
                                                        >
                                                        <option value="0">Select</option>
                                                        <option value="1">Male</option>
                                                        <option value="2">Female</option>
                                                            {state.isFetch ? genderData : 'No Data Yet'}       
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group mb-0">
                                                        <label className="form-label">About Me</label>
                                                        <textarea className="form-control" rows="5" name='about' placeholder="Enter About your description" value={admindata.about} onChange={changeHandeler}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </Tab>





                                    <Tab eventKey="password" title="Change Password">
                                    <div className="card-body">
                                            <div className="row d-flex justify-content-center">
                                                <div className="col-md-9 ">
                                                    <div className="form-group">
                                                        <label className="form-label">Old Password:</label>
                                                        <input className="form-control" type="password" name='old_password' placeholder="old password.." value='' onChange={changeHandeler} />
                                                    </div>
                                                </div>

                                                <div className="col-sm-9 col-md-9">
                                                    <div className="form-group">
                                                        <label className="form-label">New Password: </label>
                                                        <input className="form-control" type={newVisible? 'text':'password'} name='new_password' placeholder="new password.." value={admindata.new_password} onChange={changeHandeler} pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$' title="Password matching expression. Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit." 
                                                        onInput={handleNewInput}
                                                         />
                                                        <span className="password-toggle-icon" onClick={changeNewHandeler}>{newEyeValue}</span>
                                                    </div>
                                                </div>

                                                <div className="col-md-9">
                                                    <div className="form-group">
                                                        <label className="form-label">Confirm Password: </label>
                                                        <input className="form-control" type={visible ? 'text' : 'password'} name='confirm_password' placeholder="confirm password.." value={admindata.confirm_password} onChange={changeHandeler} pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$' title="Password matching expression. Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit."
                                                        onInput={handleInputConfirm}
                                                        />
                                                        <span 
                                                        className='password-toggle-icon'
                                                         onClick={changeConfirmHandeler}>
                                                            {confirmEyeValue}
                                                            </span>
                                                        <span 
                                                        style={{
                                                            position: 'absolute',
                                                            marginTop: '5px',
                                                            color: error ? 'green' : 'red',
                                                          }}
                                                        >

                                                            {text?(error ? match : Dmatch):''}

                                                            </span>
                                                    </div>
                                                </div>

                                                
                                                
                                                
                                            </div>
                                        </div>
                                    </Tab>
    </Tabs>
</React.Fragment>

  )
}

export default ConfirmPass