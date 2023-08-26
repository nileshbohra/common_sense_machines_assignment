const dataUri = require('datauri/parser');
const path = require('path');

const parser = (file) => {
    const dUri = new dataUri();
    return dUri.format(path.extname(file.name).toString(), file.data);
}

module.exports = {
    parser: parser
}