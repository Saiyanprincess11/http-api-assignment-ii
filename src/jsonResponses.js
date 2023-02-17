const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' }); 
    response.write(JSON.stringify(object)); 
    response.end(); 
};

//404 Not Found 
const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    respondJSON(request, response, 404, responseJSON); 
};

const getUsers = (request, response) => {

}; 

const addUser = (request, response) => {


}; 

const notReal = (request, response) => {

}; 

//Exports 

module.exports = {
    notFound, 
    getUsers, 
    addUser, 
    notReal, 
};