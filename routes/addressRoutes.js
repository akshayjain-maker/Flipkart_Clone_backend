const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const addressCtrl = require("../controllers/addressController");

router.post("/", auth, addressCtrl.addAddress);
router.get("/", auth, addressCtrl.getAddresses);
router.put("/:id", auth, addressCtrl.updateAddress);
router.delete("/:id", auth, addressCtrl.deleteAddress);

module.exports = router;
