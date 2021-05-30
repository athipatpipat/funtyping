"use strict";

const resetDB = require("../config/scripts/populateDB")

const Companion = require("./schema/Companion");
const Doctor = require("./schema/Doctor");
const FavoriteCompanion = require("./schema/FavoriteCompanion");
const FavoriteDoctor = require("./schema/FavoriteDoctor");

const express = require("express");
const { ObjectID } = require("bson");
const router = express.Router();


// completely resets your database.
// really bad idea irl, but useful for testing
router.route("/reset")
    .get((_req, res) => {
        resetDB(() => {
            res.status(200).send({
                message: "Data has been reset."
            });
        });
    });

router.route("/")
    .get((_req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "App is running."
        });
    });
    
// ---------------------------------------------------
// Edit below this line
// ---------------------------------------------------
router.route("/doctors")
    .get((req, res) => {
        console.log("GET /doctors");
        Doctor.find({})
            .sort('ordering')
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log("POST /doctors");
        Doctor.create(req.body).save()
            .then(doctor => {
                res.status(201).send(doctor);
            })
            .catch(err => {
                res.status(500).send({
                    "request": req.body,
                    "message": "Your object should conform to this format: { name: string, seasons: Array<number> }"
                })
            })
    });

// optional:
router.route("/doctors/favorites")
    .get((req, res) => {
        console.log(`GET /doctors/favorites`);
        FavoriteDoctor.find({})
            .then(favorites => {
                FavoriteDoctor.getDoctors(favorites)
                    .then(doctors => {
                        res.status(200).send(doctors);
                    })
                    .catch(err => {
                        res.status(500).send({
                            "message": err.message
                        })
                    })
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log(`POST /doctors/favorites`);
        Doctor.findById(req.body.doctor_id)
            .then(doctor => {
                if (doctor) {
                    FavoriteDoctor.find({"doctor": req.body.doctor_id})
                        .then(favDoctor => {
                            if (favDoctor.length) {
                                res.status(500).send({
                                    "request": req.body,
                                    "message": `Doctor \"${req.body.doctor_id}\" already in favorites.`
                                })
                            } else {
                                FavoriteDoctor.create(doctor).save()
                                    .then(doctor => {
                                        console.log("hello")
                                        res.status(201).send(doctor.doctor);
                                    })
                                    .catch(err => {
                                        console.log("bad")
                                        res.status(500).send({
                                            "message": err.message
                                        });
                                    })
                            }
                        })

                } else {
                    res.status(500).send({
                        "request": req.body,
                        "message": "Your object should conform to this format: { \"doctor_id\": <id> }, where the id is a valid Doctor id."
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    "request": req.body,
                    "message": "Your object should conform to this format: { \"doctor_id\": <id> }, where the id is a valid Doctor id."
                })
            })
    });
    
router.route("/doctors/:id")
    .get((req, res) => {
        console.log(`GET /doctors/${req.params.id}`);
        Doctor.findById(req.params.id)
            .then(doctor => {
                if (doctor) {
                    res.status(200).send(doctor);
                } else {
                    res.status(404).send({
                        "message":`Doctor with id \"${req.params.id}\" does not exist.`
                    })
                }
            })
            .catch(err => {
                res.status(404).send({
                    "message":`Doctor with id \"${req.params.id}\" does not exist.`
                })
            })
    })
    .patch((req, res) => {
        console.log(`PATCH /doctors/${req.params.id}`);
        const doctorID = {"_id": req.params.id};
        const updateInfo = req.body;
        Doctor.findOneAndUpdate(doctorID, updateInfo, {new: true})
            .then(doctor => {
                if (doctor) {
                    res.status(200).send(doctor);
                } else {
                    res.status(404).send({
                        "message":`Doctor with id \"${req.params.id}\" does not exist.`
                    })
                }
            })
            .catch(err => {
                res.status(404).send({
                    "message":`Doctor with id \"${req.params.id}\" does not exist.`
                })
            })
    })
    .delete((req, res) => {
        console.log(`DELETE /doctors/${req.params.id}`);
        const doctorID = {"_id": req.params.id};
        Doctor.findOneAndDelete(doctorID)
        .then(doctor => {
            if (doctor) {
                res.status(200).send();
            } else {
                res.status(404).send({
                    "message":`Doctor with id \"${req.params.id}\" does not exist.`
                });
            }
        })
        .catch(err => {
            res.status(404).send({
                "message":`Doctor with id \"${req.params.id}\" does not exist.`
            });
        })
    });
    
router.route("/doctors/:id/companions")
    .get((req, res) => {
        console.log(`GET /doctors/${req.params.id}/companions`);
        console.log(req.params.id);
        // Credit: https://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value
        Companion.find({"doctors": req.params.id }) 
            .then(companions => {
                if (companions) {
                    res.status(200).send(companions);
                } else {
                    res.status(404).send({
                        "message":`Doctor with id \"${req.params.id}\" does not exist.`
                    })
                }
            })
            .catch(err => {
                res.status(404).send({
                    "message":`Doctor with id \"${req.params.id}\" does not exist.`
                })
            })
    });
    

router.route("/doctors/:id/goodparent")
    .get((req, res) => {
        console.log(`GET /doctors/${req.params.id}/goodparent`);
        Companion.find({"doctors": req.params.id, "alive": true}) 
            .then(aliveCompanions => {
                Companion.find({"doctors": req.params.id})
                    .then(allCompanions => {
                        res.status(200).send(allCompanions.length === aliveCompanions.length);
                    })
                    .catch(err => {
                        res.status(404).send({
                            "message":`Doctor with id \"${req.params.id}\" does not exist.`
                        })
                    })
            })
            .catch(err => {
                res.status(404).send({
                    "message":`Doctor with id \"${req.params.id}\" does not exist.`
                })
            })
    });

// optional:
router.route("/doctors/favorites/:doctor_id")
    .get((req, res) => {
        console.log(`GET /doctors/favorites/${req.params.doctor_id}`);
        const doctorID = {"doctor": req.params.doctor_id};
        FavoriteDoctor.find(doctorID)
            .then(favorite => {
                if (favorite.length) {
                    return Doctor.findById(favorite[0].doctor);
                } else {
                    return; 
                }
            })
            .then(doctor => {
                if (doctor) {
                    res.status(200).send(doctor)
                } else {
                    res.status(404).send({
                        "message": `Doctor with id \"${req.params.doctor_id}\" does not exist in your favorites.`
                    })
                }
            })
            .catch(err => {
                res.status(404).send({
                    "message": err.message
                })
            })
    })
    .delete((req, res) => {
        console.log(`DELETE /doctors/favorites/${req.params.doctor_id}`);
        const doctorID = {"doctor": req.params.doctor_id};
        FavoriteDoctor.findOneAndDelete(doctorID) 
            .then(doctor => {
                if (doctor) {
                    res.status(200).send();
                } else {
                    res.status(404).send({
                        "message": `Doctor with id \"${req.params.doctor_id}\" does not exist in your favorites.`
                    })
                }
            })
            .catch(err => {
                res.status(404).send({
                    "message": err.message
                })
            })
    });

router.route("/companions")
    .get((req, res) => {
        console.log("GET /companions");
        Companion.find({})
            .sort('ordering')
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        // TODO: ask if doctors and seasons are not require and that we should not throw an error for not having them
        console.log("POST /companions");
        Companion.create(req.body).save()
            .then(companion => {
                res.status(201).send(companion);
            })
            .catch(err => {
                res.status(500).send({
                    "message": err.message
                })
            })
    });

router.route("/companions/crossover")
    .get((req, res) => {
        console.log(`GET /companions/crossover`);
        // Credit: https://stackoverflow.com/questions/7811163/query-for-documents-where-array-size-is-greater-than-1
        Companion.find({"doctors.1": {"$exists": true}})
            .then(companions => {
                res.status(200).send(companions)
            })
            .catch(err => {
                res.status(500).send({
                    "message": err.message
                })
            })
    });

// optional:
router.route("/companions/favorites")
    .get((req, res) => {
        console.log(`GET /companions/favorites`);
        FavoriteCompanion.find({})
            .then(favorites => {
                FavoriteCompanion.getCompanions(favorites)
                    .then(companions => {
                        res.status(200).send(companions)
                    })
                    .catch(err => {
                        res.status(500).send({
                            "message": err.message
                        })
                    })
            })
            .catch(err => {
                res.status(500).send({
                    "message": err.message
                });
            })
    })
    .post((req, res) => {
        console.log(`POST /companions/favorites`);
        Companion.findById(req.body.companion_id)
            .then(companion => {
                if (companion) {
                    FavoriteCompanion.find({"companion": req.body.companion_id})
                        .then(favCompanion => {
                            if (favCompanion.length) {
                                res.status(500).send({
                                    "request": req.body,
                                    "message": `Companion \"${req.body.companion_id}\" already in favorites.`
                                })
                            } else {
                                FavoriteCompanion.create(companion).save()
                                    .then(companion => {
                                        res.status(201).send(companion.companion);
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            "message": err.message
                                        });
                                    })
                            }
                        })

                } else {
                    res.status(500).send({
                        "request": req.body,
                        "message": "Your object should conform to this format: { \"companion_id\": <id> }, where the id is a valid Companion id."
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    "request": req.body,
                    "message": "Your object should conform to this format: { \"companion_id\": <id> }, where the id is a valid Companion id."
                })
            })
    })

router.route("/companions/:id")
    .get((req, res) => {
        console.log(`GET /companions/${req.params.id}`);
        Companion.findById(req.params.id)
            .then(companion => {
                if (companion) {
                    res.status(200).send(companion);
                } else {
                    res.status(404).send({
                        "message":`Companion with id \"${req.params.id}\" does not exist.`
                    })
                }
            })
            .catch(err => {
                res.status(404).send({
                    "message":`Companion with id \"${req.params.id}\" does not exist.`
                })
            })
    })
    .patch((req, res) => {
        console.log(`PATCH /companions/${req.params.id}`);
        const companionID = {"_id": req.params.id};
        const updateInfo = req.body;
        Companion.findOneAndUpdate(companionID, updateInfo, {new: true})
        .then(companion => {
            if (companion) {
                res.status(200).send(companion);
            } else {
                res.status(404).send({
                    "message":`Companion with id \"${req.params.id}\" does not exist.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                "message": err.message
            })
        })
    })
    .delete((req, res) => {
        console.log(`DELETE /companions/${req.params.id}`);
        const companionID = {"_id": req.params.id};
        Companion.findOneAndDelete(companionID)
            .then(companion => {
                if (companion) {
                    res.status(200).send();
                } else {
                    res.status(404).send({
                        "message":`Companion with id \"${req.params.id}\" does not exist.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            })
    });

router.route("/companions/:id/doctors")
    .get((req, res) => {
        // todo: if we can find companion but there is no doctor in the list
        // todo: check what happen if we cannot find companion
        console.log(`GET /companions/${req.params.id}/doctors`);
        Companion.findById(req.params.id)
            .then(companion => {
                return Doctor.find({"_id": {"$in": companion.doctors}});
            })
            .then(doctors => {
                if (doctors) {
                    res.status(200).send(doctors);
                } else {
                    res.status(404).send({
                        "message":`Companion with id \"${req.params.id}\" does not exist.`
                    })
                }
            })
            .catch(err => {
                res.status(404).send({
                    "message":`Companion with id \"${req.params.id}\" does not exist.`
                })
            })
    });

router.route("/companions/:id/friends")
    .get((req, res) => {
        console.log(`GET /companions/${req.params.id}/friends`);
        Companion.findById(req.params.id)
            .then(companion => {
                return Companion.find({
                    $and: [
                        {"seasons": {"$in": companion.seasons}},
                        {"_id": {"$ne": req.params.id}}
                    ]
                });
            })
            .then(companions => {
                if (companions) {
                    res.status(200).send(companions)
                } else {
                    res.status(404).send({
                        "message":`Companion with id \"${req.params.id}\" does not exist.`
                    })
                }
            }) 
            .catch(err => {
                res.status(404).send({
                    "message":`Companion with id \"${req.params.id}\" does not exist.`
                })
            })
    });

// optional:
router.route("/companions/favorites/:companion_id")
    .get((req, res) => {
        console.log(`GET /companions/favorites/${req.params.companion_id}`);
        const companionID = {"companion": req.params.companion_id};
        FavoriteCompanion.find(companionID)
            .then(favorite => {
                if (favorite.length) {
                    return Companion.findById(favorite[0].companion);
                } else {
                    return; 
                }
            })
            .then(companion => {
                if (companion) {
                    res.status(200).send(companion)
                } else {
                    res.status(404).send({
                        "message": `Companion with id \"${req.params.companion_id}\" does not exist in your favorites.`
                    })
                }
            })
            .catch(err => {
                res.status(404).send({
                    "message": err.message
                })
            })
    })
    .delete((req, res) => {
        console.log(`DELETE /companions/favorites/${req.params.companion_id}`);
        const companionID = {"companion": req.params.companion_id};
        FavoriteCompanion.findOneAndDelete(companionID)
            .then(companion => {
                if (companion) {
                    res.status(200).send();
                } else {
                    res.status(404).send({
                        "message": `Companion with id \"${req.params.companion_id}\" does not exist in your favorites.`
                    })
                }
            })
            .catch(err => {
                res.status(404).send({
                    "message": err.message
                })
            })
    });


module.exports = router;