const Message_M = require('../Models/Message')

const getAllMessages = async(req,res)=>{
    try {
    const result = await Message_M.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const addMessage = async(req,res)=>{
    const { senderId, recieverId, text } = req.body;
    
    // Check if all fields are filled
    if(!senderId || !recieverId || !text){
        return res.status(400).json({ message: "Please fill all fields" });  // return to stop execution
    }
    
    const newMessage = new Message_M({ senderId, recieverId, text });
    
    try {
        const result  = await newMessage.save();
        res.status(200).json(result);  // Send success response
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  // Send error response if there's an issue with saving
    }
}



module.exports ={addMessage,getAllMessages}