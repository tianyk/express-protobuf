var _ = require('lodash');
var protobuf = require('protobufjs');

exports = module.exports = function (opts) {
    console.log('proto: %s', opts.proto);

    if (!opts.proto) throw new Error('proto option required');
    if (!_.endsWith(opts.proto, 'json')) throw new Error('proto should be json format.');

    var schema, root;
    try {
        schema = require(opts.proto);
        console.log('schema: ', schema);
        root = protobuf.Root.fromJSON(schema);
    } catch (e) {
        throw new Error('Can\'t load protocol file. [opts.proto: %s]', opts.proto);
    }

    function protobuf(structure, data) {
        if (arguments.length !== 2) throw new Error('invalid parameters. you need to provide two parameters. '
            + 'the first representative structure name and the second representative response data');

        var module = root.lookup(structure);
        if (!module) throw new Error('structure %s not define.', structure);

        var buffer = module.encode(data).finish();
        res.set('Content-type', 'application/x-protobuf');
        res.send(buffer);
    }

    return function (req, res, next) {
        if (typeof opts.http === 'boolean' && opts.http && req.path === '/proto') {
            res.json(schema);
        } else if (typeof opts.http === 'string' && req.path === opts.http) {
            res.json(schema);
        } else {
            if (res.protobuf) {
                console.warn('You have defined `res.protobuf`.');
                return next();
            }

            res.protobuf = protobuf;
            next();
        }
    }
}