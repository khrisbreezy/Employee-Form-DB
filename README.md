# Employee-Form-Database
This is a code test for Crowdforce


# Employee-Form-Database
This is a code test for Crowdforce


- SETUP


         Run npm install


- FRONTEND

    All forms created to collect information on the frontend and all forms a required to be submitted


BACKEND

   A Mock Api was created in the ['pages/api/employee'](/pages/api/employee) to get employee's data base and make a post request to store an employee's information in the [/data/employeeList'](data/employeeList) (Assuming this is our database).



The Example below is how the data is structured and saved to the [database](data/employeeList) (Assuming this is our database)

    [
        {
            countryInfo: {name: "Spain", currencies: {EUR: {name: "Euro", symbol: "€"}}, languages: {spa: "Spanish"},…}
            dateOfBirth: "1985/01/01"
            firstName: "Joe"
            holidayAllowance: "30"
            id: 1648992214522
            lastName: "Biden"
            maritalStatus: "Married"
            socialInsuranceNumber: "1234567"
            termsAndCondition: true
            uniqueId: "JoeBiden1985/01/01"
            workingHours: "8"
        }
    ]
    
