const path = require('path');
const app = require(path.resolve('index'));
const chai = require('chai');
const chaiHttp = require('chai-http');
require('mocha');

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('Owners', () => {

    describe('/POST /api/owners', () => {
        it('it should get a validation failed', (done) => {
            chai.request(app)
                .post('/api/owners')
                .send({})
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Validation failed');
                    res.body.should.have.property('fields').be.a('array');
                    res.body.should.have.property('fields').eql(validationFailed);
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/POST /api/owners', () => {
        it('it should get a duplicated key error with id equal 1', (done) => {
            chai.request(app)
                .post('/api/owners')
                .send(payload)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Duplicate key');
                    res.body.should.have.property('key').be.a('object');
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/POST /api/owners', () => {
        it('it should get a duplicated key error', (done) => {
            payload.address.type = 'UnknowType';
            const expected = [{
                value: 'UnknowType',
                msg: 'The address must be of type Point',
                param: 'address.type',
                location: 'body'
            }];
            chai.request(app)
                .post('/api/owners')
                .send(payload)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Validation failed');
                    res.body.should.have.property('fields').eql(expected);
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/GET /api/owners/1', () => {
        it('it should get one owner with id equal 1', (done) => {
            chai.request(app)
                .get('/api/owners/1')
                .end((err, res) => {
                    chai.expect(err).to.be.null;
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('id').eql('1');
                    res.body.tradingName.should.be.a('string');
                    res.body.ownerName.should.be.a('string');
                    res.body.document.should.be.a('string');
                    res.body.coverageArea.should.be.a('object');
                    res.body.address.should.be.a('object');
                    done();
                });
        });
    });

    describe('/GET /api/owners?long=-43.297110&lat=-23.013538', () => {
        it('it should get nearest owner', (done) => {
            chai.request(app)
                .get('/api/owners?long=-43.297110&lat=-23.013538')
                .end((err, res) => {
                    chai.expect(err).to.be.null;
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.property('tradingName');
                    res.body[0].should.have.property('distance');
                    done();
                });
        });
    });

});

const payload = {
    id: 1,
    tradingName: 'Adega da Cerveja - Pinheiros',
    ownerName: 'Zé da Silva',
    document: '1432132123891/0001',
    coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
        ]
    },
    address: {
        type: 'Point',
        coordinates: [-46.57421, -21.785741]
    }
};

const validationFailed = [
    { msg: 'Field id is required', param: 'id', location: 'body' },
    {
        msg: 'Field tradingName is required',
        param: 'tradingName',
        location: 'body'
    },
    {
        msg: 'Field ownerName is required',
        param: 'ownerName',
        location: 'body'
    },
    {
        msg: 'Field document is required',
        param: 'document',
        location: 'body'
    },
    {
        msg: 'Field coverageArea.type is required',
        param: 'coverageArea.type',
        location: 'body'
    },
    {
        msg: 'The coverageArea must be of type MultiPolygon',
        param: 'coverageArea.type',
        location: 'body'
    },
    {
        msg: 'Field coverageArea.coordinates is required',
        param: 'coverageArea.coordinates',
        location: 'body'
    },
    {
        msg: 'Invalid value',
        param: 'coverageArea.coordinates',
        location: 'body'
    },
    {
        msg: 'Field address.type is required',
        param: 'address.type',
        location: 'body'
    },
    {
        msg: 'The address must be of type Point',
        param: 'address.type',
        location: 'body'
    },
    {
        msg: 'Field address.coordinates is required',
        param: 'address.coordinates',
        location: 'body'
    },
    {
        msg: 'Invalid value',
        param: 'address.coordinates',
        location: 'body'
    }
];
