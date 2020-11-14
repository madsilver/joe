const path = require('path');
const app = require(path.resolve('index'));
require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('Healthcheck', () => {
    describe('/GET /api/healthcheck', () => {
        it('it should check healthcheck', (done) => {
            chai.request(app)
                .get('/api/healthcheck')
                .end((err, res) => {
                    chai.expect(err).to.be.null;
                    res.should.have.status(200);
                    chai.expect(res.text).to.eql('{"message":"joe api - it\'s working!"}');
                    done();
                });
        });
    });
});