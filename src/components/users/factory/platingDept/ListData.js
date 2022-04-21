import React, { Fragment, useEffect, useState, useReducer, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { PLATING_DEPT_RSURL, TANK_SCHEDULE_DETAILS, userHasAccess } from '../../../../api/userUrl';
import { userGetMethod } from '../../../../api/userAction';
import TankSchedule from './TankSchedule';
import StartCycleForm from './StartCycleForm';
import TankScheduleEdit from './TankScheduleEdit';
import { Link } from 'react-router-dom'
import 'react-light-accordion/demo/css/index.css';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { format } from "date-fns";

export default function ListData(props) {
    const [isOpen, setIsOpen] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false); 
    const [cycleModal, setCycleModal] = useState(false); 
    const [editTankSchedule, setEditTankSchedule] = useState(false); 
    const [progressVal, setProgressVal] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {}
    ); 

    const [clockData, setClockData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {}
    );

    const [platingDeptData, setPlatingDeptData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            tanks                      : [],
            currentTank                : {},
            platingTankScheduleMasters : [],
            tankScheduleDetails        : [],
            detailsLoading             : true,
            scheduleLoading            : false,
            singlePlatingTankMasterInfo: {},
            cycleStatus                : {} //0=running, 1=stop running, 2=cycle complete
        }
    );

    let interval = useRef();
    const startTimer = (startDate, estEndTime, platingTankScheduleMastersId) => {
        // START TIME FORMATION
        let startDateFinal = new Date(startDate);
        let startTimeFormation = format(startDateFinal, "MMM d, yyyy HH:mm:ss");
        // EST END TIME FORMATION
        let estEndTimeFinal = new Date(estEndTime);
        let estEndTimeFormation = format(estEndTimeFinal, "MMM d, yyyy HH:mm:ss");
        
        // BASE OF TOTAL SECONDS STANDS ON START TIME & EST END TIME
        const base_total_distance_seconds = Math.round(Math.abs(new Date(startTimeFormation).getTime() - new Date(estEndTimeFormation).getTime()) / 1000);
        let onePercentValue = Math.round(base_total_distance_seconds * 0.01); // 1% = HOW MUCH SECONDS

        interval = setInterval(() => {
            const every_second_distance = new Date(estEndTimeFormation).getTime() - new Date().getTime();
            let cycleName = `cycle_${platingTankScheduleMastersId}`;
            
            if (new Date().getTime() > new Date(startTimeFormation).getTime() && new Date().getTime() < new Date(estEndTimeFormation).getTime()) {
                const hours = Math.floor((every_second_distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
                const minutes = Math.floor((every_second_distance % (1000 * 60 * 60) / (1000 * 60)));
                const seconds = Math.floor((every_second_distance % (1000 * 60) / 1000));
                
                // PROGRESS PERCENTAGE FORMULA
                let now_total_seconds = Math.round((new Date(estEndTimeFormation).getTime() - new Date().getTime()) / 1000);
                let completed_percentage = 0;

                if (now_total_seconds > 0 && now_total_seconds < base_total_distance_seconds) {
                    completed_percentage = Math.round((base_total_distance_seconds - now_total_seconds)/onePercentValue); // COMPLETED_PERCENTAGE
                }
                let progressBarName = 'progress_bar_'+platingTankScheduleMastersId;
                setProgressVal({[progressBarName] : completed_percentage > 0 ? completed_percentage : 0});
                
                if (every_second_distance < 0) {
                    // STOP TIMER
                    clearInterval(interval.current);
                } else {
                    // UPDATE TIMER
                    let clockName = 'clock_'+platingTankScheduleMastersId;
                    let clock = `${hours}:${minutes}:${seconds}`;
                    setClockData({
                        [clockName] : clock,
                    });
                }
            }else if(new Date().getTime() > new Date(startTimeFormation).getTime() && new Date().getTime() > new Date(estEndTimeFormation).getTime()){
                let progressBarName = 'progress_bar_'+platingTankScheduleMastersId;
                setProgressVal({[progressBarName] : 100});
                setPlatingDeptData(
                    {cycleStatus: {
                        [cycleName]: 2
                    }}
                );
            }
        }, 1000);
    }

    var menuId = 0;
    if (props.location.state === undefined) {
        menuId = 0;
    } else {
        menuId = props.location.state.params.menuId;
    }

    useEffect(()=>{
        userGetMethod(`${PLATING_DEPT_RSURL}`)
            .then(response => {
                setPlatingDeptData({tanks: response.data.allTanks});
                setIsLoading(false);
            })
    }, []);
    const onChangeTank = (id, tank_id) => {
        setProgressVal({});
        clearInterval(interval.current);
        setPlatingDeptData({currentTank: {id: id, tank_id: tank_id}, scheduleLoading: true});
        setIsOpen(null);
        setClockData('');
        userGetMethod(`${PLATING_DEPT_RSURL}/${id}`)
            .then(response => {
                setPlatingDeptData({scheduleLoading: false});
                setPlatingDeptData({tankScheduleDetails: []});
                setPlatingDeptData({platingTankScheduleMasters: response.data.platingTankScheduleMasters});
                if (response.data.platingTankScheduleMasters && response.data.platingTankScheduleMasters.length > 0) {
                    response.data.platingTankScheduleMasters.map(scheduleMaster => {
                        if (scheduleMaster.est_end_time != null  && scheduleMaster.running_status == 0) {
                            startTimer(scheduleMaster.start_time, scheduleMaster.est_end_time, scheduleMaster.id);
                        }
                    })
                }
            })
    };
    const toggle = (i, platingTankMasterId) => {
        if (isOpen == i) {
            return setIsOpen(null)
        }
        setPlatingDeptData({detailsLoading: true});
        userGetMethod(`${TANK_SCHEDULE_DETAILS}/${platingTankMasterId}`)
            .then(response => {
                setPlatingDeptData({tankScheduleDetails: response.data.tankScheduleDetails});
                setPlatingDeptData({detailsLoading: false});
            });
        setIsOpen(i)
    }
    const toggleModal = (modalName='', platingTankMasterId, platingTankMasterCycleId='') => {
        setPlatingDeptData({singlePlatingTankMasterInfo: {id: platingTankMasterId, platingTankMasterCycleId: platingTankMasterCycleId}});
        if (modalName === 'addTankSchedule') {
            setModal(!modal);
        } else if (modalName === 'editTankSchedule') {
            setEditTankSchedule(!editTankSchedule);
        } else if (modalName === 'cycleStart') {
            setCycleModal(!cycleModal);
        }
    }

    console.log('platingDeptData', platingDeptData.cycleStatus);

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Plating Department List</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="d-flex pull-right">
                                            <li className="p-r-10"><i className="fa fa-rotate-right"></i></li>
                                            <li className="p-r-10"><i className="fa fa-minus"></i></li>
                                            <li className="p-r-10"><i className="icon-close"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                                 
                            <div className="card-body datatable-react">
                                {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    platingDeptData.tanks && platingDeptData.tanks.length > 0 ? 
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="platingDept">
                                                <div>
                                                    <p>Copper Plating</p>
                                                </div>
                                                <span className={`btn ${platingDeptData.currentTank.id === 0 ? 'btn-success' : 'btn-info'}`}
                                                    onClick={() => onChangeTank(0, 0)}>
                                                    All Tank
                                                </span>
                                                {platingDeptData.tanks.map((tank, tankIndex) => (
                                                    <span key={tankIndex+1} 
                                                        className={`btn ${platingDeptData.currentTank.id === tank.id ? 'btn-success' : 'btn-info'}`}
                                                        onClick={() => onChangeTank(tank.id, tank.tank_id)}>
                                                        {tank.tank_id}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-lg-3">
                                            <Link to={{pathname: `${process.env.PUBLIC_URL}/tankConfig/index`, state: {params: {menuId: menuId}}}} className="mt-3 btn btn-info" style={{'marginRight': '3px'}}>Tank Settings</Link>
                                            <Link to={{pathname: `${process.env.PUBLIC_URL}/platingShift/index`, state: { params: {menuId: menuId} }}} className="btn btn-primary bt-xs mt-3" style={{'marginRight': '5px'}}>Shift</Link>
                                            
                                            {/* <Link to="/" className="btn btn-warning bt-xs mt-2 mr-1">All Tank's Schedule</Link> */}
                                        </div>
                                    </div>
                                    : ''
                                )}
                            </div>
                        </div>
                        
                        {platingDeptData.currentTank.id || platingDeptData.currentTank.id == 0 ? (
                            platingDeptData.scheduleLoading ? <img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Schedule Loading"/>: 
                                (
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h5>#{platingDeptData.currentTank.tank_id} Tank Schedules</h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            {platingDeptData.currentTank.id != 0 ? <button className="btn btn-warning bt-xs" onClick={()=>toggleModal('addTankSchedule')}> Add New Cycle </button> : ''}
                                            
                                            {platingDeptData.platingTankScheduleMasters.length > 0 && platingDeptData.platingTankScheduleMasters.map((platingTankMaster, key) => 
                                            (
                                                <div className="card m-1" key={platingTankMaster.id}>
                                                    <div className="card-header">
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <h5>{++key}. {platingTankMaster.cycle_id}</h5>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <span className="btn btn-info btn-sm mr-1" onClick={()=>toggleModal('editTankSchedule', platingTankMaster.id)}><i className='fa fa-pencil'></i>Edit</span>
                                                                {
                                                                    platingTankMaster.running_status == 0 ? (
                                                                        <span className="btn btn-primary btn-sm m-r-5" onClick={()=>toggleModal('cycleStart', platingTankMaster.id, platingTankMaster.cycle_id)}>Start Cycle</span>
                                                                    ) : (
                                                                        <span className="btn bg-warning">Completed</span>
                                                                    )
                                                                }
                                                                {platingTankMaster.running_status == 0 && platingTankMaster.est_end_time != null ? 
                                                                    <>
                                                                        <span className="btn btn-success btn-sm m-r-10">
                                                                            {clockData['clock_'+platingTankMaster.id] ? clockData['clock_'+platingTankMaster.id] : '00:00:00'}
                                                                        </span> 
                                                                        <span className="" style={{width: '250px', float: 'right'}}>
                                                                            <ProgressBar animated striped variant="success" 
                                                                            now={progressVal['progress_bar_'+platingTankMaster.id]} 
                                                                            label={progressVal['progress_bar_'+platingTankMaster.id] ? progressVal['progress_bar_'+platingTankMaster.id] + '%' : '0'+'%' } style={{backgroundColor: 'gray'}} />
                                                                        </span>
                                                                    </>
                                                                : ''}
                                                            </div>
                                                            <div className="col-md-2">
                                                                <ul className="d-flex pull-right">
                                                                    <li className="p-r-10 cursor-pointer" onClick={() => toggle(key, platingTankMaster.id)}><i className={isOpen == key ? 'fa fa-minus' : 'fa fa-plus'}></i></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={isOpen == key ? 'card-body' : 'card-body collapse'}>
                                                        <div className="panel">
                                                        {platingDeptData.detailsLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Schedule Loading"/>) : (
                                                            <table className="table table-bordered m-t-10" style={{width: '100%'}}>
                                                                <thead>
                                                                    <tr>
                                                                        <th width="5%">Slot</th>
                                                                        <th width="10%">Cylinder Id</th>
                                                                        <th width="15%">Job Name</th>
                                                                        <th width="5%">FL</th>
                                                                        <th width="5%">Cir</th>
                                                                        <th width="5%">Dia</th>
                                                                        <th width="10%">Plating Area</th>
                                                                        <th width="10%">Surface Area</th>
                                                                        <th width="10%">Priority Level</th>
                                                                        <th width="10%">QC Level</th>
                                                                        <th width="10%">With Copper</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {platingDeptData.tankScheduleDetails.length > 0 && platingDeptData.tankScheduleDetails.map((details, detailIndex) => (
                                                                        <tr key={detailIndex}>
                                                                            <td>{details.slot}</td>
                                                                            <td>{details.cylinder_id}</td>
                                                                            <td>{details.job_order_id}</td>
                                                                            <td>{details.fl}</td>
                                                                            <td>{details.cir}</td>
                                                                            <td>{details.dia}</td>
                                                                            <td>{details.slot}</td>
                                                                            <td>{details.slot}</td>
                                                                            <td>{details.slot}</td>
                                                                            <td>{details.slot}</td>
                                                                            <td>{details.slot}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                        ) : ''}

                    </div>
                </div>
            </div>
            {modal == true ? <TankSchedule tankId={platingDeptData.currentTank.id} modalTitle={platingDeptData.currentTank.tank_id} toggle={()=>toggleModal('addTankSchedule')} modal={modal} /> : ''} 
            {cycleModal == true ? <StartCycleForm tankId={platingDeptData.currentTank.id} platingTankMasterId={platingDeptData.singlePlatingTankMasterInfo.id} modalTitle={platingDeptData.singlePlatingTankMasterInfo.platingTankMasterCycleId +' of #'+platingDeptData.currentTank.tank_id} toggle={()=>toggleModal('cycleStart')} modalName="cycleStart" modal={cycleModal} needReload={() => onChangeTank(platingDeptData.currentTank.id, platingDeptData.currentTank.tank_id)}/> : ''} 
            
            {editTankSchedule == true ? <TankScheduleEdit tankId={platingDeptData.currentTank.id} scheduleId={platingDeptData.singlePlatingTankMasterInfo.id} modalTitle={platingDeptData.currentTank.tank_id} toggle={()=>toggleModal('editTankSchedule')} modalName="cycleStart" modal={editTankSchedule} /> : ''} 
        </Fragment>
    )
}