// Use TDD for these utils

/*
## formatDate
This utility function should be able to take an array (`list`) of objects and return a new array. Each item in the new array must have its timestamp converted into a Javascript date object. Everything else in each item must be maintained.
_hint: Think carefully about how you can test that this has worked - it's not by copying and pasting a sql timestamp from the terminal into your test_
*/

exports.formatDates = list => {
  const newList = [...list];
  newList.forEach(obj => (obj.created_at = new Date(obj.created_at)));
  // console.log(newList, " < newList");
  return newList;
};

//

/*
## makeRefObj
This utility function should be able to take an array (`list`) of objects and return a reference object. The reference object must be keyed by each item's title, with the values being each item's corresponding id. e.g.
`[{ article_id: 1, title: 'A' }]`
will become
`{ A: 1 }`
*/

exports.makeRefObj = list => {
  const refObj = {};
  list.forEach(obj => {
    refObj[obj.title] = obj.article_id;
  });
  return refObj;
};

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

exports.formatComments = (comments, articleRef) => {
  const formattedComments = [...comments];
  formattedComments.forEach(comment => {
    comment["author"] = comment["created_by"];
    delete comment["created_by"];
    comment["article_id"] = comment["belongs_to"];
    delete comment["belongs_to"];
    comment.article_id = Object.values(articleRef)[0];
    comment.created_at = new Date(comment.created_at);
  });
  return formattedComments;
};
