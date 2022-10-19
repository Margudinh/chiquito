// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import sharp from "sharp";
import AdmZip from "adm-zip";
import path from "path";
import fs from "fs/promises";
import { hashContent } from "../../server/utils/crypto";

type FileData = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};

interface NextApiFileRequest extends NextApiRequest {
  files: FileData[];
}

const api = nextConnect<NextApiFileRequest, NextApiResponse>();

const uploadMethod = multer({
  storage: multer.memoryStorage(),
});

const uploadMiddleware = uploadMethod.array("files");

api.use(uploadMiddleware);
api.post(async (req, res) => {
  let originalSize = 0;
  let improvedSize = 0;
  const zip = new AdmZip();

  for (const file of req.files) {
    originalSize += file.size;
    const buffer = await sharp(file.buffer).jpeg({ mozjpeg: true }).toBuffer();
    const size = buffer.byteLength;
    improvedSize += size;

    zip.addFile(file.originalname, buffer);
  }

  const zipFile = await zip.toBufferPromise();
  const zipHash = hashContent(zipFile);
  const zipDest = path.join("./.tmp", `${zipHash}.zip`);
  await fs.writeFile(zipDest, zipFile);

  res.status(200).json({
    originalSize,
    improvedSize,
    zipHash,
  });
});

export default api;

export const config = {
  api: {
    bodyParser: false,
  },
};
