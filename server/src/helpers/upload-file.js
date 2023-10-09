import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";

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
  if (file.mimetype.split("/") === "jpg" || "jpeg" || "png") {
    cb(null, true);
  } else {
    cb(new Error("extention false"), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const __dirname = dirname(fileURLToPath(import.meta.url));
export default upload;
