const app = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);

const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../src/models/Users');
const key = require('../src/config/keys').secret;

const opts = {};
    // Extract Token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
    // Set our secret key
opts.secretOrKey = key;

test('add post WITHOUT offensive Words', async () => {
   const res =  await request.post('/users/login')
    .send({userName:"blogUser",password:"123"})
    .expect(200)
    const token = res.body.token;
    const response = await request.post('/users/createpost', passport.authenticate('jwt', {
            session: false
        }))
        .set('Authorization',token)
        .send({
            image: "Tropical-Beachjpg",
            title: "TROPICAL FROM POSTMAN",
            text: "Texto desde postman para probar el json de postman"
        })
        .expect(200)
    expect(JSON.parse(response.text)).toStrictEqual({message: 'Post is create correctly!',success: true});
});

test('add post WITH offensive Words', async () => {
    const res =  await request.post('/users/login')
     .send({userName:"blogUser",password:"123"})
     .expect(200)
     const token = res.body.token;
     const response = await request.post('/users/createpost', passport.authenticate('jwt', {
             session: false
         }))
         .set('Authorization',token)
         .send({
             image: "Tropical-Beachjpg",
             title: "TROPICAL FROM POSTMAN",
             text: "Texto desde postman para probar el json de postman capullo"
         })
         .expect(400)
     expect(JSON.parse(response.text)).toStrictEqual("Post contains this offWords : Capullo = level:3");
 });
 test('add comment WITHOUT offensive Words', async () => {
    const res =  await request.post('/users/login')
     .send({userName:"blogUser",password:"123"})
     .expect(200)
     const token = res.body.token;
     const response = await request.post('/users/post/5e316945e2e7d028d7e49215/comment', passport.authenticate('jwt', {
             session: false
         }))
         .set('Authorization',token)
         .send({
             text: "Texto para el test"
         })
         .expect(200)
     expect(JSON.parse(response.text)).toStrictEqual({message: 'Comment is create correctly!',success: true});
 });
 test('add comment WIT offensive Words', async () => {
    const res =  await request.post('/users/login')
     .send({userName:"blogUser",password:"123"})
     .expect(200)
     const token = res.body.token;
     const response = await request.post('/users/post/5e316945e2e7d028d7e49215/comment', passport.authenticate('jwt', {
             session: false
         }))
         .set('Authorization',token)
         .send({
             text: "Texto para el test capullo"
         })
         .expect(400)
     expect(JSON.parse(response.text)).toStrictEqual({message: "Comment contains this offWords!,{Capullo = level:3}",success: false});
 });