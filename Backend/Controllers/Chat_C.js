const Chat_M = require('../Models/Chat')

const addChat =async(req,res)=>{
    const {senderId,receiverId} = req.body;
    
    try {
        const newChat = new Chat_M({
            members:[senderId,receiverId]
        })
        const result = await newChat.save()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
const userChat =async(req,res)=>{
    const {userId} = req.params;
    try {
    const result = await Chat_M.find({
        members:{$in:[userId]}
    })

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
const findChat = async (req, res) => {
    try {
        const { firstId, secondId } = req.params;
        const result = await Chat_M.findOne({
            members: { $all: [firstId, secondId] }
        })
        
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {addChat,findChat,userChat}