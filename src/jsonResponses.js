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

const addUser = (request, response, body) => {
    const responseJSON = {
        message: 'Name and age are both required.',
    }

    //Checks to make sure both name and age 
    if(!body.name || !body.age) {
        responseJSON.id = 'missingParams'; 
        return respondJSON(request, response, 400, responseJSON); //otherwise sends a 400 code 
    }

    //Default status code
    let responseCode = 204; 

    if(!users[body.name]){
        responseCode = 201;
        users[body.name] = {};
    }

    users[body.name].name = body.name;
    users[body.name].age = body.age; 

    if(responseCode === 201){
        responseJSON.message = 'Created Successfully';
        return respondJSON(request, response, responseCode, respondJSON); 
    }

    return respondJSONMeta(request, response, responseCode); 
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

const updateUser = (request, response) => {
    //change to make to user
    //This is just a dummy object for example
    const newUser = {
      createdAt: Date.now(),
    };
  
    // modifying our dummy object
    // just indexing by time for now
    users[newUser.createdAt] = newUser;
  
    //return a 201 created status
    return respondJSON(request, response, 201, newUser);
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
    addUser,
    getUsers, 
    getUsersMeta,
    updateUser, 
    notReal, 
    notRealMeta
};