import Cookies from "js-cookie";



const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    console.log(response);
    login(response.profileObj);
}

function login(response){    
    var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
    Cookies.set("user", JSON.stringify(response), {
        expires: inFifteenMinutes,
        sameSite: "Lax",
    });
    window.location.reload();
}

const logout = () => {
    return Cookies.remove("user");
};

const getCurrentUser = () => {
    return Cookies.getJSON("user");
};

export {
    login,
    logout,
    getCurrentUser,
    responseGoogle
};
