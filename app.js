"use strict";

/** Simple demo Express app. */
const { findMean, findMedian, findMode } = require("./stats");
const express = require("express");
const { convertStrNums } = require("./utils");
const app = express();

// useful error class to throw
const {
  ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError, } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded());

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get('/mean', function (req, res) {
  if (!req.query.nums) throw new BadRequestError();

  let strNums = req.query.nums.split(',');
  nums = convertStrNums(strNums);

  const mean = findMean(nums);

  return res.json({
    operation: "mean",
    value: mean
  });

});


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get('/median', function (req, res) {
  if (!req.query.nums) throw new BadRequestError();

  let strNums = req.query.nums.split(',');
  nums = convertStrNums(strNums);

  const median = findMedian(nums);

  return res.json({
    operation: "median",
    value: median
  });

});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get('/mode', function (req, res) {
  if (!req.query.nums) throw new BadRequestError();

  let strNums = req.query.nums.split(',');
  nums = convertStrNums(strNums);

  const mode = findMode(nums);

  return res.json({
    operation: "mode",
    value: mode
  });

});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;