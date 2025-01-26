const Room_C = require('../Models/Room')
const {uploadOnCloudinary} = require('../Services/cloudinary')

//___---- Get All Rooms----___

async function getAllRooms(req, res) {
  try {
    const Room = await Room_C.find();
    return res.status(200).json(Room);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get all Rooms " });
  }
}

//___---- Get Room by Id----___

async function getRoom(req, res) {
  try {
    const id = req.params.id
    const RoomId = await Room_C.findById(id);
    return res.status(200).json(RoomId);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get Room by Id " });
  }
}


//___---- Create Room----___
async function createRoom(req, res) {
  try {
    // Check if multer middleware encountered any error
    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }

    // Extract Room data from the request body
    const { roomType, roomNumber, description, price, facilities, capacity ,squareMeter,bedrooms,bathrooms } = req.body;

    const imageLocalPath = req.file?.path;
    console.log("imageLocalPath",imageLocalPath);
    
    if (!imageLocalPath) {
      return res.status(404).json({ message: 'Image is required' })
    }
    const image = await uploadOnCloudinary(imageLocalPath)
    if (!image) {
      return res.status(500).json({ msg: "Image upload failed" });
    }
    if (!image) return res.status(404).json({ message: 'Image is not Uploaded' })
    const roomdata = { roomType, roomNumber, description, price, facilities, capacity,squareMeter,bedrooms,bathrooms, roomImage: image }
    const addedRoom = await Room_C.create(roomdata)
    console.log(addedRoom)
    return res.json(addedRoom)
  } catch (error) {
    // Haddled error
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" })
  }
}


//___---- Update Room----___

async function updateRoom(req, res) {
  try {
      const RoomId = req.params.id;
      const imageLocalPath = req.file?.path; // Get image from request file
      
      // Ensure image is provided or handle accordingly
      let image;
      if (imageLocalPath) {
          image = await uploadOnCloudinary(imageLocalPath); // Function to upload to Cloudinary
      }

      const { roomType, roomNumber, description, price, facilities, capacity, squareMeter, bedrooms, bathrooms } = req.body;

      
      // Validate all required fields
      if (!roomType || !roomNumber || !description || !price || !facilities || !capacity || !squareMeter || !bedrooms || !bathrooms) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      // Find and update the room in the database
      const updatedRoom = await Room_C.findByIdAndUpdate(RoomId, { 
          roomType, roomNumber, description, price, facilities, capacity, squareMeter, bedrooms, bathrooms, 
          roomImage: image // Ensure the image is updated if provided
      }, { new: true });

      if (!updatedRoom) {
          return res.status(404).json({ message: 'Room not found' });
      }

      return res.status(200).json(updatedRoom);
  } catch (error) {
      console.error('Error updating room:', error);
      return res.status(500).json({ message: 'Failed to update room' });
  }
}



//___---- Delete Room----___

async function deleteRoom(req, res) {
  try {
    const RoomId = req.params.id;
    const deleted = await Room_C.findByIdAndDelete(RoomId);
    if (!deleted) return res.status(404).json({ message: `Failed to Delete Room because .It is not Found` });
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: `Failed to delete Room` });
  }
}
module.exports = {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom
}
