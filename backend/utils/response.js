/**
 * @name : response
 * @description : to send the response to the user
 * @author : Parshav Shah
 */
 exports.response = (res) => {
    if (!res.code) {
        res.code = 200;
    }
    res.status(res.code);
    var responseData = {
        data: res.data,
        message: res.message,
        status: res.code
    }
    res.send(responseData);
}