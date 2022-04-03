This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

- FRONTEND

    All forms created to collect information on the frontend and all forms are required to be submitted


- BACKEND

    [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/employee](http://localhost:3000/api/employee). This endpoint can be edited in `pages/api/employee.js`.

   A Mock Api was created in the `pages/api` directory and is mapped to `/api/*`. The ['pages/api/employee'](http://localhost:3000/api/employee) api is used to get employee's database and make a post request to store an employee's information in the [/data/employeeList'](http://localhost:3000/data/employeeList) (Assuming this is our database).
   
   https://github.com/khrisbreezy/Employee-Form-Database/tree/master/pages



The Example below is how the data is structured and saved to the [database](http://localhost:3000/data/employeeList) (Assuming this is our database)

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
    

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
