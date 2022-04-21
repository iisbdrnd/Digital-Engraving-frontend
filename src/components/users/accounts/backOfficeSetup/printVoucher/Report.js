import React, { Fragment, useEffect, useReducer, useState, useRef } from 'react';
import { userGetMethod, userDeleteMethod, userPostMethod } from '../../../../../api/userAction';
import { PrintVoucherReportAPI } from '../../../../../api/userUrl';
import { toast } from 'react-toastify';
import useForm from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import '../accountReport.css';
import ReportHeader from '../reportHeader';
import Pagination from "react-js-pagination";
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas';


const Report = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    // const [selected, setSelected] = useState(false);
    
    const [submit, setSubmit] = useState(true);
    const [inputData, setInputData] = useState({});
    const [ voucherData, setVoucherData] = useState();
    const [ voucherName, setVoucherName] = useState();
    const [ debitAmount, setDebitAmount ] = useState(0);
    const [currentPage, setCurrentPage] = useState();
    const [perPage, setPerPage] = useState();
    const [totalData, setTotalData] = useState(0);

    var menuId = 0;
    if (props.location.state === undefined) {
        var menuId = 0;
    }else{
        menuId = props.location.state.params.menuId;
    }

    const search = props.location.search; 
    const params = new URLSearchParams(search); 
    const voucher_type = params.get('voucher_type');

    const defaultPerPage = 2;

    if(voucher_type == 1){
        var tran_no = params.get('tran_no'); 
        var tran_date = params.get('tran_date'); 
    }else if(voucher_type == 2){
        var from_date = params.get('from_date'); 
        var to_date = params.get('to_date'); 
    }

    useEffect((data, e) => {
        setIsLoading(true);

        if(voucher_type == 1){
            var url = `${PrintVoucherReportAPI}?voucher_type=1&tran_no=${tran_no}&tran_date=${tran_date}`;
        }else{
            var url = `${PrintVoucherReportAPI}?voucher_type=2&from_date=${from_date}&to_date=${to_date}`;
        }

        userGetMethod(url) 
        .then(response => {
            console.log('res', response.data);
            setInputData(
                (prevstate) => ({
                    ...prevstate,
                    ['voucher_type']: response.data.input.voucher_type,
                    ['tran_no'] : response.data.input.tran_no,
                    ['tran_date'] : response.data.input.tran_date,
                    ['from_date'] : response.data.input.from_date,
                    ['to_date'] : response.data.input.to_date,
                })
            );

            handlePageChange();

        })
        .catch(error => console.log(error))
    },[]);


    const handlePageChange = (pageNumber = 1) => {

        setIsLoading(true);

        if(voucher_type == 1){
            var url = `${PrintVoucherReportAPI}?voucher_type=1&tran_no=${tran_no}&tran_date=${tran_date}`;
        }else{
            var url = `${PrintVoucherReportAPI}?voucher_type=2&from_date=${from_date}&to_date=${to_date}`;
        }

        userGetMethod(`${url}?page=${pageNumber}`)
            .then(response => {
                console.log("pageNumber", pageNumber);
                setVoucherName(response.data.voucher_names);
                setCurrentPage(pageNumber);
                setPerPage(defaultPerPage);
                setTotalData(Object.values(response.data.vouchers).length);
                if(pageNumber > 1){
                    var startArray = (pageNumber-1)*defaultPerPage;
                    var endArray = pageNumber * defaultPerPage;
                    setVoucherData(Object.values(response.data.vouchers).slice(startArray, endArray));
                }else{
                    setVoucherData(Object.values(response.data.vouchers).slice(0,defaultPerPage));
                }
                
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const viewAllData = () => {
        setIsLoading(true);
        if(voucher_type == 1){
            var url = `${PrintVoucherReportAPI}?voucher_type=1&tran_no=${tran_no}&tran_date=${tran_date}`;
        }else{
            var url = `${PrintVoucherReportAPI}?voucher_type=2&from_date=${from_date}&to_date=${to_date}`;
        }

        userGetMethod(url)
            .then(response => {
                setVoucherName(response.data.voucher_names);
                setVoucherData(Object.values(response.data.vouchers));
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const titleStyle = {
        "fontSize" : "16px",
        "fontWeight": "bold",
        "textDecoration": "underline"
    }

    const tableStyle = {
        "border" : "1px solid #ccc",
        "margin" : "2% 1% 2% 0%"
    }

    const voucherFooterTd = {
        "textDecoration" : "overline"
    }

    var debit_amount;
    var credit_amount;

    const Debit = (amount) => {
        if(amount == "zero"){
            debit_amount = 0;
            return "";
        }else{
            debit_amount += amount;
            return amount;
        }
        
    }

    const Credit = (amount) => {
        if(amount == "zero"){
            credit_amount = 0;
            return "";
        }else{
            credit_amount += amount;
            return amount;
        }
        
    }

    const printDocument = () => {
        window.print();

        console.log('v_data', voucherData);
    }

    const pdfDocument = () => {
        var myWindow = window.open('', '', 'height=800,width=1200');
        var data = document.getElementById("PrintDiv").innerHTML;
        myWindow.document.write(data);
        const doc = new jsPDF();
         
        //get table html
        //const pdfTable = document.getElementById('PrintDiv');
        //html to pdf format
        var html = htmlToPdfmake(data);
    
        const documentDefinition = { content: html };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open();
    }

    

    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="">

                            <Pagination 
                                activePage={currentPage}
                                itemsCountPerPage={perPage}
                                totalItemsCount={totalData}
                                onChange={handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                firstPageText="First"
                                lastPageText="Last"
                            />  

                            <button className="btn btn-info viewAllBtn" onClick={viewAllData}>View All</button>

                            <ReportHeader reportTtile="Print Voucher Report" />

                            <div className="mainDiv" style={{"padding": "2%"}}>
                            {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                (
                                    <div className="row">
                                       <div className="print_button">
                                            <button 
                                                className="btn btn-default" 
                                                onClick={printDocument}
                                            >
                                            <i className="fa fa-print" aria-hidden="true"></i> Print</button>
                                            &nbsp;
                                            <button
                                                className="btn btn-default"
                                                onClick={pdfDocument}
                                            >
                                            <i className="fa fa-file-pdf-o" aria-hidden="true"></i>Pdf</button>
                                        </div>

                                        <div id="PrintDiv" style={{"width": "100%"}}>
                                            { (Object.keys(voucherData).length > 0) ? 
                                                (
                                                    Object.values(voucherData).map( (row, key) => (

                                                    <table width="100%"  style={tableStyle}>
                                                        <thead></thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="text-center" align="center" colSpan="4" className="border-none" style={{"border": "none"}}>
                                                                    <p className="title" style={titleStyle}>{ voucherName[ row[0].transaction_status-1 ] } </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td width="50%" colSpan="2" align="left" valign="middle" >Voucher No : {row[0].voucher_type+'-'+row[0].instrument_no}</td>
                                                                <td width="50%" colSpan="2">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td width="50%" colSpan="2" align="left" valign="middle">Transaction No : {row[0].transaction_no}</td>
                                                                <td width="50%" colSpan="2" align="right" valign="middle">Date: {row[0].transaction_date}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="4" height="10"></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="4">
                                                                    <table className="particulars table table-bordered table-stripped" style={{"width" : "100%"}}>
                                                                        <thead>
                                                                            <tr>
                                                                                <th width="15%" align="left" valign="middle">Code</th>
                                                                                <th align="left" valign="middle">Particulars</th>
                                                                                <th width="15%" align="right" valign="middle">Debit</th>
                                                                                <th width="15%" align="right" valign="middle">Credit</th>
                                                                            </tr>
                                                                        </thead>

                                                                        {Debit("zero")}
                                                                        {Credit("zero")}
                                                                
                                                                        <tbody>
                                                                            {row.map((item, index) =>  
                                                                                (
                                                                                    <tr>
                                                                                        <td>{item.account_code}</td>
                                                                                        <td>{item.account_head}</td>
                                                                                        <td align="right" valign="middle">{Debit(item.debit_amount)}</td>
                                                                                        <td align="right" valign="middle">{Credit(item.credit_amount)}</td>
                                                                                    </tr>   
                                                                                        
                                                                                )           
                                                                            )}
                                                                        </tbody>
                                                                        <tfoot>
                                                                            <tr>
                                                                                <td align="right" colSpan="2"><strong>Total:</strong></td>
                                                                                <td align="right" valign="middle"><strong>{debit_amount}</strong></td>
                                                                                <td align="right" valign="middle"><strong>{credit_amount}</strong></td>
                                                                            </tr>
                                                                        </tfoot>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="4">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td width="16%" align="left" valign="middle" style={voucherFooterTd}>Prepared by</td>
                                                                <td width="34%" align="center" valign="middle" style={voucherFooterTd}>Accountant</td>
                                                                <td width="25%" align="center" valign="middle" style={voucherFooterTd}>Amount Received by</td>
                                                                <td width="25%" align="right" valign="middle" style={voucherFooterTd}>Approved by</td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot></tfoot>
                                                    </table>

                                                
                                                    ))
                                                ) : 

                                                (
                                                    <div className="voucher"><p className="text-center">Data not found..</p></div>
                                                )

                                            }
                                        </div>
                                    
                                    </div>
                                )
                            }

                            </div>  
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </Fragment>
    );
};

export default Report;