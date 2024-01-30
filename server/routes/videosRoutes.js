const { Router } = require("express");
const route = Router();
const videosControllers = require("../controllers/videosControllers");
// const {validateJWT} = require ("../src/middleware/validateJwt");

route.all("/", function(res, req, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET. POST, PUT, DELETE, OPTIONS");
    next();
});

route.post("/getAllVideos", validateJWT, videosControllers.getAllVideos);
route.post("/getAllVideosUserId:userId", validateJWT, videosControllers.getAllVideosUserId);
route.post("/newVideo", validateJWT, videosControllers.newVideo);
route.put("/editVideo:Id", validateJWT, videosControllers.editVideo);
route.delete("/deleteVideo:id", validateJWT, videosControllers.deleteVideo);
route.get("/getCommments:id", validateJWT, videosControllers.getComments);
route.get("/getColaborators:id", validateJWT, videosControllers.getColaborators);
route.get("/getLikes:id", validateJWT, videosControllers.getLikes);
route.post("/postColaborator:id", validateJWT, videosControllers.postColaborator);
route.post("/postComment:id", validateJWT, videosControllers.postComment);
route.post("/postLike:id", validateJWT, videosControllers.postLikes);

module.exports = route;