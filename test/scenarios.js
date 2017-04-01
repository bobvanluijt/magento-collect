'use strict';
/*                        .                    . .        .  
                          _|_                   | |       _|_ 
.--.--. .-.  .-.. .-. .--. |  .-.  ____  .-..-. | | .-. .-.|  
|  |  |(   )(   |(.-' |  | | (   )      (  (   )| |(.-'(   |  
'  '  `-`-'`-`-`| `--''  `-`-'`-'        `-'`-' `-`-`--'`-'`-'
             ._.'   https://github.com/bobvanluijt/magento-collect
*/

var assert  = require('assert');
var request = require('supertest');
var should  = require('should');

var magentoRestUrl = 'http://localhost/index.php/rest/default/V1'; // set in travis yaml file.

describe('Alice\'s Shopping Experience', () => {

    it('should get a product', function(done) {

        this.timeout(10000);                // set timeout to 10seconds because all caches are disabled

        request(magentoRestUrl)             // set the request url
            .get('/products/24-MB01')       // always JSON
            .expect('Content-Type', /json/) // always JSON
            .expect(200, (err, res) => {
                let result = res.body;      // load the result into a let
                console.log(result);
                console.log("\n=======\n");
                done();
            });

    });

    it('should get a product', function(done) {

        this.timeout(10000);                // set timeout to 10seconds because all caches are disabled

        request(magentoRestUrl)             // set the request url
            .get('/products')               // always JSON
            .expect('Content-Type', /json/) // always JSON
            .expect(200, (err, res) => {
                let result = res.body;      // load the result into a let
                console.log(result);
                console.log("\n=======\n");
                done();
            });

    });

});