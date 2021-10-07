# Auth
| Url 	|Method| Parameter 	| Response 	|
|:---	|:---	|:--- |:---	|
| /auth/register 	|POST| {username,password,email} 	| success:{status: 200, message}, failure: {status: 403, message} 	|
| /auth/login 	| POST|{username, password} 	| success:{status: 200, token}, failure: {status: 403, message} 	|
|  	|  	|  	|
# API
| Url 	| Method 	| Parameters 	| Response 	|
|---	|---	|---	|---	|
| /api 	| GET 	| None 	| {message: "Welcome to /api!"} 	|
| /api/task/ 	| GET 	| None 	| {message: "Welcome to /api/task!} 	|
| /api/task/create 	| POST 	| user: {id}<br>body: {title, content, endAt, status, level} 	| success: {status: 200, message: "Create task successfully!"}<br>failure: {status: 500, message: "Create task fail!"} 	|
| /api/task/getAll 	| GET 	| user: {id} 	| {status: 200, data} 	|
| /api/task/:id 	| GET 	| user: {id} -> id owner<br>params: {id} -> id task 	| success: {status: 200, data}<br>failure: {status: 404, message: "Task not found!"} 	|
| /api/task/update/:id 	| PUT 	| user: {id} -> id owner<br>params: {id} -> id task<br>body: {title, content, endAt, level, status} 	| success: {status: 200, data:{message: "Update task success!", data}}<br>failure: {status: 500, message: "Update task fail!"} 	|
| /api/task/delete/:id 	| DELETE 	| user: {id} -> id owner<br>params: {id} -> id task 	| success:{status: 200, message: "Delete task success!"}<br>failure: {status: 404, message: "Task not found!"} 	|
# USER
| Url 	| Method 	| Parameter 	| Response 	|
|---	|---	|---	|---	|
| /user/:username/changepassword 	| PUT 	| params: {username}<br>body: {oldpassword, newpassword} 	| success:{status: 200, "Password change successfully! " + message} <br>failure: {status: 403, message} 	|
| /user/:username/update 	| PUT 	| params: {username}<br>body: {email, firstname, lastname, dob, phone} 	| success:{status: 200, data}, <br>failure: {status: 403, message: "User is incorrect format!"} 	|
| /user/:username 	| GET 	| params: {username} 	| success: {status: 200, data: newUser},<br>failure: {status: 403, message: "User not found!"} 	|