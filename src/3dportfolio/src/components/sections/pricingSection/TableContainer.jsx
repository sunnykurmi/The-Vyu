import React, { useState } from 'react'
import { MdAdd } from "react-icons/md";
import Table from './Table';
import TableMobile from './TableMobile';
import { IoIosArrowDown } from "react-icons/io";

const TableContainer = ({plan,setPlan}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div id='table-container'>
            <div className="full-list-btn" onClick={()=>setIsOpen(!isOpen)}>
                <MdAdd /><span className={`${isOpen ? "rotate":""}`}> {isOpen ? "Close full list of features":"Full list of features"} <IoIosArrowDown/></span>
            </div>
            {
                isOpen && <div id='table-wrapper' className="">
                    <h2 id='title-table'>Compare all plan features</h2>
                    <Table />
                    <TableMobile plan={plan} setPlan={setPlan}/>
                </div>
            }
        </div>
    )
}

export default TableContainer