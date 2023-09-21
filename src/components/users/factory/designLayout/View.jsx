import React, { useEffect } from "react";
import { useState,useRef } from "react";
import { Fragment } from "react";
import useForm from "react-hook-form";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import moment from 'moment';
import './Add.css';

import { PanelRefreshIcons, SubmitButton } from "../../../common/GlobalButton";
import { Typeahead } from 'react-bootstrap-typeahead';
import { JOB_ORDER_DETAILS, DESIGN_LAYOUT_RSURL, DESIGN_LAYOUT_HISTORY,JOB_SUPPLIERS,GET_DESIGN_LAYOUT_JOBORDER,GET_DESIGN_LAYOUT_DETAILS, DESIGN_LAYOUT_DETAILS, GET_DESIGN_LAYOUT_JOBORDER_DONE } from "../../../../api/userUrl";
import { userGetMethod, userPostMethod } from "../../../../api/userAction";
import { toast } from "react-toastify";
import { placeHolderText } from "../../../common/GlobalComponent";

const View = (props) => {
    const { handleSubmit, register, errors, reset } = useForm();
    const [isLayout, setIsLayout] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isBase, setIsBase] = useState(false);
    const [typeheadOptions, setTypeheadOptions] = useState({ job_orders: [],layout_references:[],employees:[],clients:[],suppliers:[],layout : [], layoutDetails : [],layoutMaster:[],polishMachines :[],ref_layout:[]});
    const [selectedJobOrder, setSelectedJobOrder] = useState([]);
    const [engraveOrder, setEngraveOrder] = useState([]);
    const [supplierArr, setSupplierArr] = useState([]);
    const [uploadImage, setUploadImage] = useState();
    const [layoutArr,setLayoutArr] = useState([]);
    const [layoutDetals,setLayoutDetals] = useState([]);
    const [layout,setLayout] = useState({});
    const [colorArray,setColorArray] = useState([]);
    const [colorArrayErr,setColorArrayErr] = useState('');
    const [ref_text,setRef_text] = useState('');
    const [machineArray,setMachineArray] = useState([]);
    const [colorInDone,setColorInDone] = useState([]);
    const [layoutOnBlur,setLayoutOnBlur] = useState({
        final_cir:'',
        final_dia:'',
        final_height:'',
        final_width:'',
        layout_id:''
    });
    const [layoutMaster,setLayoutMaster] = useState({});
    const [layoutDetails,setLayoutDetails] = useState({
        final_cir:'',
        final_dia:'',
        final_height:'',
        final_width:'',
        layout_id:''

    })
    const [layoutDetailsDone, setLayoutDetailsDone] = useState({});


    const [printerMark,setPrinterMark] = useState(0);
    const buttonRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [layoutIdDisable,setLayoutIdDisable] = useState(false);
    const [layoutIdVal,setLayoutIdVal] = useState({
        layout_id: ''
    });
    const [formData, setFormData] = useState({
        // layout_date:  new Date().toLocaleDateString(),
        layout_date: '',
        layout_time : '',
        cir: '',
        client_email: '',
        dia: '',
        fl: '',
        id: '',
        job_name: '',
        job_no: '',
        
        ref_layout_id : '',
        job_type: '',
        printer_id: '',
        printer_name :'',
        printing_status : '',
        printer_mark: 0,
        mark_as_complete: 0,
        total_cylinder_qty: '',
        remarks: '',
        ups: '',
        rpt: '',
        operator_info : '',
        station : '',
        l_reg_mark: 0,
        l_fl_cut: 0,
        design_w : 0,
        axial_ups : 0,
        r_reg_mark : 0,
        r_fl_cut : 0,
        axl_image_area : 0,
        axl_start_point : 0,
        history_name: '',
        layout_history_date: '',
        history_remarks: '',
        history_image: '',
        design_width:'',
        design_height:''
    });
    const [layoutMachines,setLayoutMachines] = useState([])
    const [selectedRefLayout,setSelectedRefLayout] = useState([{id:''}])
    // const [checked,setChecked] = useState()
    const [jobNoFilter,setJobNoFilter] = useState('')
    const [dropdownData, setDropdownData] = useState({});
    const [typeColorOptions, setTypeColorOptions] = useState([]);

    let job_id = props.showId;
    // console.log(job_id)
    // let job_status = props.location.state.params.status
    // console.log(props.location.state.params)
    
    useEffect(() => {
        pageRefreshHandler(job_id);
    }, [])

    const handleTypeaheadInputChange = (text)=>{
        setJobNoFilter(text);
    }
    const handleref_layout_InputChange = (text)=>{
        setRef_text(text)
    }

    
    // console.log(typeheadOptions)

    

   


    
    const pageRefreshHandler = async(job_id = null) => {
       





        if (job_id != null) {

            userGetMethod(`${GET_DESIGN_LAYOUT_JOBORDER_DONE}/${job_id}`)
            .then((response) => {
                setLayoutDetailsDone(response.data)
            })

            userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${job_id}`)
                .then(response => {
                    console.log(response.data)
                    userGetMethod(`${JOB_SUPPLIERS}?jobOrderId=${job_id}`)
                    .then(response => {
                        setSupplierArr(response.data.suppliers);
                        if (response.data.suppliers.length > 0) {
                            let supplierOption = [];
                            response.data.suppliers.map((item, index) => {
                                let supplierObj = {};
                                supplierObj.id = index;
                                supplierObj.name = item;
                                supplierOption.push(supplierObj);
                            })
                            // setEngraveOrder(colorOptions);
                            setSupplierArr(supplierOption);
                        }
                        console.log(response.data);
                    })
                    .catch(err => {console.log(err)})
                    if (response?.data) {
                        let { 
                            // layout_date,
                            cir,client_email,dia,fl,id,job_name,job_no,job_type,printer_id,printer_mark,mark_as_complete,total_cylinder_qty,remarks,ups,rpt,operator_info,station,printer_name,printing_status,design_height,design_width,client_name,marketing_p_name
                        } = response.data.jobOrderDetails;
                        setFormData({
                            // 'layout_date': layout_date,
                            'cir': cir,
                            'client_email': client_email,
                            'dia': dia,
                            'fl': fl,
                            'id': id,
                            'job_name': job_name,
                            'job_no': job_no,
                            'job_type': job_type,
                            'printer_id': printer_id,
                            'printer_name': printer_name,
                            'printing_status': printing_status,
                            'printer_mark': printer_mark,
                            'total_cylinder_qty': total_cylinder_qty,
                            'remarks': remarks,
                            'ups': ups,
                            'rpt': rpt,
                            
                            'mark_as_complete' :  mark_as_complete,
                            'operator_info' : operator_info ,
                            'station' : station,
                            'design_height': design_height,
                            'design_width' : design_width,
                            'client_name' : client_name,
                            'marketing_p_name' : marketing_p_name
                        });
                        setSelectedJobOrder([...selectedJobOrder, job_no])


                        setTypeColorOptions(response.data.colors);
                        if (response.data.colors.length > 0) {
                            let colorOptions = [];
                            response.data.colors.map((item, index) => {
                                let colorObj = {};
                                colorObj.er_color_serial = index;
                                colorObj.name = item?.color_name;
                                colorObj.er_color_id = item?.id;
                                colorOptions.push(colorObj);
                            })
                            setEngraveOrder(colorOptions);
                            setTypeColorOptions(colorOptions);
                        }
                    }
                })


                

        
    }

    


        let ref_layout = [];
        setTypeheadOptions({ ...typeheadOptions, 
          
            ['ref_layout'] : ref_layout
           });

        // userGetMethod(`${DESIGN_LAYOUT_RSURL}/create?job_order_id=${job_id}`)
        //     .then(response => {
        //         // FOR JOB ORDER
        //         console.log(response.data)
        //         setLayoutMachines(response.data?.machines)
        //         if (response.data?.layoutMaster && response.data?.layoutDetails) {
        //             // console.log(response.data.layout)
        //             // console.log(response.data.layoutMaster)
        //             // console.log(response.data.layoutDetails)
        //             // setLayoutMaster(response.data.layout)
        //             setLayoutMaster(response.data?.layoutMaster)
        //             setLayoutDetals(response.data?.layoutDetails)
        //         }
               
                
        //         // ======================================
               

        //         // Demo for all create post
        //         let jobOrderOptions = [];
        //         if (response.data.jobOrder) {
        //             let jobOrderObj = {};
        //             jobOrderObj.id = response.data.jobOrder.id;
        //             jobOrderObj.name = `[${response.data.jobOrder.job_no}] ` + response.data.jobOrder.job_name;
        //             jobOrderOptions.push(jobOrderObj);
    
        //             if (response.data.jobOrders != null) {
        //                 setFormData({
        //                     'job_id': [jobOrderObj]
        //                 })
        //             }
        //             if (job_id != null) {
        //                 setSelectedJobOrder([...selectedJobOrder, jobOrderObj])
        //             }
        //             dropDownChange([{ id: response.data.jobOrder.id }], 'job_id');
        //         }
                
        //         if (response.data.jobOrders && response.data.jobOrders.length > 0) {
        //             response.data.jobOrders.map(order => {
        //                 let jobOrderObj = {};
        //                 jobOrderObj.id = order.id;
        //                 jobOrderObj.name = `[${order.job_no}] ` + order.job_name;
        //                 jobOrderOptions.push(jobOrderObj);

        //             })
        //         }

        //         let clientsOptions = [];
        //         if(response.data.clients && response.data.clients.length > 0) {
        //             response.data.clients.map(client => {
        //                 let clientObj = {};
        //                 clientObj.id = client.id;
        //                 clientObj.client_id = client.client_id;
        //                 clientObj.name = client.name;
        //                 clientsOptions.push(clientObj);
        //             })
        //         }

        //         let machinesOptions = [];
        //         if(response.data.machines && response.data.machines.length > 0) {
        //             response.data.machines.map(machine => {
        //                 let machineObj = {};
        //                 machineObj.id = machine.id;
        //                 // machineObj.client_id = machine.client_id;
        //                 machineObj.name = machine.machine_name;
        //                 machinesOptions.push(machineObj);
        //             })
        //         }

        //         let employeesOptions = [];
        //         if(response.data.employees && response.data.employees.length > 0) {
        //             response.data.employees.map(employee => {
        //                 let employeeObj = {};
        //                 employeeObj.id = employee.id;
        //                 employeeObj.client_id = employee.employee_id;
        //                 employeeObj.name = employee.name;
        //                 employeesOptions.push(employeeObj);
        //             })
        //         }

        //         let suppliersOptions = [];
        //         if(response.data.suppliers && response.data.suppliers.length > 0) {
        //             response.data.suppliers.map(supplier => {
        //                 let supplierObj = {};
        //                 supplierObj.id = supplier.id;
        //                 supplierObj.supplier_id = supplier.supplier_id;
        //                 supplierObj.name = supplier.name;
        //                 suppliersOptions.push(supplierObj)
        //             })
        //         }

        //         setTypeheadOptions({ ...typeheadOptions, 
        //          ['job_orders']: jobOrderOptions,
        //          ['layout_references']: response?.data?.layout_references,
        //          ['clients']: clientsOptions,
        //          ['employees']: employeesOptions,
        //          ['suppliers']: suppliersOptions,
        //          ['machines'] : machinesOptions,
                 
        //         });
        //         // setIsLoading(false);
        //     });
    }
    // console.log(typeColorOptions);
    // console.log(layoutDetals);

    const toogleLtoB = (val) => {
        if (val == "layout") {
            setIsLayout(true);
            setIsBase(false);
        } else if (val == "base") {
            setIsLayout(false);
            setIsBase(true);
        }
    }

    let colorAlert;
    
    
    // console.log(colorInDone)

    const inputChangeHandler = (e) => {

        const {name, value} = e.target;

        if(e.target.name == 'history_image'){
            setUploadImage({[e.target.name] : URL.createObjectURL(e.target.files[0])});
            setFormData({ ...formData, [e.target.name]: e.target.files[0]});
        }else{
     
            if (e.target.name == 'layout_id' || e.target.name == 'ref_layout_id' && formData.layout_id == '') {
                setLayoutIdVal({
                    ...layoutIdVal,[e.target.name] : e.target.value
                });
                
            }else{
                setFormData({ ...formData, [e.target.name]: e.target.type == 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value });
            }
            if(e.target.name == 'printer_mark'){

                setPrinterMark({...printerMark,[e.target.name]:e.target.checked})
            }

            if (e.target.name == 'ref_layout_id' && e.target.value == undefined || '') {
                setFormData({
                    ...layoutIdVal,[e.target.name] : e.target.value == null
                });
            }
            if (e.target.name == 'final_dia' || e.target.name == 'final_cir' || e.target.name == 'final_height' || e.target.name == 'final_width' && layoutDetails.final_dia == '' || layoutDetails.final_cir ==  '' || layoutDetails.final_height ==  '' || layoutDetails.final_width == '') {
                setLayoutOnBlur({
                    ...layoutOnBlur, [e.target.name] : e.target.value
                })
            }

            if (e.target.name == 'l_reg_mark' || e.target.name == 'l_fl_cut' || e.target.name == 'design_w' || e.target.name == 'axial_ups' || e.target.name == 'r_reg_mark' || e.target.name == 'r_fl_cut' || e.target.name == 'axl_start_point' || e.target.name == 'axl_image_area' || e.target.name == 'station' || e.target.name == 'layout_id' || e.target.name == 'layout' || e.target.name == 'operator_info' || e.target.name == 'remarks' || e.target.name == 'designer' || e.target.name == 'layout_date' || e.target.name == 'layout_time') {
                setLayoutMaster({
                    ...layoutMaster, [e.target.name]: e.target.value
                })
            }
            
            // if (e.target.name == 'er_color_id') {
            //     const colorID = e.target.value;
               
            //     if (!colorArray.includes(colorID)) {
            //         const updatedListArray = [...colorArray,colorID]
            //         return setColorArray(updatedListArray);
            //     }else{
            //         colorAlert = 'Color was found previously selected, Please Enter another Color';
            //         setColorArrayErr(colorArrayErr);
            //         alert(`Error found: ${colorAlert}`)
            //         e.preventDefault()

                    
            //     }
                
            // }

            
        }
    }
    // console.log(printerMark)
   
    // console.log(formData.printer_mark);
    // console.log(selectedRefLayout.id);

    const handleChangeOnBlur = (e) => {
        
            
            if (e.target.name == 'layout_id' || e.target.name == 'ref_layout_id' && formData.layout_id == '') {
                setLayoutIdVal({
                    ...layoutIdVal,[e.target.name] : e.target.value
                });
                
            }
            if (e.target.name == 'final_dia' || e.target.name == 'final_cir' || e.target.name == 'final_height' || e.target.name == 'final_width' && layoutDetails.final_dia == '' || layoutDetails.final_cir ==  '' || layoutDetails.final_height ==  '' || layoutDetails.final_width == '') {
                setLayoutOnBlur({
                    ...layoutOnBlur, [e.target.name] : e.target.value
                })

           
            // console.log(e.target.value);

            
        }
    }

    // console.log(formData);
    // console.log(layoutIdVal)
    // console.log(typeColorOptions);

    
        // const  getLayoutInfo = async () => {
        //     try{
               
        //             if (formData.ref_layout_id) {
        //                 const response = await userGetMethod(`${DESIGN_LAYOUT_HISTORY}?ref_layout_id=${formData.ref_layout_id}`);
        //             // console.log(response.data);
        //             setLayoutArr(response.data?.layoutHistory);
        //             setLayoutDetails({
        //                 ...layoutDetails,
        //                 final_cir: response.data?.layoutDetails?.final_cir,
        //                 final_dia: response.data?.layoutDetails?.final_dia,
        //                 final_height: response.data?.layoutDetails?.final_height,
        //                 final_width: response.data?.layoutDetails?.final_width,
        //                 layout_id: response.data?.layoutDetails?.layout_id
        //             });
        //             setFormData({
        //                 ...formData,
        //                 history_name: response.data?.layoutHistory?.job_name,
        //                 history_remarks: response.data?.layoutHistory?.remarks,
        //                 layout_history_date: response.data.layoutHistory[0]?.layout_date,
        //                 layout_id: formData?.ref_layout_id
        //             });
        //         }
        //             }
            
        //     catch(error) {
        //         console.error(error)
        //     }
        // }
        // console.log(layoutDetails);
        // useEffect(() => {
            
        //         getLayoutInfo();
           
        //         // getLayoutInfo();
            
        // },[formData.ref_layout_id])
    
    // console.log(formData.layout_id);
    // console.log(layoutArr);
    const isUpdate = () =>{

    }

    const engOrderHandler = (e, index) => {
        setEngraveOrder(
            engraveOrder.map((item, i) =>
                i == index ? { ...item, [e.target.name]: e.target.value, job_id : dropdownData.job_id,job_no:  formData.job_no} : item),
            
        );
        setLayoutDetals(
            layoutDetals.map((item, i) =>
                i == index ? { ...item, [e.target.name]: e.target.value } : item)
        );
        setLayoutMachines(
            layoutMachines.map((item, i) =>
                i == index ? { ...item, [e.target.name]: e.target.value } : item)
        );

        if (e.target.name == 'er_color_id') {
            const colorID = e.target.value;
            // const updatedListArray = [...colorArray,colorID]
             setColorArray([...colorArray,colorID]);
            
            // if (!colorArray.includes(colorID)) {
            //     const updatedListArray = [...colorArray,{'er_color_id':colorID}]
            //     return setColorArray(updatedListArray);
            // }else{
            //     colorAlert = 'Color was found previously selected, Please Enter another Color';
            //     setColorArrayErr(colorArrayErr);
            //     alert(`Error found: ${colorAlert}`)
            //     e.preventDefault()

                
            // }
            
        }

        if (e.target.name == 'er_engraving_machine') {
            const machineID = e.target.value;
            const mechineExists = machineArray.some(item => item.machine_er_id === machineID);
            if (!mechineExists) {
                const updatedListArray = [...machineArray,{'machine_er_id':machineID}]
                setMachineArray(updatedListArray);
            }else{
                const mechineAlert = 'Machines was found previously selected, Please Enter another Machine Name'
                return(
                    alert(`Error found: ${mechineAlert}`)

                )
            }
            
        }
    };
    console.log(colorArray)
    
    useEffect(() => {
        var img;
        if (formData?.l_reg_mark && formData?.l_fl_cut && formData?.design_w && formData?.axial_ups && formData?.r_reg_mark && formData?.r_fl_cut) {
             img = (+formData?.l_reg_mark) + (+formData?.l_fl_cut) + ((+formData?.design_w) * (+formData?.axial_ups)) + (+formData?.r_reg_mark) + (+formData?.r_fl_cut);
            // console.log('image',img);
            // setFormData({...formData,"axl_image_area": img });

        }
        if (img && formData?.fl) {
            var start = ((+formData?.fl) - (+img)) / 2
            // console.log('changed -start point',start);
            setFormData({...formData,"axl_start_point": start,"axl_image_area": img});

        }
    }, [
        formData?.l_reg_mark,
        formData?.l_fl_cut,
        formData?.design_w,
        formData?.axial_ups,
        formData?.r_reg_mark,
        formData?.r_fl_cut,
        formData?.fl,
        formData?.axl_image_area,
    ]);

    const dropDownChange = (event, stateName) => {
        if (stateName == 'job_id' && event[0]?.name) {
            setSelectedJobOrder(event);
        }
        if (stateName == 'ref_layout' && event[0]?.id) {
            setSelectedRefLayout(event);
            
        }
        
        if (event.length > 0) {
            const selectedValue = event[0].id;
            console.log(selectedValue)
            setDropdownData(
                (prevstate) => ({
                    ...prevstate,
                    [stateName]: selectedValue,
                })
            );
            console.log(selectedValue)

            // if (stateName == 'ref_layout' && selectedValue) {
            //     userGetMethod(`${DESIGN_LAYOUT_HISTORY}?ref_layout_id=${selectedValue}`)
            //     .then(response => {
            //         console.log(response.data);
            //         setLayoutArr(response.data?.layoutHistory);
            //         setLayoutDetails({
            //             ...layoutDetails,
            //             final_cir: response.data?.layoutDetails?.final_cir,
            //             final_dia: response.data?.layoutDetails?.final_dia,
            //             final_height: response.data?.layoutDetails?.final_height,
            //             final_width: response.data?.layoutDetails?.final_width,
            //             layout_id: response.data?.layoutDetails?.layout_id
            //         });
            //         setFormData({
            //             ...formData,
            //             history_name: response.data?.layoutHistory?.job_name,
            //             history_remarks: response.data?.layoutHistory?.remarks,
            //             layout_history_date: response.data.layoutHistory[0]?.layout_date,
            //             layout_id: formData?.ref_layout_id
            //         });
            //     })
            // }
            // if (stateName == 'job_id' && selectedValue) {
            //     userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValue}`)
            //     .then(response => {
            //         console.log(response.data)
            //         userGetMethod(`${JOB_SUPPLIERS}?jobOrderId=${selectedValue}`)
            //         .then(response => {
            //             setSupplierArr(response.data.suppliers);
            //             if (response.data.suppliers.length > 0) {
            //                 let supplierOption = [];
            //                 response.data.suppliers.map((item, index) => {
            //                     let supplierObj = {};
            //                     supplierObj.id = index;
            //                     supplierObj.name = item;
            //                     supplierOption.push(supplierObj);
            //                 })
            //                 // setEngraveOrder(colorOptions);
            //                 setSupplierArr(supplierOption);
            //             }
            //             console.log(response.data);
            //         })
            //         .catch(err => {console.log(err)})
            //         if (response?.data) {
            //             let { 
            //                 // layout_date,
            //                 cir,client_email,dia,fl,id,job_name,job_no,job_type,printer_id,printer_mark,mark_as_complete,total_cylinder_qty,remarks,ups,rpt,operator_info,station,printer_name,printing_status,design_height,design_width,client_name,marketing_p_name
            //             } = response.data.jobOrderDetails;
            //             setFormData({
            //                 // 'layout_date': layout_date,
            //                 'cir': cir,
            //                 'client_email': client_email,
            //                 'dia': dia,
            //                 'fl': fl,
            //                 'id': id,
            //                 'job_name': job_name,
            //                 'job_no': job_no,
            //                 'job_type': job_type,
            //                 'printer_id': printer_id,
            //                 'printer_name': printer_name,
            //                 'printing_status': printing_status,
            //                 'printer_mark': printer_mark,
            //                 'total_cylinder_qty': total_cylinder_qty,
            //                 'remarks': remarks,
            //                 'ups': ups,
            //                 'rpt': rpt,
                            
            //                 'mark_as_complete' :  mark_as_complete,
            //                 'operator_info' : operator_info ,
            //                 'station' : station,
            //                 'design_height': design_height,
            //                 'design_width' : design_width,
            //                 'client_name' : client_name,
            //                 'marketing_p_name' : marketing_p_name
            //             });
            //             setTypeColorOptions(response.data.colors);
            //             if (response.data.colors.length > 0) {
            //                 let colorOptions = [];
            //                 response.data.colors.map((item, index) => {
            //                     let colorObj = {};
            //                     colorObj.er_color_serial = index;
            //                     colorObj.name = item?.color_name;
            //                     colorObj.er_color_id = item?.id;
            //                     colorOptions.push(colorObj);
            //                 })
            //                 setEngraveOrder(colorOptions);
            //                 setTypeColorOptions(colorOptions);
            //             }
            //         }
            //     })
            // }

            // if (selectedValue == null || selectedValue !== undefined) {
            //     userGetMethod(`${JOB_ORDER_DETAILS}?jobOrderId=${selectedValue}`)
            //     .then(response => {
            //         console.log(response.data)
            //         userGetMethod(`${JOB_SUPPLIERS}?jobOrderId=${selectedValue}`)
            //         .then(response => {
            //             setSupplierArr(response.data.suppliers);
            //             if (response.data.suppliers.length > 0) {
            //                 let supplierOption = [];
            //                 response.data.suppliers.map((item, index) => {
            //                     let supplierObj = {};
            //                     supplierObj.id = index;
            //                     supplierObj.name = item;
            //                     supplierOption.push(supplierObj);
            //                 })
            //                 // setEngraveOrder(colorOptions);
            //                 setSupplierArr(supplierOption);
            //             }
            //             console.log(response.data);
            //         })
            //         .catch(err => {console.log(err)})
            //         if (response?.data) {
            //             let { 
            //                 // layout_date,
            //                 ref_layout_id,cir,client_email,dia,fl,id,job_name,job_no,job_type,printer_id,printer_mark,mark_as_complete,total_cylinder_qty,remarks,ups,rpt,operator_info,station,printer_name,printing_status,design_height,design_width,client_name,marketing_p_name
            //             } = response.data.jobOrderDetails;
            //             setFormData({
            //                 // 'layout_date': layout_date,
            //                 'cir': cir,
            //                 'client_email': client_email,
            //                 'dia': dia,
            //                 'fl': fl,
            //                 'id': id,
            //                 'job_name': job_name,
            //                 'job_no': job_no,
            //                 'job_type': job_type,
            //                 'printer_id': printer_id,
            //                 'printer_name': printer_name,
            //                 'printing_status': printing_status,
            //                 'printer_mark': printer_mark,
            //                 'total_cylinder_qty': total_cylinder_qty,
            //                 'remarks': remarks,
            //                 'ups': ups,
            //                 'rpt': rpt,
            //                 'ref_layout_id' : ref_layout_id,
            //                 'mark_as_complete' :  mark_as_complete,
            //                 'operator_info' : operator_info ,
            //                 'station' : station,
            //                 'design_height': design_height,
            //                 'design_width' : design_width,
            //                 'client_name' : client_name,
            //                 'marketing_p_name' : marketing_p_name
            //             });
            //             setTypeColorOptions(response.data.colors);
            //             if (response.data.colors.length > 0) {
            //                 let colorOptions = [];
            //                 response.data.colors.map((item, index) => {
            //                     let colorObj = {};
            //                     colorObj.er_color_serial = index;
            //                     colorObj.name = item?.color_name;
            //                     colorObj.er_color_id = item?.id;
            //                     colorOptions.push(colorObj);
            //                 })
            //                 setEngraveOrder(colorOptions);
            //                 setTypeColorOptions(colorOptions);
            //             }
            //         }
            //     });
            // }
               
        }
    }
    // console.log(formData.printer_mark)

    // console.log(engraveOrder)

   let formDataMark;
   let checked;
    if (formData.printer_mark == "Yes" ) {
        formDataMark= 1 
    }
    else if(formData.printer_mark == "No" || formData.printer_mark == ''){
        checked = printerMark;
    }

    var menuId = 0;
    // if (props.location.state === undefined) {
    //     menuId = 0;
    // } else {
    //     menuId = props.location.state.params.menuId;
    // }
    // console.log(layoutDetails?.final_dia == '' ||  layoutDetails?.final_cir == '' || layoutDetails.final_height == '' || layoutDetails?.final_width == ''? true:false);
    // console.log(typeColorOptions)
    // console.log(engraveOrder)
    const matchedColors = layoutDetals.map((item) => {
        
        const matchingColor = typeColorOptions.find((color) => 
            color.er_color_id === item.er_color_id);
        return matchingColor ? matchingColor.name : 'Unknown';
      });
      
      const typeColorOptionLength = typeColorOptions.length;
      const er_colorLength = colorArray.length;
    

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(data);
        
        setIsSubmitting(true)

        const keysToInclude = ['layout', 'layout_date','layout_id','layout_time','machine_location','mark_as_complete','r_fl_cut','r_reg_mark','remarks','station','axial_ups','axl_image_area','axl_start_point','final_cir','final_dia','final_height','final_width','designer','design_w','operator_info','l_fl_cut','l_reg_mark','printer_mark' ];
        const b = {};
        keysToInclude.forEach(key => {
            b[key] = data[key];
        });
       
            
        const formValue = new FormData();
       
        Object.entries(b).forEach(([key, value]) => {
            if(key != 'history_image'){  
            formValue.append(`${key}`, `${value}`)
        }
     })
     formValue.append("history_image", formData.history_image);
     formValue.append("job_id", dropdownData.job_id);
     formValue.append("ref_layout_id", selectedRefLayout ? selectedRefLayout[0]?.id : '');
     formValue.append("engraveOrder", JSON.stringify(engraveOrder));
     formValue.append("er_color_id_list", JSON.stringify(colorArray));
     formValue.append("er_machine_id_list", JSON.stringify(machineArray));

    //  const colorExists = colorArray.some(item => item.er_color_id === colorID);

    let duplicated = colorArray.filter((item, index) => colorArray.indexOf(item) == index);
    console.log(duplicated);
    if (duplicated.length !== engraveOrder.length) {
        setColorArray(duplicated);
        // toast.error('Duplicate color found!')
        colorAlert = 'Color was found previously selected, Please Enter another Color';
        toast.warning(`Error found: ${colorAlert}`)
        setIsSubmitting(false);
        // console.log('duplicated')
        // console.log(duplicated)
    }else{
        
        setColorArray(duplicated);
        // setIsSubmitting(false);
        userPostMethod(`${DESIGN_LAYOUT_RSURL}`, formValue)
            .then((response) => {
                toast.success(response.data.message);
                clearForm();
                reset();
                // e.target.reset();
            })
            .catch((error) => {console.log(error)});
    }


            
            // if (!colorExists) {
            //     const updatedListArray = [...colorArray,{'er_color_id':colorID}]
            //     return setColorArray(updatedListArray);
            // }else{
            //     colorAlert = 'Color was found previously selected, Please Enter another Color';
            //     setColorArrayErr(colorArrayErr);
            //     const tostval = toast.warning(`Error found: ${colorAlert}`)
            //     if (tostval) {
            //         e.target.value=''
            //     }
            //     e.preventDefault()
            // }
     

    //  if (typeColorOptionLength === er_colorLength) {
    //     setIsSubmitting(false);
    //     userPostMethod(`${DESIGN_LAYOUT_RSURL}`, formValue)
    //         .then((response) => {
    //             toast.success(response.data.message);
    //             clearForm();
    //             reset();
    //             // e.target.reset();
    //             setIsSubmitting(false);
    //         })
    //         .catch((error) => {console.log(error)});
    //  }
    //  else{
    //     toast.warning("Please fill all color name in Engravers Section")
    //  }
    //  console.log(formValue)
//   console.log(Array.from(formValue.entries()));
    
            
    }

    const clearForm = () => {
        // console.log('clear');
        setSelectedJobOrder([]);
        setTypeColorOptions([]);
        setEngraveOrder([]);
        // setSupplierArr([]);
        setLayoutDetails({
        final_cir:'',
        final_dia:'',
        final_height:'',
        final_width:'',
        layout_id:''
        });
        setUploadImage({
            history_image: ''
        });
        setFormData({
            'layout_date': new Date().toLocaleDateString(),
            'layout_time': '',
            'cir': '',
            'client_email': '',
            'dia': '',
            'fl': '',
            'id': '',
            'job_name': '',
            'job_no': '',
            'ref_layout_id' : '',
            'job_type': '',
            'printing_status': '',
            'printer_id': '',
            'printer_name': '',
            'printer_mark': 0,
            'mark_as_complete': 0,
            'total_cylinder_qty': '',
            'remarks': '',
            'ups': '',
            'rpt': '',
            'operator_info' : '',
            'station' : '',
            'l_reg_mark': 0,
            'l_fl_cut': 0,
            'design_w' : 0,
            'axial_ups' : 0,
            'r_reg_mark' : 0,
            'r_fl_cut' : 0,
            'axl_image_area' : 0,
            'axl_start_point' : 0,
            'design_height' : '',
            'design_width' : ''
        });
        setLayoutDetails({
        final_cir:'',
        final_dia:'',
        final_height:'',
        final_width:'',
        layout_id:''
        });
        setLayoutOnBlur({
        final_cir:'',
        final_dia:'',
        final_height:'',
        final_width:'',
        layout_id:''
        });
        setLayoutIdVal({
            layout_id: ''
        })
        setLayoutArr([])

    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-6">
                                    <h5>Design Layout Form</h5>
                                </div>
                                <div className="col-md-6">
                                    {/* <PanelRefreshIcons onClick={pageRefreshHandler} /> */}
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <>
                                <form onSubmit={handleSubmit(onSubmit)} className="theme-form row">
                                    <div className="col-md-12">
                                        <fieldset className="border p-2">
                                            <legend className="w-auto text-left">Job Info</legend>
                                            <div className="form-row">
                                                <div className="col-md-6 row">
                                                    <label className="col-sm-5 col-form-label" htmlFor="job_id">Job No</label>
                                                    <div className="col-md-7">
                                                        {/* <Typeahead
                                                            // className="form-control"
                                                            id="job_id"
                                                            name="job_id"
                                                            labelKey={option => `${option.job_no}${option.name}`}
                                                            options={typeheadOptions['job_orders']}
                                                            placeholder={placeHolderText}
                                                            onChange={(e) => dropDownChange(e, 'job_id')}
                                                            selected={selectedJobOrder}
                                                            onInputChange={(text) => handleTypeaheadInputChange(text)}
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            maxHeight={100}
                                                            disabled={job_id != null ? true : false}
                                                        /> */}
                                                    <input
                                                            type="text"
                                                            className="form-control"
                                                            name="job_no"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.job_no}
                                                            disabled={formData.job_no ? true : true}
                                                        />



                                                    </div>
                                                    <label className="col-sm-5 col-form-label">Job Name</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="job_name"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.job_name ? formData.job_name : ''}
                                                            disabled={formData.job_name != '' ? true : false}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label">Remarks</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="remarks"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.remarks ? formData.remarks : ''}
                                                            disabled={formData.remarks != '' ? true : true}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label">Printer</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="printer_id"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.printer_name ? formData.printer_name : ''}
                                                            disabled={formData.printer_id != '' ? true : false}
                                                            
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 row">
                                                    <label className="col-sm-5 col-form-label">Job Type</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="job_type"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.job_type ? formData.job_type : ''}
                                                            disabled={formData.job_type != '' ? true : false}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label">Printing Type</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="printing_status"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            onChange={inputChangeHandler}
                                                            value={formData.printing_status ? formData.printing_status : ''}
                                                            disabled={formData.printing_status != '' ? true : false}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label">No of Cyl</label>
                                                    <div className="col-md-7">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="total_cylinder_qty"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            // onChange={inputChangeHandler}
                                                            value={formData.total_cylinder_qty ? formData.total_cylinder_qty : ''}
                                                            disabled={formData.total_cylinder_qty != '' ? true : false}
                                                        />
                                                    </div>
                                                    <label className="col-sm-5 col-form-label">Color</label>
                                                    <div className="col-md-7">
                                                        <Typeahead
                                                            id="color"
                                                            multiple
                                                            name="color"
                                                            labelKey={option => `${option.name}`}
                                                            options={typeColorOptions}
                                                            placeholder="Select Color..."
                                                            onChange={(e) => dropDownChange(e, 'color')}
                                                            selected={typeColorOptions}
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                        // disabled={stateData.job_order_id != '' ? 'disabled' : ''}
                                                            disabled={formData.color != '' ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>


                                    <div className="d-flex col-md-12 pl-0">

                                        <div id="layout_col" className="col-md-3">
                                            <fieldset className="border p-2">
                                                <legend className="w-auto text-left">Layout</legend>
                                                <div className="form-row" style={{marginRight:'-30px'}}>
                                                    <div className="col-md-12 row"> 
                                                    
                                                        <label className="col-sm-5 text-left col-form-label ">Layout ID</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="layout_id"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                 readOnly
                                                                value={layoutDetailsDone?.layout?.layout_id}
                                                                disabled
                                                                // disabled={layoutDetails?.layout_id ? true : false}



                                                                // value={formData?.layout_id  ? formData?.layout_id : ''}
                                                                // disabled={formData?.layout_id && layoutIdVal == '' ? true : false}
                                                                // readOnly={formData?.layout_id ? true : false}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-md-6 row text-left m-l-0 m-r-0" style={{marginLeft:"0px !important",paddingLeft:"0px !important"}}>
                                                        <label className="col-md-5 text-left col-form-label p-l-0" style={{whiteSpace: 'nowrap'}}>UPS</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="ups"
                                                                required
                                                                readOnly
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.ups ? formData.ups : ''}
                                                                disabled={formData.ups != '' ?    true : false}
                                                            />
                                                        </div>
                                                        <label className="col-sm-5 text-left col-form-label p-l-0" style={{whiteSpace: 'nowrap'}}>Dia</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="dia"
                                                                required
                                                                readOnly
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.dia ? formData.dia : ''}
                                                                disabled={formData.dia != '' ?    true : false}
                                                            />
                                                        </div>
                                                        
                                                        
                                                    </div>


                                                    <div className="col-md-6 row">
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace: 'nowrap'}}>RPT</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="rpt"
                                                                required
                                                                readOnly
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.rpt ? formData.rpt : ''}
                                                                disabled={formData.rpt != '' ?    true : false}
                                                            />
                                                        </div>
                                                        <label className="col-md-8" style={{whiteSpace: 'nowrap'}}>Prntr mark</label>
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="printer_mark"
                                                                readOnly
                                                                ref={register({
                                                                    
                                                                })}
                                                                // onChange={inputChangeHandler}
                                                                checked={formData.printer_mark ? formDataMark : ''}
                                                                value={formData.printer_mark ? formData.printer_mark : printerMark}
                                                                // disabled={formData.printer_mark && printerMark == '' ? true : false}
                                                            />
                                                        </div>
                                                        <label className="col-md-8" style={{whiteSpace: 'nowrap'}}>Done</label>
                                                        <div className="col-md-4">
                                                            <input
                                                                type="checkbox"
                                                                name="mark_as_complete"
                                                                readOnly
                                                                ref={register({
                                                                    
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                checked={layoutDetailsDone?.layoutMaster?.mark_as_complete == 1 ? true : ''}
                                                                
                                                            />
                                                        </div>
                                                        
                                                       
                                                    </div>


                                                    <div className="col-md-12 row">
                                                    <label className="col-md-4 text-left col-form-label" style={{whiteSpace: 'nowrap'}}>Date</label>
                                                        <div className="col-md-8">
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                name="layout_date"
                                                                readOnly
                                                                required
                                                                disabled
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                value={layoutDetailsDone?.layoutMaster?.layout_date}
                                                                
                                                                defaultValue={moment().format("ll")}
                                                                
                                                            />
                                                        </div>
                                                        <label className="col-md-4 text-left col-form-label" style={{whiteSpace: 'nowrap'}}>On time</label>
                                                        <div className="col-md-8">
                                                            <input
                                                                type="time"
                                                                className="form-control"
                                                                name="layout_time"
                                                                disabled
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                               
                                                                value={layoutDetailsDone?.layoutMaster?.layout_time}
                                                            />
                                                        </div>
                                                        <label className="col-md-4 text-left col-form-label">Layout</label>
                                                        <div className="col-md-8">
                                                             <input
                                                                type="text"
                                                                className="form-control"
                                                                name="layout"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                onBlur={handleChangeOnBlur} disabled
                                                                value={layoutDetailsDone?.layoutMaster?.layout}
                                                            />
                                                            {/* 

                                                            <select className="form-control" name="layout_id" id="	layout_id"> operator_info
                                                                <option value="1">opt 1</option>
                                                                <option value="2">opt 2</option>
                                                                <option value="3">opt 3</option>
                                                            </select> */}
                                                        </div>
                                                        <label className="col-sm-4 text-left col-form-label">info</label>
                                                        <div className="col-md-8">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="info"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                onBlur={handleChangeOnBlur} readOnly disabled
                                                                value={layoutDetailsDone?.layoutMaster?.operator_info}
                                                            />
                                                        </div>
                                                        <label className="col-sm-4 text-left col-form-label">Station</label>
                                                        <div className="col-md-8">
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="station"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                disabled
                                                                value={layoutDetailsDone?.layoutMaster?.station}
                                                            />
                                                            
                                                        </div>
                                                        <label className="col-sm-4 text-left col-form-label" style={{paddingRight:'12px'}}>Remarks</label>
                                                        <div className="col-md-8">
                                                            <textarea
                                                                type="text"
                                                                className="form-control"
                                                                name="remarks"
                                                                required
                                                                disabled
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                               value={layoutDetailsDone?.layoutMaster?.remarks}
                                                                onChange={inputChangeHandler}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>


                                        <div id="layout_history" className="col-md-3 pl-0">
                                            <fieldset className="border">
                                                <legend className="w-auto text-left">Layout Image</legend>
                                                <div className="col-md-12">
                                                   

                                                    {/* <input type="file" className="form-control w-100" onChange={inputChangeHandler} name="history_image" id="history_image" ref={register({
                                                                    required: 'On text Field Required'
                                                                })}/> */}
                                                    <img src={`${process.env.REACT_APP_BASEURL}/public/uploads/`+`${layoutDetailsDone?.layoutMaster?.history_image}`} style={{width: '100%', height: '100%'}}/>
                                                </div>
                                            </fieldset>
                                        </div>


                                        <div id="base_area" className="col-md-3 pl-0">
                                            <fieldset className="border p-2">
                                                <legend className="w-auto text-left">Base</legend>
                                                <div className="form-row">
                                                    <div className="col-md-12 row">
                                                    <label className="col-md-5 col-form-label text-left">Face Length</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="fl"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={formData.fl ? formData.fl : ''}
                                                                disabled={formData?.fl != '' ? true : false}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 row m-l-0 m-r-0">
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace:'nowrap'}}>D. Dia</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="dia"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                // onChange={inputChangeHandler}
                                                                disabled={formData?.dia != '' ? true : false}
                                                                value={formData.dia ? formData.dia : ''}
                                                            />
                                                        </div>
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace:'nowrap'}}>F. Dia</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="final_dia"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                disabled
                                                                onChange={inputChangeHandler}
                                                                onBlur={handleChangeOnBlur}
                                                                value={layoutDetailsDone?.layout?.final_dia}
                                                            
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6 row">
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace:'nowrap'}}>D. Cir</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="d_cir"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                disabled={formData?.cir != '' ? true : false}
                                                                value={formData.cir ? formData.cir : ''}
                                                            />
                                                        </div>
                                                        <label className="col-sm-5 col-form-label" style={{whiteSpace:'nowrap'}}>F. Cir</label>
                                                        <div className="col-md-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="final_cir"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                disabled
                                                            onChange={inputChangeHandler}
                                                            onBlur={handleChangeOnBlur}
                                                                value={layoutDetailsDone?.layout?.final_cir}
                                                            // value={layoutDetails.final_cir ? layoutDetails.final_cir : ''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset className="border p-2">
                                                <legend className="w-auto text-left">Design</legend>
                                                <div className="form-row">
                                                    <div className="col-md-6 row m-l-0 m-r-0">
                                                        <p className="text-center col-md-12" style={{marginBottom:'8px'}}>Desire Size</p>
                                                        <span style={{fontSize: '13px',paddingRight:'0px',paddingLeft:'0px'}} className="col-sm-6 col-form-label ">Height</span>
                                                        <div className="col-md-6" style={{paddingRight:'7px',paddingLeft:'7px'}}>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="on_text_height"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                            // onChange={inputChangeHandler}
                                                            value={formData?.design_height !== '' || formData?.design_height !== null || formData?.design_height !== undefined ? formData?.design_height : ''}
                                                            disabled={formData?.design_height !== '' || formData?.design_height !== null || formData?.design_height !== undefined ? true : false}
                                                            />
                                                        </div>
                                                        <span style={{fontSize: '13px',paddingRight:'0px',paddingLeft:'0px'}} className="col-sm-6 col-form-label">Width</span>
                                                        <div className="col-md-6" style={{paddingRight:'7px',paddingLeft:'7px'}}>
                                                        <input
                                                                type="text"
                                                                className="form-control"
                                                                name="on_text_width"
                                                                required disabled
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                            // onChange={inputChangeHandler}
                                                            value={formData?.design_width != '' || formData?.design_width !== null || formData?.design_width !== undefined? formData?.design_width : ''}
                                                            
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 row">
                                                    <p className="text-center col-md-12" style={{marginBottom:'8px'}}>Final</p>
                                                        <span style={{fontSize: '13px',paddingRight:'0px',paddingLeft:'0px'}} className="col-sm-6 col-form-label ">Height</span>
                                                        <div className="col-md-6 " style={{paddingRight:'7px',paddingLeft:'7px'}}>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="final_height"
                                                                required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })} disabled
                                                            onChange={inputChangeHandler}
                                                            onBlur={handleChangeOnBlur}
                                                                value={layoutDetailsDone?.layout?.final_height}
                                                            // value={layoutDetails.final_height ? layoutDetails.final_height : ''}
                                                            />
                                                        </div>
                                                        <span style={{fontSize: '13px',paddingRight:'0px',paddingLeft:'0px'}} className="col-sm-6 col-form-label">Width</span>
                                                        <div className="col-md-6" style={{paddingRight:'7px',paddingLeft:'7px'}} >
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="final_width"
                                                                required disabled
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                            onChange={inputChangeHandler}
                                                            onBlur={handleChangeOnBlur}
                                                                value={layoutDetailsDone?.layout?.final_width}
                                                            // value={layoutDetails.final_width ? layoutDetails.final_width : ''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="form-row">
                                                <div className="col-md-12 row align-items-center">
                                                <span className="col-sm-5 text-left col-form-label" style={{fontSize: '13px',paddingLeft: '35px',paddingRight: '5px'}}>M. Location</span>
                                                        <div className="col-md-7 p-2">
                                                            <select className="form-control" name="machine_location" id="machine_location" disabled onChange={inputChangeHandler} ref={register({
                                                                required: 'On text Field Required'
                                                            })} value={layoutDetailsDone?.layoutMaster?.machine_location}>
                                                                <option value="1">opt 1</option>
                                                                <option value="2">opt 2</option>
                                                                <option value="3">opt 3</option>
                                                            </select>
                                                        </div>
                                                </div>
                                                </div>


                                            </fieldset>
                                            <fieldset className="border p-2">
                                                <legend className="w-auto text-left">Additional Info</legend>
                                                <div className="form-row">
                                                <div className="col-md-12 row">
                                                        <label className="col-sm-4 text-left col-form-label" style={{whiteSpace : 'nowrap'}}>Employee</label>
                                                        <div className="col-md-8">
                                                            
                                                               <input
                                                            type="text"
                                                            id="employee_id"
                                                            className="form-control"
                                                            name="employee_id"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            readOnly
                                                            // onChange={inputChangeHandler}
                                                            value={formData.marketing_p_name ? formData.marketing_p_name : ''}
                                                            disabled={formData.marketing_p_name != '' ? true : false}
                                                        />



                                                               
                                                           

                                                        </div>

                                                    </div>
                                                    <div className="col-md-12 row">
                                                        <label className="col-sm-4 text-left col-form-label" style={{whiteSpace:'nowrap'}}>Designer</label>
                                                        <div className="col-md-8">
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                name="info"
                                                                required disabled
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                onBlur={handleChangeOnBlur} readOnly
                                                                value={layoutDetailsDone?.layoutMaster?.designer}
                                                            />


                                                        </div>
                                                    </div>
                                    

                                                    <div className="col-md-12 row">
                                                        <label className="col-sm-4 text-left col-form-label" style={{whiteSpace : 'nowrap'}}>Clients</label>
                                                        <div className="col-md-8">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Client Name"
                                                            required
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                            readOnly
                                                            // onChange={inputChangeHandler}
                                                            value={formData.remarks ? formData.client_name : ''}
                                                            disabled={formData.remarks != '' ? true : false}
                                                        />

                                                        </div>

                                                    </div>

                                                    <div className="col-md-12 row">
                                                        <label className="col-sm-4 text-left col-form-label" style={{whiteSpace : 'nowrap'}}>Supplier</label>
                                                        <div className="col-md-8">

                                                        <Typeahead
                                                            id="supplier"
                                                            multiple
                                                            name="suppliers"
                                                            labelKey={option =>  `${option.name}`}
                                                            options={supplierArr}
                                                            placeholder="Select Supplier..."
                                                            onChange={(e) => dropDownChange(e, 'supplier')}
                                                            selected={supplierArr}
                                                            
                                                            ref={register({
                                                                required: 'On text Field Required'
                                                            })}
                                                        // disabled={stateData.job_order_id != '' ? 'disabled' : ''}
                                                            disabled={supplierArr != '' ? true : false}
                                                        />



                                                        </div>

                                                    </div>


                                                </div>
                                            </fieldset>
                                            
                                        </div>


                                        <div id="engravers_order" className="col-md-3 pl-0 pr-0">
                                            <fieldset className="border p-1">
                                                <legend className="w-auto text-left">Engravers Order</legend>
                                                <div className="col-md-12 pl-0 pr-0">
                                                    <table className="table table-bordered pl-0 pr-0">
                                                        <thead>
                                                            <tr>
                                                                <th id="engraverList">Sl</th>
                                                                <th id="engraverList">Color</th>
                                                                <th id="engraverList">Screen</th>
                                                                <th id="engraverList">Angel</th>
                                                                <th id="engraverList">Machine</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                typeColorOptions.length > 0 ? 
                                                                layoutDetailsDone?.layoutDetails?.map((item,index) => {
                                                                        //  typeColorOptions.find((colorItem) => colorItem.er_color_id === item.er_color_id);
                                                                        const colorC = typeColorOptions.find((colorItem) => colorItem.er_color_id === item.er_color_id);
                                                                        // const machineId = 
                                                                   
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                                <input className="form-control" type="text" value={item.er_color_id + 1}  name="er_color_serial" id="er_color_serial" disabled readOnly onChange={(e) => engOrderHandler(e, index)} ref={register({
                                                                                required: 'On text Field Required'})}/>
                                                                                </td>

                                                                            <td>
                                                                                <input className="form-control" type="text" disabled value={colorC.name} readOnly name="er_color_id" id="er_color_id" onChange={(e) => engOrderHandler(e, index)} ref={register({
                                                                                required: 'On text Field Required'})} required/> 
                                                                                </td>

                                                                            <td>
                                                                                <input className="form-control" type="text"  name="er_desired_screen" id="er_desired_screen" value={item?.er_desired_screen} disabled readOnly onChange={(e) =>engOrderHandler(e, index)} ref={register({
                                                                     required: 'On text Field Required'
                                                                })}/>
                                                                                </td>

                                                                            <td>
                                                                                <input className="form-control" type="text"  name="er_desired_angle" id="er_desired_angle" value={item?.er_desired_angle} disabled readOnly onChange={(e) =>engOrderHandler(e, index)} ref={register({
                                                                     required: 'On text Field Required'
                                                                })}/>
                                                                                </td>

                                                                            <td>
                                                                                {/* <input className="form-control" type="text"  name="er_engraving_machine" id="er_engraving_machine" value={item?.er_engraving_machine} onChange={(e) =>engOrderHandler(e, index)} ref={register({
                                                                    required: 'On text Field Required'
                                                                })} /> */}

                                                                            <input className="form-control" type="text"  name="er_desired_angle" id="er_desired_angle" disabled value={item?.er_engraving_machine} readOnly onChange={(e) =>engOrderHandler(e, index)} ref={register({
                                                                            required: 'On text Field Required'
                                                                                                                                                                                                    })}/>
                                                                
                                                           


                                                                        </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            
                                                                :
                                                                typeColorOptions.map((item,index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                                <input className="form-control" type="text" disabled value={item.er_color_serial + 1}  name="er_color_serial"  readOnly id="er_color_serial" onChange={(e) => engOrderHandler(e, index)} ref={register({
                                                                    required: 'On text Field Required'
                                                                })} required/>
                                                                                </td>

                                                                            <td>
                                                                                
                                                                                {/* <input className="form-control" type="text" value={item.name} name="er_color_id" id="er_color_id" onChange={(e) => engOrderHandler(e, index)} ref={register({
                                                                    required: 'On text Field Required'
                                                                })}/> */}

                                                                <select style={{width: '75px'}} className="form-control" name="er_color_id" id="er_color_id"
                                                                disabled
                                                                 onChange={engOrderHandler} ref={register({
                                                                required: 'On text Field Required'
                                                            })} required>
                                                                <option value={colorArrayErr} >Select Color</option>
                                                                {typeColorOptions.map((color,index) =>(
                                                                    <option value={color.er_color_id} key={index} >{color.name}</option>

                                                                ))}
                                                                
                                                            </select>
                                                            
                                                                                </td>

                                                                            <td>
                                                                                <input className="form-control" type="text" readOnly  name="er_desired_screen" id="er_desired_screen" disabled value={layoutDetals ? layoutDetals.er_desired_screen : ''} onChange={(e) =>engOrderHandler(e, index)} ref={register({
                                                                    required: 'On text Field Required'
                                                                })} required/>
                                                                                </td>

                                                                            <td>
                                                                                <input className="form-control" type="text"  name="er_desired_angle" id="er_desired_angle" readOnly disabled value={layoutDetals ? layoutDetals.er_desired_angle : ''} onChange={(e) =>engOrderHandler(e, index)} ref={register({
                                                                    required: 'On text Field Required'
                                                                })}/>
                                                                                </td>

                                                                            <td>
                                                                                {/* <input className="form-control" type="text"  name="er_engraving_machine" id="er_engraving_machine" onChange={(e) =>engOrderHandler(e, index)} ref={register({
                                                                    required: 'On text Field Required'
                                                                })} /> */}
                                                                 <select style={{width: '75px'}} className="form-control" name="er_engraving_machine" id="er_engraving_machine" readOnly disabled onChange={(e) =>engOrderHandler(e, index)} ref={register({
                                                                required: 'On text Field Required'
                                                                    })} required>
                                                                <option value=''>Select Machine</option>
                                                                {layoutMachines.map((machine,index) =>(
                                                                    <option value={machine.id} key={index}>{machine.machine_name}</option>

                                                                ))}
                                                                
                                                            </select>
                                                                        </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                            

                                                                    



                                                        </tbody>
                                                    </table>
                                                </div>
                                            </fieldset>
                                            
                                        </div>

                                        
                                    </div>

                                    <div className="col-md-12">
                                        <fieldset className="border p-2">
                                            <legend className="w-auto text-left">Axial</legend>
                                            <div className="form-row">
                                                <div className="col-md-2 mb-3">
                                                    <label>L.Reg.Mark</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="l_reg_mark"
                                                                name="l_reg_mark"
                                                                // required
                                                                type="number"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })} 
                                                                disabled
                                                                onChange={inputChangeHandler}
                                                                value={layoutDetailsDone?.layoutMaster?.l_reg_mark}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 mb-3">
                                                    <label>L.FL.Cut</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="l_fl_cut"
                                                                name="l_fl_cut"
                                                                // station
                                                                type="number"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })} disabled
                                                                onChange={inputChangeHandler}
                                                                value={layoutDetailsDone?.layoutMaster?.l_fl_cut}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1 mb-3">
                                                    <label>Design W.</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="design_w"
                                                                name="design_w"
                                                                // required
                                                                type="number"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })} disabled
                                                                onChange={inputChangeHandler}
                                                                value={layoutDetailsDone?.layoutMaster?.design_w}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>*</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1 mb-3">
                                                    <label>UPS</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="axial_ups"
                                                                name="axial_ups"
                                                                disabled
                                                                // required
                                                                type="number"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })}
                                                                onChange={inputChangeHandler}
                                                                value={layoutDetailsDone?.layoutMaster?.axial_ups}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 mb-3">
                                                    <label>R.Reg.Mark</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="r_reg_mark"
                                                                name="r_reg_mark"
                                                                // required
                                                                type="number"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })} readOnly disabled
                                                                onChange={inputChangeHandler}
                                                                value={layoutDetailsDone?.layoutMaster?.r_reg_mark }
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 mb-3">
                                                    <label for="r_fl_cut">R.FL.Cut</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-9 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="r_fl_cut"
                                                                name="r_fl_cut"
                                                                // required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })} readOnly disabled
                                                                type="number"
                                                                onChange={inputChangeHandler}
                                                                value={layoutDetailsDone?.layoutMaster?.r_fl_cut }
                                                            />
                                                        </div>
                                                        <div className="col-md-3 pl-0">
                                                            <span>=</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1 mb-3">
                                                    <label for="start_point">Start Point</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-12 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="axl_start_point"
                                                                name="axl_start_point"
                                                                // required
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })} readOnly disabled
                                                                type="number"
                                                                onChange={inputChangeHandler}
                                                                value={layoutDetailsDone?.layoutMaster?.axl_start_point}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1 mb-3">
                                                    <label for="image_area">Image Area</label>
                                                    <div className="d-flex">
                                                        <div className="col-md-12 pl-0">
                                                            <input
                                                                className="form-control"
                                                                id="axl_image_area"
                                                                name="axl_image_area"
                                                                ref={register({
                                                                    required: 'On text Field Required'
                                                                })} readOnly disabled
                                                                type="number"
                                                                onChange={inputChangeHandler}
                                                                value={layoutDetailsDone?.layoutMaster?.axl_image_area}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </fieldset>
                                    </div>

                                    {/* {isBase == true ? (<Base inputChangeHandler={inputChangeHandler} formData={formData} typeColorOptions = {typeColorOptions}/>) : ("")
                                    } */}
                                    {/* <SubmitButton link="designLayout/index"  menuId={menuId} onClick={handleSubmit(onSubmit)} disabled={isSubmitting}/> */}
                                </form>
                            </>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
export default View;