import React, { Fragment } from 'react';

const Color = (props) => {

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-12">
                    <form className="needs-validation theme-form" noValidate>
                        <div className="form-group row offset-md-2 mt-10">
                            <label className="col-sm-2 col-form-label required" htmlFor="subclass_id">Color Checkbox</label>
                            <div className="col-sm-7 m-checkbox-inline">
                                <div className="checkbox checkbox-dark">
                                    <input id="inline-1" type="checkbox" />
                                    <label for="inline-1">Option<span className="digits"> 1</span></label>
                                </div>
                                <div className="checkbox checkbox-dark">
                                    <input id="inline-2" type="checkbox" />
                                    <label for="inline-2">Option<span className="digits"> 2</span></label>
                                </div>
                                <div className="checkbox checkbox-dark">
                                    <input id="inline-3" type="checkbox" />
                                    <label for="inline-3">Option<span className="digits"> 3</span></label>
                                </div>
                                <div className="checkbox checkbox-dark">
                                    <input id="inline-4" type="checkbox" />
                                    <label for="inline-4">Option<span className="digits"> 4</span></label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row offset-md-2 mt-10">
                            <label className="col-sm-2 col-form-label required" htmlFor="additional_color">Additional Color</label>
                            <div className="col-sm-7">
                                <input className="form-control" name="additional_color" id="additional_color" type="text" placeholder="Additional Color" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Color;