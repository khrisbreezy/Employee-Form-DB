import { employeeList } from "../../../data/employeeList"

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Get request for employee list
        res.status(200).json(employeeList);
    } else if(req.method === 'POST') {
         // Post request for employee list and store in the employeeList Database
        const list = req.body;
        const newList = {
            id: Date.now(),
            ...list
        };
        employeeList.push(newList);
        res.status(201).json(newList);
    }
}