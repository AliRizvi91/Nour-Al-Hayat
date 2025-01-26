const Connect_DB = require('../Connect_DB/Connect_DB')
const mongoose = require('mongoose')

//___---- Model----___

const Booking_M = require('../Models/Booking')
const City_M = require('../Models/City')
const CityAreas_M = require('../Models/CityArea')
const Contact_M = require('../Models/Contact')
const Country_M = require('../Models/Country')
const Hotel_M = require('../Models/Hotel')
const Province_M = require('../Models/Province')
const Role_M = require('../Models/Role')
const Room_M = require('../Models/Room')
const Status_M = require('../Models/Status')
const User_M = require('../Models/User')


//-------////---------- Data init ----------////--------


//--_ initBooking

const initBooking = async () => {
    try {
        const Booking = [
            { 'UserId': "66570369fc6c75190dfe3fa8", "RoomId": "66570369fc6c75190dfe3f9f", "StartDate": '2022-12-12', "EndDate": "2024-12-3", "Guests": "1", "StatusId": "66570369fc6c75190dfe3fa2" },
            { 'UserId': "66570369fc6c75190dfe3fa9", "RoomId": "66570369fc6c75190dfe3fa0", "StartDate": '2020-12-8', "EndDate": "2022-12-10", "Guests": "2", "StatusId": "66570369fc6c75190dfe3fa3" },
            { 'UserId': "66570369fc6c75190dfe3fa9", "RoomId": "66520153eeb57f6f401547a1", "StartDate": '2018-12-28', "EndDate": "2020-12-6", "Guests": "3", "StatusId": "66570369fc6c75190dfe3fa4" },
        ]

        const x = await Booking_M.insertMany(Booking)

    } catch (error) {
        return console.log(error.message)
    }
}


//--_ initCity

const initCity = async () => {
    try {
        const City = [
            { "Name": "Lahore", "ProvinceId": "66570369fc6c75190dfe3f9a" },
            { "Name": "Karachi", "ProvinceId": "66570369fc6c75190dfe3f9a" },
            { "Name": "Islamabad", "ProvinceId": "66570369fc6c75190dfe3f9a" },
            { "Name": "Rawalpindi", "ProvinceId": "66570369fc6c75190dfe3f9b" },
            { "Name": "Faisalabad", "ProvinceId": "66570369fc6c75190dfe3f9b" },
            { "Name": "Multan", "ProvinceId": "66570369fc6c75190dfe3f9b" },
            { "Name": "Hedarabad", "ProvinceId": "66570369fc6c75190dfe3f9b" },
            { "Name": "Peshawar", "ProvinceId": "66570369fc6c75190dfe3f9c" },
            { "Name": "Quetta", "ProvinceId": "66570369fc6c75190dfe3f9c" },
            { "Name": "Gujranwala", "ProvinceId": "66570369fc6c75190dfe3f9c" },
        ]

        const x = await City_M.insertMany(City)

    } catch (error) {
        return console.log(error.message)
    }
}


//--_ initCityArea

const initCityArea = async () => {
    try {
        const CityArea = [
            { "Name": "Bagriyan", "CityId": "66570369fc6c75190dfe3f7d" },
            { "Name": "Gulshan-e-Iqbal", "CityId": "66570369fc6c75190dfe3f7e" },
            { "Name": "Sector F-7", "CityId": "66570369fc6c75190dfe3f7f" },
            { "Name": "Saddar", "CityId": "66570369fc6c75190dfe3f80" },
            { "Name": "Gulberg", "CityId": "66570369fc6c75190dfe3f81" },
            { "Name": "Bosan Road", "CityId": "66570369fc6c75190dfe3f82" },
            { "Name": "Latifabad", "CityId": "66570369fc6c75190dfe3f83" },
            { "Name": "Hayatabad", "CityId": "66570369fc6c75190dfe3f84" },
            { "Name": "Satellite Town", "CityId": "66570369fc6c75190dfe3f85" },
            { "Name": "Model Town", "CityId": "66570369fc6c75190dfe3f86" },
        ]

        const x = await CityAreas_M.insertMany(CityArea)

    } catch (error) {
        return console.log(error.message)
    }
}


//--_ initContact

const initContact = async () => {
    try {
        const Contact = [
            {
                "Message": `
            "Hey [Usman Akbar],
            
            Just wanted to drop you a quick message to say how grateful I am to have you in my life. You've been there through thick and thin, always supporting me, cheering me up, and making every moment memorable.
            
            Our laughs, our talks, our adventures—they mean the world to me. You're more than a friend; you're family, the one I can always count on no matter what.
            
            As life gets busy and things change, know that you're always on my mind and in my heart. Here's to many more years of laughter, love, and unforgettable moments together.
            
            Thank you for being the amazing person you are.
            
            Catch up soon!
            "`, "Name": "Ali", "Email": "usman1@gmail.com", "Subject": "Friendship"
            },


            {
                "Message": `
            "Hey [Awais Munir],
            
            Just wanted to drop you a quick message to say how grateful I am to have you in my life. You've been there through thick and thin, always supporting me, cheering me up, and making every moment memorable.
            
            Our laughs, our talks, our adventures—they mean the world to me. You're more than a friend; you're family, the one I can always count on no matter what.
            
            As life gets busy and things change, know that you're always on my mind and in my heart. Here's to many more years of laughter, love, and unforgettable moments together.
            
            Thank you for being the amazing person you are.
            
            Catch up soon!
            "`, "Name": "Ali", "Email": "awais1@gmail.com", "Subject": "Friendship"
            },
            {
                "Message": `
            "Hey [Ahmad Bashir],
            
            Just wanted to drop you a quick message to say how grateful I am to have you in my life. You've been there through thick and thin, always supporting me, cheering me up, and making every moment memorable.
            
            Our laughs, our talks, our adventures—they mean the world to me. You're more than a friend; you're family, the one I can always count on no matter what.
            
            As life gets busy and things change, know that you're always on my mind and in my heart. Here's to many more years of laughter, love, and unforgettable moments together.
            
            Thank you for being the amazing person you are.
            
            Catch up soon!
            "`, "Name": "Ali", "Email": "ahmad1@gmail.com", "Subject": "Friendship"
            },
        ]

        const x = await Contact_M.insertMany(Contact)

    } catch (error) {
        return console.log(error.message)
    }
};




//--_ initCountry

const initCountry = async () => {
    try {
        const Country = [
            {
                Name: "Pakistan",
                Code: "PK"
            },
            {
                Name: "United States",
                Code: "US"
            },
            {
                Name: "United Kingdom",
                Code: "UK"
            },
            {
                Name: "Canada",
                Code: "CA"
            }
        ];

        const x = await Country_M.insertMany(Country)

    } catch (error) {
        return console.log(error.message)
    }
}


//--_ initHotel

const initHotel = async () => {
    try {
        const Hotel = [
            {
                Name: "Luxury Hotel", Description: 'Indulge in opulence at our luxury hotel, where every detail whispers elegance and sophistication. From lavish accommodations to impeccable service, immerse yourself in a world of refined luxury and timeless charm.', ContactNumber: "0302-635475...",
                CityAreaId: "66570369fc6c75190dfe3f86" // Assuming this is a valid ObjectId for a city area
            },
            {
                Name: "Comfort Inn", Description: `Experience warmth and convenience at Comfort Inn, where cozy accommodations and friendly service await. Embrace comfort without compromise in our welcoming atmosphere, perfect for both leisure and business travelers alike.`, ContactNumber: "0302-635475...",
                CityAreaId: "66570369fc6c75190dfe3f87" // Assuming this is a valid ObjectId for a city area
            },
            {
                Name: "Grand Plaza", Description: `Elevate your stay to new heights at Grand Plaza, where modern luxury meets timeless grandeur. From breathtaking views to impeccable service, immerse yourself in a world of sophistication and indulgence at our prestigious address.`, ContactNumber: "0302-635475...",
                CityAreaId: "66570369fc6c75190dfe3f88" // Assuming this is a valid ObjectId for a city area
            }
        ];

        const x = await Hotel_M.insertMany(Hotel)

    } catch (error) {
        return console.log(error.message)
    }
}



//--_ initProvince

const initProvince = async () => {
    try {
        const Provinces = [
            { "Name": "Punjab", "CountryId": "66570369fc6c75190dfe3f93" },
            { "Name": "Balochistan", "CountryId": "66570369fc6c75190dfe3f93" },
            { "Name": "Islamabad", "CountryId": "66570369fc6c75190dfe3f93" },
        ]
        const x = await Province_M.insertMany(Provinces)

    } catch (error) {
        return console.log(error.message)
    }
}


//--_ initRole

const initRole = async () => {
    try {
        const Roles = [
            { "Name": "Admin" },
            { "Name": "Guest" },
        ]
        const x = await Role_M.insertMany(Roles)

    } catch (error) {
        return console.log(error.message)
    }
}


//--_ initRoom

const initRoom = async () => {
    try {
        const Room = [
            {
                RoomType: "Standard",
                RoomNumber: 101,
                Description: "Cozy standard room with a view",
                Price: "$100",
                Facilities: "Wifi, TV, Air conditioning",
                Capacity: "2",
                RoomImage: "standard_room_image.jpg",
                HotelId: "66570369fc6c75190dfe3f97" // Assuming this is a valid ObjectId for a hotel
            },
            {
                RoomType: "Deluxe",
                RoomNumber: 201,
                Description: "Spacious deluxe room with luxury amenities",
                Price: "$150",
                Facilities: "Wifi, TV, Mini-bar, Jacuzzi",
                Capacity: "2",
                RoomImage: "deluxe_room_image.jpg",
                HotelId: "66570369fc6c75190dfe3f98" // Assuming this is a valid ObjectId for a hotel
            },
            {
                RoomType: "Suite",
                RoomNumber: 301,
                Description: "Luxurious suite with separate living area",
                Price: "$250",
                Facilities: "Wifi, TV, Mini-bar, Jacuzzi, Kitchenette",
                Capacity: "4",
                RoomImage: "suite_room_image.jpg",
                HotelId: "66570369fc6c75190dfe3f99" // Assuming this is a valid ObjectId for another hotel
            }
        ]
        const x = await Room_M.insertMany(Room)

    } catch (error) {
        return console.log(error.message)
    }
}



//--_ initStatus

const initStatus = async () => {
    try {
        const Status = [
            { Name: "Pending" },
            { Name: "Approved" },
            { Name: "Rejected" },
            { Name: "Occupied" },
            { Name: "Vacant" },
            { Name: "Under Maintenance" }
        ]
        const x = await Status_M.insertMany(Status)

    } catch (error) {
        return console.log(error.message)
    }
}


//--_ initUser

const initUser = async () => {
    try {
        const User = [
            {
                Name: "John Doe",
                Email: "johndoe@example.com",
                Password: "hashedPassword123", // Assuming you're using hashed passwords
                ContactNo: "1234567890",
                CityArea: "66570369fc6c75190dfe3f86", // Assuming this is a valid ObjectId for a city area
                RoleId: "66570369fc6c75190dfe3f9d", // Assuming this is a valid ObjectId for a role
                BookingId: "66570369fc6c75190dfe3f7a" // Assuming this is a valid ObjectId for a booking
            },
            {
                Name: "Jane Smith",
                Email: "janesmith@example.com",
                Password: "hashedPassword456", // Assuming you're using hashed passwords
                ContactNo: "9876543210",
                CityArea: "66570369fc6c75190dfe3f87", // Assuming this is a valid ObjectId for a city area
                RoleId: "66570369fc6c75190dfe3f9e", // Assuming this is a valid ObjectId for a role
                BookingId: "66570369fc6c75190dfe3f7b" // Assuming this is a valid ObjectId for a booking
            }
        ];
        const x = await User_M.insertMany(User)

    } catch (error) {
        return console.log(error.message)
    }
}


const addbasedata = () => {
    // initBooking(),
    //     initCity(),
    //     initCityArea(),
    //     initContact(),
    //     initCountry(),
    //     initHotel(),
    //     initProvince(),
    //     initRole(),
    //     initRoom(),
    //     initStatus(),
    //     initUser()
};

module.exports = { addbasedata }