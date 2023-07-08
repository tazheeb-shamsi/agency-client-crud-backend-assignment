import express from "express";
import Agency from "../models/agencyModel.js";
import Client from "../models/clientModel.js";

const router = express.Router();

// API TO GET ALL AGENCIES
router.get("/", (req, res) => {
  Agency.find()
    .then((agencies) => {
      res.status(200).json(agencies);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// API TO FIND AGENCY BY ID
router.get("/:id", (req, res) => {
  Agency.findOne(req.params._id)
    .then((agency) => {
      if (agency) {
        res.status(200).json(agency);
      } else {
        res.status(404).json({ error: "Agency not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// API TO ADD AN AGENCY
router.post("/addAgency", (req, res) => {
  const newAgency = new Agency(req.body);
  newAgency
    .save()
    .then((agency) => {
      res.status(200).json(agency);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// API TO ADD AGENCY ALONG WITH CLIENT
router.post("/", (req, res) => {
  const { agency, client } = req.body;
  const newAgency = new Agency(agency);
  newAgency
    .save()
    .then((createdAgency) => {
      const newClient = new Client({
        agencyId: createdAgency._id,
        ...client,
      });
      return newClient.save();
    })
    .then((createdClient) => {
      res.status(200).json({ agency: newAgency, client: createdClient });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// API TO UPDATE AN AGENCY
router.put("/:id", (req, res) => {
  Agency.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((agency) => {
      if (agency) {
        res.status(200).json(agency);
      } else {
        res.status(404).json({ error: "Agency not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// API TO UPDATE AN AGENCY AND ITS ASSOCIATED CLIENTS
router.delete("/:agencyId", async (req, res) => {
  const { agencyId } = req.params;

  try {
    const deletedAgency = await Agency.findByIdAndDelete(agencyId);
    if (!deletedAgency) {
      res.status(404).send("Agency not found");
    } else {
      // Delete the associated clients
      await Client.deleteMany({ AgencyId: agencyId });
      res
        .status(200)
        .send("Agency and associated clients deleted successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting agency");
  }
});

export default router;
