const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  nums = strNums.map(strNum => {

    if (isNaN(Number(strNum))) {
      throw new BadRequestError(`${strNum} is not a number`);
    }
    else {
      return Number(strNum);
    }

  });
  return nums;
}


module.exports = { convertStrNums };