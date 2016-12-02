### Express-Protobuf

extend express response. you can use `res.protobuf` to send a protobuf protocol data;


### How to use.
``` javascript 
var protobuf = require('express-protobuf');
app.use(protobuf({
    proto: path.join(__dirname, 'proto/bundle.json'),
    http: true
}));
```

#### options

##### proto 
The `.proto` file path. It should be a `json` format.

#### http 
Specifies the `boolean` or `string` to be the value for support a api for proto defind. 

* `boolean` if `true` the application while offer API to response the protobuf defind. default url is `/proto`. 
* `string` the protobuf defind api url. e.g, `/api/proto`


