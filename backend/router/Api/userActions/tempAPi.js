// const BusRoutes = require("../../../models/RoutesSchema");
const Bus = require("../../../models/BusSchema");
require("../../../DB/conn");
// const data = new BusRoutes({
//     cost: 2000,
//     StartTime: new Date().toISOString().split('T')[1],
//     EndTime: new Date().toISOString().split('T')[1],
//     Days:['Sunday',"Monday","Tuesday"],
//     From: "jhapa",
//     to: "kathmandu"
// })
const data=new Bus({
    routes:["65b25fab36378dfb77d497e2"],
      agencyName: "agency",
      busNumber: 'abc123',
      busRows: 7,
})

data.save()
