module.exports = {
    "MONGO_DB": process.env.MONGO_DB || "eCommerce",
    "MONGO_IP": process.env.MONGO_IP || "127.0.0.1",
    "MONGO_PORT": process.env.MONGO_PORT || "27017",
    "MONGO_USER": process.env.MONGO_USER || "",
    "MONGO_PASS": process.env.MONGO_PASS || "",
    "NODE_ENV": process.env.NODE_ENV || "development",
    "HAS_SRV": process.env.HAS_SRV || "",
}