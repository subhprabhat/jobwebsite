// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
// import { singleUpload } from "../middlewares/multer.js";

// const router = express.Router();



// // router.post("/register", isAuthenticated, singleUpload, registerCompany);


// router.route("/register").post(isAuthenticated, singleUpload, registerCompany);
// router.route("/get").get(isAuthenticated, getCompany);
// router.route("/get/:id").get(isAuthenticated, getCompanyById);
// router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany); //-> Original line hai


// // router.route("/update/:id").put(isAuthenticated, updateCompany);  //-> yaha pe singleUpload hataya gya hai 

// export default router;











import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany);

export default router;