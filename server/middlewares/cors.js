const defaultOption = {
    origin: '',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST'],
    headers: '',
    allowAllOrigin: false,
    allowAllHeaders: false,
};

const parseHeaders = (headers) => {
    if (typeof (headers) === 'string') {
        return headers;
    } else if (typeof (headers) === 'object' && Array.isArray(headers)) {
        return headers.join(', ');
    }
    return '';
}

const parseMethods = (methods) => {
    if(methods){
        const tempArr = [...defaultOption.methods];
        
            const sl = (typeof (methods) === 'string') ? methods.split(',')
            : (typeof (methods) === 'object' && Array.isArray(methods)) ? [...methods]
            : [];

            for(let s of sl){
                const st = s.toUpperCase().trim()
                if(!defaultOption.methods.includes(st)){
                    tempArr.push(st)
                }
            }
            return tempArr.join(', ');
    }
    return defaultOption.methods.join(', ');
}

/**
 * @description cors middleware to Access-Control-Allow-Origin
 * to a particular origin passed as string value.
 * If more than one origin are to be granted access the origins
 * should be passed as array of origins.
 * @param {String | Array} origin 
 */
const cors = (options = defaultOption) => {
    let origin = '';
    let headers = '';
    const methods = parseMethods(options.methods);
    const allowAllOrigin = options.allowAllOrigin ? options.allowAllOrigin : defaultOption.allowAllOrigin;
    const allowAllHeaders = options.allowAllHeaders ? options.allowAllHeaders : defaultOption.allowAllHeaders;
    
    if(typeof(options) === 'string'){
        origin = options;
    }else{
        origin = options.origin;
    }
    
    if(allowAllHeaders === true){
        headers = '*';
    }else {
        headers = parseHeaders(options.headers ? options.headers : defaultOption.headers);
    }
    
    return (
        (req, res, next) => {
            res.set('Access-Control-Allow-Headers', headers);
            res.set('Access-Control-Allow-Methods', methods);
            if(allowAllOrigin === true) {
                res.set('Access-Control-Allow-Origin', '*');
            } else if (typeof (origin) === 'string') {
                try {
                    const url = new URL(origin);
                    res.set('Access-Control-Allow-Origin', url.origin);
                } catch (error) {
                    return next()
                }
            } else if (typeof (origin) === 'object' && Array.isArray(origin)) {
                try {
                    const url = new URL(req.header('Referer'));
                    if (origin.includes(url.origin))
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