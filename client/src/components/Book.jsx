/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    Row, Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
} from 'reactstrap'
import Table from './Table';
const Book = props => {
    const [totalTables, setTotalTables] = useState([])
    const [selection, setSelection] = useState({
        table: {
            name: null,
            id: null
        },
        date: new Date(),
        time: null,
        location: "Any Location",
        size: 0
    })
    const [booking, setBooking] = useState({
        name: "",
        phone: "",
        email: ""
    })
    const [locations] = useState(["Any Location", "Patio", "Inside", "Bar"])
    const [times] = useState([
        "9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
    ])
    const [reservationError, setReservationError] = useState(false)
    const getDate = _ => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const date = months[selection.date.getMonth()] + " " + selection.date.getDate() + " " + selection.date.getFullYear()
        console.log(date,selection.time)
        let time = selection.time 
        console.log(time)
        const datetime = new Date(date + " " + time)
        console.log(datetime)
        return datetime
    }
    const getEmtyTables = _ => {
        let tables = totalTables.filter(table => table.isAvailable);
        return tables.length
    }
    //////////////////////////////
    useEffect(() => {
        if (selection.time && selection.date) (async _ => {
            let datetime = getDate()
            console.log(datetime)
            let res = await fetch("http://localhost:3001/availability", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: datetime
                })
            })
            res = await res.json()
            let tables = res.tables.filter(table =>
                //(table.isAvailable==true)
                (selection.size > 0 ? table.capacity >= selection.size : true) &&
                (selection.location !== "Any Location" ? table.location === selection.location : true)
            )
            setTotalTables(tables)
        })()
    }, [selection.time, selection.location, selection.size, selection.date])
    const reserve = async _ => {
        if (booking.name === 0 | booking.phone.length === 0 | booking.email.length === 0) {
            console.log('Incomplete details')
            setReservationError(true)
        }
        else {
            const datetime = getDate()
            console.log(datetime)
            let res = await fetch("http://localhost:3001/reserve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...booking,
                    date: datetime,
                    table: selection.table.id
                })
            });
            res = await res.text()
            console.log("Reserverd: ", res)
            props.setPage(2)
        }
    };
    //Click to select table
    const selectTable = (table_name, table_id) => {
        setSelection({
            ...selection,
            table: {
                name: table_name,
                id: table_id
            }
        })
    };
    //generate party size dropdown
    const getSizes = _ => {
        let newSizes = [];
        for (let i = 1; i < 8; i++) {
            newSizes.push(
                <DropdownItem
                    key={i} className="booking-dropdown-item"
                    onClick={e => {
                        let newSel = {
                            ...selection,
                            table: {
                                ...selection.table
                            },
                            size: i
                        };
                        setSelection(newSel)
                    }}>{i}</DropdownItem>
            );
        }
        return newSizes;
    }
    const getLocations = _ => {
        let newLocations = [];
        locations.forEach(loc => {
            newLocations.push(<DropdownItem key={loc} className="booking-dropdown-item" onClick={_ => {
                let newSel = {
                    ...selection,
                    table: { ...selection.table }, location: loc
                };
                setSelection(newSel);
            }}>{loc}</DropdownItem>)
        });
        return newLocations;
    }
    const getTimes = _ => {
        let newTimes = [];
        times.forEach(time => {
            newTimes.push(
                <DropdownItem
                    key={time}
                    className="booking-dropdown-item"
                    onClick={_ => {
                        let newSel = {
                            ...selection,
                            table: {
                                ...selection.table
                            },
                            time: time
                        };
                        setSelection(newSel);
                    }}
                >
                    {time}
                </DropdownItem>
            );
        });
        return newTimes;
    };
    const getTables = _ => {
        console.log('getting table');
        if (getEmtyTables() > 0) {
            let tables = [];
            totalTables.forEach(table => {
                if (table.isAvailable) {
                    tables.push(<Table key={table._id} id={table._id} chairs={table.capacity} name={table.name} empty selectTable={selectTable} />)
                    
                }
                else {
                    tables.push(<Table
                        key={table.id}
                        id={table.id}
                        chairs={table.capacity}
                        name={table.name}
                        selectTable={selectTable}
                    />);
                    console.log("pushing")
                }
            });
            console.log(selection.table)
            return tables;
        }
    }
    return (
        <div>
            <Row noGutters className="text-center align-items-center pizza-cta">
                <Col>
                    <p className="looking-for-pizza">
                        {selection.table.id ? "Book a Table" : "Confirm your reservation"}
                        <i className={!selection.table.id ? "fas fa-chair pizza-slice" : "fas fa-clipboard pizza-slice"}></i>
                    </p>
                    <p className="selected-table" >
                        {selection.table.id? "You are booking table " + selection.table.name : null}
                    </p>
                    {reservationError? (
                        <p className="reservation-error">Please fill out the details</p>
                    ):null}
                </Col>
            </Row>
            {!selection.table.id?(
                <div id="reservation-stuff">
                    <Row noGutters className="text-center align-items-center">
                        <Col xs='12' sm='3'>
                            <input
                                type="date" required="required" className="booking-dropdown"
                                value={selection.date.toISOString().split('T')[0]}
                                onChange={e=>{
                                    if(!isNaN(new Date(new Date(e.target.value)))){
                                        let newSel = {
                                            ...selection,
                                            table: {
                                              ...selection.table
                                            },
                                            date: new Date(e.target.value)
                                          };
                                          setSelection(newSel);
                                    }else{
                                        console.log('invalid date');
                                        let newSel={...selection,
                                        table:{...selection.table},date:new Date()};
                                        setSelection(newSel);
                                    }
                                }}
                            ></input>
                        </Col>
                        <Col xs="12" sm="3">
                            <UncontrolledDropdown>
                                <DropdownToggle color="none" caret className="booking-dropdown">
                                    {selection.location}
                                </DropdownToggle>
                                <DropdownMenu right className="booking-dropdown-menu">
                                    {getLocations()}
                                </DropdownMenu>

                            </UncontrolledDropdown>
                        </Col>
                        <Col xs="12" sm="3">
                            <UncontrolledDropdown>
                                <DropdownToggle color="none" className="booking-dropdown">
                                    {selection.size === 0 ? "Please select a party size": selection.size.toString()}
                                </DropdownToggle>
                                <DropdownMenu right className="booking-dropdown-menu">
                                    {getSizes()}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                        <Col xs="12" sm="3">
                            <UncontrolledDropdown>
                                <DropdownToggle className="booking-dropdown" color="none" >
                                        {selection.time==null ? "Please select a time": selection.time}
                                </DropdownToggle>
                                <DropdownMenu right className="booking-dropdown-menu">
                                    {getTimes()}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                    <Row noGutters className="tables-display">
                        <Col>
                            {getEmtyTables() > 0? (
                                <p className="available-tables">{getEmtyTables()} available
                                </p>
                            ):null}
                            {selection.date && selection.time ? (
                                getEmtyTables()> 0? (
                                    <div>
                                        <div className="table-key">
                                            <span className="empty-table"></span>&nbsp; Available &nbsp;&nbsp;
                                            <span className="full-table"></span> &nbsp; Unavailable
                                                &nbsp;&nbsp;
                                        </div>
                                        <Row noGutters>{getTables()}</Row>
                                    </div>
                                ):(
                                    <p className="text-center table-display-message">No Available</p>
                                )):(
                                    <p className="text center table-display-message">Please select date and time</p>
                                )
                            }
                        </Col>
                    </Row>
                </div>
            ) : (
                <div id="confirm-reservation-stuff">
                    <Row noGutters className="text-center justify-content-center reservation-details-container">
                        <Col xs='12' sm='3' className="reservation-details-container">
                            <Input type="text" bsSize='lg' placeholder='Name' className="reservation-input" value={booking.name}
                            onChange={e=>{
                                setBooking({...booking,name:e.target.value})
                            }}
                            />
                        </Col>
                        <Col xs='12' sm='3' className="reservation-details-container">
                            <Input type="text" bsSize='lg' placeholder='Phone' className="reservation-input" value={booking.phone}
                            onChange={e=>{
                                setBooking({...booking,phone:e.target.value})
                            }}
                            />
                        </Col>
                        <Col xs='12' sm='3' className="reservation-details-container">
                            <Input type="text" bsSize='lg' placeholder='Email' className="reservation-input" value={booking.email}
                            onChange={e=>{
                                setBooking({...booking,email:e.target.value})
                            }}
                            />
                        </Col>
                    </Row>
                    <Row noGutters className="text-center">
                        <Col>
                            <button color="none" className="book-table-btn"
                            onClick={_=>{reserve()}}>Book now !!!!
                            </button>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    )
}
export default Book