var Request = require('request');
var test_config = require('./test_config');
let Token = null;
// describe('login as faculty, read details, get all contents, login as student, show profile , get all contest,details, ', () => {
//     var dataA = {}
//     var dataF = {}
//     beforeAll((done) => {
//         console.log("login as student");
//         let { username, password } = test_config.admins[0];
//         let options = {
//             url: `${test_config.baseURL}/signin`,
//             form: { username, password }
//         };
//         Request.post(options, (err, res) => {
//             dataA.status = res.statusCode;
//             dataA.body = res.body;
//             admin_token = JSON.parse(res.body).token;
//             console.log("profile_test.js 24 admin token",admin_token)
//             done();
//         });

//     })
// })
describe("Test name", function() {
    console.log("inside")
    var msg;
    it("Test description", function() {
      msg = 'Hello';
      expect(msg).toBe('Hello');
    });
  });
// describe("Server", () => {
//     var server;
//     beforeAll(() => {
//         server = require('../../app');
//     });
//     afterAll(() => {
//         server.close();
//     });
//     //home route - test 1
//     describe("GET /", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.get("http://35.225.238.45:3001/", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("Home route", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //registering a user - test 2
//     describe("POST /api/register", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/register", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("Registering a user", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //login a user - test 3
//     describe("POST /api/login", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/login", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("login a user", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //get count of users - test 4
//     describe("POST /api/getcountfromusers", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/getcountfromusers", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("count number of users", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //get details for profile viewing and editing - test 5
//     describe("POST /api/getDetails", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/getDetails", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("Details of users", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //get history - test 6
//     describe("POST /api/history", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/history", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("History", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //Insert favorite profile into table - test 7
//     describe("POST /api/insertFavorites", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/insertFavorites", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("Insert favorite profile", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //Delete from favorites table - test 8
//     describe("POST /api/deleteFavorites", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/deleteFavorites", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("delete favorite profile", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //Insert into browser_history table - test 9
//     describe("POST /api/insertBrowserHistory", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/insertBrowserHistory", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("add faculty to visited table", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //Delete faculty from browser_history - test 10
//     describe("POST /api/deleteHistoryItem", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/deleteHistoryItem", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("Remove faculty from visited", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //get favorites profiles - test 11
//     describe("POST /api/favorites", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/favorites", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("get all favorites", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //update user details - test 12
//     describe("POST /api/update", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/update", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("Update user details", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //get userid from gsprofile - test 13
//     describe("POST /api/getDetailsfromgsprofile", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/getDetailsfromgsprofile", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("get userid google scholar profile", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     //connectrequest - test 14
  
//     // test 15
//     describe("POST /api/getDetailsfromconnectrequest", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/getDetailsfromconnectrequest", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("get Details from connect request", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 16
//     describe("POST /api/getnetworkdetailsfromrequest", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/getnetworkdetailsfromrequest", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("get network details from request", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 17
//     describe("POST /api/selectfromgsprofilefornetworkdetails", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/selectfromgsprofilefornetworkdetails", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("select from gsprofile for network details", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 18
//     describe("POST /api/getnetworkdetailstorequest", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/getnetworkdetailstorequest", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("get network details to request", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 19
//     describe("POST /api/selectfromuserfornetworkdetails", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/selectfromuserfornetworkdetails", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("select from user for network details", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 20
//     describe("POST /api/updatePassword", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/updatePassword", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("update Password", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 21
//     describe("POST /api/updateActivate_account", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/updateActivate_account", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("update account", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 22
//     describe("POST /api/idgsprofile", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/idgsprofile", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("get id of gsprofile", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 23
//     describe("POST /api/delete", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/delete", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("delete profile", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 24
//     describe("POST /api/generate", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/generate", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("generate details", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 25
//     describe("POST /api/getgsdetailsgorprofile", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/getgsdetailsgorprofile", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("get gsdetails for profile", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 26
//     describe("POST /api/getForDropdown", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/getForDropdown", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("get for dropdown", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 27
//     describe("POST /api/deletegsarticles", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/deletegsarticles", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("delete gsarticles", () => {
//             expect(data.status).toBe(200);
//         });
//     });
   
//     // test 31
//     describe("POST /api/updateRequestTable", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/updateRequestTable", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("update request table", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 32
//     describe("POST /api/generateallarticleOfAFaculty", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/generateallarticleOfAFaculty", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("generate all articles Of A Faculty", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 33
//     describe("POST /api/insertIntoSA", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/insertIntoSA", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("insert Into SA", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 33
//     describe("POST /api/deleteFromSA", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/deleteFromSA", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("delete From Student Acheivement", () => {
//             expect(data.status).toBe(200);
//         });
//     });

//     // test 34
//     describe("POST /api/insertintogsprofile", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/insertintogsprofile", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("insert into gsprofile", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 35
    
//     // test 36
//     describe("POST /api/selectnotification", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/selectnotification", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("select notification", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 37
//     describe("POST /api/deletenotification", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/deletenotification", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("delete notification", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 38
//     describe("POST /api/getratingfromreview", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/getratingfromreview", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("get rating from review", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 39
//     describe("POST /api/selectFromSA", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/selectFromSA", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("select From SA", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 40
//     describe("POST /api/generatearticlesinprofile", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/api/generatearticlesinprofile", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("generate articles in profile", () => {
//             expect(data.status).toBe(200);
//         });
//     });
//     // test 41
//     describe("POST /gs/generate", () => {
//         var data = {};
//         beforeAll((done) => {
//             Request.post("http://35.225.238.45:3001/gs/generate", (err, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = body;
//                 done();
//             });
//         });
//         it("generate", () => {
//             expect(data.status).toBe(200);
//         });
//     });
// });