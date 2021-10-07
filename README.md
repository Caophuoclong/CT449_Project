# Auth
| Url 	| Parameter 	| Response 	|
|:---	|:---	|:---	|
| /auth/register 	| {username,password,email} 	| success:{status: 200, message}, failure: {status: 403, message} 	|
| /auth/login 	| {username, password} 	| success:{status: 200, token}, failure: {status: 403, message} 	|
|  	|  	|  	|
# API
| **Url** | **Parameter** | **Response**|
|------|-----------|---------|
||||
# USER
| Url 	| Parameter 	| Response 	|
|:---:	|:---:	|:---:	|
| /user/:username/changepassword 	| params: {username}<br>body: {oldpassword, newpassword} 	| success:{status: 200, "Password change successfully! " + message} <br>failure: {status: 403, message} 	|
| /user/:username/update 	| params: {username}<br>body: {email, firstname, lastname, dob, phone} 	| success:{status: 200, data}, <br>failure: {status: 403, message: "User is incorrect format!"} 	|
| /user/:username 	| params: {username} 	| success: {status: 200, data: newUser},<br>failure: {status: 403, message: "User not found!"} 	|