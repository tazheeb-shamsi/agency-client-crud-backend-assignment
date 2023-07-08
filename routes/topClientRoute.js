import express from "express";
import Client from "../models/clientModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  Client.find({})
    .sort("-totalBill")
    .limit(1)
    .populate("agencyId", "name")
    .exec()
    .then((clients) => {
      if (clients.length === 0) {
        res.status(404).send("No clients found");
      } else {
        const response = {
          AgencyName: clients[0]?.agencyId?.name,
          ClientName: clients[0]?.name,
          TotalBill: clients[0]?.totalBill,
        };
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving top client");
    });
});

export default router;
