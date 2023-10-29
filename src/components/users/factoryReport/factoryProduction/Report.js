import React, { Fragment , useEffect, useReducer, useState } from 'react';
import ReportHeader from './ReportHeader';
import {FACTORY_PRODUCTION_REPORT} from '../../../../api/userUrl'
import { userGetMethod } from '../../../../api/userAction';
import './style.scss';

const Report = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoad, setDataLoad] = useState(true);
    const [days, setDays] = useState([]);
    const [grindings, setGrindings] = useState([]);
    const [engravings, setEngravings] = useState([]);
    const [chromes, setChromes] = useState([]);
    const [layouts, setLayouts] = useState([]);
    const [platings, setPlatings] = useState([]);
    const [polishings, setPolishings] = useState([]);
    const [challans, setChallans] = useState([]);
    const [resultData, setResultData] = useState([]);
    
    const tableStyle = {
        "margin" : "2% 1% 2% 0%"
    }
    const fromDate = props.match.params.fromDate;
    const toDate = props.match.params.toDate;
    const oneDay = 24 * 60 * 60 * 1000;
    
    useEffect(()=>{
        userGetMethod(`${FACTORY_PRODUCTION_REPORT}?fromDate=${fromDate}&&toDate=${toDate}`) 
        .then(response => {
            // console.log('response', response.data);
            // setDays(response.data.days);
            setGrindings(response.data.grindings);
            setEngravings(response.data.engravings);
            setChromes(response.data.chromes);
            setLayouts(response.data.layouts);
            setPlatings(response.data.platings);
            setPolishings(response.data.polishings);
            setChallans(response.data.challans);
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, []);
    
    const dataArrays = [grindings, engravings, chromes,layouts,platings,polishings,challans];
    // console.log(dataArrays)

   
    
       
        
       
        
            // const groupedByDateAndType = dataArrays.reduce((acc, dataArray) => {
            //     dataArray.forEach(item => {
            //       const { date, surface_area, dia,cir } = item;
            //       const dateFormat = date.split(' ')[0];
            //       const type = dataArray === grindings ? 'grinding' :
            //       dataArray === polishings ? 'polishing' : dataArray === platings ? 'platings': dataArray === layouts ? 'layouts':
            //       dataArray === chromes ? 'chromes' :
            //       'engravings';
              
            //       if (!acc[dateFormat]) {
            //         acc[dateFormat] = { date: dateFormat }; 
            //       }
              
            //       if (!acc[dateFormat][type]) {
            //         acc[dateFormat][type] = [{ [type]: [] }];
            //       }
              
            //       acc[dateFormat][type].push({ surface_area, dia,cir });
            //     });
              
            //     // datas.push(acc);
            //     return acc;
            //     // setData([acc]);
            //     // setData(prevData => ({ ...prevData, ...acc }));
            // }, {});
            // console.log(groupedByDateAndType)
            // datas=groupedByDateAndType;
            
            // setData(prevData => ({ ...prevData, ...groupedByDateAndType }));
           
// useEffect(()=>{
//     setData(groupedByDateAndType)
// },[groupedByDateAndType])

useEffect(() => {
    const groupedByDateAndType = dataArrays.reduce((acc, dataArray) => {
      dataArray.forEach(item => {
        const { date, surface_area, dia, cir } = item;
        const dateFormat = date.split(' ')[0];
        const type =
          dataArray === grindings
            ? 'grindings'
            : dataArray === polishings
            ? 'polishing'
            : dataArray === platings
            ? 'platings'
            : dataArray === layouts
            ? 'layouts'
            : dataArray === chromes
            ? 'chromes'
            : dataArray === challans ? 'challans'  :'engravings';
  
        if (!acc[dateFormat]) {
          acc[dateFormat] = { date: dateFormat };
          
        }
  
        if (!acc[dateFormat][type]) {
        //   acc[dateFormat][type] = [{ [type]: [] }];
          acc[dateFormat][type] = [];
          
        }
  
        acc[dateFormat][type].push({ surface_area, dia, cir });
      });
  
      return acc;
    }, {});
  
    // Check if groupedByDateAndType is different from the current state before updating
    if (JSON.stringify(groupedByDateAndType) !== JSON.stringify(resultData)) {
        
        setResultData(groupedByDateAndType );
      setDataLoad(false)
    }
  }, [dataArrays]);
  const groupedArray = Object.values(resultData);

// console.log(groupedArray)
// console.log(datas)

    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className=""> 
                            <ReportHeader />

                            <div className="mainDiv" style={{"padding": "1% 5%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <>
                                        <div className="text-center">
                                            <h5>{'Factory Production Report - '+fromDate+' to '+toDate}</h5>
                                        </div>
                                        <Fragment>
                                            <div className="row">
                                                <table className="particulars table table-bordered table-stripped reportBody" cellSpacing="5" cellPadding="5" width="100%"  style={tableStyle}>
                                                    <thead>    
                                                        <tr>
                                                            <th style={{fontSize:"15px",fontWeight:"bold"}} rowSpan= "2" className="text-center">Date</th>
                                                            <th style={{fontSize:"15px",fontWeight:"bold"}} colSpan ="3" className="text-center">Layout</th>
                                                            <th style={{fontSize:"15px",fontWeight:"bold"}} rowSpan= "2" className="text-center">Grinding</th>
                                                            <th style={{fontSize:"15px",fontWeight:"bold"}} colSpan ="3" className="text-center">Plating</th>
                                                            <th style={{fontSize:"15px",fontWeight:"bold"}} colSpan ="3" className="text-center">Polishing</th>
                                                            <th style={{fontSize:"15px",fontWeight:"bold"}} colSpan ="3" className="text-center">Engraving</th>
                                                            <th style={{fontSize:"15px",fontWeight:"bold"}} colSpan ="3" className="text-center">Chrome</th>   
                                                            <th style={{fontSize:"15px",fontWeight:"bold"}} colSpan ="2" className="text-center">Challan Complete</th>   
                                                        </tr>
                                                            
                                                          
                                                    </thead>
                                                    {dataLoad ?
                                                    (<p>loading...</p>)
                                                    :
                                                    (
                                                        
                                                       <>
                                                       {groupedArray.length> 0 ? 
                                                        (
                                                            groupedArray.map((item,index)=>{
                                                                const layoutArray = item.layouts || []
                                                                const engravingsArray = item.engravings || []
                                                                const chromeArray = item.chromes || []
                                                                const challansArray = item.challans || []
                                                                const polishingArray = item.polishing || []
                                                                const platingsArray = item.platings || []
                                                                const grindingsArray = item.grindings || []
                                                                
                                                                const sumLayouts = layoutArray.reduce((acc, item) => parseFloat(acc) + parseFloat(
                                                                    item.surface_area 
                                                                      ? parseFloat(item.surface_area).toFixed(2) 
                                                                      : (item.dia && item.cir ? parseFloat(item.dia * item.cir).toFixed(2) : 0)
                                                                  ) , 0);


                                                                const sumEngravings = engravingsArray.reduce((acc, item) => parseFloat(acc) + parseFloat(
                                                                    item.surface_area 
                                                                      ? parseFloat(item.surface_area).toFixed(2) 
                                                                      : (item.dia && item.cir ? parseFloat(item.dia * item.cir).toFixed(2) : 0)
                                                                  ) , 0);


                                                                const sumGrindings = grindingsArray.reduce((acc, item) => parseFloat(acc) + parseFloat(
                                                                    item.surface_area 
                                                                      ? parseFloat(item.surface_area).toFixed(2) 
                                                                      : (item.dia && item.cir ? parseFloat(item.dia * item.cir).toFixed(2) : 0)
                                                                  ) , 0);


                                                                const sumChrome = chromeArray.reduce((acc, item) => parseFloat(acc) + parseFloat(
                                                                    item.surface_area 
                                                                      ? parseFloat(item.surface_area).toFixed(2) 
                                                                      : (item.dia && item.cir ? parseFloat(item.dia * item.cir).toFixed(2) : 0)
                                                                  ) , 0);


                                                                const sumChallan = challansArray.reduce((acc, item) => parseFloat(acc) + parseFloat(
                                                                    item.surface_area 
                                                                      ? parseFloat(item.surface_area).toFixed(2) 
                                                                      : (item.dia && item.cir ? parseFloat(item.dia * item.cir).toFixed(2) : 0)
                                                                  ) , 0);


                                                                const sumPolishing = polishingArray.reduce((acc, item) => parseFloat(acc) + parseFloat(
                                                                    item.surface_area 
                                                                      ? parseFloat(item.surface_area).toFixed(2) 
                                                                      : (item.dia && item.cir ? parseFloat(item.dia * item.cir).toFixed(2) : 0)
                                                                  ) , 0);


                                                                const sumPlating = platingsArray.reduce((acc, item) => parseFloat(acc) + parseFloat(
                                                                    item.surface_area 
                                                                      ? parseFloat(item.surface_area).toFixed(2) 
                                                                      : (item.dia && item.cir ? parseFloat(item.dia * item.cir).toFixed(2) : 0)
                                                                  ) , 0);
                                                                  

                                                                return(
                                                                    <>
                                                                    <tbody>
                                                                <td style={{verticalAlign:"top", fontSize:"13px",fontWeight:"bold"}}  rowSpan= "2" key={index}>{item.date}</td>
    
                                                                <td style={{verticalAlign:"top",fontSize:"13px",fontWeight:"bold"}} colSpan ="3" key={index}>
                                                                    {sumLayouts.toFixed(2)}
                                                                </td>
    
    
                                                                <td style={{verticalAlign:"top" ,fontSize:"13px",fontWeight:"bold"}} rowSpan= "2">
                                                                    {sumGrindings.toFixed(2)}</td>
    
    
                                                                <td style={{verticalAlign:"top" ,fontSize:"13px",fontWeight:"bold"}} colSpan ="3" key={index}>
                                                                    {sumPlating.toFixed(2)}</td>
    
    
                                                                <td style={{verticalAlign:"top" ,fontSize:"13px",fontWeight:"bold"}} colSpan ="3" key={index}>
                                                                {sumPolishing.toFixed(2)}</td>
    
    
                                                                <td style={{verticalAlign:"top" ,fontSize:"13px",fontWeight:"bold"}} colSpan ="3" key={index}>
                                                                    {sumEngravings.toFixed(2)}</td>
    
    
                                                                <td style={{verticalAlign:"top" ,fontSize:"13px",fontWeight:"bold"}} colSpan ="3" key={index}>
                                                                    {sumChrome.toFixed(2)}</td>
    
    
                                                                <td style={{verticalAlign:"top" ,fontSize:"13px",fontWeight:"bold"}} colSpan ="2" key={index}>
                                                                    {sumChallan.toFixed(2)}
                                                                    </td>
                                                                
                                                            
                                                           
                                                            {/* {Object.keys(resultData).map(date => (
                                                                <React.Fragment key={date}>
                                                                <td rowSpan="2">{date}</td>
                                                                
                                                                </React.Fragment>
                                                            ))} */}
                                                            
                                                            
                                                            
                                                                    </tbody>
    
                                                                    {/* <tr>
                                                                        <td rowSpan= "2" className="text-right" style={{fontSize:"14px",fontWeight:"bold"}}>Total</td>
                                                                        <td colSpan ="3" style={{fontSize:"14px",fontWeight:"bold"}}>{sumLayouts.toFixed(2)}</td>
                                                                        <td rowSpan= "2" style={{fontSize:"14px",fontWeight:"bold"}}>{sumGrindings.toFixed(2)}</td>
                                                                        <td colSpan ="3" style={{fontSize:"14px",fontWeight:"bold"}}>{sumPlating.toFixed(2)}</td>
                                                                        <td colSpan ="3" style={{fontSize:"14px",fontWeight:"bold"}}>{sumPolishing.toFixed(2)}</td>
                                                                        <td colSpan ="3" style={{fontSize:"14px",fontWeight:"bold"}}>{sumEngravings.toFixed(2)}</td>
                                                                        <td colSpan ="3" style={{fontSize:"14px",fontWeight:"bold"}}>{sumChrome.toFixed(2)}</td>
                                                                        <td colSpan ="2" style={{fontSize:"14px",fontWeight:"bold"}}>{sumChallan.toFixed(2)}</td>
                                                                    </tr> */}
    
                                                                    </>
                                                            )})
                                                        
                                                        )
                                                        :null}
                                                       </>
                                                       
                                                
                                                )}
                                                
                                                </table>
                                            </div>    
                                        </Fragment>
                                    </>
                                )
                            } 
                            </div>  
                        </div>    
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Report;