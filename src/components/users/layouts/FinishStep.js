import React, { Fragment } from 'react';

const FinishStep = (props) => {
    const submitFun = () => {
        alert("successfully updated")
    }
    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-12">
                        <form className="needs-validation theme-form" noValidate>
                            
                            <div className="form-group row offset-md-2 mt-10">
                                <label className="col-sm-2 col-form-label required" htmlFor="remark">Remarks</label>
                                <div className="col-sm-7">
                                    <input className="form-control" name="remark" id="remark" type="text" placeholder="Remarks" />
                                </div>
                            </div>

                            <button className="btn btn-primary r-7 btnsubmit" onClick={submitFun}>submit</button>
                        </form>
                </div>
            </div>
        </Fragment>
    );
};

export default FinishStep;