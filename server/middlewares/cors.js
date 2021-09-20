const defaultOption = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST',
    headers: '*'
};

/**
 * 
 * @param {Array} orsOption 
 */
const parseCorsOption = (orsOption) => {
    if(typeof(orsOption) === 'string'){
        return orsOption;
    }else if(typeof(origin) === 'object' && Array.isArray(headers)){
        return orsOption.join(', ');
    }
    return '';
}

const parseCorsHeaders = (headers) => {
    if(typeof(headers) === 'string'){
        return  headers;
    }else if(typeof(headers) === 'object' && Array.isArray(headers)){
        return headers.join(', ');
    }
    return '';
}

const parseCorsMethods = (methods) => {
    if(typeof(methods) === 'string'){
        return  `${methods}, ${defaultOption.methods}`;
    }else if(typeof(methods) === 'object' && Array.isArray(methods)){
        return `${methods.join(', ')}, ${defaultOption.methods}`;
    }
    return '';
}



/**
 * @description cors middleware to Access-Control-Allow-Origin
 * to a particular origin passed as string value.
 * If more than one origin are to be granted access the origins
 * should be passed as array of origins.
 * @param {String | Array} origin 
 */
const cors = (options = defaultOption) => {
    const origin = options.origin;
    const headers = parseCorsHeaders(options.headers ? options.headers : defaultOption.headers);
    const methods = parseCorsMethods(options.methods ? options.methods : defaultOption.methods);
    return (
        (req, res, next) => {
            res.set('Access-Control-Allow-Headers', headers);
            res.set('Access-Control-Allow-Methods', methods);
            if(typeof(origin) === 'string'){
                res.set('Access-Control-Allow-Origin', origin);
            }else if(typeof(origin) === 'object' && Array.isArray(origin)){
                try {
                    const url = new URL(req.header('Referer'));s
                    if(origin.includes(url.origin))
                        res.set('Access-Control-Allow-Origin', url.origin);
                } catch (error) {
                    return next()
                }
                    
            }
            next();
        }
    )
}

module.exports = cors;