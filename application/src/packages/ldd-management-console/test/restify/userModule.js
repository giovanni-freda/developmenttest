var usersData = [
    {
        "id": 1,
        "name": "R&D",
        "employees": [
            "Salamander Hammerhead",
            "Bobby Socks",
            "Steve Doublesteve"
        ]
    },
    {
        "id": 2,
        "name": "Sales",
        "employees": [
            "Cobbler Blacksmith",
            "Dunk Johnson",
            "Heather Kerfuffle"
        ]
    },
    {
        "id": 3,
        "name": "IT",
        "employees": [
            "Monica Labrador",
            "Carlos Waterslide",
            "Teddy Nuggets"
        ]
    },
    {
        "id": 4,
        "name": "Support",
        "employees": [
            "Roger Flopple",
            "Natasha Mascara",
            "Kat Skinner"
        ]
    }
];

function send(req, res, next) {
    if (req.params.id != undefined && req.params.id != "") {
        res.send(usersData[req.params.id - 1]);
    }
    else {
        res.send(usersData);
    }
    return next();
}

exports.initEndpoint = function (restifyServer) {
    restifyServer.get('/departments/:id', send);
    restifyServer.get('/departments', send);
};
