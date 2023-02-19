const users = {}; //Users Obj

//JSON response methods 
const respondJSON = (request, response, status, object) => {

    //Header object 
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(status, headers); 
    response.write(JSON.stringify(object)); 
    response.end(); 
};

const respondJSONMeta = (request, response, status) => {
    const headers = {
        'Content-Type': 'application/json', 
    }

    response.writeHead(status, headers); 
    response.end(); 
};

//Methods 
//404 Not Found 
const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    respondJSON(request, response, 404, responseJSON); 
};

const notFoundMeta = (request, response) => {
    respondJSONMeta(request, response, 404); 
}; 

const getUsers = (request, response) => {
    const responseJSON = {
        users,
    }; 

    return respondJSON(request, response, 200, responseJSON); 
}; 

const getUsersMeta = (request, response) => {
    return respondJSONMeta(request, response, 200); 
}; 

const addUser = (request, response) => {
    const newUser = {
        name: 'Bob',
        age: 1, 
    }; 

    //Adds new user to Users list 
    users.push(newUser); 

    return respondJSON(request, response, 201, newUser); 
}; 

const updateUser = (request, response) => {

    const editedUser = users; 

    users[editedUser.age] = editedUser; 
    //
    return respondJSON(request, response, 204, editedUser); 

};

const missingParams = (request, response) => {

};

const addUserMeta = (request, response) => {
    return respondJSONMeta(request, response, 201); 
}; 

const notReal = (request, response) => {
    const responseJSON = {
        message: 'The page your looking for is not real.',
        id: 'notReal',
    }; 

    respondJSON(request, response, 404, responseJSON);
}; 

const notRealMeta = (request, response) => {
    respondJSONMeta(request, response, 404);
}; 

//Exports 
module.exports = {
    notFound, 
    notFoundMeta, 
    getUsers, 
    getUsersMeta,
    addUser, 
    addUserMeta, 
    updateUser, 
    notReal, 
    notRealMeta
};