import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `images/${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/") === "jpg" || "jpeg" || "png" || "gif") {
    cb(null, true);
  } else {
    cb(new Error("extention false"), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter, limits: { fieldSize: 1e6 } }).single("file");
export default upload;
