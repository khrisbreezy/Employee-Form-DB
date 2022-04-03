
import React, { useState, useEffect } from 'react';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import Select from "react-select";
import { useForm } from "react-hook-form";

import Error from '../components/Error';
import Loader from '../components/UI/Loader';


const Home = () => {

    const { handleSubmit, errors, register, reset } = useForm();

    const [countries, setCountries] = useState(null);
    const [holsAllowance, setHolsAllowance] = useState(null);
    const [showCountryError, setShowCountryError] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [maritalStatus, setMaritalStatus] = useState(null);
    const [showMaritalError, setShowMaritalError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [minDate, setMinDate] = useState(null);

    const marritalStatusList = [
        {label: 'Single', value: 'single'},
        {label: 'Married', value: 'married'}
    ];

    useEffect(() => {
        // Setting the maximum date selection
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        setMinDate(maxDate);
    }, []);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const {data} = await axios.get('https://restcountries.com/v3.1/all');
               const mappedCountry = data.map((country) => {
                    return {
                        name: country.name.common,
                        currencies: country.currencies,
                        languages: country.languages,
                        timezones: country.timezones,
                        label: country.name.common,
                        value: country.name.common,
                        region: country.region
                    }
                });
                setCountries(mappedCountry)
            } catch(e) {
                console.log(e);
            }
        }
        fetchCountry();
    },[]);

    const handleCountryInputChange = (val) => {
        if (val.name === 'Spain') {
            setHolsAllowance(30);
        } else if (val.name === 'Brazil') {
            setHolsAllowance(40);
        } else {
            setHolsAllowance(null);
        }
        setShowCountryError(false);
        setSelectedCountry(val);

    };

    const handleStatusChange = (val) => {
        setShowMaritalError(false);
        setMaritalStatus(val);
    };

    const submitEmployeeForm = async (data) => {
        if (!selectedCountry) {
            setShowCountryError(true);
            return;
        };

        if ((selectedCountry.name === 'Spain' || selectedCountry.name === 'Ghana') && !maritalStatus ) {
            setShowMaritalError(true);
            return;
        }

        data['dateOfBirth'] = data.dateOfBirth.split('-').join('/');
        data['maritalStatus'] = `${maritalStatus ? maritalStatus.label : ''}` || null;
        data['countryInfo'] = selectedCountry;

        if (selectedCountry.region === 'Europe' || selectedCountry.region === 'Asia') {
            data['uniqueId'] = `${data.firstName}${data.lastName}${data.dateOfBirth}`
        }
        
        setLoading(true);

        try {
            const response = await fetch('/api/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const d = await response.json();
            NotificationManager.success('Submitted successfully', '', 4000);
            setLoading(false);
            setInputType('text');
            reset({});
            setSelectedCountry(null);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
       
    };

    return (
        <>
        <header className="banner">
            <div className="banner-container">
                <img src="/img/logo.png" alt="" className='img-fluid logo-img' />
                <h1>Employee Form</h1>
                <p>Helping you employ people all over the world.</p>
            </div>
        </header>
        <section className="form-page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <div className="form-continer">
                            <form onSubmit={handleSubmit(submitEmployeeForm)}>
                                <label>Select Country</label>
                                <Select
                                    value={selectedCountry}
                                    options={countries}
                                    className={"select-tool"}
                                    instanceId="countryId"
                                    onChange={handleCountryInputChange}
                                />

                                {showCountryError && <Error marginBottom={10}>{'Please select a country'}</Error>}

                                <div className="row">
                                    <div className="col-md-6 pr-sm-1">
                                        <label>First Name</label>
                                            <input 
                                            className="form-input" 
                                            type="text" 
                                            name="firstName" 
                                            ref={register({ required: 'This field is required' })}
                                        />

                                        {errors.firstName && <Error>{errors.firstName.message}</Error>}
                                    </div>
                                    <div className="col-md-6 pl-sm-1">
                                        <label>Last Name</label>
                                            <input 
                                            className="form-input"  
                                            type="text" 
                                            name="lastName"
                                            ref={register({ required: 'This field is required' })} 
                                        />

                                        {errors.lastName && <Error>{errors.lastName.message}</Error>}
                                    </div>
                                </div>

                                <label>Date of Birth</label>
                                <input 
                                   
                                    className="form-input" 
                                    type="date" 
                                    id="date"
                                    name="dateOfBirth"
                                    max={minDate}
                                    ref={register({ required: 'This field is required' })} 
                                />

                                {errors.dateOfBirth && <Error>{errors.dateOfBirth.message}</Error>}
                                
                                <label>Holiday Allowance</label>
                                <input      
                                    className="form-input"  
                                    type="number" 
                                    name="holidayAllowance" 
                                    ref={register({ required: `This field is required`})}
                                    max={holsAllowance}
                                    required
                                />

                                {errors.holidayAllowance && <Error>{errors.holidayAllowance.message}</Error>}

                                {(selectedCountry && (selectedCountry.name === 'Spain' || selectedCountry.name === 'Ghana') ) &&
                                <>
                                    <label>Marital Status</label>
                                    <Select
                                        options={marritalStatusList}
                                        className={"select-tool"}
                                        instanceId="maritalStatusId"
                                        onChange={handleStatusChange}
                                    />
                                </>}
                        

                                {showMaritalError && <Error>{'This field is required'}</Error>}

                                {((maritalStatus && maritalStatus.value === 'married') && (selectedCountry &&  selectedCountry.name === 'Ghana' )) && 
                                <>
                                    <label>Number of Children</label>
                                    <input 
                                    className="form-input"  
                                    type="text" 
                                    name="numberOfChildren" 
                                    ref={register({ required: 'This field is required' })}
                                />

                                {errors.numberOfChildren && <Error>{errors.numberOfChildren.message}</Error>}
                                </>}
                                
                                <label>Social Insurance Number</label>
                                <input 
                                    className="form-input"  
                                    type="number" 
                                    name="socialInsuranceNumber" 
                                    ref={register({ required: 'This field is required' })}
                                />

                                {errors.socialInsuranceNumber && <Error>{errors.socialInsuranceNumber.message}</Error>}

                                <label>Working Hours</label>
                                <input      
                                    className="form-input"  
                                    type="number" 
                                    name="workingHours" 
                                    ref={register({ required: 'This field is required'})}
                                />

                                {errors.workingHours && <Error>{errors.workingHours.message}</Error>}

                                <div className="tandc d-flex align-items-baseline">
                                    <input 
                                    className='mr-2'
                                    type="checkbox" 
                                    name="termsAndCondition"
                                    ref={register({ required: 'This field is required' })}
                                    id="inlineRadio2" />
                                    <label htmlFor="inlineRadio2">I agree that all the information stated in this form is right and correct.</label>
                                </div>

                                {errors.termsAndCondition && <Error>{errors.termsAndCondition.message}</Error>}

                                <div className="text-center">
                                    <button type='submit' disabled={loading} className="btn btn-blue mt-4">
                                        {!loading ? 'Submit' : <Loader />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
  
};

export default Home;

