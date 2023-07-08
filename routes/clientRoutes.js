import express from "express";
import Client from "../models/clientModel.js";
import { authenticateToken } from "../utilities/auth.js";

const router = express.Router();

// API TO GET ALL CLIENTS
router.get("/", authenticateToken, (req, res) => {
  Client.find()
    .then((clients) => {
      res.status(200).json(clients);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// API TO FIND CLIENT BY ID
router.get("/:id", authenticateToken, (req, res) => {
  Client.findById(req.params.id)
    .then((client) => {
      if (client) {
        res.status(200).json(client);
      } else {
        res.status(404).json({ error: "client not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// API TO ADD A CLIENT
router.post("/", authenticateToken, (req, res) => {
  const newClient = new Client(req.body);
  newClient
    .save()
    .then((client) => {
      res.status(200).json(client);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// API TO UPDATE A CLIENT
router.put("/:id", authenticateToken, (req, res) => {
  Client.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((client) => {
      if (client) {
        res.status(200).json(client);
      } else {
        res.status(404).json({ error: "client not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// API TO DELETE A CLIENT
router.delete("/:clientId", authenticateToken, async (req, res) => {
  const { clientId } = req.params;

  try {
    const deletedClient = await Client.findOneAndDelete({ _id: clientId });
    if (!deletedClient) {
      res.status(404).send("Client not found");
    } else {
      res.status(200).send("Client deleted successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting client");
  }
});

export default router;
