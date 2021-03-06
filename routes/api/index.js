const path = require("path");
const router = require("express").Router();
const productRoutes = require("./productRouting");
const searchRouting = require("./searchRouting");
const userRoutes = require("./userRouting");
const cartRoutes = require("./cartRouting");
const orderRoutes = require("./orderRouting");
const bundleRoutes = require("./bundleRouting");
const contactRoutes = require("./contactRouting");
const reviewRoutes = require("./reviewRouting");

router.use("/products", productRoutes);
router.use("/search", searchRouting);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/bundles", bundleRoutes);
router.use("/contact", contactRoutes);
router.use("/reviews", reviewRoutes);
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;