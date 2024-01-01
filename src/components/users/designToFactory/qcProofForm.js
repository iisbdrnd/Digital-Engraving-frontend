import React from 'react'
import { Fragment } from 'react'

const qcProofForm = () => {

    const inputChangeHandler = () =>{

    }

  return (
    <div>
        <div className='row mt-2'>
                                            <div className='col-md-1 d-flex justify-content-center align-items-center mt-2'>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>C</label>
                                                        <div className="col-md-8">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-1 d-flex justify-content-center align-items-center mt-2'>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>M</label>
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-1 d-flex justify-content-center align-items-center mt-2'>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>Y</label>
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-1 d-flex justify-content-center align-items-center mt-2'>
                                            <label className="col-md-6 mt-1" style={{whiteSpace: 'nowrap'}}>K</label>
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>

                                            {/* input for Ex section */}
                                            <div className='col-md-2'>
                                            <label className="col-md-4" style={{whiteSpace: 'nowrap'}}>Ext1</label>
                                                        <div className="col-md-12">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Ext-1"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-2'>
                                            <label className="col-md-4" style={{whiteSpace: 'nowrap'}}>Ext2</label>
                                                        <div className="col-md-12">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Ext-2"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-2'>
                                            <label className="col-md-4" style={{whiteSpace: 'nowrap'}}>Ext3</label>
                                                        <div className="col-md-12">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Ext-3"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>
                                            <div className='col-md-2'>
                                            <label className="col-md-4" style={{whiteSpace: 'nowrap'}}>Ext4</label>
                                                        <div className="col-md-12">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Ext-4"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>

                                            <div className='col-md-2'>
                                            <label className="col-md-4" style={{whiteSpace: 'nowrap'}}>Remarks</label>
                                                        <div className="col-md-12">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="Ext-4"
                                                                
                                                                onChange={inputChangeHandler}
                                                                value=''
                                                            />
                                                        </div>
                                            </div>

                                        </div>
    </div>
  )
}

export default qcProofForm