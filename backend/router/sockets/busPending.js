const Bus = require("../../models/BusSchema");
require("../../DB/conn");

const busPending = async (seatNumber, finalDate, selBus) => {
    try {
        const busID = selBus._id
        const selectedBus = await Bus.findOne({ _id: busID })
        
        if (selectedBus) {
            } else {
                console.log(`No seat found with number ${seatNumber} on selBus ${selectedBus.busNumber}`);
            }
        
    } catch (error) {
        console.error("Error in busPending:", error);
    }
}

module.exports = busPending;
