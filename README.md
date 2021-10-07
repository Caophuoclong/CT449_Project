# Auth
| Url 	|Method| Parameter 	| Response 	|
|:---	|:---	|:--- |:---	|
| /auth/register 	|POST| {username,password,email} 	| success:{status: 200, message}, failure: {status: 403, message} 	|
| /auth/login 	| POST|{username, password} 	| success:{status: 200, token}, failure: {status: 403, message} 	|
|  	|  	|  	|
# API
| **Url** | **Parameter** | **Response**|
|------|-----------|---------|
||||
# USER
| Url 	| Method 	| Parameter 	| Response 	|
|---	|---	|---	|---	|
| /user/:username/changepassword 	| PUT 	| params: {username}<br>body: {oldpassword, newpassword} 	| success:{status: 200, "Password change successfully! " + message} <br>failure: {status: 403, message} 	|
| /user/:username/update 	| PUT 	| params: {username}<br>body: {email, firstname, lastname, dob, phone} 	| success:{status: 200, data}, <br>failure: {status: 403, message: "User is incorrect format!"} 	|
| /user/:username 	| GET 	| params: {username} 	| success: {status: 200, data: newUser},<br>failure: {status: 403, message: "User not found!"} 	|