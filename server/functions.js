module.exports = {
    handleResponse: ( res, code, statusMsg, data ) => {
        return res.status( code ).json( data )
    }
}
