const { schemaOwner, schemaPoint } = require('./owner.schemas');
const validator = require('./validator');
const sinon = require('sinon');
const { assert } = require('chai');

describe('Validator', () => {
    describe('Payload validation', () => {

        let json, status, res, next;

        beforeEach(() => {
            json = sinon.spy();
            status = sinon.stub();
            res = { json, status };
            status.returns(res);
            next = sinon.stub();
        });

        it('should get coordinates validation error', async () => {
            const req = { query: { lat: 'AAA', long: 'BBB' }};

            await schemaPoint[0](req,res, next);
            await schemaPoint[1](req,res, next);

            validator(req, res, next);

            const errors = [
                { value: 'AAA', msg: 'Invalid value', param: 'lat', location: 'query' },
                { value: 'BBB', msg: 'Invalid value', param: 'long', location: 'query' }
            ];

            assert.equal(status.args[0][0], 400);
            assert.equal(json.args[0][0].message, 'Validation failed');
            assert.deepEqual(json.args[0][0].fields, errors);
        });


        it('should get owner validation error', async () => {
            const body = {
                tradingName: 'Adega da Cerveja - Pinheiros',
                ownerName: 'Zé da Silva',
                document: '1432132123891/0001',
                coverageArea: { type: 'Polygon', coordinates: [] },
                address: { type: 'LineString', coordinates: [] }
            };

            const req = { body };

            await schemaOwner[0](req,res, next);
            await schemaOwner[4](req,res, next);
            await schemaOwner[5](req,res, next);
            await schemaOwner[6](req,res, next);
            await schemaOwner[7](req,res, next);

            validator(req, res, next);

            const errors = [
                { value: undefined, msg: 'Field id is required', param: 'id', location: 'body' },
                { value: 'Polygon', msg: 'The coverageArea must be of type MultiPolygon', param: 'coverageArea.type', location: 'body' },
                { value: [], msg: 'Field coverageArea.coordinates is required', param: 'coverageArea.coordinates', location: 'body' },
                { value: 'LineString', msg: 'The address must be of type Point', param: 'address.type', location: 'body' },
                { value: [], msg: 'Field address.coordinates is required', param: 'address.coordinates', location: 'body' }
            ];

            assert.equal(status.args[0][0], 400);
            assert.equal(json.args[0][0].message, 'Validation failed');
            assert.deepEqual(json.args[0][0].fields, errors);
        });

    });
});