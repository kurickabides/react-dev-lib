//ES6 modules jsonfileservice
import fs from 'fs';

let jsonfileservice = function() {
      var service = {
        getJsonFromFile: getJsonFromFile
    };
    return service;

    function getJsonFromFile(file) {

        var json = getConfig(file);
        return json;

        function readJsonFileSync(filepath, encoding) {
            if (typeof (encoding) === 'undefined') {
                encoding = 'utf8';
            }
            var file = fs.readFileSync(filepath, encoding);
            return JSON.parse(file);
        }

        function getConfig(file) {
            var filepath = __dirname + file;
            return readJsonFileSync(filepath);
        }
    }
};
export default jsonfileservice
