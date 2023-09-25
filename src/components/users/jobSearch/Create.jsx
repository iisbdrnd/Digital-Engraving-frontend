import React, { Fragment, useState } from 'react'
import useForm from "react-hook-form";
import { SubmitButton } from '../common/GlobalButton';

const Create = () => {
    const { handleSubmit, register,reset, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);



 const submitHandler = (data, e) => {
    // console.log(data)
    e.preventDefault();
   
  }
  var menuId = 0;
//   if (props.location.state === undefined) {
//     var menuId = 0;
//   } else {
//     menuId = props.location.state.params.menuId;
//   }

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Job Order Created</h5>
              </div>
              <div className="card-body">
                {isLoading ? (
                  <img
                    src={process.env.PUBLIC_URL + "/preloader.gif"}
                    alt="Data Loading"
                  />
                ) : (
                  <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="theme-form"
                  >
                    <div className="row">

                        {/* Left SIde Column=== */}

                      <div className="col-md-6">
                        <fieldset className="border">
                          <legend className="w-auto text-left">Basic</legend>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="job_type"
                            >
                              Job Order Type
                            </label>
                            <div className="col-sm-8">
                            <input
                                className="form-control"
                                id="job_name"
                                name="job_name"
                                //value={jobInfo.jobName}
                                required
                                type="text"
                                placeholder="Job Name"
                                ref={register({
                                  required: "Job Name Field Required",
                                })}
                              />
                              {errors.job_type && (
                                <p className="text-danger">
                                  {errors.job_type.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="job_name"
                            >
                              Job Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                className="form-control"
                                id="job_name"
                                name="job_name"
                                //value={jobInfo.jobName}
                                required
                                type="text"
                                placeholder="Job Name"
                                ref={register({
                                  required: "Job Name Field Required",
                                })}
                              />
                              {errors.job_name && (
                                <p className="text-danger">
                                  {errors.job_name.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="job_sub_class_id"
                            >
                              Sub Class
                            </label>
                            <div className="col-sm-8">
                            
                              <input
                                className="form-control"
                                id="job_name"
                                name="job_name"
                                //value={jobInfo.jobName}
                                required
                                type="text"
                                placeholder="Job Name"
                                ref={register({
                                  required: "Job Name Field Required",
                                })}
                              />
                              {errors.job_sub_class_id && (
                                <p className="text-danger">
                                  {errors.job_sub_class_id.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="client_id"
                            >
                              Client Name
                            </label>
                            <div className="col-sm-8">
                            
                              <input
                                className="form-control"
                                id="job_name"
                                name="job_name"
                                //value={jobInfo.jobName}
                                required
                                type="text"
                                placeholder="Job Name"
                                ref={register({
                                  required: "Job Name Field Required",
                                })}
                              />
                              {errors.job_name && (
                                <p className="text-danger">
                                  {errors.job_name.message}
                                </p>
                              )}
                            </div>
                              
                          </div>


                          

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="printer_id"
                            >
                              Printer Name
                            </label>
                            <div className="col-sm-8">
                           
                              <input
                                className="form-control"
                                id="job_name"
                                name="job_name"
                                //value={jobInfo.jobName}
                                required
                                type="text"
                                placeholder="Job Name"
                                ref={register({
                                  required: "Job Name Field Required",
                                })}
                              />
                              {errors.job_name && (
                                <p className="text-danger">
                                  {errors.job_name.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="design_machine_id"
                            >
                              Employees
                            </label>
                            <div className="col-sm-8">
                                <input 
                                    className="form-control" 
                                    id="job_name" 
                                    name="job_name" 
                                    type="text" 
                                    
                                    placeholder="Employee Name.." 
                                    value=''
                                    // onChange={onChangeHandler}
                                    ref={register({
                                        required: 'Job Name Field Required'})}/>
                                    {errors.job_name && <p className='text-danger'>{errors.job_name.message}</p>}
                            </div>



                          </div>


                          <div className="form-group row">
                            <label
                              className="col-sm-4 col-form-label required"
                              htmlFor="design_machine_id"
                            >
                              Designer Name
                            </label>
                            <div className="col-sm-8">
                            <input
                                className="form-control"
                                id="job_name"
                                name="job_name"
                                //value={jobInfo.jobName}
                                required
                                type="text"
                                placeholder="Job Name"
                                ref={register({
                                  required: "Job Name Field Required",
                                })}
                              />
                              {errors.job_name && (
                                <p className="text-danger">
                                  {errors.job_name.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </fieldset>

                        
                      </div>


                                {/* Right SIde Column */}
                      <div className="col-md-6">
                        <fieldset className="border">
                          <legend className="w-auto text-left">
                            Cylinder Info
                          </legend>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="design_width"
                                >
                                  Job Width (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="design_width"
                                    name="design_width"
                                    required
                                    type="text"
                                    placeholder="Job Width"
                                    // value={jobOrderData.design_width}
                                   
                                    ref={register({
                                      required: "Job Width Field Required",
                                    })}
                                  />
                                  {errors.design_width && (
                                    <p className="text-danger">
                                      {errors.design_width.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="ups"
                                >
                                  UPS
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="ups"
                                    name="ups"
                                    required
                                    type="text"
                                    placeholder="UPS"
                                    value=''
                                   
                                    ref={register({
                                      required: "UPS Field Required",
                                    })}
                                  />
                                  {errors.ups && (
                                    <p className="text-danger">
                                      {errors.ups.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="printing_width"
                                >
                                  Printing Width (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="printing_width"
                                    name="printing_width"
                                    required
                                    type="text"
                                    placeholder="Printing Width"
                                    value=''
                                    ref={register({
                                      required: "Printing Width Field Required",
                                    })}
                                  />
                                  {errors.printing_width && (
                                    <p className="text-danger">
                                      {errors.printing_width.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="face_length"
                                >
                                  Face Length (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="face_length"
                                    name="face_length"
                                    required
                                    type="text"
                                    placeholder="FL"
                                   
                                    value=''
                                    ref={register({
                                      required: "Face Length Field Required",
                                    })}
                                  />
                                  {errors.face_length && (
                                    <p className="text-danger">
                                      {errors.face_length.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="extra_face_length"
                                >
                                  Extra Face Length (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="extra_face_length"
                                    name="extra_face_length"
                                    required
                                    type="text"
                                    placeholder="Extra Width"
                                    readOnly={"readonly"}
                                    value=''
                                    
                                    ref={register({
                                      required: "Extra Width Field Required",
                                    })}
                                  />
                                  {errors.extra_face_length && (
                                    <p className="text-danger">
                                      {errors.extra_face_length.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="design_height"
                                >
                                  Job Height (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="design_height"
                                    name="design_height"
                                    required
                                    type="text"
                                    placeholder="Job Height"
                                    
                                    ref={register({
                                      required: "Job Height Field Required",
                                    })}
                                  />
                                  {errors.design_height && (
                                    <p className="text-danger">
                                      {errors.design_height.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="rpt"
                                >
                                  RPT
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="rpt"
                                    name="rpt"
                                    required
                                    type="text"
                                    placeholder="RPT"
                                   
                                    ref={register({
                                      required: "RPT Field Required",
                                    })}
                                  />
                                  {errors.rpt && (
                                    <p className="text-danger">
                                      {errors.rpt.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="circumference"
                                >
                                  Circumference (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="circumference"
                                    name="circumference"
                                    required
                                    type="text"
                                    placeholder="Circumference"
                                    value=''
                                    readOnly={"readonly"}
                                    ref={register({
                                      required: "Circumference Field Required",
                                    })}
                                  />
                                  {errors.circumference && (
                                    <p className="text-danger">
                                      {errors.circumference.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label
                                  className="col-sm-8 col-form-label required"
                                  htmlFor="printing_height"
                                >
                                  Printing Height (mm)
                                </label>
                                <div className="col-sm-4">
                                  <input
                                    className="form-control"
                                    id="printing_height"
                                    name="printing_height"
                                    required
                                    type="text"
                                    placeholder="Printing Height"
                                    
                                    value=''
                                    ref={register({
                                      required:
                                        "Printing Height Field Required",
                                    })}
                                  />
                                  {errors.printing_height && (
                                    <p className="text-danger">
                                      {errors.printing_height.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </fieldset>

                        
                      </div>
                    </div>

                    

                    <SubmitButton link="jobOrder/index" menuId={menuId}/>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </Fragment>
  )
}

export default Create