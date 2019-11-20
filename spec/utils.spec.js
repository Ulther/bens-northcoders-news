const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

/*
## formatDate
This utility function should be able to take an array (`list`) of objects and return a new array. Each item in the new array must have its timestamp converted into a Javascript date object. Everything else in each item must be maintained.
_hint: Think carefully about how you can test that this has worked - it's not by copying and pasting a sql timestamp from the terminal into your test_
*/

describe.only("formatDates", () => {
  it("returns an empty array when passed an empty array", () => {
    const input = [];
    const actual = formatDates(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("returns an array containing a single converted object when passed a single object in an array", () => {
    const input = [
      {
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const actual = formatDates(input);
    const expected = [
      {
        created_by: "tickle122",
        votes: -1,
        created_at: new Date(input[0].created_at)
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("returns an array containing multiple converted objects when passed a multiple objects in an array", () => {
    const input = [
      {
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      },
      {
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      }
    ];
    const actual = formatDates(input);
    const expected = [
      {
        created_by: "tickle122",
        votes: -1,
        created_at: new Date(input[0].created_at)
      },
      {
        created_by: "grumpy19",
        votes: 7,
        created_at: new Date(input[1].created_at)
      }
    ];
    // return date in object
    expect(actual).to.eql(expected);
  });
});

//

/*
## makeRefObj
This utility function should be able to take an array (`list`) of objects and return a reference object. The reference object must be keyed by each item's title, with the values being each item's corresponding id. e.g.
`[{ article_id: 1, title: 'A' }]`
will become
`{ A: 1 }`
*/

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    const input = [];
    const actual = makeRefObj(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it("returns an object containing a key of the title and a value of the id when passed an array containing a single object", () => {
    const input = [{ article_id: 1, title: "A" }];
    const actual = makeRefObj(input);
    const expected = { A: 1 };
    expect(actual).to.eql(expected);
  });
  it("returns an object containing multiple keys of the titles and values of the ids when passed an array containing multiple objects", () => {
    const input = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" }
    ];
    const actual = makeRefObj(input);
    const expected = { A: 1, B: 2 };
    expect(actual).to.eql(expected);
  });
});

//

/*
## formatComments
This utility function should be able to take an array of comment objects (`comments`) and a reference object, and return a new array of formatted comments.
Each formatted comment must have:
- Its `created_by` property renamed to an `author` key
- Its `belongs_to` property renamed to an `article_id` key
- The value of the new `article_id` key must be the id corresponding to the original title value provided
- Its `created_at` value converted into a javascript date object
- The rest of the comment's properties must be maintained
*/

describe("formatComments", () => {
  it("returns an empty array when passed an empty array", () => {
    const input = [];
    const actual = formatComments(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("returns an array containing a formatted comment when passed an array containing a single comment and a reference object", () => {
    const inputArr = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      }
    ];
    const refObj = { "Making sense of Redux": 2 };
    const actual = formatComments(inputArr, refObj);
    const expected = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        article_id: 2,
        author: "grumpy19",
        votes: 7,
        created_at: new Date(1478813209256)
      }
    ];
    expect(actual).to.eql(expected);
  });
});
