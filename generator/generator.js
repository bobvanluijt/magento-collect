/**
 * The generator file generates elements based on Magento 2 Swagger document and template file
 * Author: @bobvanluijt
 */
var magentoSwaggerUrl = "http://devdocs.magento.com/swagger/schemas/latest-2.1.schema.json";

/**
 * Do not edit under this line
 */
var request = require("request"),
    fs      = require('fs');

// reserve variable for restful URN inside this scope
var RESTfulUrn;

// template for documents
const templateSingle = fs.readFileSync("generator/templateSingle.txt", "utf8");

/**
 * Capitalize the first character
 * @param {*String} string 
 */
var capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Generate the HTML files
 * @param {*String} filename 
 * @param {*String} content 
 */
var generateDocument = (filename, content) => {
    try {
        // write to file
        fs.writeFileSync(filename, content, 'utf8');
        console.log("write file: ", filename);
    }
    catch(err) {
        // Sh*t!
        console.error("ERROR => write file: ", filename);
    }
}

/**
 * Generate the Polymer element
 * @param {*String} pathUrn 
 * @param {*Obj} buildObj 
 */
var generatePolymerElement = (pathUrn, buildObj) => {
    var elementNameArray = capitalizeFirstLetter(buildObj.operationId).match(/[A-Z]*[^A-Z]+/g);
        elementNameArray = elementNameArray.slice(0, -4);
    var elementName      = elementNameArray.join("-").toLowerCase();
    var documentName     = "magento-collect-" + elementName + ".html";
    var documentContent  = templateSingle;
    var propertiesJs     = "";

    // edit pathUrn { & } to [[ & ]]
    pathUrn = pathUrn.replace('{', '[[').replace('}', ']]');
 
    // get all available query parameters to create properties
    for (var params in buildObj.parameters) {
        var paramObj = buildObj.parameters[params];
        if(paramObj.in === "path"){
            propertiesJs += paramObj.name + `: { type: String, notify: true },`;
        }
    }

    // replace the RESTful url
    documentContent = documentContent
                        .replace(/%%URLPATH%%/g    , RESTfulUrn + pathUrn)
                        .replace(/%%PROPERTIES%%/g , propertiesJs)
                        .replace(/%%HTMLNAME%%/g   , elementName)
                        .replace(/%%SWAGGERID%%/g  , buildObj.operationId)
                        .replace(/%%DESCRIPTION%%/g, buildObj.description)
    
    // generate the actual documents
    generateDocument(documentName, documentContent);
}

/**
 * Get the operation Ids
 * @param {*String} pathKey 
 * @param {*Obj} pathKeyObject 
 */
var getOperationIds = (pathKey, pathKeyObject) => {
    if(pathKeyObject.get != undefined && pathKeyObject.get.operationId.indexOf("RepositoryV1GetGet") !== -1){
        generatePolymerElement(pathKey, pathKeyObject.get)
    }
}

/**
 * Get te path from the object
 * @param {*Obj} i input obj
 */
var getPaths = (i) => {
  for (var pathKey in i.paths) {
      if (i.paths.hasOwnProperty(pathKey)) {
          getOperationIds(pathKey, i.paths[pathKey])
      }
  }
}

/**
 * Start the request
 */
request({
    url: magentoSwaggerUrl,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        // make url available in global scope
        RESTfulUrn = body.basePath;
        // set the paths based on the body of the response
        getPaths(body)
    }
})