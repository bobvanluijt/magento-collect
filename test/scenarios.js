'use strict';
/**
 *  _____                 _   _
 * |  __ \               | | (_)
 * | |  | | ___  _ __ ___| |  _  ___
 * | |  | |/ _ \| '__/ _ \ | | |/ _ \
 * | |__| | (_) | | |  __/ |_| | (_) |
 * |_____/ \___/|_|  \___|_(_)_|\___/
 *
 * Description: Installs a complete Magento 2 installation in travis and validates the APIs
 * Author: Bob van Luijt
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