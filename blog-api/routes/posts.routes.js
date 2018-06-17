/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 * 
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for 
 * non-commercial illustartive and evaluation purposes only. 
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and 
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
 * 
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const replaceId = require('./helpers').replaceId;
const error = require('./helpers').sendErrorResponse;
const util = require('util');
const indicative = require('indicative');


// GET posts list
router.get('/', function (req, res) {
    const db = req.app.locals.db;
    db.db('blog').collection('posts').find().toArray(
        function (err, posts) {
            if (err) throw err;
            posts.forEach((post) => replaceId(post));
            res.json({ data: posts });
        }
    );
});

// Create new post
router.post('/', function (req, res) {
    const db = req.app.locals.db;
    const post = req.body;
    const collection = db.db('blog').collection('posts');
    console.log('Inserting post:', post);
    collection.insertOne(post).then((result) => {
        if (result.result.ok && result.insertedCount === 1) {
            replaceId(post);
            const uri = req.baseUrl + '/' + post.id;
            console.log('Created post: ', uri);
            res.location(uri).status(201).json({ data: post });
        } else {
            error(req, res, 400, `Error creating new post: ${post}`);
        }
    }).catch((err) => {
        error(req, res, 500, `Server error: ${err}`, err);
    })
    // }).cah(errors => {
    //     error(rtceq, res, 400, `Invalid post data: ${util.inspect(errors)}`);
});


// GET post
router.get('/:postId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    indicative.validate(params, { postId: 'required|regex:^[0-9a-f]{24}$' })
        .then(() => {
            db.db('blog').collection('posts', function (err, posts_collection) {
                if (err) throw err;
                posts_collection.findOne({ _id: new mongodb.ObjectID(params.postId) },
                    (err, post) => {
                        if (err) throw err;
                        if (post === null) {
                            error(req, res, 404, `Post with Id=${params.postId} not found.`, err);
                        } else {
                            replaceId(post);
                            res.json({ data: post });
                        }

                    });
            });
        }).catch(errors => {
            error(req, res, 400, 'Invalid post ID: ' + util.inspect(errors))
        });
});

// PUT (edit) post by id
router.put('/:postId', function (req, res) {
    const db = req.app.locals.db;
    const post = req.body;
    if (post.id !== req.params.postId) {
        error(req, res, 400, `Invalid post data - id in url doesn't match: ${post}`);
        return;
    }
    const collection = db.db('blog').collection('posts');
    post._id = new mongodb.ObjectID(post.id);
    delete (post.id);
    console.log('Updating post:', post);
    collection.updateOne({ _id: new mongodb.ObjectID(post._id) }, { "$set": post })
        .then(result => {
            const resultPost = replaceId(post);
            if (result.result.ok && result.modifiedCount === 1) {
                res.json({ data: resultPost });
            } else {
                error(req, res, 400, `Data was NOT modified in database: ${JSON.stringify(post)}`);
            }
        }).catch((err) => {
            error(req, res, 500, `Server error: ${err}`, err);
        })
    // }).catch(errors => {
    //     error(req, res, 400, `Invalid post data: ${util.inspect(errors)}`);
});

// DELETE post list
router.delete('/:postId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    db.db('blog').collection('posts').findOneAndDelete({ _id: new mongodb.ObjectID(params.postId) },
        function (err, result) {
            if (err) throw err;
            if (result.ok) {
                replaceId(result.value);
                res.json({ data: result.value });
            } else {
                error(req, res, 404, `User with Id=${params.userId} not found.`, err);
            }
        });
});

module.exports = router;
