export const generateToken = (user,message,statusCode, res)=>{
    const token = user.generateJsonWebToken();

    // older one for cookie
    // const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
    // res.status(statusCode).cookie(cookieName, token, {
    //     expires : new Date(Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 * 1000),
    //     httpOnly : true,
    //     sameSite: "None",
    //     secure : true
    // }).json({
    //     success : true,
    //     message,
    //     user,
    //     token
    // })

    // new one for local storage 
      // Determine the role and assign the token type
    const tokenType = user.role === "Admin" ? "adminToken" : "patientToken";

    // Send the token and role in the response body (instead of using cookies)
    res.status(statusCode).json({
        success: true,
        message,
        user,
        token, // JWT token
        tokenType // Specify the type of token (admin or patient)
    });
    
}
