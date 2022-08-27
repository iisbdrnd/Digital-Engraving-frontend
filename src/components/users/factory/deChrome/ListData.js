import React, { Fragment, useEffect, useState, useReducer, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { DE_CHROME_RS_URL, DE_CHROME_TANK_SCHEDULE_DETAILS, userHasAccess } from '../../../../api/userUrl';
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

    const [stateData, setStateData] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            tanks              : [],
            currentTank        : {},
            deChromeMasters    : [],
            chromeTankScheduleDetails: [],
            detailsLoading     : true,
            scheduleLoading    : false,
            singleScheduleInfo : {},
            cycleStatus        : {} //0=running, 1=stop, 2=cycle Complete
        }
    );
    let interval = useRef();
    const startTimer = (startDate, estEndTime, deChromeMastersId) => {
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
            let cycleName = `cycle_${deChromeMastersId}`;

            if (new Date().getTime() > new Date(startTimeFormation).getTime() && new Date().getTime() < new Date(estEndTimeFormation).getTime()) {
                const hours = Math.floor((every_second_distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
                const minutes = Math.floor((every_second_distance % (1000 * 60 * 60) / (1000 * 60)));
                const seconds = Math.floor((every_second_distance % (1000 * 60) / 1000));

                // PROGRESS PERCENTAGE FORMULA
                let now_total_seconds = Math.round((new Date(estEndTimeFormation).getTime() - new Date().getTime()) / 1000);
                // let per_percent_less_val = Math.round(base_total_distance_seconds * 0.01); // 1% = HOW MUCH SECONDS
                let completed_percentage = 0;

                if (now_total_seconds > 0 && now_total_seconds < base_total_distance_seconds) {
                    completed_percentage = Math.round((base_total_distance_seconds - now_total_seconds)/onePercentValue); // COMPLETED_PERCENTAGE
                }
                let progressBarName = 'progress_bar_'+deChromeMastersId;
                setProgressVal({[progressBarName] : completed_percentage > 0 ? completed_percentage : 0});
                
                // let completed_percentage = Math.round((base_total_distance_seconds - now_total_seconds)/per_percent_less_val); // COMPLETED_PERCENTAGE
                
                // setProgressVal(completed_percentage > 0 ? completed_percentage : 0);
                if (every_second_distance < 0) {
                    // STOP TIMER
                    clearInterval(interval.current);
                } else {
                    // UPDATE TIMER
                    let clockName = 'clock_'+deChromeMastersId;
                    let clock = `${hours}:${minutes}:${seconds}`;
                    setClockData({
                        [clockName] : clock,
                    });
                }
            }else if(new Date().getTime() > new Date(startTimeFormation).getTime() && new Date().getTime() > new Date(estEndTimeFormation).getTime()){
                let progressBarName = 'progress_bar_'+deChromeMastersId;
                setProgressVal({[progressBarName] : 100});
                setStateData(
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
        userGetMethod(`${DE_CHROME_RS_URL}`)
            .then(response => {
                setStateData({tanks: response.data.allTanks});
                setIsLoading(false);
            })
    }, []);

    const onChangeTank = (id, tank_id) => {
        setProgressVal({});
        clearInterval(interval.current);
        setStateData({currentTank: {id: id, tank_id: tank_id}, scheduleLoading: true});
        setIsOpen(null);
        setClockData('');
        userGetMethod(`${DE_CHROME_RS_URL}/${id}`) //api of deChrome/show/{id}
            .then(response => {
                setStateData({scheduleLoading: false});
                setStateData({chromeTankScheduleDetails: []});
                setStateData({deChromeMasters: response.data.deChromeMasters});
                if (response.data.deChromeMasters && response.data.deChromeMasters.length > 0) {
                    response.data.deChromeMasters.map(scheduleMaster => {
                        if (scheduleMaster.est_end_time != null  && scheduleMaster.complete_status == 0) {
                            startTimer(scheduleMaster.start_time, scheduleMaster.est_end_time, scheduleMaster.id);
                        }
                    })
                }
            })    
    };
    const toggle = (i, scheduleId) => {
        if (isOpen == i) {
            return setIsOpen(null)
        }
        setStateData({detailsLoading: true});
        userGetMethod(`${DE_CHROME_TANK_SCHEDULE_DETAILS}/${scheduleId}`)
            .then(response => {
                setStateData({chromeTankScheduleDetails: response.data.chromeTankScheduleDetails});
                setStateData({detailsLoading: false});
            });
        setIsOpen(i);
    }
    
    const toggleModal = (modalName='', scheduleId, scheduleCycleId='') => { //scheduleId means chrome_tank_schedule_masters.id
        setStateData({singleScheduleInfo: {id: scheduleId, scheduleCycleId: scheduleCycleId}});
        if (modalName === 'addTankSchedule') {
            setModal(!modal);
        } else if (modalName === 'editTankSchedule') {
            setEditTankSchedule(!editTankSchedule);
        } else if (modalName === 'cycleStart') {
            setCycleModal(!cycleModal);
        }
    }
    console.log('stateData', stateData);

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>De-Chrome Tank</h5>
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
                                    stateData.tanks && stateData.tanks.length > 0 ? 
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="platingDept">
                                                <span className={`btn ${stateData.currentTank.id === 0 ? 'btn-success' : 'btn-info'}`}
                                                    onClick={() => onChangeTank(0, 0)}>
                                                    All Tank
                                                </span>
                                                {stateData.tanks.map((tank, tankIndex) => (
                                                    <span key={tankIndex+1} 
                                                        className={`btn ${stateData.currentTank.id === tank.id ? 'btn-success' : 'btn-info'}`}
                                                        onClick={() => onChangeTank(tank.id, tank.tank_id)}>
                                                        {tank.tank_id}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-lg-3">
                                            <Link to={{pathname: `${process.env.PUBLIC_URL}/tankConfig/index`, state: {params: {menuId: menuId}}}} className=" btn btn-info" style={{'marginRight': '3px'}}>Tank Settings</Link>
                                            <Link to={{pathname: `${process.env.PUBLIC_URL}/platingShift/index`, state: { params: {menuId: menuId} }}} className="btn btn-primary bt-xs " style={{'marginRight': '5px'}}>Shift</Link>
                                            
                                            {/* <Link to="/" className="btn btn-warning bt-xs mt-2 mr-1">All Tank's Schedule</Link> */}
                                        </div>
                                    </div>
                                    : ''
                                )}
                            </div>
                        </div>
                        
                        {stateData.currentTank.id || stateData.currentTank.id == 0 ? (
                            stateData.scheduleLoading ? <img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Schedule Loading"/>: 
                                (
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h5>#{stateData.currentTank.tank_id} Tank Schedules</h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            {stateData.currentTank.id != 0 ? <button className="btn btn-warning bt-xs" onClick={()=>toggleModal('addTankSchedule')}> Add New Cycle </button> : ''}
                                            
                                            {stateData.deChromeMasters.length > 0 && stateData.deChromeMasters.map((schedule, scheduleIndex) => 
                                            (
                                                <div className="card m-1" key={schedule.id}>
                                                    <div className="card-header">
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <h5>{++scheduleIndex}. {schedule.cycle_id}</h5>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <span className="btn btn-info btn-sm mr-1" onClick={()=>toggleModal('editTankSchedule', schedule.id)}><i className='fa fa-pencil'></i>Edit</span>
                                                                {
                                                                    schedule.running_status == 0 ? (
                                                                        <span className="btn btn-primary btn-sm m-r-5" onClick={()=>toggleModal('cycleStart', schedule.id, schedule.cycle_id)}>Start Cycle</span>
                                                                    ) : (
                                                                        <span className="btn bg-warning">Completed</span>
                                                                    )
                                                                }
                                                                {/* {schedule.running_status == 1 && schedule.complete_status == 0 ?  */}
                                                                {schedule.running_status == 0 && schedule.est_end_time != null ?
                                                                    <>
                                                                        <span className="btn btn-success btn-sm m-r-10">
                                                                            {clockData['clock_'+schedule.id] ? clockData['clock_'+schedule.id] : '00:00:00'}
                                                                        </span> 
                                                                        <span className="" style={{width: '250px', float: 'right'}}>
                                                                            <ProgressBar animated striped variant="success" 
                                                                            now={progressVal['progress_bar_'+schedule.id]} 
                                                                            label={progressVal['progress_bar_'+schedule.id] ? progressVal['progress_bar_'+schedule.id] + '%' : '0'+'%' } style={{backgroundColor: 'gray'}} />
                                                                        </span>
                                                                    </>
                                                                : ''}
                                                            </div>
                                                            <div className="col-md-4">
                                                                <ul className="d-flex pull-right">
                                                                    <li className="p-r-10 cursor-pointer" onClick={() => toggle(scheduleIndex, schedule.id)}><i className={isOpen == scheduleIndex ? 'fa fa-minus' : 'fa fa-plus'}></i></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={isOpen == scheduleIndex ? 'card-body' : 'card-body collapse'}>
                                                        <div className="panel">
                                                        {stateData.detailsLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Schedule Loading"/>) : (
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
                                                                    {stateData.chromeTankScheduleDetails.length > 0 && stateData.chromeTankScheduleDetails.map((details, detailIndex) => (
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
            {modal == true ? <TankSchedule tankId={stateData.currentTank.id} modalTitle={stateData.currentTank.tank_id} toggle={()=>toggleModal('addTankSchedule')} modal={modal} /> : ''} 
            {cycleModal == true ? <StartCycleForm tankId={stateData.currentTank.id} chromeScheduleMasterId={stateData.singleScheduleInfo.id} modalTitle={stateData.singleScheduleInfo.scheduleCycleId +' of #'+stateData.currentTank.tank_id} toggle={()=>toggleModal('cycleStart')} modalName="cycleStart" modal={cycleModal} needReload={() => onChangeTank(stateData.currentTank.id, stateData.currentTank.tank_id)}/> : ''} 
            
            {editTankSchedule == true ? <TankScheduleEdit tankId={stateData.currentTank.id} chromeScheduleMasterId={stateData.singleScheduleInfo.id} modalTitle={stateData.currentTank.tank_id} toggle={()=>toggleModal('editTankSchedule')} modalName="cycleStart" modal={editTankSchedule} /> : ''} 
        </Fragment>
    )
}