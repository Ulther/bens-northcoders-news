process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const connection = require("../connection");
chai.use(chaiSorted);

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => {
    return connection.destroy();
  });
  it("GET:404, route not found", () => {
    return request(app)
      .get("/api/bad-route")
      .expect(404)
      .then(body => {
        expect(body.status).to.equal(404);
        expect(body.body.msg).to.equal("Route not found.");
      });
  });
  it("GET:404, route not found", () => {
    return request(app)
      .get("/extra-bad-route")
      .expect(404)
      .then(body => {
        expect(body.status).to.equal(404);
        expect(body.body.msg).to.equal("Route not found.");
      });
  });
  it("GET:418, teapot found", () => {
    return request(app)
      .get("/api/teapot")
      .expect(418)
      .then(body => {
        expect(body.status).to.equal(418);
        expect(body.body.msg).to.equal("I'm a teapot.");
      });
  });
  //
  describe("/topics", () => {
    it("GET:200, return all topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(body => {
          expect(body).to.be.an("object");
          expect(body.body.topics).to.be.an("array");
          expect(body.body.topics[0].slug).to.equal("mitch");
        });
    });
    it("DELETE:405, not a valid method", () => {
      return request(app)
        .delete("/api/topics")
        .expect(405)
        .then(body => {
          expect(body.status).to.equal(405);
          expect(body.body.msg).to.equal("Method denied.");
        });
    });
  });
  //
  describe("/users", () => {
    it("GET:200, return all users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(body => {
          expect(body).to.be.an("object");
          expect(body.body.users).to.be.an("array");
          expect(body.body.users[0].username).to.equal("butter_bridge");
        });
    });
    it("GET:200, return user by username", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(body => {
          expect(body).to.be.an("object");
          expect(body.body.user.username).to.equal("butter_bridge");
        });
    });
    it("GET:404, a valid username that does not exist", () => {
      return request(app)
        .get("/api/users/not-a-real-username")
        .expect(404)
        .then(body => {
          expect(body.status).to.equal(404);
          expect(body.body.msg).to.equal("Username not found.");
        });
    });
    it("DELETE:405, not a valid method", () => {
      return request(app)
        .delete("/api/users")
        .expect(405)
        .then(body => {
          expect(body.status).to.equal(405);
          expect(body.body.msg).to.equal("Method denied.");
        });
    });
    it("DELETE:405, not a valid method", () => {
      return request(app)
        .delete("/api/users/butter_bridge")
        .expect(405)
        .then(body => {
          expect(body.status).to.equal(405);
          expect(body.body.msg).to.equal("Method denied.");
        });
    });
  });
  //
  describe("/articles", () => {
    it("GET:200, return article by article_id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(body => {
          // console.log(body.body);
          expect(body.body.article.comment_count).to.equal("13");
        });
    });
    it("PATCH:200, update article votes by article_id", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 10 })
        .expect(200)
        .then(body => {
          // console.log(body.body)
          expect(body.body.article.votes).to.equal(10);
        });
    });
    it("PATCH:404, a valid id that does not exist", () => {
      return request(app)
        .patch("/api/articles/9000")
        .send({ inc_votes: 10 })
        .expect(404)
        .then(body => {
          expect(body.status).to.equal(404);
          expect(body.body.msg).to.equal("Id not found.");
        });
    });
    it("GET:404, a valid id that does not exist", () => {
      return request(app)
        .get("/api/articles/9000")
        .send({ inc_votes: 10 })
        .expect(404)
        .then(body => {
          expect(body.status).to.equal(404);
          expect(body.body.msg).to.equal("Id not found.");
        });
    });
    it("PATCH:400, an invalid id", () => {
      return request(app)
        .patch("/api/articles/banana")
        .send({ inc_votes: 10 })
        .expect(400)
        .then(body => {
          expect(body.status).to.equal(400);
          expect(body.body.msg).to.equal("Not acceptable.");
        });
    });
    it("PATCH:200, ignores a valid id with no votes property", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(200)
        .then(body => {
          // console.log(body.body);
          expect(body.status).to.equal(200);
        });
    });
    it("PATCH:400, a valid id with an invalid votes value", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "yes" })
        .expect(400)
        .then(body => {
          expect(body.status).to.equal(400);
          expect(body.body.msg).to.equal("Not acceptable.");
        });
    });
    it("PATCH:200, update article votes by article_id, ignoring invalid property", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 10, potato: "yes" })
        .expect(200)
        .then(body => {
          expect(body.status).to.equal(200);
        });
    });
    it("DELETE:405, not a valid method", () => {
      return request(app)
        .delete("/api/articles")
        .expect(405)
        .then(body => {
          expect(body.status).to.equal(405);
          expect(body.body.msg).to.equal("Method denied.");
        });
    });
    it("DELETE:405, not a valid method", () => {
      return request(app)
        .delete("/api")
        .expect(405)
        .then(body => {
          expect(body.status).to.equal(405);
          expect(body.body.msg).to.equal("Method denied.");
        });
    });
    it("DELETE:405, not a valid method", () => {
      return request(app)
        .delete("/api/articles/1")
        .expect(405)
        .then(body => {
          expect(body.status).to.equal(405);
          expect(body.body.msg).to.equal("Method denied.");
        });
    });
    it("POST:201, posts a new comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge", body: "is here" })
        .expect(201)
        .then(body => {
          // console.log(body.body);
          expect(body.body.comment[0].author).to.equal("butter_bridge");
        });
    });
    it("POST:400, posts a new comment without body and username", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({})
        .expect(400)
        .then(body => {
          expect(body.status).to.equal(400);
        });
    });
    it("POST:400, posts a new comment with an invalid username", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "ben", body: "is here" })
        .expect(422)
        .then(body => {
          expect(body.status).to.equal(422);
        });
    });
    it("POST:400, when article_id is invalid", () => {
      return request(app)
        .post("/api/articles/banana/comments")
        .expect(400)
        .then(body => {
          expect(body.status).to.equal(400);
          expect(body.body.msg).to.equal("Not acceptable.");
        });
    });
    it("GET:200, return all article comments", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(body => {
          // console.log(body.body.comments);
          expect(body).to.be.an("object");
          expect(body.body.comments).to.be.an("array");
          expect(body.body.comments[0].comment_id).to.equal(2);
        });
    });
    it("GET:200, return empty array when no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(body => {
          // console.log(body.body);
          expect(body.body).to.be.an("array");
        });
    });
    it("GET:200, when article_id does not exist", () => {
      return request(app)
        .get("/api/articles/9000/comments")
        .expect(200)
        .then(body => {
          // console.log(body.body);
          expect(body.status).to.equal(200);
        });
    });
    it("GET:400, when article_id is invalid", () => {
      return request(app)
        .get("/api/articles/banana/comments")
        .expect(400)
        .then(body => {
          expect(body.status).to.equal(400);
          expect(body.body.msg).to.equal("Not acceptable.");
        });
    });
    it("POST:422, when article_id does not exist", () => {
      return request(app)
        .post("/api/articles/9000/comments")
        .send({ username: "butter_bridge", body: "is here" })
        .expect(422)
        .then(body => {
          // console.log(body.body);
          expect(body.status).to.equal(422);
          expect(body.body.msg).to.equal("Unprocessable Entity.");
        });
    });
    it("GET:200, return all article comments sorted in default order", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(body => {
          // console.log(body.body);
          expect(body.body.comments).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("GET:200, return all article comments sorted in ascending order by comment_id", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=comment_id&order=asc")
        .expect(200)
        .then(body => {
          expect(body.body.comments).to.be.sortedBy("comment_id");
        });
    });
    it("GET:200, return all article comments sorted by default in ascending order", () => {
      return request(app)
        .get("/api/articles/1/comments?order=asc")
        .expect(200)
        .then(body => {
          // console.log(body.body.comments);
          expect(body.body.comments).to.be.sortedBy("created_at");
        });
    });
    it("GET:200, return all article comments sorted by default when passed an invalid order", () => {
      return request(app)
        .get("/api/articles/1/comments?order=banana")
        .expect(200)
        .then(body => {
          // console.log(body.body.comments);
          expect(body.body.comments).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("GET:200, return all article comments sorted in descending order by votes", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes&order=desc")
        .expect(200)
        .then(body => {
          // console.log(body.body)
          expect(body.body.comments).to.be.sortedBy("votes", {
            descending: true
          });
        });
    });
    it("GET:200, return all article comments sorted in descending order by votes", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=banana")
        .expect(200)
        .then(body => {
          // console.log(body.body)
          expect(body.body.comments).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("GET:200, return all articles sorted in default order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(body => {
          console.log(body.body.articles[0]);
          expect(body).to.be.an("object");
          expect(body.body.articles).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("GET:200, return all articles sorted in descending order by article_id", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id&order=desc")
        .expect(200)
        .then(body => {
          // console.log(body.body.articles);
          expect(body).to.be.an("object");
          expect(body.body.articles).to.be.sortedBy("article_id", {
            descending: true
          });
        });
    });
    it("GET:200, return all articles sorted in default order when passed invalid sort column", () => {
      return request(app)
        .get("/api/articles?sort_by=banana")
        .expect(200)
        .then(body => {
          expect(body).to.be.an("object");
          expect(body.body.articles).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("GET:200, return all articles sorted in default order when passed invalid sort column", () => {
      return request(app)
        .get("/api/articles?order=banana")
        .expect(200)
        .then(body => {
          expect(body).to.be.an("object");
          expect(body.body.articles).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("GET:200, return all articles sorted in descending order by author", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(body => {
          expect(body.body.articles).to.be.sortedBy("author", {
            descending: true
          });
          expect(body.body.articles[0].author).to.be.equal("rogersop");
        });
    });
    it("GET:200, return all articles sorted by default but in ascending order", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(body => {
          expect(body.body.articles).to.be.sortedBy("created_at");
          expect(body.body.articles[0].author).to.be.equal("butter_bridge");
        });
    });
    it("GET:200, return all articles filtered by author", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(body => {
          expect(body).to.be.an("object");
          expect(body.body.articles[0].title).to.equal(
            "Living in the shadow of a great man"
          );
        });
    });
    it("GET:404, an invalid author", () => {
      return request(app)
        .get("/api/articles?author=banana")
        .expect(404)
        .then(body => {
          expect(body.status).to.equal(404);
          expect(body.body.msg).to.equal("Not found.");
        });
    });
    it("GET:200, return all articles filtered by topic", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(body => {
          expect(body).to.be.an("object");
          expect(body.body.articles[0].author).to.equal("butter_bridge");
        });
    });
    it("GET:404, an invalid topic", () => {
      return request(app)
        .get("/api/articles?topic=banana")
        .expect(404)
        .then(body => {
          expect(body.status).to.equal(404);
          expect(body.body.msg).to.equal("Not found.");
        });
    });
  });
  //
  describe("/comments", () => {
    it("GET:200, return all comments", () => {
      return request(app)
        .get("/api/comments")
        .expect(200)
        .then(body => {
          expect(body).to.be.an("object");
          expect(body.body.comments).to.be.an("array");
          expect(body.body.comments[0].comment_id).to.equal(1);
        });
    });
    it("DELETE:405, not a valid method", () => {
      return request(app)
        .delete("/api/comments")
        .expect(405)
        .then(body => {
          expect(body.status).to.equal(405);
          expect(body.body.msg).to.equal("Method denied.");
        });
    });
    it("PATCH:200, update comment votes by comment id", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 17 })
        .expect(200)
        .then(body => {
          // console.log(body.body);
          expect(body.body.comment.votes).to.equal(17);
        });
    });
    it("PATCH:200, ignores a valid id with no votes property", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({})
        .expect(200)
        .then(body => {
          // console.log(body.body);
          expect(body.status).to.equal(200);
        });
    });
    it("PATCH:400, a valid id with an invalid votes value", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: "yes" })
        .expect(400)
        .then(body => {
          expect(body.status).to.equal(400);
          expect(body.body.msg).to.equal("Not acceptable.");
        });
    });
    it("PATCH:200, update comment votes by comment_id, ignoring invalid property", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 10, potato: "yes" })
        .expect(200)
        .then(body => {
          expect(body.status).to.equal(200);
        });
    });
    it("DELETE:204, delete comment by comment id", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(body => {
          expect(body.status).to.equal(204);
        });
    });
    it("DELETE:404, delete comment by comment id which does not exist", () => {
      return request(app)
        .delete("/api/comments/9000")
        .expect(404)
        .then(body => {
          expect(body.status).to.equal(404);
        });
    });
    it("DELETE:400, delete comment by comment id which is invalid", () => {
      return request(app)
        .delete("/api/comments/banana")
        .expect(400)
        .then(body => {
          expect(body.status).to.equal(400);
        });
    });
  });
});
